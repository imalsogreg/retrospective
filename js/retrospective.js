var main = function(){

  function cout(val,id) {
    var counter = document.getElementById(id).value;
    var new_counter = counter + val;
    document.getElementById(id).value = new_counter;
    return new_counter;
  }

  $('#right').click(function() {
    $('#right').css('width','100%');
    $('#right').css('height','100%');
    $('#right').animate({left:"0px",top:"0px"},0);
    $(".fractal").css('margin-left','650px')

    $("#left").css("display","none");
  });

  $('#left').click(function() {
    $('#left').css('width','100%');
    $('#left').css('height','100%');
    $('#left').animate({left:"0px",top:"0px"},0);
    $(".fractal").css('margin-left','650px');

    $("#right").css("display","none");
  });

  /*for (var trials=1; trials<15; trials++) {

    /* 1) make instructions visible
       2) update counter depending on which object was clicked
       3) display choice for 2 seconds
       4) reset choices in screen
    
  };
  */
}

function clickHandler() {
    console.log('Ok, good choice');
    setTimeout( advanceTrial, 2000 ); // Success advance
}

function starttrial() {
    var timeoutTimer = setTimeout( timeoutHandler, 2000 ); // Trial time-out
    setupTrialStuff();
}

$(document).ready(main);

var state = "trialstarted"

clickhandler = function(){
    if (state == "trialstarted")
        advancetrial();
    elseif (state == "intro"){
        return ();
    } elseif (state == "trialfinished"){
        return ();
    }
}

// State machine "trialfinished" -> "trialstarted"
function advancetrial() {
    trialIndex++;
    payouts = lookupPayoutSchedule(trialIndex);
    state = "trialstarted";
}

// State machine what to do with clicks at different states
timeoutHandler = function() {
    if (state == "trialstarted"){
        advancetrial;
    } elseif (state=="intro") {
        console.log('impossible case');
    } elseif (state="trialfinished"){
        return ();
    }

}

/*

 1. Trial started (waiting for click)

 2. Person clicked (Saying "Good job")

 3. Intro screen

 */
