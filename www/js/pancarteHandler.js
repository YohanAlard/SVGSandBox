var lastX = 0;
var dragging = false;
var svgns = "http://www.w3.org/2000/svg";
var ratio = ratioDown;
function scrollH(evt) {
    if (dragging) {
        if (lastX == 0) {
            delta = 0
        } else {
            var delta = evt.offsetX - lastX;
        }
        lastX = evt.offsetX;
        console.log(delta)
        var previousViewBox = $('#contentSvg')[0].getAttribute("viewBox").split(" ");
        var newX = parseInt(previousViewBox[0]) + delta
        $('#contentSvg')[0].setAttribute("viewBox", "" + newX + " " + previousViewBox[1] + " " + previousViewBox[2] + " " + previousViewBox[3]);
    }
}

function scrollHEnd(evt) {
    dragging = false;
}

function scrollHStart(evt) {
    dragging = true;
    lastX = 0;
}

function attachPancarteHandler() {
    dragging = false;
    lastX = 0;
    $("#rightPanel").on('mousemove', scrollH);
    $("#rightPanel").on('mousedown', scrollHStart);
    $("#rightPanel").on('mouseup', scrollHEnd);
}


function updateXforZoomIn(hoursSvg) {

    hoursSvg.hours.setAttribute("x", "" + (parseInt(newXHours) * ratioUp));
    hoursSvg.lines.setAttribute("x1", "" + (parseInt(newXLines) * ratioUp));
    hoursSvg.lines.setAttribute("x2", "" + (parseInt(newXLines) * ratioUp));
}

function updateXforZoomOut(hoursSvg) {
    hoursSvg.hours.setAttribute("x", "" + (parseInt(newXHours) * ratioDown));
    // console.log("newXHours" + newXLines);
    hoursSvg.lines.setAttribute("x1", "" + (parseInt(newXLines) * ratioDown));
    hoursSvg.lines.setAttribute("x2", "" + (parseInt(newXLines) * ratioDown));
}

function updateX1X2() {
    var item = d3.select(this);
    console.log()
    item.attr("x1", "" + (item.attr("x1")) * ratio);
    item.attr("x2", "" + (item.attr("x2")) * ratio);
   // item.attr("transform", "translate(" +(item.attr("x1")) * 0.1 + ",0)");
}

function updateX() {
    var item = d3.select(this);
    item.attr("x", "" + (item.attr("x") * ratio));
}

function log(x1) {
    console.log(x1);
}

function updateD3TextforZoomOutLineD3(hoursSvg) {
    //  console.log("newXHours" + newXHours);

    hoursSvg.attr("x", "" + (parseInt(newXHours) * ratioDown));
    hoursSvg.attr("x1").replace("px", "");
    // console.log("newXHours" + newXLines);
    hoursSvg.attr("x1", "" + (parseInt(newXLines) * ratioDown));
    hoursSvg.attr("x2", "" + (parseInt(newXLines) * ratioDown));
    //hoursSvg.attr("transform", "translate(" + margin.left + "," + margin.top + ")"))
}