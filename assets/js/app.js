$( document ).ready(function() {

  $('form').submit(function () {
    var task = $.trim($('input').val());
    if (task === '') {
        alertify.alert('Ooops! Make sure you add an item.');
        return false;
    } else {
      var new_task = $('#input').val();
      $('#items').prepend('<li><a href="javascript:;">'+new_task+'</a></li>');
      $('#input').val('');
      return false;
    }
  });

  $('body').on('click', '#items li a', function() {
    $(this).remove();
  });

  $('#items').sortable({
      placeholder: "ui-state-highlight",
      scroll: true
  });

  $( "#items" ).disableSelection();

  $('body').on('click', 'a.black', function() {
    $(this).toggleClass('active');
    $('#app').addClass('black');
    $('nav.colors li a').not(this).removeClass('active');
    $('#app').removeClass('yellow purple red');
  });

  $('body').on('click', 'a.red', function() {
    $(this).toggleClass('active');
    $('#app').addClass('red');
    $('nav.colors li a').not(this).removeClass('active');
    $('#app').removeClass('black yellow purple');

  });

    $('body').on('click', 'a.purple', function() {
    $(this).toggleClass('active');
    $('#app').addClass('purple');
    $('nav.colors li a').not(this).removeClass('active');
    $('#app').removeClass('black yellow red');
  });

  $('body').on('click', 'a.yellow', function() {
    $(this).toggleClass('active');
    $('#app').addClass('yellow');
    $('nav.colors li a').not(this).removeClass('active');
    $('#app').removeClass('black red purple');
  });


});