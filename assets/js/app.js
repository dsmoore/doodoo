$( document ).ready(function() {

  // Sounds
  var bleep = document.createElement('audio');
  bleep.setAttribute('src', 'assets/sounds/bleep.mp3');

  var blip = document.createElement('audio');
  blip.setAttribute('src', 'assets/sounds/click.mp3');

  var done = document.createElement('audio');
  done.setAttribute('src', 'assets/sounds/done.mp3');


  // Sort
  $('form').submit(function () {
    var task = $.trim($('#create').val());
    if (task === '') {
        return false;
    } else {
      var new_task = $('#create').val();
      $('#items').append('<li><a href="javascript:;"><div contenteditable="true" class="edit">'+new_task+'</div><div class="check"></div></a></li>');
      $('#create').val('');
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
        bleep.play();
      },
      stop: function(event,ui){
        bleep.play();
      }
  });

  // No Items Done
  if($("#items").has("li.done").length == 0) {
    $('.clear').removeClass('hide');
  }

  $('body').on('click', '.edit', function() {
    blip.play();
  });


  $(document).keypress(function(e) {
      if(e.which == 13) {
        bleep.play();
      }
  });

  // Done
  $('body').on('click', '#create', function() {
    blip.play();
  });

  // Done
  $('body').on('click', '.check', function() {
    $(this).parent().parent().toggleClass('done');
    $('.clear').addClass('hide');

    bleep.play();

  });

  // Clear
  $('body').on('click', '.clear', function() {
    $('#items li.done').hide('fast', function(){ $('#items li.done').remove(); });
    $('.clear').addClass('hide');

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