;(() => {
  const transitionTime = 500
  const translatePx = 8

  MainJS.appendStyle(
    `:root {` +
      ` --tooltip-transition-time: ${transitionTime}ms;` +
      ` --tooltip-translate-y: ${translatePx}px; }`,
  )

  /**
   * @param {string} innerText
   * @return {[tipElem: HTMLElement, arrowElem: HTMLElement]}
   */
  const createTipElems = (innerText) => {
    const tipElem = document.createElement('div')
    tipElem.classList.add('tooltip')

    const arrowElem = document.createElement('div')
    arrowElem.classList.add('arrow')
    tipElem.appendChild(arrowElem)

    const tipTextElem = document.createElement('div')
    tipTextElem.innerText = innerText
    tipElem.appendChild(tipTextElem)

    document.body.appendChild(tipElem)

    return [tipElem, arrowElem]
  }

  /**
   * @param {HTMLElement} tipElem
   * @param {number} timeout
   */
  const tipAnim = async (tipElem, timeout) => {
    tipElem.style.opacity = '1'
    tipElem.style.transform = `translateY(0px)`
    await MainJS.sleep(timeout - transitionTime)

    tipElem.style.opacity = '0'
    await MainJS.sleep(transitionTime)

    tipElem.remove()
  }

  /**
   * @param {HTMLElement} refElem
   * @param {string} innerText
   * @param {number} [timeout]
   */
  const tip = async (refElem, innerText, timeout = 5000) => {
    const [tipElem, arrowElem] = createTipElems(innerText)

    const { x, y, placement, middlewareData } = await FloatingUIDOM.computePosition(
      refElem,
      tipElem,
      {
        placement: 'top',
        middleware: [
          FloatingUIDOM.offset(2),
          FloatingUIDOM.flip(),
          FloatingUIDOM.shift({ padding: 6 }),
          FloatingUIDOM.arrow({ element: arrowElem }),
        ],
      },
    )

    Object.assign(tipElem.style, {
      left: `${x}px`,
      top: `${y}px`,
    })

    if (middlewareData.arrow) {
      const { x: arrowX, y: arrowY } = middlewareData.arrow

      const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }[placement.split('-')[0]]

      Object.assign(arrowElem.style, {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : '',
        [staticSide]: '-4px',
      })
    }

    tipAnim(tipElem, timeout)
  }

  /**
   * @param {HTMLElement} elem
   */
  const addClickListener = (elem) => {
    elem.addEventListener('click', (ev) => {
      const text = elem.getAttribute('data-clipboard-text')
      navigator.clipboard
        .writeText(text)
        .then(() => {
          tip(elem, `已复制：${text}`)
        })
        .catch((err) => {
          tip(elem, `复制失败：${err}`)
          console.error(err)
        })
    })
  }

  document.addEventListener('DOMContentLoaded', () => {
    /** @type {NodeListOf<HTMLElement>} */
    const elems = document.querySelectorAll('body *[data-clipboard-text]')
    for (const elem of elems) {
      addClickListener(elem)
    }
  })

  globalThis.ClickCopyJS = {
    createTipElems,
    tipAnim,
    tip,
    addClickListener,
  }
})()
