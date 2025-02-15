function cacheValue() {
  const form = document.getElementById('main');
  const formData = new FormData(form);

  for (let [key, value] of formData.entries()) {
    sessionStorage.setItem(key, value);
  }

  return;
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
