var click_time = 0;                  /* Timestamp click events*/
var start_time = 0;                  /* Timestamp new trial events*/
/* Keep track of selections and number of trials. Elements 0,2,4,6 track selections to the right-side options. Elements 1,3,5,7 track selections to the left-side options. Element 8 tracks overall number of trials*/
var counter = [0,0,0,0,0,0,0,0,0];   /* Count selections and trials*/
var Telapsed = [];                   /* Keep track of timing between trial start and selection*/
var payoutsch = [0,0,0.10,0.25,0.25,1,5,10];    /* Payout schedule*/

var active = true;                /* Control when clicking is available */

var Trial_type1 = 5;
var Trial_type2 = 5;
var Trial_type3 = 5;
var Trial_type4 = 5;

var maxTrials = Trial_type1+Trial_type2+Trial_type3+Trial_type4;

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
        rightdiv.style.height = "40%";
        rightdiv.style.right = "5%";
        rightdiv.style.top = "30%";
        rightdiv.style.display = "block";
        rightdiv.style.left = "";
        /* format choice on left side*/
        leftdiv.style.width = "40%";
        leftdiv.style.height = "40%";
        leftdiv.style.left = "5%";
        leftdiv.style.top = "30%";
        leftdiv.style.display = "block";
        /* make state screen visible*/
        statediv.style.display = "block";
        statediv.style.width = "100%";
        statediv.style.height = "70%";
        statediv.style.top = "0%";
        /* make payout screen not visible*/
        paydiv.style.display = "none";
        paydiv.style.width = "100%";
        paydiv.style.height = "100%";
        /* make instruction screen visible*/
        instdiv.style.display = "block";
        instdiv.style.width = "100%";
        instdiv.style.height = "70%";
        instdiv.style.bottom = "0%";

        /* format fractal images*/
        leftim.style.width = "60%";
        leftim.style.height = "60%";
        leftim.style.left = "20%";
        leftim.style.top = "15%";
        leftim.style.display = "block";

        rightim.style.width = "60%";
        rightim.style.height = "60%";
        rightim.style.left = "20%";
        rightim.style.top = "15%";
        rightim.style.display = "block";

        /* determine what to display depending in trial type*/
        if (counter[8] < Trial_type1) {
            leftim.src = "img/fractal1hr.jpg";
            rightim.src = "img/fractal2hr.jpg";

            leftdiv.style.backgroundColor = "#990000";
            rightdiv.style.backgroudColor = "#003300";

            statediv.style.display = "none";
            instdiv.style.height = "100%";
            instdiv.style.backgroundColor = "black";
        }
        else if (counter[8] < Trial_type1+Trial_type2){
            leftim.src = "img/fractal1hr.jpg";
            rightim.src = "img/fractal2hr.jpg";

            leftdiv.style.backgroundColor = "#990000";
            rightdiv.style.backgroudColor = "#003300";

            statediv.style.display = "none";
            instdiv.style.height = "100%";
            instdiv.style.backgroundColor = "black";

            messp.innerHTML = "Please select one of the items above. <br> Compensation for your choice will be <br> shown in the following screen."
        }
        else if (counter[8] < Trial_type1+Trial_type2+Trial_type3){
            leftim.src = "img/fractal3hr.jpg";
            rightim.src = "img/fractal4hr.jpg";

            leftdiv.style.backgroundColor = "#ff6600";
            rightdiv.style.backgroundColor = "#9900ff";

            statediv.style.backgroundColor = "#003300";
            instdiv.style.backgroundColor = "#003300";

            stateim.src = "img/fractal2hr.jpg";

            messp.innerHTML = "Please select one of the items above. <br> Compensation for your choice will be <br> revealed in the following screen."
        }
        else {
            leftim.src = "img/fractal5hr.jpg";
            rightim.src = "img/fractal6hr.jpg";

            leftdiv.style.backgroundColor = "#3333FF";
            rightdiv.style.backgroundColor = "#606060";

            statediv.style.backgroundColor = "#990000";
            instdiv.style.backgroundColor = "#990000";

            stateim.src = "img/fractal1hr.jpg";

            messp.innerHTML = "Please select one of the items above. <br>Compensation for your choice will be <br> revealed in the following screen."
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

        messp.style.bottom = "20%";
        messp.style.fontSize = "4em";
        var goodbyemssg = "Thank you for playing! ";
        messp.innerHTML = goodbyemssg.concat("Today you earned $ ", total.toString());
    }
    var timing = new Date().getTime();
    active = true;
    return timing;
};

var main = function(){

    $('.sel_box').click(function() {
        click_time = new Date().getTime();

        var id = $(this).attr("id");
        document.getElementById(id).style.width = "100%";
        document.getElementById(id).style.height = "100%";
        document.getElementById(id).style.left = "0px";
        document.getElementById(id).style.top = "0px";

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

            if (counter[8] < Trial_type1){
                if (id==='left_A') {
                    counter[0]++;
                }
                else {
                    counter[1]++;
                }
            }

            else if (counter[8] < Trial_type1+Trial_type2) {
                paydiv.style.display = "block";
                paydiv.style.backgroundColor = selectioncolor;
                paydiv.style.height  = "70%";
                if (id==='left_A') {
                    counter[2]++;
                    payimg.src = "img/penny.jpg";
                }
                else {
                    counter[3]++;
                    payimg.src = "img/quarter.jpg";
                }
            }
            else if (counter[8] < Trial_type1+Trial_type2+Trial_type3) {
                paydiv.style.display = "block";
                paydiv.style.backgroundColor = selectioncolor;
                if (id==='left_A') {
                    counter[4]++;
                    payimg.src = "img/quarter.jpg";
                }
                else {
                    counter[5]++;
                    payimg.src = "img/dollarbill.jpg";
                }
            }
            else if (counter[8] < maxTrials) {
                paydiv.style.display = "block";
                paydiv.style.backgroundColor = selectioncolor;
                 if (id==='left_A') {
                    counter[6]++;
                    payimg.src = "img/fivedollarbill.jpg";
                }
                else {
                    counter[7]++;
                    payimg.src = "img/tendollarbill.jpg";
                }
            }
            counter[8]++;
            /* Save timing between trial start and choice selection*/
            Telapsed.push(click_time - start_time);
            /* Disable clicking*/
            active = false;
            /* After selection, display choice for 2 sec and start new trial*/
            setTimeout(function(){setUpTrial("right_A","left_A")}, 2000); 
        }
        else {
            return;
        }

    });

    start_time = setUpTrial("right_A","left_A");
};

$(document).ready(main);
