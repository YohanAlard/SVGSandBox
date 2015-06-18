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
        return this.toLocaleTimeString().substring(0,5);
}

Date.prototype.clearAfterMinutes = function () {
    //    console.log(" toLocaleTimeString " + this.toLocaleTimeString().substring(0,5));
         this.setSeconds(0);
         this.setMinutes(0);
         this.setMilliseconds(0);
}