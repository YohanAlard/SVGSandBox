var lastX = 0;
var lastY =0;
var dragging = false;
var svgns = "http://www.w3.org/2000/svg";
var ratio = ratioDown;

function scrollH(evt) {
    if (dragging) {
        if (lastX == 0) {
            deltaX = 0
        } else {
            var deltaX = evt.offsetX - lastX;
        }
        if (lastY == 0){
            deltaY = 0
        } else {
            var deltaY = evt.offsetY - lastY;
        }
       // console.log(delta);
        if (Math.abs(deltaX) > 10 || lastX ==0) {
            lastX = evt.offsetX;
      //      console.log(delta)
               translateContentGroupXY(deltaX,0);
          }
        if (Math.abs(deltaY)> 10 || lastY ==0) {
                                         lastY = evt.offsetY;
                                   //      console.log(delta)
                                            translateContentGroupXY(0,deltaY);
                                       }
    }
}

function translateContentGroupXY(deltaX, deltaY, boolean){
        var svgGraph = d3.select("#contentSvg").selectAll("#graph");
        var svgHeader = d3.select("#contentSvg").selectAll("#header");
        var svgLegend = d3.select("#legendeSvg").selectAll("#legend");
        var previousValueX = parseInt(svgGraph.attr("transform").replace("translate(-","").replace(")").split(",")[0]);
        var previousValueY = parseInt(svgGraph.attr("transform").replace("translate(-","").replace(")").split(",")[1]);
        var newValueX = previousValueX + deltaX;
        var newValueY = previousValueY + deltaY;
        svgGraph.attr("transform","translate(-"+newValueX+","+newValueY+")");
        svgHeader.attr("transform","translate(-"+newValueX+")");
        if (!boolean)
            svgLegend.attr("transform","translate(0,"+newValueY+")");
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

