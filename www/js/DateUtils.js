/**
 * Created by axjvt on 17/06/2015.
 */
function clearHourMinuteSecondMillisecond(date){
        console.log(date);
}

Date.prototype.toHHMMSS = function () {
        return this.toLocaleTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
}

Date.prototype.toHHMM = function () {
    //    console.log(" toLocaleTimeString " + this.toLocaleTimeString().substring(0,5));
        //return this.toLocaleTimeString().substring(0,5);
    var format = d3.time.format("%H:%M");
    return format(this);
}

Date.prototype.toDate = function () {
    //    console.log(" toLocaleTimeString " + this.toLocaleTimeString().substring(0,5));
    //return this.toLocaleTimeString().substring(0,5);
    var format = d3.time.format("%d-%m-%Y %H:%M");
    return format(this);
}
Date.prototype.clearAfterMinutes = function () {
    //    console.log(" toLocaleTimeString " + this.toLocaleTimeString().substring(0,5));
         this.setSeconds(0);
         this.setMinutes(0);
         this.setMilliseconds(0);

}