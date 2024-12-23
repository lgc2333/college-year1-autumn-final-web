;(() => {
  /**
   * @param {number} ms
   * @returns {Promise<void>}
   */
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  /**
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  const randRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

  /**
   * @param {string} css
   * @returns {HTMLStyleElement}
   */
  const appendStyle = (css) => {
    const styleElem = document.createElement('style')
    styleElem.innerText = css
    document.head.appendChild(styleElem)
    return styleElem
  }

  // #region loading animation
  const transitionDuration = 500
  appendStyle(`:root { --loading-mask-duration: ${transitionDuration}ms; }`)
  window.addEventListener('load', () => {
    /** @type {HTMLDivElement} */
    const loadingMaskElem = document.querySelector('.loading-mask')
    loadingMaskElem.style.opacity = '0'
    setTimeout(() => {
      loadingMaskElem.style.display = 'none'
    }, transitionDuration)
  })
  // #endregion

  // #region random background
  const bgCount = 5
  const bgUrls = Array.from(
    {
      length: bgCount,
    },
    (_, i) => `../assets/bg/${i + 1}.jpg`,
  )
  document.addEventListener('DOMContentLoaded', () => {
    const selected = bgUrls[randRange(0, bgUrls.length - 1)]
    appendStyle(`:root { --bg-image: url(${selected}); }`)
  })
  // #endregion

  // #region nav menu
  document.addEventListener('DOMContentLoaded', () => {
    /** @type {HTMLAnchorElement} */
    // @ts-ignore
    const navMenuElem = document.getElementById('nav-menu')
    /** @type {HTMLElement} */
    const navElem = document.querySelector('body > header nav')
    navMenuElem.addEventListener('click', () => {
      navElem.classList.toggle('active')
    })
  })
  // #endregion

  // zoom
  window.addEventListener('load', () => {
    if (globalThis.mediumZoom) mediumZoom('[data-zoom]')
  })

  globalThis.MainJS = {
    sleep,
    randRange,
    appendStyle,
  }
})()
