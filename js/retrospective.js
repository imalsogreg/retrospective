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

$(document).ready(main);