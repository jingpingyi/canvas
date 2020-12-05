var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var clear = document.getElementById('clear')
var $ = function(id){return document.getElementById(id)}
autoSetCanvasSize()

var lastPoint, newPoint
var using = false
var eraserEnable = false
var pencilEnable = true
var pencilColor = "black"
var pencilLineWidth = 2
var eraserLineWidth = 12

listenToUser(canvas)
function drawLine(lastPoint, newPoint) {
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
    context.arc(x, y, pencilLineWidth/2, 0, Math.PI * 2)
    context.fill()
}
function erasure(x, y) {
    context.beginPath()
    context.arc(x, y, eraserLineWidth/2, 0, Math.PI * 2)
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
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            lastPoint = { 'x': x, 'y': y }
            using = true
            if (pencilEnable) {
                context.lineWidth = pencilLineWidth
                drawPoint(x, y)
            } else {
                context.lineWidth = eraserLineWidth
                erasure(x, y)
            }
        }
        canvas.ontouchmove = function (a) {
            if (using) {
                var x = a.touches[0].clientX
                var y = a.touches[0].clientY
                newPoint = { 'x': x, 'y': y }
                if (pencilEnable) {
                    context.lineWidth = pencilLineWidth
                    drawLine(lastPoint, newPoint)
                    lastPoint = newPoint
                } else {
                    context.lineWidth = eraserLineWidth
                    erasure(x, y)
                    drawLine(lastPoint, newPoint)
                    lastPoint = newPoint
                }
            }
        }
        canvas.ontouchend = function (a) {
            using = false
        }
        clear.ontouchstart = function(){
            clear.classList.add('active')
            context.clearRect(0,0,canvas.width,canvas.height)
        
        }
        clear.ontouchend = function(){
            clear.classList.remove('active')
        }
    } else {
        //是非触屏设备
        canvas.onmousedown = function (a) {
            var x = a.clientX
            var y = a.clientY
            lastPoint = { 'x': x, 'y': y }

            using = true

            if (pencilEnable) {
                context.lineWidth = pencilLineWidth

                drawPoint(x, y)
            } else {
                context.lineWidth = eraserLineWidth
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
                    context.lineWidth = pencilLineWidth
                    drawLine(lastPoint, newPoint)
                    lastPoint = newPoint
                } else {
                    context.lineWidth = eraserLineWidth
                    erasure(x, y)
                    context.lineWidth = 12
                    drawLine(lastPoint, newPoint)
                    lastPoint = newPoint
                }
            }

        }
        canvas.onmouseup = function (a) {
            using = false
        }
        
        clear.onmousedown = function(){
            clear.classList.add('active')
            context.clearRect(0,0,canvas.width,canvas.height)
        
        }
        clear.onmouseup = function(){
            clear.classList.remove('active')
        }
    }

}
$('black').onclick = function (a) {
        var color = window.getComputedStyle(a.target).backgroundColor
        pencilColor = color
        black.classList.add('active')
        blue.classList.remove('active')
        green.classList.remove('active')
        red.classList.remove('active')


}
$('blue').onclick = function (a) {
        var color = window.getComputedStyle(a.target).backgroundColor
        pencilColor = color
        blue.classList.add('active')
        green.classList.remove('active')
        black.classList.remove('active')
        red.classList.remove('active')

}
$('red').onclick = function (a) {
        var color = window.getComputedStyle(a.target).backgroundColor
        pencilColor = color
        red.classList.add('active')
        green.classList.remove('active')
        black.classList.remove('active')
        blue.classList.remove('active')


}
$('green').onclick = function (a) {
        var color = window.getComputedStyle(a.target).backgroundColor
        pencilColor = color
        green.classList.add('active')
        black.classList.remove('active')
        blue.classList.remove('active')
        red.classList.remove('active')


}
var clear = document.getElementById('clear')


$('line-1').onclick = function(){
    $('pix').innerText = '2'
    pencilLineWidth = 2
}
$('line-2').onclick = function(){
    pencilLineWidth = 4
    $('pix').innerText = '4'
    $('line').className = 'line-2'
}
$('line-3').onclick = function(){
    pencilLineWidth = 6
    $('pix').innerText = '6'
    $('line').className = 'line-3'
}
$('line-4').onclick = function(){
    pencilLineWidth = 8
    $('pix').innerText = '8'
    $('line').className = 'line-4'
}
$('line').onclick = function(){
    $('lines').classList.toggle('active')
}




