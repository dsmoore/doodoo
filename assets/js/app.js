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

  $('body').on('dblclick', '#items li a', function() {
    $(this).parent().toggleClass('done');
  });

  $('#items').sortable({
      placeholder: "ui-state-highlight",
      handle: ".item",
      scroll: true,
      cancel: 'input,textarea,button,select,option,[contenteditable]'
  });


});

    window.onload = function() {
      WebPullToRefresh.init( {
          loadingFunction: exampleLoadingFunction
      } );
    };

    var exampleLoadingFunction = function() {
        return new Promise( function( resolve, reject ) {

            if ( true /* if the loading worked */ ) {
                resolve();
                $('#items li.done').remove();
                alertify.alert('All clear, captian!');
            } else {
                reject();
                alertify.alert('Nothing to clear.');
            }
        } );
    };

// Local Storage
function savetext () {
  localStorage["app"] = JSON.stringify($("#app").html());
  }

function startup () {

   if (localStorage["app"] != null) {
      var contentsOfOldDiv = JSON.parse(localStorage["app"]);
      $("#app").html(contentsOfOldDiv);
     }

    // self.setInterval (function () {savetext ()}, 1000); //call every second
  }

