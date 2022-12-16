var gCurrPage = 'gallery'

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

function onMemesClick(elItem) {
    document.querySelector('.editor').classList.remove('flex')
    document.querySelector('.text-input').value = ''
    document.querySelector('.font-select').value = 'Impact'
    document.querySelector('.stroke-color input').value = '#000000'
    document.querySelector('.fill-color input').value = '#ffffff'
    document.querySelector('.gallery').hidden = false
    var menuItems = document.querySelectorAll('.main-nav ul li')
    menuItems.forEach(item => {
        item.classList.remove('selected')
    })
    elItem.classList.add('selected')
    gCurrPage = 'memes'
    document.querySelector('.filter-input').value = ''
    onFilter('')
    document.body.classList.remove('menu-open')
    document.querySelector('.im-flexible-btn').hidden = true
    renderSavedMemes()
}

function onGalleryClick(elItem) {
    document.querySelector('.editor').classList.remove('flex')
    document.querySelector('.text-input').value = ''
    document.querySelector('.font-select').value = 'Impact'
    document.querySelector('.stroke-color input').value = '#000000'
    document.querySelector('.fill-color input').value = '#ffffff'
    document.querySelector('.gallery').hidden = false
    var menuItems = document.querySelectorAll('.main-nav ul li')
    menuItems.forEach(item => {
        item.classList.remove('selected')
    })
    elItem.classList.add('selected')
    gCurrPage = 'gallery'
    document.querySelector('.filter-input').value = ''
    onFilter('')
    document.body.classList.remove('menu-open')
    document.querySelector('.im-flexible-btn').hidden = false
    renderGallery()
}

function onFilter(str) {
    switch (gCurrPage) {
        case 'gallery':
            setGalleryFilterBy(str)
            renderGallery()
            break
        case 'memes':
            setMemesFilterBy(str)
            renderSavedMemes()
            break
    }
}