var lastX = 0;
var dragging = false;
var svgns = "http://www.w3.org/2000/svg";

function scrollH(evt) {
    if (dragging) {
        if (lastX == 0) {
            delta = 0
        } else {
            var delta = evt.offsetX - lastX;
        }
        lastX= evt.offsetX;
        console.log(delta)
        var previousViewBox = $('#contentSvg')[0].getAttribute("viewBox").split(" ");
        var newX = parseInt(previousViewBox[0]) + delta
        $('#contentSvg')[0].setAttribute("viewBox", "" + newX + " " + previousViewBox[1]+" " + previousViewBox[2]+" " + previousViewBox[3]);
    }
}

function scrollHEnd(evt) {
    dragging = false;
}

function scrollHStart(evt) {
    dragging = true;
    lastX= 0;
}

function attachPancarteHandler() {
    dragging = false;
    lastX = 0;
    $("#rightPanel").on('mousemove', scrollH);
    $("#rightPanel").on('mousedown', scrollHStart);
    $("#rightPanel").on('mouseup', scrollHEnd);
}
