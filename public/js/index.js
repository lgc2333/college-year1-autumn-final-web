document.addEventListener('DOMContentLoaded', () => {
  /** @type {HTMLImageElement} */
  // @ts-ignore
  const avatarImg = document.getElementById('avatar')
  const anim = avatarImg.animate(
    [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-360deg)' }],
    {
      duration: 2000,
      iterations: 1,
      fill: 'both',
      easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
    },
  )
  anim.cancel()
  avatarImg.addEventListener('click', () => {
    if (anim.playState === 'running') {
      anim.pause()
    }
    anim.reverse()
  })
})
