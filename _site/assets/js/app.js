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

  $('#items').sortable({
      placeholder: "ui-state-highlight",
      handle: ".handle",
      scroll: true
  });

  $( "#items" ).disableSelection();

});

// Write: Local Storage
function savetext () {
  var s = document.getElementById ("text").value;
  if (s != localStorage.savedtext) {
    localStorage.savedtext = s;
    }
  }
function runWrite () {
    if (localStorage.savedtext == undefined) {
      localStorage.savedtext = "";
      }
    document.getElementById ("text").value = localStorage.savedtext;
    self.setInterval (function () {savetext ()}, 1000); //call every second
  }

// Tasks: Local Storage
function saveitems () {
  localStorage["items"] = JSON.stringify($("#items").html());
  }

function runTasks () {

    $('body').on('click', 'a.clear', function() {
      $('#items li').remove();
    });

   if (localStorage["items"] != null) {
      var contentsOfOldDiv = JSON.parse(localStorage["items"]);
      $("#items").html(contentsOfOldDiv);
     }

    self.setInterval (function () {saveitems ()}, 1000); //call every second
  }