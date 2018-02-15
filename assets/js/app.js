$( document ).ready(function() {

  // Sort
  $('form').submit(function () {
    var task = $.trim($('#create').val());
    if (task === '') {
        return false;
    } else {
      var new_task = $('#create').val();
      $('#items').append('<li><a href="javascript:;"><div contenteditable="true" class="edit">'+new_task+'</div><div class="check loud-link-click" data-sound="bleep"></div></a></li>');
      $('#create').val('');
      return false;
    }
  });

  // Sort
  $('#items').sortable({
      handle: ".check",
      axis: 'y',
      scroll: true,
      cancel: '.edit'
  });

  // No Items Done
  if($("#items").has("li.done").length == 0) {
    $('.clear').removeClass('hide');
  }

  // // Done
  $('body').on('click', '.check', function() {
    $(this).parent().parent().toggleClass('done');
    $('.clear').addClass('hide');
  });

  // Clear
  $('body').on('click', '.clear', function() {
    $('#items li.done').hide('fast', function(){ $('#items li.done').remove(); });
    $('.clear').addClass('hide');
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