$(document).ready(function(){
  siteItems();
});

$(function(){
  'use strict';
  var $page = $('#main'),
    options = {
      debug: true,
      anchors: '.smooth a',
      prefetch: true,
      cacheLength: 2,
        onStart: {
          duration: 500, // Duration of our animation
          render: function ($container) {
            $container.addClass('is-exiting');
            $('body').animate({ 'scrollTop': 0 }, 500);

            // FastClick
            FastClick.attach(document.body);
            smoothState.restartCSSAnimations();

          }
        },
        onReady: {
          duration: 0,
          render: function ($container, $newContent) {
            $container.removeClass('is-exiting');
            $container.html($newContent);
          }
        },
    onAfter: function($container) {
      siteItems();
    }
  },
  smoothState = $page.smoothState(options).data('smoothState');
});

function siteItems() {


}