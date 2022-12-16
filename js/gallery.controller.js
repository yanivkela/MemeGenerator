renderGallery()
function renderGallery() {
    const images = getImages()
    var htmlSTRs = images.map(image => {
        return `<article class="meme-temp" onclick="onImgSelect(${image.id})">
        <img src="${image.url}"/>
        <div class="info">
            <p>tags: ${image.keywords[0]},${image.keywords[1]}</p>
        </div>
    </article>`
})
    document.querySelector('.image-gallery').innerHTML = htmlSTRs.join('')
}

