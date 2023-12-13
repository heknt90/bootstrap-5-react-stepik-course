export function getOrInitializeLocalStorageItem(item, defaultValue) {
  if (!localStorage.getItem(item)) {
    localStorage.setItem(item, JSON.stringify(defaultValue))
  }
  return JSON.parse(localStorage.getItem(item))
}

export function saveItemToLocalStorage(item, value) {
  localStorage.setItem(item, JSON.stringify(value))
}