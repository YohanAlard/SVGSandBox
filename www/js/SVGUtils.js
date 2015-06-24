/**
 * Created by axjvt on 17/06/2015.
 */
var SVG_TEXT_ELEMENT = "text";
var SVG_LINE_ELEMENT = "line";
var SVG_RECT_ELEMENT = "rect";
var svgns = "http://www.w3.org/2000/svg";

function createTextElement( x,  y, fillColor, strokeColor, textContent ){
    var svgTextElement = document.createElementNS(svgns, SVG_TEXT_ELEMENT);
    svgTextElement.setAttributeNS(null,"x","" + x );
    svgTextElement.setAttributeNS(null,"y", ""+ y  );
    svgTextElement.setAttributeNS(null,"fill", fillColor);
    svgTextElement.setAttributeNS(null,"stroke",strokeColor);
    svgTextElement.setAttributeNS(null,"text-anchor","middle");
    var textNode = document.createTextNode(textContent);
    svgTextElement.appendChild(textNode);
    return svgTextElement;
}

function createLineElement(x,y,x2,y2, strokeWidth, strokeColor){
    var svgLineElement = document.createElementNS(svgns, SVG_LINE_ELEMENT);
    svgLineElement.setAttributeNS(null,"x1","" + x);
    svgLineElement.setAttributeNS(null,"y1", ""+ y  );
    svgLineElement.setAttributeNS(null,"x2","" + x2);
    svgLineElement.setAttributeNS(null,"y2", ""+ y2 );
    svgLineElement.setAttributeNS(null,"stroke-width", strokeWidth);
    svgLineElement.setAttributeNS(null,"stroke",""+ strokeColor);
    return svgLineElement;
}

function createRectElement(x,y,width,height, strokeWidth, strokeColor,fillColor, opacity){
    var svgRectElement = document.createElementNS(svgns, SVG_RECT_ELEMENT);
    svgRectElement.setAttributeNS(null,"x","" + x );
    svgRectElement.setAttributeNS(null,"y", ""+ y  );
    svgRectElement.setAttributeNS(null,"width","" + width );
    svgRectElement.setAttributeNS(null,"height", ""+ height  );
    svgRectElement.setAttributeNS(null,"stroke-width", strokeWidth);
    svgRectElement.setAttributeNS(null,"stroke",""+ strokeColor);
    svgRectElement.setAttributeNS(null,"fill",""+ fillColor);
    svgRectElement.setAttributeNS(null,"opacity",""+ opacity);
    return svgRectElement;
}

