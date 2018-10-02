; 

$(document).ready(function(){

	"use strict";

	/*=============================
	Start Mobile Detect
	=============================*/
	(function(){
		var md = new MobileDetect(window.navigator.userAgent);

		if (!md.mobile()) {
			window.isMobile = false;
		}

		else{
			window.isMobile = true;
		}

	})();
	/*=============================
	End Mobile Detect
	=============================*/


	/*=============================
	Start Vegas Function
	=============================*/
	function onVegas(){
		$('.bg-block-holder').vegas({
			delay: 7000,
			timer: false,
			shuffle: true,
			firstTransition: 'zoomOut',
			firstTransitionDuration: 2000,
			transition: 'zoomOut',
			transitionDuration: 2000,
			slides: globalSlideshow[1]
		});
	};
	/*=============================
	End Vegas Function
	=============================*/


	/*=============================
	Start Preloader Out
	=============================*/
	function preloaderFadeout(){
		$('.el-preloader').fadeOut(preloaderFadeOut, function(){
			$(window).trigger('preloaderOut');
		});
	};
	/*=============================
	End Preloader Out
	=============================*/


	/*=============================
	Start First Animation
	=============================*/
	function startAnimation(){

		var classPrefix = 'translate-from-top-',
			ratio       = 10;

		for (var i = 20; i >= 1; i--) {

			$('.' + classPrefix + i ).removeClass(classPrefix + i );
		}

		var classPrefix = 'translate-from-bottom-',
			ratio       = 10;

		for (var i = 20; i >= 1; i--) {
			
			$('.' + classPrefix + i ).removeClass(classPrefix + i );
		}
	};

	$(window).on('preloaderOut', function(){
		startAnimation();
	});
	/*=============================
	End First Animation
	=============================*/


	/*=============================
	Start Countdown
	=============================*/
	function countdown_timer(){

		if(!$('.counter')){
			return false;
		};

		$(document).on("ready", function() {

			$('.counter').countdown({
				until: new Date(Date.parse(setting.counter.lastDate)),
				layout: $('.counter').html(),
				timezone: setting.counter.timeZone
			});
		});

		var setting = {
			counter: {
				lastDate: targetDate, // target date settings, 
				timeZone: null
			}
		};
		
	};

	countdown_timer();
	/*=============================
	End Countdown
	=============================*/


	/*=============================
	Start Page Section Manager
	=============================*/
	(function(){
		if(!window.isMobile){
			$('body').addClass('desktop');
		}

		else{
			$('body').addClass('mobile');
		}

		$('.desktop .only-page-link').on('click', function(e){
			e.preventDefault(event);
			var href = $(this).attr('href');
			$(href + " .el-scroll-holder").mCustomScrollbar("scrollTo", '0px', {scrollInertia:800});
			$('.fullscreen-section').addClass('out-fullscreen-section');
			$('.el-mini-nav a').removeClass('active');
			$('.el-mini-nav a').eq(0).addClass('active');
			$(href).removeClass('out-fullscreen-section');
		});

		$('.mobile .only-page-link').on('click', function(e){
			e.preventDefault(event);
			var href = $(this).attr('href');
			$(href + " .el-scroll-holder").scrollTo('0px', 800);
			$('.fullscreen-section').addClass('out-fullscreen-section');
			$('.el-mini-nav a').removeClass('active');
			$('.el-mini-nav a').eq(0).addClass('active');
			$(href).removeClass('out-fullscreen-section');
		});
	})();
	/*=============================
	End Page Section Manager
	=============================*/


	/*=============================
	Start Scroll Settings
	=============================*/
	(function(){

		$(".desktop .el-scroll-holder").mCustomScrollbar();

		$('.desktop .el-mini-nav a').on('click', function(e){
			e.preventDefault(event);
			$('.el-mini-nav a').removeClass('active');
			$(this).addClass('active');
			var href = $(this).attr('href');
			$(".el-more-information .el-scroll-holder").mCustomScrollbar("scrollTo", href, {scrollInertia:800});
		});

		$(' .el-mini-nav a').on('click', function(e){
			e.preventDefault(event);
			$('.el-mini-nav a').removeClass('active');
			$(this).addClass('active');
			var href = $(this).attr('href');
			$(".el-more-information .el-scroll-holder").scrollTo(href, 800);
		});

	})();
	/*=============================
	End Scroll Settings
	=============================*/


	/*=============================
	Start Preloader
	=============================*/
	function preloader_out_start(){


		if(!$('.el-preloader')){
			return false;
		};


		if(isMobile){

			if(youtubeBg && videoBgMobile[0]){

				$('.youtube-player').on("YTPStart",function(e){
					preloaderFadeout();
				});
				return false;
			}

			if(youtubeBg && !videoBgMobile[0]){
				preloaderFadeout();
				return false;
			};

			preloaderFadeout();
		}

		if(!isMobile){

			if(youtubeBg){

				$('.youtube-player').on("YTPStart",function(e){
					preloaderFadeout();
				});
				return false;
			}

			else{
				preloaderFadeout();
			}
		}

	};
	//load
	/*=============================
	End Preloader
	=============================*/


	/*=============================
	Start Magnific Popup
	=============================*/
	function magnific_popup(){
		$('.zoom-gallery').magnificPopup({
			delegate: 'a',
			type: 'image',
			closeOnContentClick: false,
			closeBtnInside: false,
			mainClass: 'mfp-with-zoom mfp-img-mobile',
			gallery: {
				enabled: true
			},
			zoom: {
				enabled: true,
				duration: 300, // don't foget to change the duration also in CSS
				opener: function(element) {
					return element.find('img');
				}
			}
			
		});
	};

	magnific_popup();
	/*=============================
	End Magnific Popup
	=============================*/


	/*=============================
	Start Owl Carousela(About Carousel)
	=============================*/
	function owl_carousel(){
		if(!$('.owl-carousel')){
			return false;
		};

		$('.owl-carousel').owlCarousel({
			loop: true,
			margin: 0,
			dots: true,
			autoplay: true,
			responsive: {
				0:{
					items: 1
				}
			}
		});
	};
	//load
	/*=============================
	End Owl Carousela(About Carousel)
	=============================*/


	/*=============================
	Start Contact Form
	=============================*/
	function contact_form(){

		$('.el-send-form').submit(function(e){
			e.preventDefault(e);
			var form  	     = $(this),
				name  	     = form.find('[name=name]').val(),
				email 	     = form.find('[name=email]').val(),
				message      = form.find('[name=message]').val(),
				company_name = 'unknow',
				phone_number = 'unknow',
				is_company = form.find('[name=company-name]'),
				is_phone_number = form.find('[name=phone-number]');

				if(is_company.length >= 1){
					company_name = form.find('[name=company-name]').val();
				}

				if(is_phone_number.length >= 1){
					phone_number = form.find('[name=phone-number]').val();
				}


			var method	= form.attr('method'),
				notific = $('#mail-notification'),
				action  = form.attr('action'),
				data    = "name="+name+"&"+"email="+ email + "&"+ "message="+ message + "&" + "company-name="+ company_name +"&" +"phone-number=" + phone_number;
				form.find('.input-item').removeClass('error');
				form.find('[type=submit]').attr('disabled', '').text('Wait...');

				$.ajax({
					url     : action,
					type    : method,
					data    : data,
					success : function(status){
						form.find('[type=submit]').removeAttr('disabled').text('Send Message');
						
						var status = $.parseJSON(status);

						if(status.name_status == '0'          ||
							status.email_status == '0'        || 
							status.message_status == '0'      || 
							status.connect_status == '0'      ||
							status.company_name_status == '0' || 
						 	status.phone_number_status == '0'){

							
							if(status.name_status == '0'){
								form.find('.name-item').addClass('error');
								form.find('.name-item + .error-title').html(status.name_insert);
							}

							if(status.email_status == '0'){
								form.find('.email-item').addClass('error');
								form.find('.email-item + .error-title').html(status.email_insert);
							}

							if(status.message_status == '0'){
								form.find('.message-item').addClass('error');
								form.find('.message-item + .error-title').html(status.message_insert);
							}

							if(status.company_name_status == '0'){
								form.find('.company-name-item').addClass('error');
								form.find('.company-name-item + .error-title').html(status.company_name_insert);
							}

							if(status.phone_number_status == '0'){
								form.find('.phone-number-item').addClass('error');
								form.find('.phone-number-item + .error-title').html(status.phone_number_insert);
							}

							if(status.connect_status == '0'){
								form.find('.message-item').addClass('error');
								form.find('.message-item + .error-title').html(status.text_insert);
							}
						}

						else{
							
							if(status.success == '1'){
								form.find('[name=name]').val('');
								form.find('[name=email]').val('');
								form.find('[name=message]').val('');
								form.find('[name=name]').val('');
								form.find('[name=company-name]').val('');
								form.find('[name=phone-number]').val('');
								notific.find('.modal-body p').html(status.notification_insert);
								notific.removeClass('error-notification').addClass('success-notification');
								notific.modal('show');
								setTimeout(function(){ 
									$('#mail-notification').modal('hide'); 
								}, 3000);
							}

							else{
								form.find('.message-item').addClass('error');
								form.find('.message-item + .error-title').html(status.notification_insert);
							};
							
							
						};
					}
				});

		});
	};

	contact_form();
	/*=============================
	End Contact Form
	=============================*/


	/*=============================
	Start Subscribe Form
	=============================*/
	function subscribe_form(){

		$('.el-subscribe-form').submit(function(e){
			e.preventDefault(e);
			var form  	= $(this),
				email  	= form.find('[name=email]').val(),
				method	= form.attr('method'),
				action  = form.attr('action'),
				notific = $('#mail-notification'),
				data    = "email="+ email;
				form.find('.input-item').removeClass('error');
				form.find('[type=submit]').attr('disabled', '').text('Wait...');

				$.ajax({
					url     : action,
					type    : method,
					data    : data,
					success : function(status){
						form.find('[type=submit]').removeAttr('disabled').text('Subscribe');
						var status = $.parseJSON(status);						

						if(status.error == '1'){
							form.find('.input-item').addClass('error');
							form.find('.input-item + .error-title').html(status.text_insert);
							return false;
						}

						if(status.error == ''){
							$('#subscribeModal').modal('hide'); 
							form.find('.input-item').removeClass('error');
							form.find('input, textarea').val('');
							notific.find('.modal-body p').html(status.text_insert);

							notific.modal('show');

							setTimeout(function(){ 
								$('#mail-notification').modal('hide'); 
							}, 3000);

							return false;
						}

						else{
							form.find('.input-item').addClass('error');
							form.find('.input-item + .error-title').html('Error.Try again');

							return false;
						}
					}
				});

		});
	};

	subscribe_form();
	/*=============================
	End Subscribe Form
	=============================*/

	
	/*=============================
	Start Typed
	=============================*/
	function typed_text(){

		if(!window.isMobile){
			if(typed[0]){
				var typed3 = new Typed('#typed-element', {
					strings: typed[1],
					typeSpeed: 70,
					backSpeed: 10,
					backDelay: 2000,
					smartBackspace: true,
					loop: true
				});
			}
		}


		if(window.isMobile){
			if(typed[0] && typedInMobile[0]){
				 var typed3 = new Typed('#typed-element', {
					strings: typed[1],
					typeSpeed: 70,
					backSpeed: 10,
					backDelay: 2000,
					smartBackspace: true,
					loop: true
				});
			}

			if(typed[0] && !typedInMobile[0]){
				$('#typed-element').html(typedInMobile[1]);
			}
		}	
	};
	//load
	/*=============================
	Start Typed
	=============================*/


	/*=============================
	Start Vegas Slideshow
	=============================*/
	$(window).on('preloaderOut', function(){

		if(!window.isMobile){
			if(globalSlideshow[0]){
				onVegas();
			}
		}


		if(window.isMobile){
			if(globalSlideshow[0]){
				onVegas();
			}

			else{
				return false;
			}
		}	
	});
	/*=============================
	Start Vegas Slideshow
	=============================*/


	/*=============================
	Start Youtube Background
	=============================*/
	function youtube_bg_start(){

		if(!window.isMobile){
			if(youtubeBg){
				$('.youtube-player').YTPlayer(youtubeProperty, true);
			}
		}


		if(window.isMobile){
			if(videoBgMobile[0]){
				$('.youtube-player').YTPlayer(youtubeProperty, true);
			}

			else{

				if((youtubeBg) && (videoBgMobile[1] == 'slideshow')){
					$(window).on('preloaderOut', function(){
						onVegas();
					})
				}

				return false;
			}
		}	
	};

	youtube_bg_start();
	/*=============================
	Start Youtube Background
	=============================*/


	/*=============================
	Start Canvas Settings
	=============================*/
	function canvas_animation(){

		if(!window.isMobile){
			if(canvasAnimation[0]){
				if(canvasAnimation[1] == 'particles-local'){
					particlesJS();
				};

				if(canvasAnimation[1] == 'smoke'){
					$('.el-bg-block').waterpipe({
						gradientStart: '#ff2653',
						gradientEnd: '#ff2653',
						smokeOpacity: 0.05,
						numCircles: 1,
						iterations: 10,
						lineWidth: 2,
						speed: 2,
						bgColorInner: "#1c1c38",
						bgColorOuter: "#1c1c38"
					});
				}

				if(canvasAnimation[1] == 'rain-drop-effect'){

					$(window).load(function(){

						var rainyDay = new RainyDay({
							image: 'el-bg-block' 
						});
					});
				}

				if(canvasAnimation[1] == 'mozaic'){
					mozaic();
				}

				if(canvasAnimation[1] == 'blur-particles'){
					blurParticles();
				}

				if(canvasAnimation[1] == 'polygon'){
					polygon();
				}
				
				if(canvasAnimation[1] == 'fall-square'){
					squareFall();
				}

				if(canvasAnimation[1] == 'color-clutter'){
					colorClutter();
				}

				if(canvasAnimation[1] == 'firework'){
					firework();
				}

				if(canvasAnimation[1] == 'bubbles'){
					
					particlesJS.load('el-bg-block', '../assets/js/canvas/particles-settings/particles-bubbles.json', function() {});
				}

				if(canvasAnimation[1] == 'particles-default'){
					
					particlesJS.load('el-bg-block', '../assets/js/canvas/particles-settings/particles-default.json', function() {});
				}

				if(canvasAnimation[1] == 'particles-snow'){
					
					particlesJS.load('el-bg-block', '../assets/js/canvas/particles-settings/particles-snow.json', function() {});
				}

				if(canvasAnimation[1] == 'particles-brownian-motion'){
					
					particlesJS.load('el-bg-block', 'https://dalton-cole.github.io/sortsystems-web/assets/js/canvas/particles-settings/particles-brownian-motion.json', function() {});
				}

				if(canvasAnimation[1] == 'particles-to-up'){
					
					particlesJS.load('el-bg-block', '../assets/js/canvas/particles-settings/particles-to-up.json', function() {});
				}

				$('body').addClass('canvas-animation-on');
			}

			else{
				$('.canvas-animation-holder').addClass('display-none');
			}
		}

		if(window.isMobile){
			if(animationInMobile){
				if(canvasAnimation[1] == 'particles-local'){
					particlesJS();
				}

				if(canvasAnimation[1] == 'smoke'){
					$('.el-bg-block').waterpipe({
						gradientStart: '#ff2653',
						gradientEnd: '#ff2653',
						smokeOpacity: 0.05,
						numCircles: 1,
						iterations: 10,
						lineWidth: 2,
						speed: 2,
						bgColorInner: "#1c1c38",
						bgColorOuter: "#1c1c38"
					});
				}

				if(canvasAnimation[1] == 'rain-drop-effect'){

					$(window).load(function(){

						var rainyDay = new RainyDay({
							image: 'el-bg-block' 
						});
					});
				}

				if(canvasAnimation[1] == 'mozaic'){ 
					mozaic();
				}

				if(canvasAnimation[1] == 'blur-particles'){
					blurParticles();
				}

				if(canvasAnimation[1] == 'polygon'){
					polygon();
				}

				if(canvasAnimation[1] == 'color-clutter'){
					colorClutter();
				}

				if(canvasAnimation[1] == 'fall-square'){
					squareFall();
				}

				if(canvasAnimation[1] == 'firework'){
					firework();
				}

				if(canvasAnimation[1] == 'bubbles'){
					
					particlesJS.load('el-bg-block', '../assets/js/canvas/particles-settings/particles-bubbles.json', function() {});
				}

				if(canvasAnimation[1] == 'particles-default'){
					
					particlesJS.load('el-bg-block', '../assets/js/canvas/particles-settings/particles-default.json', function() {});
				}

				if(canvasAnimation[1] == 'particles-snow'){
					
					particlesJS.load('el-bg-block', '../assets/js/canvas/particles-settings/particles-snow.json', function() {});
				}

				if(canvasAnimation[1] == 'particles-brownian-motion'){
					
					particlesJS.load('el-bg-block', 'https://dalton-cole.github.io/sortsystems-web/assets/js/canvas/particles-settings/particles-brownian-motion.json', function() {});
				}

				if(canvasAnimation[1] == 'particles-to-up'){
					
					particlesJS.load('el-bg-block', '../assets/js/canvas/particles-settings/particles-to-up.json', function() {});
				}

				$('body').addClass('canvas-animation-on');
			}

			else{
				$('.canvas-animation-holder').addClass('display-none');
				return false;
			}
		}
	};

	canvas_animation();
	/*=============================
	Start Canvas Settings
	=============================*/

	$(window).load(function(){
		preloader_out_start();
		owl_carousel();
		typed_text();
	});
});




