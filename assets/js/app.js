$( document ).ready(function() {

  // Sort
  $('form').submit(function () {
    var task = $.trim($('#create').val());
    if (task === '') {
        return false;
    } else {
      var new_task = $('#create').val();
      $('#items').prepend('<li><a href="javascript:;" class="item"><div contenteditable="true" class="edit">'+new_task+'</div><span class="check"></span></a></li>');
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

  // Done
  $('body').on('click', '.check', function() {
    $(this).parent().parent().toggleClass('done');
  });

  // Clear
  $('body').on('click', 'a.clear', function() {
    $('#items li.done').hide('fast', function(){ $('#items li.done').remove(); });
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