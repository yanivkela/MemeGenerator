function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromLocalStorage(key) {
    const value = localStorage.getItem(key)
    return JSON.parse(value)
}