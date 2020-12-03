var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

autoSetCanvasSize()

var lastPoint, newPoint
var using = false
var eraserEnable = false
var pencilEnable = true
var pencilColor = "red"

listenToUser(canvas)
function drawLine(lastPoint, newPoint, pencilColor) {
    context.lineWidth = 6
    context.strokeStyle = pencilColor
    context.lineJoin = 'round'
    context.beginPath()
    context.moveTo(lastPoint.x, lastPoint.y)
    context.lineTo(newPoint.x, newPoint.y)
    context.stroke()
    context.closePath()
}
function drawPoint(x, y) {
    context.fillStyle = pencilColor
    context.beginPath()
    context.arc(x, y, 3, 0, Math.PI * 2)
    context.fill()
}
function erasure(x, y) {
    context.beginPath()
    context.arc(x, y, 6, 0, Math.PI * 2)
    context.fill()

}
eraser.onclick = function () {
    eraserEnable = true
    pencilEnable = false
    context.globalCompositeOperation = 'destination-out'

}
pencil.onclick = function () {
    context.globalCompositeOperation = 'source-over'

    eraserEnable = false
    pencilEnable = true
}
function autoSetCanvasSize() {
    setCanvasSize()
    window.onresize = function () {
        setCanvasSize()
    }
}
function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
} 
function listenToUser(canvas) {
    if (document.body.ontouchstart !== undefined) {
        //是触屏设备
        canvas.ontouchstart = function (a) {
            console.log(a)
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            lastPoint = { 'x': x, 'y': y }
            using = true
            if (pencilEnable) {
                drawPoint(x, y)
            } else {
                erasure(x, y)
            }
        }
        canvas.ontouchmove = function (a) {
            if (using) {
                var x = a.touches[0].clientX
                var y = a.touches[0].clientY
                newPoint = { 'x': x, 'y': y }
                if (pencilEnable) {
                    drawLine(lastPoint, newPoint, pencilColor)
                    lastPoint = newPoint
                } else {
                    console.log("sss")
                    erasure(x, y)
                }
            }
        }
        canvas.ontouchend = function (a) {
            using = false
        }
    } else {
        //是非触屏设备
        canvas.onmousedown = function (a) {
            var x = a.clientX
            var y = a.clientY
            lastPoint = { 'x': x, 'y': y }

            using = true

            if (pencilEnable) {
                drawPoint(x, y)
            } else {
                erasure(x, y)
            }
        }
        canvas.onmousemove = function (a) {
            if (using) {
                var x = a.clientX
                var y = a.clientY
                drawPoint(x, y)
                newPoint = { 'x': x, 'y': y }
                if (pencilEnable) {
                    drawLine(lastPoint, newPoint, pencilColor)
                    lastPoint = newPoint
                } else {
                    erasure(x, y)
                }
            }

        }
        canvas.onmouseup = function (a) {
            using = false
        }
    }

}
black.onclick = function(a){
    var color = window.getComputedStyle(a.target).backgroundColor
    pencilColor = color
}
blue.onclick = function(a){
    var color = window.getComputedStyle(a.target).backgroundColor
    pencilColor = color
}
red.onclick = function(a){
    var color = window.getComputedStyle(a.target).backgroundColor
    pencilColor = color
}
green.onclick = function(a){
    var color = window.getComputedStyle(a.target).backgroundColor
    pencilColor = color
}
