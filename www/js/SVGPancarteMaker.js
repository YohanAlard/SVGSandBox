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
var arrayIndex = 0;
var ratioDown = 0.9;
var ratioUp = 1.1;
function drawPancarte($scope) {
    var startDate = new Date();
    var endDate = new Date();
    startDate.clearAfterMinutes();
    endDate.clearAfterMinutes();
    startDate.setDate(startDate.getDate() - nbPreviousDay);
    endDate.setDate(endDate.getDate() + nbNextDay);
    drawHours($scope, startDate, endDate);
    drawNowBar(startDate);
    attachPancarteHandler();
}

function drawNowBar(startDate) {
    //now RED LINE
    var nowElementObject = new Object();
    var now = new Date();
    var delta = now.getTime() - startDate.getTime();
    nowElementObject.redLine = createLineElement(delta * oneMsInPx, 0, delta * oneMsInPx, height, 2, "red");
    $("#contentSvg").append(nowElementObject.redLine);
    console.log($("#rightPanel").width);
    //on going period
    nowLessOneHour = new Date();
    nowLessOneHour.clearAfterMinutes();
    var x = nowLessOneHour.getTime() - startDate.getTime();
    nowElementObject.nowPeriod = createRectElement(x * oneMsInPx + 15, 0, 2 * oneHourInPx, height, 2, "#B4CFEC", "#B4CFEC", 0.2);
    $("#contentSvg").append(nowElementObject.nowPeriod);
 //   $scope.nowElement = nowElementObject;

}

function drawHours($scope, startDate, endDate) {
    var nbItem = 0;
    $scope.hours = [];

    for (var i = startDate.getTime(); i < endDate.getTime(); i = i + oneHourinMs * 2) {
        nbItem++;
        var currentTime = new Date();
        currentTime.setTime(i);
        //draw hour text
        var hoursSvg = new Object();
        hoursSvg.hours = createTextElement((nbItem * oneHourInPx * 2), 10, "grey", "grey", currentTime.toHHMM());
        $("#contentSvg").append(hoursSvg.hours);
        console.log(nbItem);
        //draw grid
        hoursSvg.lines = createLineElement(((nbItem * oneHourInPx * 2) + 15), 20, ((nbItem * oneHourInPx * 2) + 15), height, 1, "grey");
        $("#contentSvg").append(hoursSvg.lines);
        $scope.hours[arrayIndex] = hoursSvg;
        console.log("arrayIndex " + arrayIndex + " " + $scope.hours[arrayIndex]);
        arrayIndex++;
    }
}