(function () {
  const doc = document;

  const toggle = doc.querySelector('.menu-toggle');
  const main   = doc.querySelector('.main');
  const page   = doc.querySelector('.page');

  const isMenuHiddenCheck = () => {
    let attributeValue = toggle.getAttribute('aria-expanded');

    return attributeValue === 'true';
  };

  const handleNavigationMenuState = () => {
    const isMenuHidden = isMenuHiddenCheck();
    toggle.setAttribute('aria-expanded', !isMenuHidden);

    // setTimeout(() => main.classList.toggle('is_active'), 200);
  };

  const toggleNavigationMenu = () => {
    toggle.classList.toggle('menu-toggle_active');
    main.classList.toggle('main_open-menu');
  };

  toggle.addEventListener('click', () => {
    handleNavigationMenuState();
    toggleNavigationMenu();
  });
}());
