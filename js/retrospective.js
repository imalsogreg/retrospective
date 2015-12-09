var state = "NewTrial";
var click_time = 0;
var start_time = 0;

function setUpTrial(idRight,idLeft) {
    /* label state as a new trial*/
    state = "NewTrial";
    /* display choices */
    document.getElementById(idRight).width = "750px";
    document.getElementById(idRight).height = "500px";
    document.getElementById(idRight).right = "25px";
    document.getElementById(idRight).top = "200px";
    document.getElementById(idRight).display = "block";

    document.getElementById(idLeft).width = "750px";
    document.getElementById(idLeft).height = "500px";
    document.getElementById(idLeft).left = "25px";
    document.getElementById(idLeft).top = "200px";
    document.getElementById(idLeft).display = "block";

    var timing = new Date().getTime();
    console.log("Ready to go! Time elapsed is " + timing + " ms");
    console.log(state);
    console.log(idRight);
    return timing;
};

function advanceTrial() {
    var trialIndex = 0;
    /*payouts = lookupPayoutSchedule(trialIndex);*/
        var state = "trialstarted";
};

function starttrial() {
    var timeoutTimer = setTimeout( timeoutHandler, 2000 ); // Trial time-out
   /* setupTrialStuff();*/
};


var main = function(){

    /* This function updates counter */
    function count(val,id) {
        var counter = document.getElementById(id).value;
        var new_counter = parseInt(counter,10) + val;
        document.getElementById(id).value = new_counter;
        return new_counter;
    };

    /* This function formats elements on the page after the user clicks on a choice*/
    $('.sel_box').click(function() {
        click_time = new Date().getTime();

        var id = $(this).attr("id");
        var y;
        $(this).siblings().css("display","none");
        $(this).css('width','100%');
        $(this).css('height','100%');
        $(this).animate({left:"0px",top:"0px"},0);
        $(".fractal").css('margin-left','650px')

        switch (id){
        case 'left_A':
            y = count(1,"countLeft_A");
            break;
        case 'right_A':
            y = count(1,"countRight_A")
            break;
        case 'left_B':
            y = count(1,"countLeft_B");
            break;
        case 'right_B':
            y = count(1,"countRight_B");
            break;
        case 'left_C':
            y = count(1,"countLeft_C");
            break;
        case 'right_C':
            y = count(1,"countRight_C");
            break;
        case 'left_D':
            y = count(1,"countLeft_D");
            break;
        case 'right_D':
            y = count(1,"countRight_D");
            break;
        default:
            return;
        }
        var z = count(1,"overallTrialCount");
        var telapsed = click_time - start_time;

        console.log("Selected " + id + " " + y + " times in " + z + " Trials. It took " + telapsed + " ms");

        setTimeout(function(){setUpTrial("right_A","left_A")}, 2000); /* After selection, display choice for 2 sec and start new trial*/

    });

  /*for (var trials=1; trials<15; trials++) {

    /* 1) make instructions visible
       2) update counter depending on which object was clicked
       3) display choice for 2 seconds
       4) reset choices in screen
    
  };
  */
    start_time = setUpTrial("right_A","left_A");
};

/*function clickHandler() {
    console.log('Ok, good choice');
    setTimeout( advanceTrial, 2000 ); // Success advance
}*/



$(document).ready(main);


function advanceTrial() {
    var trialIndex = 0;
    /*payouts = lookupPayoutSchedule(trialIndex);*/
        var state = "trialstarted";
};

var state = "trialstarted"

clickhandler = function(){
    if (state == "trialstarted")
        advancetrial();
    else if (state == "intro"){
        return;
    }
    else if (state == "trialfinished"){
        return;
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
    if (state === "trialstarted") {
        advancetrial();
    }
    else if (state==="intro") {
        console.log('impossible case');
    }
    else if (state==="trialfinished"){
        return;
    }

}

/*

 1. Trial started (waiting for click)

 2. Person clicked (Saying "Good job")

 3. Intro screen

 */
