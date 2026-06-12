// Bascule "Formation continue / Formation initiale" de la page Financement.
// TODO : basculer aussi le contenu affiché quand les données des deux parcours seront disponibles (Strapi).
export const initFinancementSwitch = () => {
  const buttons = document.querySelectorAll<HTMLButtonElement>(
    ".financement-switch__button"
  );
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((other) => {
        const active = other === button;
        other.classList.toggle("financement-switch__button--active", active);
        other.setAttribute("aria-pressed", String(active));
      });
    });
  });
};
