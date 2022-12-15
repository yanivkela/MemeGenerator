let gElCanvas = document.getElementById('my-canvas')
let gCtx = gElCanvas.getContext('2d')

function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    window.addEventListener('resize', () => {
        if (gMeme) {
            resizeCanvas()
            renderMeme()
        }
    })
    
}

function renderMeme() {
    var meme = getMeme()
    drawImg(meme.selectedImgId)
    setTimeout((meme) => {
        meme.lines.forEach(line => drawText(line))

    },100,meme)
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = Math.min(500,elContainer.offsetWidth * 0.9)
    gElCanvas.height = Math.min(500,elContainer.offsetWidth * 0.9)
}

function drawText(line) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = line.strokeColor
    gCtx.fillStyle = line.fillColor
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.textAlign = line.textAlign
    gCtx.textBaseline = 'middle'

    gCtx.fillText(line.txt,line.x,line.y)
    gCtx.strokeText(line.txt,line.x,line.y)
}

function drawImg(imgIdx) {
    const elImg = new Image()
    elImg.src = `img/${imgIdx}.jpg`
    elImg.onload = () => {
        gCtx.drawImage(elImg,0,0,gElCanvas.width,gElCanvas.height)
    }
}

function onAddNewLine() {
    addNewLine()
    document.querySelector('.text-input').value = ''
    document.querySelector('.font-select').value = 'Impact'
    document.querySelector('.stroke-color input').value = '#000000'
    document.querySelector('.fill-color input').value = '#ffffff'
    renderMeme()
}

function onSwitchLine() {
    const line = switchLine()
    document.querySelector('.text-input').value = line.txt
    document.querySelector('.font-select').value = line.font
    document.querySelector('.stroke-color input').value = line.strokeColor
    document.querySelector('.fill-color input').value = line.fillColor
}

function onFontSelect(font) {
    setFont(font)
    renderMeme()
}

function onFontSize(diff) {
    setFontSize(diff)
    renderMeme()
}

function onSetAlign(align) {
    setAlign(align)
    renderMeme()
}

function onSetStrokeColor(color) {
    setStrokeColor(color)
    renderMeme()
}
function onSetFillColor(color) {
    setFillColor(color)
    renderMeme()
}

function onTextChange(text) {
    setLineTxt(text)
    renderMeme()
}

function onImgSelect(imgId) {
    document.querySelector('.gallery').hidden = true
    document.querySelector('.editor').classList.add('flex')
    resizeCanvas()
    initializeMeme(imgId)
    renderMeme()
}

function onBackToGallery() {
    document.querySelector('.editor').classList.remove('flex')
    document.querySelector('.text-input').value = ''
    document.querySelector('.font-select').value = 'Impact'
    document.querySelector('.stroke-color input').value = '#000000'
    document.querySelector('.fill-color input').value = '#ffffff'
    document.querySelector('.gallery').hidden = false
}