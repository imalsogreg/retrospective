/* Number of trials by type */
var trialT1 = 2;
var trialT2 = 2;
var trialT3 = 2;
var trialT4 = 2;
var maxTrials = trialT1+trialT2+trialT3+trialT4;

var click_time = 0;                  /* Timestamp click events */
var TrialStartTime = 0;              /* Timestamp new trial events */
var MsgStartTime = 0;                /* Timestamp instruction display */
var blockN = 0;                      /* Indexes block number */

/* Keep track of selections and number of trials. Elements 0,2,4,6 track selections to the right-side options. Elements 1,3,5,7 track selections to the left-side options. Element 8 tracks overall number of trials*/
var counter = Array(9).fill(0);
var Telapsed = [Array(maxTrials).fill(0), Array(maxTrials).fill(0)];    /*Keep track of timing between trial start and selection*/
var instTime = Array(4).fill(0);    /*Track time from instruction presentation to trial start*/
var payoutsch = [0,0,0.10,0.25,0.25,1,5,10];    /* Payout schedule*/

var active = true;                /* Controls when clicking is available */
var newblock = true;              /* Controls whether to display instructions*/



/*This function determines what messages to display on each trial*/
function displayMessage(){
    document.getElementById("statescreen").style.display="none";
    document.getElementById("right_A").style.display="none";
    document.getElementById("left_A").style.display="none";
    document.getElementById("outcomescreen").style.display="none";

    var msgstr = "Over the next ";
    var msgx = "0px";
    var msgy = "0px";
    var msgwidth = "100%";
    var msgheight = "100%";
    var msgdisp = "none";
    var instruct = "";
    var instcolor = "black";

    if (counter[8] < trialT1) {
        if (counter[0]===0 && counter[1]===0){
            instruct = msgstr.concat(trialT1.toString()," trials you will be presented with two choices, one on each side of the screen. <br> Please, select one of them. <br> <br>Your selection will then be hightlighted for two seconds. <br> <br>Touch the screen to start");
            msgdisp = "block";
            instcolor = "black";
        }
        else {
            instruct = "";
            msgdisp = "none";
        }
    }

    else {

        if (counter[2]===0 && counter[3]===0) {
            var ntrials = trialT2.toString();
            instcolor = "black";
        }
        else if (counter[4]===0 && counter[5]===0) {
            var ntrials = trialT3.toString();
            instcolor = "#003300";
        }
        else if (counter[6]===0 && counter[7]===0) {
            var ntrials = trialT4.toString();
            instcolor = "#990000";
        }
        else {
            msgstr = "";
        }

        if (msgstr.length>0) {

        instruct = msgstr.concat(ntrials," trials you will be presented with two choices, one on each side of the screen. <br>Please, select one of them. <br> Each choice is associated with monetary reward. <br> Your selection and the corresponding reward will be hightlighted for two seconds. <br> Touch the screen to start");
            msgdisp = "block";
        }

        else {
            msgdisp = "none";
        }
    }
    var instdiv = document.getElementById("instruction");
    var messp = document.getElementById("inst_message");

    messp.innerHTML = instruct;
    instdiv.style.display = msgdisp;
    instdiv.style.left = msgx;
    instdiv.style.top = msgy;
    instdiv.style.width = msgwidth;
    instdiv.style.height = msgheight;
    instdiv.style.backgroundColor = instcolor;

    newblock = false;

    MsgStartTime = new Date().getTime();
};

function setUpTrial(rightid,leftid) {

    /* identify elements used to display choices */
    var rightdiv = document.getElementById(rightid);
    var leftdiv = document.getElementById(leftid);
    var statediv = document.getElementById("statescreen");
    var paydiv = document.getElementById("outcomescreen");
    var instdiv = document.getElementById("instruction");

    var rightim = document.getElementById("right_img");
    var leftim = document.getElementById("left_img");
    var stateim = document.getElementById("State");
    var payoutim = document.getElementById("Payout");
    var messp = document.getElementById("inst_message");

    if (counter[8] < maxTrials) {
        /* format choice on right side*/
        rightdiv.style.width = "40%";
        rightdiv.style.height = "50%";
        rightdiv.style.right = "5%";
        rightdiv.style.top = "25%";
        rightdiv.style.display = "block";
        rightdiv.style.left = "";
        rightdiv.style.borderRadius = "50%";
        /* format choice on left side*/
        leftdiv.style.width = "40%";
        leftdiv.style.height = "40%";
        leftdiv.style.left = "5%";
        leftdiv.style.top = "30%";
        leftdiv.style.display = "block";
        leftdiv.style.borderRadius = "10px";

        /* make state screen visible*/
        statediv.style.display = "block";
        statediv.style.width = "100%";
        statediv.style.height = "100%";
        statediv.style.top = "0%";
        /* make payout screen NOT visible*/
        paydiv.style.display = "none";
        paydiv.style.width = "100%";
        paydiv.style.height = "100%";

        /* format fractal images*/
        leftim.style.width = "60%";
        leftim.style.height = "60%";
        leftim.style.left = "20%";
        leftim.style.top = "15%";
        /*leftim.style.display = "block";*/

        rightim.style.width = "60%";
        rightim.style.height = "60%";
        rightim.style.left = "20%";
        rightim.style.top = "15%";
        /*rightim.style.display = "block";*/

        /* determine what to display depending in trial type*/
        if (counter[8] < trialT1) {
            leftim.src = "img/fractal1hr.jpg";
            rightim.src = "img/fractal2hr.jpg";

            leftdiv.style.backgroundColor = "#990000";
            rightdiv.style.backgroudColor = "#003300";

            statediv.style.backgroundColor = "black";
            stateim.style.display = "none";
        }
        else if (counter[8] < trialT1+trialT2){
            leftim.src = "img/fractal1hr.jpg";
            rightim.src = "img/fractal2hr.jpg";

            leftdiv.style.backgroundColor = "#990000";
            rightdiv.style.backgroudColor = "#003300";

            statediv.style.backgroundColor = "black";
            stateim.style.display = "none";
        }
        else if (counter[8] < trialT1+trialT2+trialT3){
            leftim.src = "img/fractal3hr.jpg";
            rightim.src = "img/fractal4hr.jpg";

            leftdiv.style.backgroundColor = "#ff6600";
            rightdiv.style.backgroundColor = "#9900ff";

            statediv.style.backgroundColor = "#003300";
            stateim.src = "img/fractal2hr.jpg";
            /*stateim.style.display = "block";*/
        }
        else {
            leftim.src = "img/fractal5hr.jpg";
            rightim.src = "img/fractal6hr.jpg";

            leftdiv.style.backgroundColor = "#3333FF";
            rightdiv.style.backgroundColor = "#606060";

            statediv.style.backgroundColor = "#990000";
            stateim.src = "img/fractal1hr.jpg";
            /*stateim.style.display = "block";*/
        }
    }
    else {
        statediv.style.display = "none";
        paydiv.style.display ="none";

        rightdiv.style.display = "none";
        leftdiv.style.display = "none";

        instdiv.style.display = "block";
        instdiv.style.height = "100%";
        instdiv.style.backgroundColor = "black";

        var total = 0;
        for (var k=2;k<8;k++) {
            total += payoutsch[k]*counter[k];
        };

        messp.style.fontSize = "4em";
        var goodbyemssg = "Thank you for playing! ";
        messp.innerHTML = goodbyemssg.concat("<br>Today you earned $ ", total.toString());
    }
    TrialStartTime = new Date().getTime();
    active = true;
};

var main = function(){

    $('.mess_div').click(function(){
        click_time = new Date().getTime();
        $(this).css("display","none");
        setUpTrial("right_A","left_A");
        instTime[blockN] = click_time-MsgStartTime;
    });

    $('.sel_box').click(function() {
        click_time = new Date().getTime();
        var ii = 0;

        var id = $(this).attr("id");
        document.getElementById(id).style.width = "100%";
        document.getElementById(id).style.height = "100%";
        document.getElementById(id).style.left = "0px";
        document.getElementById(id).style.top = "0px";
        document.getElementById(id).style.borderRadius = "0px";

        $(this).siblings().css("display","none");

        var pix = document.getElementsByClassName("fractal");
        pix[0].style.width = "25%";
        pix[0].style.height = "25%";
        pix[0].style.left = "50%";
        pix[0].style.top = "5%";

        pix[1].style.width = "25%";
        pix[1].style.height = "25%";
        pix[1].style.left = "50%";
        pix[1].style.top = "5%";

        var paydiv = document.getElementById("outcomescreen");
        var payimg = document.getElementById("Payout");
        var statediv = document.getElementById("statescreen");

        var selectioncolor = document.getElementById(id).style.backgroundColor;

        statediv.style.display = "none";

        if (active) {

            if (counter[8] < trialT1){
                if (id==='left_A') {
                    counter[0]++;
                    ii = 1;
                }
                else {
                    counter[1]++;
                    ii = 0;
                }
            }

            else if (counter[8] < trialT1+trialT2) {
                paydiv.style.display = "block";
                paydiv.style.backgroundColor = selectioncolor;
                paydiv.style.height  = "70%";
                if (id==='left_A') {
                    counter[2]++;
                    ii = 1;
                    payimg.src = "img/penny.jpg";
                }
                else {
                    counter[3]++;
                    ii = 0;
                    payimg.src = "img/quarter.jpg";
                }
            }
            else if (counter[8] < trialT1+trialT2+trialT3) {
                paydiv.style.display = "block";
                paydiv.style.backgroundColor = selectioncolor;
                if (id==='left_A') {
                    counter[4]++;
                    ii = 1;
                    payimg.src = "img/quarter.jpg";
                }
                else {
                    counter[5]++;
                    ii = 0;
                    payimg.src = "img/dollarbill.jpg";
                }
            }
            else if (counter[8] < maxTrials) {
                paydiv.style.display = "block";
                paydiv.style.backgroundColor = selectioncolor;
                 if (id==='left_A') {
                     counter[6]++;
                     ii = 1;
                    payimg.src = "img/fivedollarbill.jpg";
                }
                else {
                    counter[7]++;
                    ii = 0;
                    payimg.src = "img/tendollarbill.jpg";
                }
            }

            counter[8]++;
            /* Save timing between trial start and choice selection */
            Telapsed[ii][counter[8]-1] = (click_time - TrialStartTime);
            /* Disable clicking */
            active = false;

            if (counter[8]===trialT1 || counter[8]===trialT1+trialT2 || counter[8]===trialT1+trialT2+trialT3) {
                newblock = true;
                blockN++;
                /* Display choice for 2 sec and start a new block of trials */
                setTimeout(function(){displayMessage()},2000);
            }
            else{
                /* Display choice for 2 sec and start new trial within current block */
                setTimeout(function(){setUpTrial("right_A","left_A")}, 2000);
            }
        }
        else {
            return;
        }

    });
    displayMessage();
};

$(document).ready(main);
