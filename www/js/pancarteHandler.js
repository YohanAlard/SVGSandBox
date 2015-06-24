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
       // console.log(delta);
        if (Math.abs(delta) > 10 || lastX ==0) {
            lastX = evt.offsetX;
      //      console.log(delta)
            var previousViewBox = $('#contentSvg')[0].getAttribute("viewBox").split(" ");
            var newX = parseInt(previousViewBox[0]) + delta
            $('#contentSvg')[0].setAttribute("viewBox", "" + newX + " " + previousViewBox[1] + " " + previousViewBox[2] + " " + previousViewBox[3]);
        }
    }
}

function scrollHEnd(evt) {
    dragging = false;
}

function scrollHStart(evt) {
    console.log("scrollHStart");
    dragging = true;
    lastX = 0;
}

function attachPancarteHandler() {

    dragging = false;
    lastX = 0;
    console.log($("#rightPanel"));
    $("#contentSvg").on('mousemove', scrollH);
    $("#contentSvg").on('mousedown', scrollHStart);
    $("#contentSvg").on('mouseup', scrollHEnd);
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
    item.attr("x1", "" + (item.attr("x1")) * ratio);
    item.attr("x2", "" + (item.attr("x2")) * ratio);
    // item.attr("transform", "translate(" +(item.attr("x1")) * 0.1 + ",0)");
}

function updateX() {
    var item = d3.select(this);
    item.attr("x", "" + (item.attr("x") * ratio));
}

function updateRect() {
    var item = d3.select(this);
    item.attr("x", "" + (item.attr("x") * ratio));
    if (item.attr("width") * ratio>  0 && item.attr("width") < oneDayinPx * 8){
        item.attr("width", "" + (item.attr("width") * ratio));
    }

}


function updateD() {

    var item = d3.select(this);
    console.log("update Path +" + item.attr("d"));
    var d = item.attr("d").split(",")
    var buffer = "" + d[0] ;
    for (var i=1; i < d.length; i++){
        var pointYX = d[i].split("L");
        if (pointYX.length == 2){
            newX = parseInt(parseInt(pointYX[1]) * ratio);
            buffer =buffer+  "," + pointYX[0] + "L" + newX;
        } else {
            buffer =buffer+  "," +  pointYX[0];
        }
    }
    item.attr("d",buffer);
    console.log(d);
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