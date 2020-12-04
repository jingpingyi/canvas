var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

autoSetCanvasSize()

var lastPoint, newPoint
var using = false
var eraserEnable = false
var pencilEnable = true
var pencilColor = "red"
var pencilLineWidth = {}
var pencilLineIndex = 2
var eraserLineWidth = {}
var eraserLineIndex = 2

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
    if (eraser.classList.contains("active")) {
        //弹出橡皮擦选项
    } else {
        eraser.classList.add('active')
        pencil.classList.remove('active')
    }

}
pencil.onclick = function () {
    context.globalCompositeOperation = 'source-over'
    eraserEnable = false
    pencilEnable = true
    if (pencil.classList.contains('active')) {
        //弹出铅笔选项
    } else {
        pencil.classList.add('active')
        eraser.classList.remove('active')
    }
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
                    context.lineWidth = 12
                    drawLine(lastPoint, newPoint, pencilColor)
                    lastPoint = newPoint
                }
            }

        }
        canvas.onmouseup = function (a) {
            using = false
        }
    }

}
black.onclick = function (a) {
    if (pencilEnable) {
        var color = window.getComputedStyle(a.target).backgroundColor
        pencilColor = color
        black.classList.add('active')
        blue.classList.remove('active')
        green.classList.remove('active')
        red.classList.remove('active')
    }


}
blue.onclick = function (a) {
    if (pencilEnable) {
        var color = window.getComputedStyle(a.target).backgroundColor
        pencilColor = color
        blue.classList.add('active')
        green.classList.remove('active')
        black.classList.remove('active')
        red.classList.remove('active')
    }

}
red.onclick = function (a) {
    if (pencilEnable) {
        var color = window.getComputedStyle(a.target).backgroundColor
        pencilColor = color
        red.classList.add('active')
        green.classList.remove('active')
        black.classList.remove('active')
        blue.classList.remove('active')
    }


}
green.onclick = function (a) {
    if (pencilEnable) {
        var color = window.getComputedStyle(a.target).backgroundColor
        pencilColor = color
        green.classList.add('active')
        black.classList.remove('active')
        blue.classList.remove('active')
        red.classList.remove('active')

    }

}
