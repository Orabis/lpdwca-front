// src/scripts/nav-toggle.ts
export const initNavToggle = () => {
  const toggle = document.querySelector<HTMLButtonElement>('.nav__toggle')
  const menu = document.querySelector<HTMLElement>('.nav__menu')

  if (!toggle || !menu) return

  // État initial propre — les 3 marqueurs remis à zéro ensemble
  document.body.classList.remove('nav-open')
  toggle.setAttribute('aria-expanded', 'false')
  menu.classList.remove('nav__menu--open')

  toggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open')
    toggle.setAttribute('aria-expanded', String(open))
    menu.classList.toggle('nav__menu--open', open)
  })
}
