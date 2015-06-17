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
var height = "2500";
function drawPancarte(){
    var startDate = new Date()
    var endDate = new Date();
    startDate.setDate(startDate.getDate() - nbPreviousDay);
    endDate.setDate(endDate.getDate() + nbNextDay);

    drawHours(startDate, endDate );
    drawNowBar(startDate);
    attachPancarteHandler();
}

function drawNowBar(startDate){
    var now = new Date();
    var delta = now.getTime() -  startDate.getTime();
    $("#contentSvg").append(createLineElement(delta * oneMsInPx,0,delta * oneMsInPx,height,2,"red"));

    console.log($("#rightPanel").width);
}

function drawHours(startDate,endDate) {
    var nbItem = 0;
    for (var i = startDate.getTime(); i < endDate.getTime(); i = i + oneHourinMs *2) {
        nbItem++;
        var currentTime = new Date();
        currentTime.setTime(i);
        $("#contentSvg").append(createTextElement((nbItem * oneHourInPx * 2), 10, "grey", "grey", currentTime.toHHMM()));
        console.log(nbItem);
    }
}