// Get Document and set time
$(document).ready(function () {
  var now = moment().format("dddd, MMMM Do");
  var time = moment().format("HH");
  $("#currentDay").append(now);

  // Add array for addEvent on the scheduler
  var addEvent = ["", "", "", "", "", "", "", ""];
  // Access container div from HTML
  var container = $(".container");

  //    Set up local.storage and save per event added to scheduler
  if (localStorage.getItem("addEvent")) {
    addEvent = JSON.parse(localStorage.getItem("addEvent"));
  }
  function save(event) {
    var id = event.target.id;
    var text = $("#" + id + "textarea").val();
    addEvent[id] = text;
    localStorage.setItem("addEvent", JSON.stringify(addEvent));
  }

  //   Change colors depending on time of day
  for (var i = 0; i < 8; i++) {
    var colors;
    if (time == i + 9) {
      colors = "present";
    } else if (time < i + 9) {
      colors = "future";
    } else {
      colors = "past";
    }

    //   Have time show AM/PM
    function timeAMPM(hour) {
      if (hour > 12) {
        var timeText = hour - 12;
        return timeText + "pm";
      } else {
        return hour + "am";
      }
    }

    //   Create Rows and Columms
    var rowDiv = $('<div class="row time-block"/>');

    var col1 = $('<div class="col hour"></div>');
    col1.text(timeAMPM(i + 9));

    var col2 = $('<div class="col-6"></div>');
    var textarea = $('<textarea class="form-control textarea"></textarea>');
    textarea.attr("id", i + "textarea");
    textarea.val(addEvent[i]);
    textarea.addClass(colors);
    col2.append(textarea);

    var col3 = $('<div class="col"></div>');
    var saveButton = $(
      '<button type="button" class="btn col-md-10 saveBtn fas fa-save"></button'
    );
    saveButton.attr("id", i);
    saveButton.click(function (event) {
      save(event);
    });
    col3.append(saveButton);

    container.append(rowDiv);
    rowDiv.append(col1, col2, col3);
  }
});
