$( document ).ready(function() {

   $('#items li a').on('click', function(e) {
      $(this).remove();
      e.preventDefault();
    });



});

