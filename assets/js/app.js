$( document ).ready(function() {

  $('form').submit(function () {
    var task = $.trim($('input').val());
    if (task === '') {
        alertify.alert('Ooops! Make sure you add an item.');
        return false;
    } else {
      var new_task = $('#input').val();
      $('#items').prepend('<li><a href="javascript:;" class="handle">'+new_task+'</a></li>');
      $('#input').val('');
      return false;
    }
  });

  $('body').on('click', '#items li a', function() {
    $(this).remove();
    localStorage.clear();
  });


  $('#items').sortable({
      placeholder: "ui-state-highlight",
      handle: ".handle",
      scroll: true
  });

  $( "#items" ).disableSelection();

  $('body').on('click', 'a.black', function() {
    $(this).toggleClass('active');
    $('#app').addClass('black');
    $('nav.colors li a').not(this).removeClass('active');
    $('#app').removeClass('rainbow purple red');
    $('body').removeClass('rainbow');
  });

  $('body').on('click', 'a.red', function() {
    $(this).toggleClass('active');
    $('#app').addClass('red');
    $('nav.colors li a').not(this).removeClass('active');
    $('#app').removeClass('black rainbow purple');
    $('body').removeClass('rainbow');
  });

    $('body').on('click', 'a.purple', function() {
    $(this).toggleClass('active');
    $('#app').addClass('purple');
    $('nav.colors li a').not(this).removeClass('active');
    $('#app').removeClass('black rainbow red');
    $('body').removeClass('rainbow');
  });

  $('body').on('click', 'a.rainbow', function() {
    $(this).toggleClass('active');
    $('#app').addClass('rainbow');
    $('body').addClass('rainbow');
    $('nav.colors li a').not(this).removeClass('active');
    $('#app').removeClass('black red purple');
  });


});

// Local Storage
function savetext () {
  localStorage["all"] = JSON.stringify($("#all").html());
  }

function startup () {

    $('body').on('click', 'a.clear', function() {
      $('#items li').remove();
    });

   if (localStorage["all"] != null) {
      var contentsOfOldDiv = JSON.parse(localStorage["all"]);
      $("#all").html(contentsOfOldDiv);
     }

    // self.setInterval (function () {savetext ()}, 1000); //call every second
  }

