// Filtre par parcours de la page Alumni.
// Même principe que financement-switch.ts : l'état visuel et aria-pressed sont
// portés par les boutons, et les cartes sont masquées via l'attribut hidden.
export const initAlumniFilter = () => {
  const buttons = document.querySelectorAll<HTMLButtonElement>('.alumni-filter__button')
  const cards = document.querySelectorAll<HTMLElement>('.alumni-card')
  const emptyState = document.querySelector<HTMLElement>('.alumni-list__empty')
  if (!buttons.length || !cards.length) return

  const apply = (key: string) => {
    let visible = 0

    cards.forEach((card) => {
      const match = key === 'all' || card.dataset.track === key
      card.hidden = !match
      if (match) visible += 1
    })

    if (emptyState) emptyState.hidden = visible > 0
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((other) => {
        const active = other === button
        other.classList.toggle('alumni-filter__button--active', active)
        other.setAttribute('aria-pressed', String(active))
      })

      apply(button.dataset.filter ?? 'all')
    })
  })
}
