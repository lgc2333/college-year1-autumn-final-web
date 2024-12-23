import asyncio
import re
import urllib.parse
from pathlib import Path

import httpx
from cookit import with_semaphore
from tenacity import retry, stop_after_attempt, wait_fixed
from tqdm import tqdm

fonts_css_path = Path(__file__).parent.parent / "public" / "css" / "harmony-os-sans.css"
fonts_css = fonts_css_path.read_text("u8")
font_urls: list[str] = re.findall(r"src: url\('(?P<url>.+?)'\)", fonts_css)

base_url = "https://developer.huawei.com/config/commonResource/font/"
urls = [urllib.parse.urljoin(base_url, x.rsplit("/", 1)[-1]) for x in font_urls]

save_dir = Path(__file__).parent.parent / "public" / "assets" / "harmony-os-sans"
if not save_dir.exists():
    save_dir.mkdir(parents=True)

sem = asyncio.Semaphore(8)

cli = httpx.AsyncClient()


@with_semaphore(sem)
@retry(wait=wait_fixed(1), stop=stop_after_attempt(3))
async def download(url: str, signal: asyncio.Event):
    filename = url.rsplit("/", 1)[-1]
    resp = (await cli.get(url)).raise_for_status()
    (save_dir / filename).write_bytes(resp.content)
    signal.set()


progress = tqdm(
    total=len(urls),
    desc="Downloading fonts",
)


async def progress_wait_signal(signal: asyncio.Event):
    await signal.wait()
    progress.update(1)


def progress_signal():
    ev = asyncio.Event()
    asyncio.create_task(progress_wait_signal(ev))
    return ev


async def download_all():
    await asyncio.gather(*(download(url, progress_signal()) for url in urls))


asyncio.run(download_all())
progress.close()

replaced_css = re.sub(
    r"src: url\('(?P<url>.+?)'\)",
    lambda x: f"src: url('../assets/harmony-os-sans/{x['url'].rsplit('/', 1)[-1]}')",
    fonts_css,
)
fonts_css_path.write_text(replaced_css, "u8")
