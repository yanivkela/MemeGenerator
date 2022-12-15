let gMeme

function initializeMeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,

        lines: [
            {
                txt: 'Enter Text',
                size: 40,
                font: 'Impact',
                fillColor: '#ffffff',
                strokeColor: '#000000',
                textAlign: 'center',
                x: gElCanvas.width/2,
                y:40
            }
        ]
    }
}

function getMeme() {
    return gMeme
}

function switchLine() {
    gMeme.selectedLineIdx += 1
    if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0
    return gMeme.lines[gMeme.selectedLineIdx]
}

function addNewLine() {
    var pos
    if (!gMeme.lines.length) pos = {x: gElCanvas.width/2, y: 40}
    else if (gMeme.lines.length === 1) pos = {x: gElCanvas.width/2, y: gElCanvas.height -40}
    else pos = {x: gElCanvas.width/2, y: gElCanvas.height/2}
    var line = {
        txt: 'Enter Text',
        size: 40,
        font: 'Impact',
        fillColor: '#ffffff',
        strokeColor: '#000000',
        textAlign: 'center',
        x: pos.x,
        y: pos.y
    }
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
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