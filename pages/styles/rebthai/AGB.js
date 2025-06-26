  const header = document.querySelector("header");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll <= 0) {
      header.classList.remove("hidden");
    } else if (currentScroll > lastScrollY) {
      // Runterscrollen
      header.classList.add("hidden");
    } else {
      // Hochscrollen
      header.classList.remove("hidden");
    }

    lastScrollY = currentScroll;
  });

  // Mobile Menü Steuerung (bleibt gleich)
  document.getElementById('openmenu').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('navigation').classList.add('active');
  });

  document.getElementById('closemenu').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('navigation').classList.remove('active');
  });