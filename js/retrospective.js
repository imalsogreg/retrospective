var state = "NewTrial";              /*Keep track of trial type*/
var click_time = 0;                  /*Timestamp click events*/
var start_time = 0;                  /*Timestamp new trial events*/
/*Keep track of selections and number of trials. Elements 0,2,4,6 track selections to the right-side options. Elements 1,3,5,7 track selections to the left-side options. Element 8 tracks overall number of trials*/
var counter = [0,0,0,0,0,0,0,0,0];   /*Count selections and trials*/

var Trial_type1 = 5;
var Trial_type2 = 5;
var Trial_type3 = 2;
var Trial_type4 = 2;

var maxTrials = Trial_type1+Trial_type2+Trial_type3+Trial_type4;

function setUpTrial(rightid,leftid) {

    /*function to sum 2 elements of counter array*/
    sumtrials = function(ix1,ix2) {
        return [counter[ix1],counter[ix2]].reduce((a,b) =>a+b);
    };


    /* Identify type of trial */
    if (counter[8] < maxTrials) {

        state = "NewTrial";
        /* display choices */
        document.getElementById(rightid).style.width = "750px";
        document.getElementById(rightid).style.height = "500px";
        document.getElementById(rightid).style.right = "25px";
        document.getElementById(rightid).style.top = "200px";
        document.getElementById(rightid).style.display = "block";
        document.getElementById(rightid).style.left = "";
        document.getElementById(rightid).className = "sel_box";
        
        document.getElementById(leftid).style.width = "750px";
        document.getElementById(leftid).style.height = "500px";
        document.getElementById(leftid).style.left = "25px";
        document.getElementById(leftid).style.top = "200px";
        document.getElementById(leftid).style.display = "block";
        document.getElementById(leftid).className = "sel_box";
        
        document.getElementById("background").style.color = "black";
        document.getElementById("background").style.display = "block";
        
        document.getElementById("instruction").style.display = "block";
        document.getElementById("inst_message").style.display = "block";

        if (counter[8] < Trial_type1) {

            document.getElementById("left_img").src = "../img/fractal1.jpg";
            document.getElementById("right_img").src = "../img/fractal2.png";
        }
        else if (counter[8] < Trial_type2){

            document.getElementById("left_img").src = "../img/fractal1.jpg";
            document.getElementById("right_img").src = "../img/fractal2.png";
        }
        else if (counter[8] < Trial_type3){

            document.getElementById("left_img").src = "../img/fractal3.png"
            document.getElementById("right_img").src = "../img/fractal4.jpg"
        }
        else if (counter[8] < Trial_type4){

            document.getElementById("left_img").src = "../img/fractal5.jpg";
            document.getElementById("right_img").src = "../img/fractal6.jpg";
        }

    };

    var timing = new Date().getTime();
    console.log("Ready to go! Time stamp is " + timing + " ms");
    console.log(state);
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

    $('.sel_box').click(function() {
        click_time = new Date().getTime();

        var id = $(this).attr("id");
        var y;
        document.getElementById(id).width = "100%";
        document.getElementById(id).height = "100%";
        document.getElementById(id).left = "0px";
        document.getElementById(id).top = "0px";
        document.getElementById(id).className = "";

        $(this).siblings().css("display","none");
        $(this).css('width','100%');
        $(this).css('height','100%');
        $(this).animate({left:"0px",top:"0px"},0);
        $(".fractal").css('margin-left','650px')

        if (counter[8] < Trial_type1){
            if (id==='left_A') {
                counter[0]++;
            }
            else {
                counter[1]++;
            }
        }
        else if (counter[8] < Trial_type1+Trial_type2) {
            if (id==='left_A') {
                counter[2]++;
            }
            else {
                counter[3]++;
            }
        }
        else if (counter[8] < Trial_type1+Trial_type2+Trial_type3) {
            if (id==='left_A') {
                counter[4]++;
            }
            else {
                counter[5]++;
            }
        }
        else if (counter[8] < max) {
            if (id==='left_A') {
                counter[6]++;
            }
            else {
                counter[7]++;
            }
        }

        counter[8]++;
        var telapsed = click_time - start_time;

        console.log("Selected " + id + ". Summary of slections and trials " + counter + ". Elapsed time between trial start and slection was  " + telapsed + " ms");

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

$(document).ready(main);


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
