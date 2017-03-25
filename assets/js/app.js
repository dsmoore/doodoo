$( document ).ready(function() {


  $('button').click(function() {
    var new_task = $('#input').val();
    $('#items').prepend('<li><a href="#">'+new_task+'</a></li>');
    $('#input').val('');
    return false;
  });

  // Complete task
  $('body').on('click', '#items li a', function() {
    $(this).remove();
    e.preventDefault();
  });

  // Clear input on select
  $('#input').click(
    function(){
    $(this).val('');
  });


});