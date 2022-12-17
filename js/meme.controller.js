let gCurrMemeId
let gStartX
let gStartY
let isDragging = false
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
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

gElCanvas.onmousedown = onDown
gElCanvas.onmousemove = onMove
gElCanvas.onmouseup = onUp

gElCanvas.ontouchstart = onDown
gElCanvas.ontouchmove = onMove
gElCanvas.ontouchend = onUp

function onUp(ev) {
    if (!isDragging) return
    isDragging = false
}

function onMove(ev) {
    if (!isDragging) return
    ev.preventDefault()
    pos = getEvPos(ev)
    let mouseX = parseInt(pos.x)
    let mouseY = parseInt(pos.y)

    let dx = mouseX - gStartX
    let dy = mouseY - gStartY
    moveLine(dx, dy)
    renderMeme()
    gStartX = mouseX
    gStartY = mouseY
}

function onDown(ev) {
  ev.preventDefault()
  pos = getEvPos(ev)
  gStartX = parseInt(pos.x)
  gStartY = parseInt(pos.y)
  var lines = getMeme().lines
  lines.forEach((line, idx) => {
    if (isMouseOnLine(gStartX, gStartY, line)) {
      setLineIndex(idx)
      document.querySelector('.text-input').value = line.txt
      document.querySelector('.font-select').value = line.font
      document.querySelector('.stroke-color input').value = line.strokeColor
      document.querySelector('.fill-color input').value = line.fillColor
      isDragging = true
    }
  })
}

function isMouseOnLine(startX, startY, line) {
  let lineLeft = line.x - (line.txt.length * line.size) / 4
  let lineRight = line.x + (line.txt.length * line.size) / 4
  let lineTop = line.y - line.size / 2
  let lineBottom = line.y + line.size / 2
  return (
    startX > lineLeft &&
    startX < lineRight &&
    startY > lineTop &&
    startY < lineBottom
  )
}

function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        console.log('ev:', ev)
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - 50,
        }
    }
    return pos
}

function renderMeme() {
  var meme = getMeme()
  drawImg(meme.selectedImgId)

  setTimeout(
    (meme) => {
      meme.lines.forEach((line) => drawText(line))
    },
    1,
    meme
  )
}

function resizeCanvas() {
  var elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = Math.min(500, elContainer.offsetWidth * 0.9)
  gElCanvas.height = Math.min(500, elContainer.offsetWidth * 0.9)
}

function drawText(line) {
  gCtx.lineWidth = 2
  gCtx.strokeStyle = line.strokeColor
  gCtx.fillStyle = line.fillColor
  gCtx.font = `${line.size}px ${line.font}`
  gCtx.textAlign = line.textAlign
  gCtx.textBaseline = 'middle'

  gCtx.fillText(line.txt, line.x, line.y)
  gCtx.strokeText(line.txt, line.x, line.y)
}

function drawImg(imgIdx) {
  const elImg = new Image()
  elImg.src = `img/${imgIdx}.jpg`
  elImg.onload = () => {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
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

function onAddSticker(sticker) {
  addSticker(sticker)
  document.querySelector('.text-input').value = sticker
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

function onRemoveLine() {
  const firstLine = removeLine()
  document.querySelector('.text-input').value = firstLine.txt
  document.querySelector('.font-select').value = firstLine.font
  document.querySelector('.stroke-color input').value = firstLine.strokeColor
  document.querySelector('.fill-color input').value = firstLine.fillColor
  renderMeme()
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

function onRandomMeme() {
  document.querySelector('.gallery').hidden = true
  document.querySelector('.editor').classList.add('flex')
  gCurrMemeId = null
  resizeCanvas()
  initializeRandomMeme()
  const firstLine = getMeme().lines[0]
  document.querySelector('.text-input').value = firstLine.txt
  document.querySelector('.font-select').value = 'Impact'
  document.querySelector('.stroke-color input').value = firstLine.strokeColor
  document.querySelector('.fill-color input').value = firstLine.fillColor
  renderMeme()
}

function onImgSelect(imgId) {
  document.querySelector('.gallery').hidden = true
  document.querySelector('.editor').classList.add('flex')
  gCurrMemeId = null
  resizeCanvas()
  initializeMeme(imgId)
  renderMeme()
}

function onMemeSelect(id) {
  document.querySelector('.gallery').hidden = true
  document.querySelector('.editor').classList.add('flex')
  gCurrMemeId = id
  const savedMemes = loadFromLocalStorage(MEME_STORAGE_KEY)
  const meme = savedMemes.find((meme) => meme.id === id).meme
  resizeCanvas()
  setMeme(meme)
  const firstLine = meme.lines[0]
  document.querySelector('.text-input').value = firstLine.txt
  document.querySelector('.font-select').value = 'Impact'
  document.querySelector('.stroke-color input').value = firstLine.strokeColor
  document.querySelector('.fill-color input').value = firstLine.fillColor
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

function onSaveMeme() {
  let urlImage = gElCanvas.toDataURL('image/jpeg')
  saveMeme(urlImage, gCurrMemeId)
}

function setCurrId(id) {
  gCurrMemeId = id
}

function renderSavedMemes() {
  const savedMemes = getSavedMemes()
  if (!savedMemes) {
    document.querySelector('.image-gallery').innerHTML = ''
    return
  }
  let htmlSTRs = savedMemes.map((meme) => {
    return `<article class="meme-temp" onclick="onMemeSelect('${meme.id}')">
        <img src="${meme.imageUrl}">
        <div class="info">${meme.date}</div>
        </article>`
  })
  document.querySelector('.image-gallery').innerHTML = htmlSTRs.join('')
}
