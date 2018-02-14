$( document ).ready(function() {

  // Sort
  $('form').submit(function () {
    var task = $.trim($('#create').val());
    if (task === '') {
        return false;
    } else {
      var new_task = $('#create').val();
      $('#items').prepend('<li><a href="javascript:;" id="item"><span contenteditable="true" class="edit">'+new_task+'</span></a></li>');
      $('#create').val('');
      return false;
    }
  });

  // Sort
  // $('#items').sortable({
  //     handle: "#item",
  //     axis: 'y',
  //     scroll: true,
  //     cancel: '.edit'
  // });

  // Done
  $('body').on('click', '#item', function() {
    $(this).parent().toggleClass('done');
  });

  // Clear
  $('body').on('click', 'a.clear', function() {
    $('#items li.done').hide('fast', function(){ $('#items li.done').remove(); });
  });

});


// Local Storage
function savetext () {
localStorage["app"] = JSON.stringify($("#app").html());
}

function startup () {

 if (localStorage["app"] != null) {
  var contentsOfOldDiv = JSON.parse(localStorage["app"]);
  $("#app").html(contentsOfOldDiv);
 }

  self.setInterval (function () {savetext ()}, 1000); //call every second
}

// Run app
startup ();