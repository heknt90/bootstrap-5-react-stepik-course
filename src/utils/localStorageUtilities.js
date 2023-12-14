export function getOrInitializeLocalStorageItem(item, defaultValue) {
  if (!localStorage.getItem(item)) {
    saveItemToLocalStorage(item, defaultValue)
  } 
  return JSON.parse(localStorage.getItem(item))
}

export function saveItemToLocalStorage(item, value) {
  localStorage.setItem(item, JSON.stringify(value))
}