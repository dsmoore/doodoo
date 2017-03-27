$( document ).ready(function() {

  $('form').submit(function () {
    var task = $.trim($('input').val());
    if (task === '') {
        alert('Are you constipated? Add some shit!');
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

  $( "#items" ).sortable();
  $( "#items" ).disableSelection();

});