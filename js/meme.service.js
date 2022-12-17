let gMeme
var gMemesFilterBy = ''
const MEME_STORAGE_KEY = 'memesDB'

function initializeMeme(imgId) {
  gMeme = {
    selectedImgId: imgId,
    selectedLineIdx: 0,
    keywords: gImages[imgId-1].keywords,

    lines: [
      {
        txt: 'Enter Text',
        size: 40,
        font: 'Impact',
        fillColor: '#ffffff',
        strokeColor: '#000000',
        textAlign: 'center',
        x: gElCanvas.width / 2,
        y: 40,
      },
    ],
  }
}

function initializeRandomMeme() {
  const strings = [
    'Hello',
    'Goodbye',
    'Is this real',
    'what the hell',
    'everywhere',
    'everthing',
    'Coding',
    'Academy',
    'Sprint',
    'memeGenerator',
    'I am not',
    'Creative',
    'Lets try',
    'To finish',
    'this list'
  ]
  const lines = [
    {
        txt: strings[getRandomInt(0, strings.length)],
        size: 40,
        font: 'Impact',
        fillColor: getRandomColor(),
        strokeColor: getRandomColor(),
        textAlign: 'center',
        x: gElCanvas.width / 2,
        y: 40
    }
  ]
  if (Math.round(Math.random())) {
    lines.push({
        txt: strings[getRandomInt(0, strings.length)],
        size: 40,
        font: 'Impact',
        fillColor: getRandomColor(),
        strokeColor: getRandomColor(),
        textAlign: 'center',
        x: gElCanvas.width / 2,
        y: gElCanvas.height - 40
    })
  }
  const randomImgId = getRandomInt(0, gImages.length)
  gMeme = {
    selectedImgId: randomImgId,
    selectedLineIdx: 0,
    keywords: gImages[randomImgId-1].keywords,
    lines
  }
}

function setLineIndex(idx) {
    gMeme.selectedLineIdx = idx
}

function setMeme(meme) {
    gMeme = meme
}

function getMeme() {
  return gMeme
}

function moveLine(dx, dy) {
    var line = gMeme.lines[gMeme.selectedLineIdx]
    line.x += dx
    line.y += dy
}

function switchLine() {
  gMeme.selectedLineIdx += 1
  if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0
  return gMeme.lines[gMeme.selectedLineIdx]
}

function addNewLine() {
  var pos
  if (!gMeme.lines.length) pos = { x: gElCanvas.width / 2, y: 40 }
  else if (gMeme.lines.length === 1)
    pos = { x: gElCanvas.width / 2, y: gElCanvas.height - 40 }
  else pos = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
  var line = {
    txt: 'Enter Text',
    size: 40,
    font: 'Impact',
    fillColor: '#ffffff',
    strokeColor: '#000000',
    textAlign: 'center',
    x: pos.x,
    y: pos.y,
  }
  gMeme.lines.push(line)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function addSticker(sticker) {
    var pos
  if (!gMeme.lines.length) pos = { x: gElCanvas.width / 2, y: 40 }
  else if (gMeme.lines.length === 1)
    pos = { x: gElCanvas.width / 2, y: gElCanvas.height - 40 }
  else pos = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
  var line = {
    txt: sticker,
    size: 60,
    font: 'Impact',
    fillColor: '#ffffff',
    strokeColor: '#000000',
    textAlign: 'center',
    x: pos.x,
    y: pos.y,
  }
  gMeme.lines.push(line)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx,1)
    gMeme.selectedLineIdx = 0
    return gMeme.lines[gMeme.selectedLineIdx]
}

function setFont(font) {
  gMeme.lines[gMeme.selectedLineIdx].font = font
}

function setFontSize(diff) {
  gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function setAlign(align) {
  gMeme.lines[gMeme.selectedLineIdx].textAlign = align
}

function setStrokeColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].strokeColor = color
}

function setFillColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].fillColor = color
}

function setLineTxt(text) {
  gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function saveMeme(imageUrl, id) {
    if (!id) {
        id = makeId()
        setCurrId(id)
    }
    let savedMemes = loadFromLocalStorage(MEME_STORAGE_KEY)
    if (!savedMemes) savedMemes = [{id, imageUrl, meme: getMeme(), date: new Date()}]
    else {
        var currMeme = savedMemes.find(savedMeme => savedMeme.id === id)
        if (currMeme) {
            currMeme.imageUrl = imageUrl
            currMeme.meme = getMeme()
            currMeme.date = new Date()
        } else {
            savedMemes.push({id, imageUrl, meme: getMeme(), date: new Date()})
        }
    }
    saveToLocalStorage(MEME_STORAGE_KEY, savedMemes)
}

function setMemesFilterBy(str) {
    gMemesFilterBy = str
}

function getSavedMemes() {
    const savedMemes = loadFromLocalStorage(MEME_STORAGE_KEY)
    if (!savedMemes) return ''
    return savedMemes.filter(meme => {
        var isMatch = false
        meme.meme.keywords.forEach(keyword => {
            if (keyword.includes(gMemesFilterBy)) isMatch = true
        })
        return isMatch
    })
}
