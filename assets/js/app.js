$( document ).ready(function() {

  $('form').submit(function () {
    var task = $.trim($('input').val());
    if (task === '') {
        return false;
    } else {
      var new_task = $('#input').val();
      $('#items').prepend('<li><a href="javascript:;" class="item"><span contenteditable="true" class="edit">'+new_task+'</span></a></li>');
      $('#input').val('');
      return false;
    }
  });

  $('body').on('click', '.item', function() {
    $(this).parent().toggleClass('done');
  });

  $('body').on('click', 'a.clear', function() {
    $('#items li.done').hide('fast', function(){ $('#items li.done').remove(); });
  });

  $('#items').sortable({
      handle: ".item",
      axis: 'y',
      scroll: true,
      cancel: '.edit'
  });

});


$(document).on("click",".edit",function(){
    $(this).focus()
})

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