/**
 * Created by axjvt on 17/06/2015.
 */
var nbPreviousDay = 7;
var nbNextDay = 1;
var oneHourinMs = 3600000; //1 hours in ms
var oneHourInPx = 60;
var oneMsInPx = oneHourInPx / (1000 * 60 * 60);
var oneDayinPx = 1440;
var width = oneHourInPx * 24 * 8;
var height = "1200";
var arrayIndex = 0;
var ratioDown = 0.9;
var ratioUp = 1.1;
var identityScale;
var margin = 1440 * 8;
var colors = ["rgb(250,128,114)", "rgb(250, 173, 114)", "rgb(250, 218, 114)", "rgb(152, 251, 152)", "rgb(135, 206, 235)", "rgb(135, 172, 235)", "rgb(135, 139, 235)", "rgb(164, 135, 235)"];
var popup;
function drawPancarte($scope) {
    var startDate = new Date();
    var endDate = new Date();
    startDate.clearAfterMinutes();
    endDate.clearAfterMinutes();
    startDate.setDate(startDate.getDate() - nbPreviousDay);
    endDate.setDate(endDate.getDate() + nbNextDay);
    identityScale = d3.scale.linear().domain([startDate.getTime(), endDate.getTime()]).range([0, 11520]);
    console.log(startDate.getTime() + " " + endDate.getTime());
    attachPancarteHandler($scope);
    drawHours($scope, startDate, endDate);
    drawNowBar(startDate);
    var Yindex = 50;
    for (var i = 0; i < 8; i++) {
        drawGraph("#contentSvg", $scope, startDate, endDate, Yindex, false, colors[i]);
        Yindex = Yindex + 110;
    }
    popup = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
    //  attachHoverOnPoint();
}

function drawNowBar(startDate, endDate) {
    //now RED LINE
    var svgContainer = d3.select("#contentSvg").selectAll("g");
    svgContainer.append("line").attr("x1", identityScale(new Date().getTime()))
        .attr("x2", identityScale(new Date().getTime()))
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke-width", 2).attr("stroke", "red");

    var runningPeriod = new Date();
    runningPeriod.setHours(runningPeriod.getHours() - 1);
    svgContainer.append("rect").attr("x", identityScale(runningPeriod))
        .attr("y", 0)
        .attr("width", 2 * oneHourInPx)
        .attr("height", height)
        .attr("fill", "#B4CFEC")
        .attr("opacity", 0.2);
}

function drawHours($scope, startDate, endDate) {
    for (var i = startDate.getTime(); i < endDate.getTime(); i = i + oneHourinMs * 2) {
        var currentDate = new Date();
        currentDate.setTime(i);
        var svgContainer = d3.select("#contentSvg").select("#header");
        svgContainer.append("text").attr("x", identityScale(i)).attr("y", 10).attr("fill", "grey").attr("stroke", "grey").attr("text-anchor", "middle").text(currentDate.toHHMM());
        var svgContainer = d3.select("#contentSvg").select("#graph");

        svgContainer.append("line").attr("x1", identityScale(i)).attr("y1", 20).attr("x2", identityScale(i)).attr("y2", height).attr("fill", "grey").attr("stroke", "grey").attr("text-anchor", "middle").text(currentDate.toHHMM());
        arrayIndex++;
    }
}


function drawGraph(svpParent, $scope, startDate, endDate, yIndex, odd, color) {
    // build service return
    var svgContainer = d3.select(svpParent).select("#graph");
    var json = [];
    var index = 0;
    var opacity = 0.1;
    if (odd) {
        var opacity = 0.2;
    }
    for (var i = startDate.getTime(); i < endDate.getTime(); i = i + oneHourinMs * (Math.random() * 5)) {
        json[index] = [i, Math.floor(Math.random() * 100) + 0]
        index++;
    }

    svgContainer.append("rect").attr("x", 0).attr("y", yIndex).attr("height", 100).attr("width", identityScale(endDate.getTime())).attr("fill", "rgb(180,180,180)").attr("opacity", opacity);
    //This is the accessor function we talked about above
    var lineFunction = d3.svg.line().x(function (d) {
        return identityScale(d[0]);
    }).y(function (d) {
        return (d[1] + yIndex);
    }).interpolate("linear");
    var lineGraph = svgContainer.append("path")
        .attr("d", lineFunction(json))
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("fill", "none");

    var yScale = d3.scale.linear().domain([0, 100]).range([0, 100]);
    var xAxis = d3.svg.axis().scale(yScale).orient("left").ticks(3);

    for (var i = 0; i < json.length; i++) {
        svgContainer.append("circle").attr("cx", identityScale(json[i][0]))
            .data(json)
            .attr("cy", json[i][1] + yIndex)
            .attr("r", 5).attr("fill", color)
            .on("mouseover", function (d) {
                var date = new Date();
                date.setTime(d[0]);
                console.log("pp" + popup);
                popup.transition()
                    .duration(200)
                    .style("opacity", .9);
                popup.html(date.toDate() + "<br/>" + d[1])
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");

                // alert("valeur " +date.toDate()   + " : " + d[1]);
            });
    }
    // var xAxis = svgContainer.axis().scale(x).orient("bottom")
    var titleLegende = d3.select("#legendeSvg").select("#legend");
    titleLegende.append("rect").attr("x", 0).attr("y", yIndex).attr("height", 100).attr("width", identityScale(endDate.getTime())).attr("fill", "rgb(180,180,180)").attr("opacity", opacity)
    titleLegende.append("text").attr("x", 10).attr("y", yIndex + 50).text("Courbe").attr("class", "zoneTitle").attr("fill", color);
    titleLegende.append("g").attr("transform", "translate(150," + yIndex + ")").call(xAxis).attr("fill", color);
}

function redraw(startDate,endDate) {
    var data =[];
    var index = 0;
    for (var i = startDate.getTime(); i < endDate.getTime(); i = i + oneHourinMs * (Math.random() * 5)) {
        data[index] = [i, Math.floor(Math.random() * 100) + 0]
        index++;
    }
    // Créé la sélection initiale, et bind les données
    var circles = d3.select("svg")
        .data(data);

    // Lorsque l'on créé les nœuds, on les place directement au coordonnées
    // correctes, mais avec un rayon de 0, ce qui permettra une
    // animation des plus primesautières.
    circles.enter().append('circle')
        .attr("cx", function(d) { return identityScale(d[0]); })
        .attr("cy", function(d) { return d[1]; })
        .attr("r", 0);

    // Idem, lorsqu'une donnée n'existe plus, on fait disparaître le
    // cercle correspondant en réduisant élégamment son rayon à 0
  /*  circles.exit()
        .transition()
        .duration(750)
        .attr("r", 0)
        .remove();*/

    // Voici maintenant le traitement effectués sur les nœuds liés à
    // des données existantes. Notez que les nœuds de la sélection `enter`
    // seront également concernés ici.
/*    circles
        .attr("fill", function(d, i) {return "blue" })
        .transition()
        .duration(750)
        .attr("cx", function(d) { return identityScale(d[0]); })
        .attr("cy", function(d) { return d[1]; })
        .attr("r", "5");*/
};

function drawGraph2(svpParent, $scope, startDate, endDate, yIndex, odd, color) {
    // build service return
    var svgContainer = d3.select(svpParent).select("#graph");
    var json = [];
    var index = 0;
    var opacity = 0.1;
    if (odd) {
        var opacity = 0.2;
    }
    svgContainer.append("rect").attr("x", 0).attr("y", yIndex).attr("height", 100).attr("width", identityScale(endDate.getTime())).attr("fill", "rgb(180,180,180)").attr("opacity", opacity);
    for (var i = startDate.getTime(); i < endDate.getTime(); i = i + oneHourinMs * (Math.random() * 5)) {
        json[index] = [i, Math.floor(Math.random() * 100) + 0]
        index++;
    }



    var circles =  svgContainer.selectAll('circle').data(json);
    circles.enter()
        .append("circle")
        .attr("cx", function (d) {
            return identityScale(d[0]);
        })
        .attr("cy", function (d) {
            return (d[1] + yIndex);
        })
        .attr("r", function (d) {
            return 5;
        })
        .attr("fill", function (d) {
            return "red";
        })
        .on("mouseover", function (d) {
          console.log(d);
        });
    circles.exit()
    $scope.circles = circles;
}

function redrawCircle(){

}