$( document ).ready(function() {

  // Sounds
  var bleep = document.createElement('audio');
  bleep.setAttribute('src', 'assets/sounds/bleep.mp3');

  var bloop = document.createElement('audio');
  bloop.setAttribute('src', 'assets/sounds/bloop.mp3');

  var tick = document.createElement('audio');
  tick.setAttribute('src', 'assets/sounds/tick.mp3');

  var tuck = document.createElement('audio');
  tuck.setAttribute('src', 'assets/sounds/tuck.mp3');

  var ding = document.createElement('audio');
  ding.setAttribute('src', 'assets/sounds/bleep.mp3');

  var done = document.createElement('audio');
  done.setAttribute('src', 'assets/sounds/greatjob.mp3');


  // Sort
  $('form').submit(function () {
    var task = $.trim($('#create').val());
    if (task === '') {
        return false;
    } else {
      var new_task = $('#create').val();
      $('#items').append('<li><a href="javascript:;"><div contenteditable="true" class="edit">'+new_task+'</div><div class="check" contenteditable="false"></div></a></li>');
      $('#create').val('');
      $('#create').blur();
      window.scrollTo(0,document.body.scrollHeight);
      return false;
    }
  });

  // Sort
  $('#items').sortable({
      handle: ".check",
      axis: 'y',
      scroll: true,
      cancel: '.edit',
      start: function(event,ui){
        tick.play();
      },
      stop: function(event,ui){
        tuck.play();
      }
  });

  // No Items Done
  if($("#items").has("li.done").length == 1) {
    $('.clear').removeClass('hide');
  }

  $('body').on('click', '.edit', function() {
    tick.play();
  });


  $(document).keypress(function(e) {
      if(e.which == 13) {
        bloop.play();
      }
  });

  // Done
  $('body').on('click', '#create', function() {
    tick.play();
  });

  // $( ".check" ).hover(
  //   function() {
  //     tick.play();
  //   }, function() {
  //     tick.play();
  //   }
  // );

  // Check
  $('body').on('click', '.check', function() {
    $(this).parent().parent().toggleClass('done');
    $('.clear').removeClass('hide');

    // Check for other items
    if($("#items").has("li.done").length == 0) {
      $('.clear').addClass('hide');
    }

    bleep.play();

  });



  // Clear
  $('body').on('click', '.clear', function() {
    $('#items li.done').hide('fast', function(){ $('#items li.done').remove(); });
    $(this).addClass('hide');

    done.play();

  });

});

// Local Storage
function savetext () {
localStorage["app"] = JSON.stringify($("#items").html());
}

function startup () {

 if (localStorage["app"] != null) {
  var contentsOfOldDiv = JSON.parse(localStorage["app"]);
  $("#items").html(contentsOfOldDiv);
 }

  self.setInterval (function () {savetext ()}, 1000); //call every second
}

// Run app
startup ();