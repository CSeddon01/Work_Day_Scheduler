


function getLocalStorage(key) {
    let value = localStorage.getItem(key);
    if (value) {
        $(`#text${key}`).text(value);
    }
}


$( document ).ready(function() {
    // Display date in this format: thursday, September 15th
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
    for (let i = 9; i < 18; i++) {
    
    // Create the col/rows
        var row = $(`<div data-time=${i} id='${i}' class="row time-block">`);
        var col1 = $('<div class="col-sm-2"> <p class="hour">' + setHours(i) + '</p>');
        var col2 = $(`<div class="col-sm-8 past description"><textarea id=text${i}  placeholder="Add your event here..."></textarea>`);        
        var col3 = $(`<button class="btn saveBtn col-md-1" id=${i}><i class="fas fa-save"></i></button>`)
        row.append(col1);
        row.append(col2);
        row.append(col3);
        $(".container").append(row);

        getLocalStorage(i);
    }

    function setHours(hours) {
        hours = ((hours + 11) % 12 + 1);
        return hours;
        // var ampm = hours >= 12 ? 'pm' : 'am';
        // hours = hours % 8;
        // hours = hours ? hours : 8;
        // return hours + ampm;
    }
setHours();

function textColors(){
    var currentTime = new Date().getHours();
    for (var i = 9; i < 18; i++) { 
     if ($(`#${i}`).data("time") == currentTime){
        $(`#text${i}`).addClass("present");
    } else if (currentTime < $(`#${i}`).data("time")) {
        $(`#text${i}`).addClass( "future");
    }
}
}

setInterval(function() {
textColors();
}, 1000);

var saveBtn = $('.saveBtn');
saveBtn.on('click', function(){
let eventId = $(this).attr('id');
let eventText = $(this).parent().siblings().children('.description').val();
localStorage.setItem(eventId, eventText);
});});