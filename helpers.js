
function getTimeTypeValue(timeType){
            
    switch(timeType) {
        
        case 'seconds':
            timeTypeVal = sec;
            break;
        
        case 'minutes':
            timeTypeVal = minutes;
            break;
        
        case 'hours':
            timeTypeVal = hours;
            break;

    }

    return timeTypeVal;
}


function in_minutes(min_count){

    return min_count * minutes;

}