var WebPullToRefresh = (function () {
	'use strict';

	var defaults = {
		contentEl: 'clear',
		ptrEl: 'ptr',
		distanceToRefresh: 70,
		loadingFunction: false,
		resistance: 2.5
	};

	var options = {};

	var pan = {
		enabled: false,
		distance: 0,
		startingPositionY: 0
	};

	var bodyClass = document.body.classList;

	var init = function( params ) {
		params = params || {};
		options = {
			contentEl: params.contentEl || document.getElementById( defaults.contentEl ),
			ptrEl: params.ptrEl || document.getElementById( defaults.ptrEl ),
			distanceToRefresh: params.distanceToRefresh || defaults.distanceToRefresh,
			loadingFunction: params.loadingFunction || defaults.loadingFunction,
			resistance: params.resistance || defaults.resistance
		};

		if ( ! options.contentEl || ! options.ptrEl ) {
			return false;
		}

		var h = new Hammer( options.contentEl );

		h.get( 'pan' ).set( { direction: Hammer.DIRECTION_VERTICAL } );

		h.on( 'panstart', _panStart );
		h.on( 'pandown', _panDown );
		h.on( 'panup', _panUp );
		h.on( 'panend', _panEnd );
	};

	var _panStart = function(e) {
		pan.startingPositionY = document.body.scrollTop;

		if ( pan.startingPositionY === 0 ) {
			pan.enabled = true;
		}
	};

	var _panDown = function(e) {
		if ( ! pan.enabled ) {
			return;
		}

		e.preventDefault();
		pan.distance = e.distance / options.resistance;

		_setContentPan();
		_setBodyClass();
	};

	var _panUp = function(e) {
		if ( ! pan.enabled || pan.distance === 0 ) {
			return;
		}

		e.preventDefault();

		if ( pan.distance < e.distance / options.resistance ) {
			pan.distance = 0;
		} else {
			pan.distance = e.distance / options.resistance;
		}

		_setContentPan();
		_setBodyClass();
	};

	var _setContentPan = function() {
		// Use transforms to smoothly animate elements on desktop and mobile devices
		options.contentEl.style.transform = options.contentEl.style.webkitTransform = 'translate3d( 0, ' + pan.distance + 'px, 0 )';
		options.ptrEl.style.transform = options.ptrEl.style.webkitTransform = 'translate3d( 0, ' + ( pan.distance - options.ptrEl.offsetHeight ) + 'px, 0 )';
	};

	var _setBodyClass = function() {
		if ( pan.distance > options.distanceToRefresh ) {
			bodyClass.add( 'ptr-refresh' );
		} else {
			bodyClass.remove( 'ptr-refresh' );
		}
	};

	var _panEnd = function(e) {
		if ( ! pan.enabled ) {
			return;
		}

		e.preventDefault();

		options.contentEl.style.transform = options.contentEl.style.webkitTransform = '';
		options.ptrEl.style.transform = options.ptrEl.style.webkitTransform = '';

		if ( document.body.classList.contains( 'ptr-refresh' ) ) {
			_doLoading();
		} else {
			_doReset();
		}

		pan.distance = 0;
		pan.enabled = false;
	};

	var _doLoading = function() {
		bodyClass.add( 'ptr-loading' );

		if ( ! options.loadingFunction ) {
			return _doReset();
		}

		var loadingPromise = options.loadingFunction();

		setTimeout( function() {
			loadingPromise.then( _doReset );
		}, 1000 );
	};

	var _doReset = function() {
		bodyClass.remove( 'ptr-loading' );
		bodyClass.remove( 'ptr-refresh' );
		bodyClass.add( 'ptr-reset' );

		var bodyClassRemove = function() {
			bodyClass.remove( 'ptr-reset' );
			document.body.removeEventListener( 'transitionend', bodyClassRemove, false );
		};

		document.body.addEventListener( 'transitionend', bodyClassRemove, false );
	};

	return {
		init: init
	}

})();