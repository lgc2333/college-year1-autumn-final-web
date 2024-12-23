/* eslint-disable no-var */

interface ClickCopyJS {
  createTipElems(innerText: string): [tipElem: HTMLElement, arrowElem: HTMLElement]
  tipAnim(tipElem: HTMLElement, timeout: number): Promise<void>
  tip(refElem: HTMLElement, innerText: string, timeout: number = 5000): Promise<void>
  addClickListener(elem: HTMLElement): void
}

declare module globalThis {
  var ClickCopyJS: ClickCopyJS
}
