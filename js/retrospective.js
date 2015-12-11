var click_time = 0;                  /* Timestamp click events*/
var start_time = 0;                  /* Timestamp new trial events*/
/* Keep track of selections and number of trials. Elements 0,2,4,6 track selections to the right-side options. Elements 1,3,5,7 track selections to the left-side options. Element 8 tracks overall number of trials*/
var counter = [0,0,0,0,0,0,0,0,0];   /* Count selections and trials*/
var Telapsed = [];                   /* Keep track of timing between trial start and selection*/
var payout = [];                     /* Keep track of earnings throughout task*/

var active = true;                /* Control when clicking is available */

var Trial_type1 = 1;
var Trial_type2 = 1;
var Trial_type3 = 2;
var Trial_type4 = 3;

var maxTrials = Trial_type1+Trial_type2+Trial_type3+Trial_type4;

function setUpTrial(rightid,leftid) {

    /* identify elements used to display choices */
    var rightdiv = document.getElementById(rightid);
    var leftdiv = document.getElementById(leftid);
    var backdiv = document.getElementById("background");
    var instdiv = document.getElementById("instruction");
    var messp = document.getElementById("inst_message");
    var rightim = document.getElementById("right_img");
    var leftim = document.getElementById("left_img");
    var payim = document.getElementById("PayorState");

    if (counter[8] < maxTrials) {
        /* format choice on right side*/
        rightdiv.style.width = "750px";
        rightdiv.style.height = "500px";
        rightdiv.style.right = "25px";
        rightdiv.style.top = "200px";
        rightdiv.style.display = "block";
        rightdiv.style.left = "";
        /* format choice on left side*/
        leftdiv.style.width = "750px";
        leftdiv.style.height = "500px";
        leftdiv.style.left = "25px";
        leftdiv.style.top = "200px";
        leftdiv.style.display = "block";
        /* format background*/
        backdiv.style.display = "block";
        backdiv.style.width = "100%";
        backdiv.style.height = "100%";
        /* format instruction message*/
        instdiv.style.display = "block";
        instdiv.style.width = "100%";
        instdiv.style.height = "100%";
        messp.style.display = "block";
        /* reposition figures*/
        leftim.style.marginLeft = "225px";
        rightim.style.marginLeft = "225px";

        /* determine what to display depending in trial type*/
        if (counter[8] < Trial_type1) {
            leftim.src = "../img/fractal1.jpg";
            rightim.src = "../img/fractal2.png";

            leftdiv.style.backgroundcolor = "#990000";
            rightdiv.style.backgroudcolor = "#003300";

            instdiv.style.backgroundColor = "black";
            backdiv.style.backgroundColor = "black";
        }
        else if (counter[8] < Trial_type1+Trial_type2){
            leftim.src = "../img/fractal1.jpg";
            rightim.src = "../img/fractal2.png";

            leftdiv.style.backgroundColor = "#990000";
            rightdiv.style.backgroudColor = "#003300";

            instdiv.style.backgroundColor = "black";
            backdiv.style.backgroundColor = "black";

            messp.innerHTML = "Please select one of the items below. <br> Compensation for your choice will be <br> shown in the following screen."
        }
        else if (counter[8] < Trial_type1+Trial_type2+Trial_type3){
            leftim.src = "../img/fractal3.png";
            rightim.src = "../img/fractal4.jpg";

            leftdiv.style.backgroundColor = "#ff6600";
            rightdiv.style.backgroundColor = "#9900ff";

            instdiv.style.backgroundColor = "#003300";
            backdiv.style.backgroundColor = "#003300";

            messp.innerHTML = "Please select one of the items below. <br> Compensation for your choice will be <br> shown in the following screen."
            payim.src = "../img/fractal2.png";
            payim.style.height = "80px";
            payim.style.width = "120px";
            payim.style.bottom = "";
            payim.style.left = "750px";
            payim.style.display = "block";

        }
        else {
            leftim.src = "../img/fractal5.jpg";
            rightim.src = "../img/fractal6.jpg";

            leftdiv.style.backgroundColor = "#3333FF";
            rightdiv.style.backgroundColor = "#606060";

            instdiv.style.backgroundColor = "#990000";
            backdiv.style.backgroundColor = "#990000";

            messp.innerHTML = "Please select one of the items below. <br>Compensation for your choice will be <br> shown in the following screen."
        }
    }
    else {
        backdiv.style.display = "block";
        backdiv.style.backgroundColor = "black";
        rightdiv.style.display = "none";
        leftdiv.style.display = "none";
        instdiv.style.display = "block";
        messp.style.display = "block";
        messp.style.fontSize = "3em";
        messp.innerHTML = "Game is over. Thanks for playing!"
    }
    var timing = new Date().getTime();
    active = true;
    return timing;
};

var main = function(){

    $('.sel_box').click(function() {
        click_time = new Date().getTime();

        var id = $(this).attr("id");
        document.getElementById(id).width = "100%";
        document.getElementById(id).height = "100%";
        document.getElementById(id).left = "0px";
        document.getElementById(id).top = "0px";
        document.getElementById(id).className = "";

        $(this).siblings().css("display","none");
        $(this).css('width','100%');
        $(this).css('height','100%');
        $(this).animate({left:"0px",top:"0px"},0);
        $(".fractal").css('margin-left','650px');

        var payimg = document.getElementById("PayorState");

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
                if (id==='left_A') {
                    counter[2]++;
                    payimg.src = "../img/dollarbill.jpg";
                }
                else {
                    counter[3]++;
                    payimg.src = "../img/quarter.jpg";
                }
                payimg.style.marginLeft = "500px";
                payimg.style.marginBottom = "100px";
            }
            else if (counter[8] < Trial_type1+Trial_type2+Trial_type3) {
                if (id==='left_A') {
                    counter[4]++;
                }
                else {
                    counter[5]++;
                }
            }
            else if (counter[8] < maxTrials) {
                if (id==='left_A') {
                    counter[6]++;
                }
                else {
                    counter[7]++;
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
