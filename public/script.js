function cacheValue() {
  const form = document.getElementById('main');
  const formData = new FormData(form);

  for (let [key, value] of formData.entries()) {
    sessionStorage.setItem(key, value);
  }

  return;
}

function toggleMenu() {
  const nav = document.querySelector('.nav-links');
  const button = document.querySelector('.menu-toggle');

  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', !isExpanded);

  nav.classList.toggle('active');
}

function populateCachedValue() {
  const form = document.getElementById('main');

  if (form) {
    Array.from(form.elements).forEach((element) => {
      const cachedValue = sessionStorage.getItem(element.name);
      if (cachedValue) {
        element.value = cachedValue;
      }
    });
  }

  return;
}

function clearCache() {
  const form = document.getElementById('main');

  form.reset();

  return sessionStorage.clear();
}

window.addEventListener('load', populateCachedValue);
window.addEventListener('beforeunload', cacheValue);
document.getElementById('reset_btn').addEventListener('click', clearCache);
document.getElementById('hamburger').addEventListener('click', toggleMenu);
