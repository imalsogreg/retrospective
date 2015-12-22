/* Number of trials by type */
var trialT1 = 2;
var trialT2 = 4;
var trialT3 = 4;
var trialT4 = 4;
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

/* Define geometric shapes */

function DrawTriangleUp(el,color,bkncolor,ro,lo){
    /* Determine the window's dimensions to size the triangle */
    var winWidth = window.innerWidth;
    var winHeight = window.innerHeight;
    var sidebd = Math.round(0.20*winWidth) + "px";
    var botbd = Math.round(0.40*winHeight) + "px";

    el.style.border = "initial";
    el.style.borderRadius = "0";
    el.style.width = "0";
    el.style.height = "0";
    el.style.borderLeft = "solid transparent";
    el.style.borderLeftWidth = sidebd;
    el.style.borderRight = "solid transparent";
    el.style.borderRightWidth = sidebd;
    el.style.borderTop = "0";
    el.style.borderBottomStyle = "solid";
    el.style.borderBottomColor = color;
    el.style.borderBottomWidth = botbd;
    el.style.display = "block";
    el.style.backgroundColor = bkncolor;
    el.style.top = "30%";
    el.style.left = lo;
    el.style.right = ro;
};

function DrawTriangleDn(el,color,bkncolor,ro,lo){
    /* Determine the window's dimensions to size the triangle */
    var winWidth = window.innerWidth;
    var winHeight = window.innerHeight;
    var sidebd = Math.round(0.20*winWidth) + "px";
    var topbd = Math.round(0.40*winHeight) + "px";

    el.style.border = "initial";
    el.style.borderRadius = "0";
    el.style.width = "0";
    el.style.height = "0";
    el.style.borderLeft = "solid transparent";
    el.style.borderLeftWidth = sidebd;
    el.style.borderRight = "solid transparent";
    el.style.borderRightWidth = sidebd;
    el.style.borderTopStyle = "solid ";
    el.style.borderTopColor = color;
    el.style.borderTopWidth = topbd;
    el.style.borderBottom = "0";
    el.style.display = "block";
    el.style.backgroundColor = bkncolor;
    el.style.top = "30%";
    el.style.left = lo;
    el.style.right = ro;
};

function DrawTrapezoid(el,color,bkncolor,ro,lo){
    /* Determine the window's dimensions to size the trapezoid */
    var winWidth = window.innerWidth;
    var winHeight = window.innerHeight;
    var sidebd = Math.round(0.10*winWidth) + "px";
    var elwidth = Math.round(0.20*winWidth) + "px";
    var botbd = Math.round(0.40*winHeight) + "px";

    el.style.border = "initial";
    el.style.borderRadius = "0";
    el.style.width = elwidth;
    el.style.height = "0";
    el.style.borderLeft = "solid transparent";
    el.style.borderLeftWidth = sidebd;
    el.style.borderRight = "solid transparent";
    el.style.borderRightWidth = sidebd;
    el.style.borderTop = "0";
    el.style.borderBottomStyle = "solid ";
    el.style.borderBottomWidth = botbd;
    el.style.borderBottomColor = color;
    el.style.display = "block";
    el.style.backgroundColor = bkncolor;
    el.style.top = "30%";
    el.style.left = lo;
    el.style.right = ro;
};

function DrawRectangle(el,color,ro,lo){
    /* Determine the window's dimensions to size the rectangle */
    var winWidth = window.innerWidth;
    var winHeight = window.innerHeight;
    var elwidth = Math.round(0.40*winWidth) + "px";
    var elheight = Math.round(0.40*winHeight) + "px";

    el.style.border = "initial";
    el.style.borderRadius = "0";
    el.style.width = elwidth;
    el.style.height = elheight;
    el.style.borderLeft = "0";
    el.style.borderRight = "0";
    el.style.borderTop = "0";
    el.style.borderBottom = "0";
    el.style.display = "block";
    el.style.backgroundColor = color;
    el.style.top = "30%";
    el.style.left = lo;
    el.style.right = ro;
};

function DrawSquare(el,color,ro,lo){
    /* Determine the window's dimensions to size the square */
    var winWidth = window.innerWidth;
    var winHeight = window.innerHeight;
    var elwidth = Math.round(0.35*winWidth) + "px";
    var topDist = Math.round((winHeight-elwidth)/2) + "px";

    el.style.border = "initial";
    el.style.borderRadius = "0";
    el.style.width = elwidth;
    el.style.height = elwidth;
    el.style.borderLeft = "0";
    el.style.borderRight = "0";
    el.style.borderTop = "0";
    el.style.borderBottom = "0";
    el.style.display = "block";
    el.style.backgroundColor = color;
    el.style.top = "30%";
    el.style.left = lo;
    el.style.right = ro;
};

function DrawCircle(el,color,ro,lo){
    /* Determine the window's dimensions to size the circle */
    var winWidth = window.innerWidth;
    var winHeight = window.innerHeight;
    var elwidth = Math.round(0.35*winWidth) + "px";
    var topDist = Math.round((winHeight-elwidth)/2) + "px";
    el.style.border = "initial";
    el.style.borderRadius = "50%";
    el.style.width = elwidth;
    el.style.height = elwidth;
    el.style.borderLeft = "0";
    el.style.borderRight = "0";
    el.style.borderTop = "0";
    el.style.borderBottom = "0";
    el.style.display = "block";
    el.style.backgroundColor = color;
    el.style.top = "30%";
    el.style.left = lo;
    el.style.right = ro;
};

function whichColor(el){
    var topColor = el.style.borderTopColor;
    var botColor = el.style.borderBottomColor;
    var bknColor = el.style.backgroundColor;

    if (topColor===botColor){
        return bknColor;
    }
    else {
        if (topColor==="initial"){
            return botColor;
        }
        else {
            return topColor;
        }
    }
};

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

    var payoutim = document.getElementById("Payout");
    var messp = document.getElementById("inst_message");

    if (counter[8] < maxTrials) {

        /* make state screen visible*/
        statediv.style.display = "block";
        statediv.style.width = "100%";
        statediv.style.height = "100%";
        statediv.style.top = "0px";
        statediv.style.left = "0px";
        /* make payout screen NOT visible*/
        paydiv.style.display = "none";
        paydiv.style.width = "100%";
        paydiv.style.height = "100%";
        paydiv.style.top = "0px";
        paydiv.style.left = "0px";

        /* determine what to display depending in trial type*/
        if (counter[8] < trialT1) {
            DrawTriangleUp(rightdiv,"#003300","black","5%","55%");
            DrawTriangleDn(leftdiv,"#990000","black","55%","5%");

            statediv.style.backgroundColor = "black";
        }
        else if (counter[8] < trialT1+trialT2){
            DrawTriangleUp(rightdiv,"#003300","black","5%","55%");
            DrawTriangleDn(leftdiv,"#990000","black","55%","5%");

            statediv.style.backgroundColor = "black";
        }
        else if (counter[8] < trialT1+trialT2+trialT3){
            DrawSquare(rightdiv,"#9900ff","7.5%","57.5%");
            DrawCircle(leftdiv,"#ff6600","57.5%","7.5%");

            statediv.style.backgroundColor = "#003300";
        }
        else {
            DrawTrapezoid(rightdiv,"#606060","#990000","5%","55%");
            DrawRectangle(leftdiv,"#3333FF","55%","5%");
            statediv.style.backgroundColor = "#990000";
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
        var selected = document.getElementById(id);
        var newcolor = whichColor(selected);
        selected.style.backgroundColor = newcolor;

        /*$(this).animate({
            width: "100%",
            height: "100%",
            left: "0px",
            top: "0px",
            borderRadius:"0px",
        },500);*/

        selected.style.width = "100%";
        selected.style.height = "100%";
        selected.style.left = "0px";
        selected.style.top = "0px";
        selected.style.borderRadius = "0px";

        $(this).siblings().css("display","none");

        var paydiv = document.getElementById("outcomescreen");
        var payimg = document.getElementById("Payout");
        var statediv = document.getElementById("statescreen");

        statediv.style.display = "none";

        if (active) {

            if (counter[8] < trialT1){
                if (id==='right_A') {
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
                paydiv.style.backgroundColor = newcolor;
                paydiv.style.height  = "100%";
                if (id==='right_A') {
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
                paydiv.style.backgroundColor = newcolor;
                if (id==='right_A') {
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
                paydiv.style.backgroundColor = newcolor;
                 if (id==='right_A') {
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
