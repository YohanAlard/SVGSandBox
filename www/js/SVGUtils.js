/**
 * Created by axjvt on 17/06/2015.
 */
var SVG_TEXT_ELEMENT = "text";
var SVG_LINE_ELEMENT = "line";
var svgns = "http://www.w3.org/2000/svg";

function createTextElement( x,  y, fillColor, strokeColor, textContent ){
    var svgTextElement = document.createElementNS(svgns, SVG_TEXT_ELEMENT);
    svgTextElement.setAttributeNS(null,"x","" + x +"px");
    svgTextElement.setAttributeNS(null,"y", ""+ y  +"px");
    svgTextElement.setAttributeNS(null,"fill", fillColor);
    svgTextElement.setAttributeNS(null,"stroke",strokeColor);
    var textNode = document.createTextNode(textContent);
    svgTextElement.appendChild(textNode);
    return svgTextElement;
}

function createLineElement(x,y,x2,y2, strokeWidth, strokeColor){
    var svgTextElemet = document.createElementNS(svgns, SVG_LINE_ELEMENT);
    svgTextElemet.setAttributeNS(null,"x1","" + x +"px");
    svgTextElemet.setAttributeNS(null,"y1", ""+ y  +"px");
    svgTextElemet.setAttributeNS(null,"x2","" + x2 +"px");
    svgTextElemet.setAttributeNS(null,"y2", ""+ y2  +"px");
    svgTextElemet.setAttributeNS(null,"stroke-width", strokeWidth);
    svgTextElemet.setAttributeNS(null,"stroke",""+ strokeColor);
    return svgTextElemet;
}

