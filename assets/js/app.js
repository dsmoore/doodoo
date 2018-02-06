$( document ).ready(function() {

  $('form').submit(function () {
    var task = $.trim($('input').val());
    if (task === '') {
        alertify.alert('Ooops! Make sure you add an item.');
        return false;
    } else {
      var new_task = $('#input').val();
      $('#items').prepend('<li><a href="javascript:;"><span class="handle">&#9776;</span>'+new_task+'</a></li>');
      $('#input').val('');
      return false;
    }
  });

  $('body').on('click', '#items li a', function() {
    $(this).parent().toggleClass('done');
  });

  $('#items').sortable({
      placeholder: "ui-state-highlight",
      handle: ".handle",
      scroll: true
  });

  $( "#items" ).disableSelection();

});

// Local Storage
function savetext () {
  localStorage["all"] = JSON.stringify($("#all").html());
  }

function startup () {

    $('body').on('click', 'a.clear', function() {
      $('#items li.done').remove();
    });

   if (localStorage["all"] != null) {
      var contentsOfOldDiv = JSON.parse(localStorage["all"]);
      $("#all").html(contentsOfOldDiv);
     }

    // self.setInterval (function () {savetext ()}, 1000); //call every second
  }