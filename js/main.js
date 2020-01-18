	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	
	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};



	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	var pieChart = function() {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#FF9000',
			trackColor:	"#f5f5f5",
			size: 160,
			animate: 1000
		});
	};

	var skillsWayPoint = function() {
		if ($('#fh5co-skills').length > 0 ) {
			$('#fh5co-skills').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( pieChart , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}

	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	var changeFavicon = function(src) {
	 var link = document.createElement('link'),
	     oldLink = document.getElementById('dynamic-favicon');
		 link.id = 'dynamic-favicon';
		 link.rel = 'shortcut icon';
		 link.href = src;
		 if (oldLink) {
		  document.head.removeChild(oldLink);
		 }
		 document.head.appendChild(link);
	};

	var faviconInterval= function(){
		changeFavicon('images/favicon/favicon_1.ico');

		setTimeout(function(){
			changeFavicon('images/favicon/favicon1_0.1.ico');
		},1000)
		setTimeout(function(){
			changeFavicon('images/favicon/favicon2_0.2.ico');
		},1100)
		setTimeout(function(){
			changeFavicon('images/favicon/favicon3_0.1.ico');
		},1300)
		setTimeout(function(){
			changeFavicon('images/favicon/favicon4_0.2.ico');
		},1400)
		setTimeout(function(){
			changeFavicon('images/favicon/favicon5_0.1.ico');
		},1600)
		setTimeout(function(){
			changeFavicon('images/favicon/favicon6_0.2.ico');
		},1700)
		setTimeout(function(){
			changeFavicon('images/favicon/favicon7_0.1.ico');
		},1900)
		setTimeout(function(){
			changeFavicon('images/favicon/favicon8_0.2.ico');
		},2000)
		setTimeout(function(){
			changeFavicon('images/favicon/favicon9_0.1.ico');
		},2200)
		setTimeout(function(){
			changeFavicon('images/favicon/favicon10_0.2.ico');
		},2300)
		setTimeout(function(){
			changeFavicon('images/favicon/favicon11_0.1.ico');
		},2500)
		setTimeout(function(){
			changeFavicon('images/favicon/favicon12_1.ico');
		},2600)

	};

	var languageswitch = function(lang) {
		sessionStorage.setItem('language',lang);
		location.reload();
	};

	var languagecheck = function(){
		if(sessionStorage.getItem('language')!=undefined && sessionStorage.getItem('language')=='pt')
		{
			$(".trans").each(function(i,val){
			    if($(val).attr('placeholder')!=undefined && $(val).attr('placeholder')!='')
			    	$(val).attr('placeholder',ptjson[i]);
			    else if($(val).attr('type')!=undefined && $(val).attr('type')=='submit')
			    	$(val).val(ptjson[i]);
			    else
				$(val).html(ptjson[i])
			})
			$(".selected-lang").removeClass('selected-lang');
			$(".pt").addClass('selected-lang');
			$(".icon-linkedin").parent().attr('href','https://www.linkedin.com/in/henrique-nobre-figueiredo')
		}
		if(sessionStorage.getItem('language')!=undefined && sessionStorage.getItem('language')=='es')
		{
			$(".trans").each(function(i,val){
			    if($(val).attr('placeholder')!=undefined && $(val).attr('placeholder')!='')
			    	$(val).attr('placeholder',esjson[i]);
			    else if($(val).attr('type')!=undefined && $(val).attr('type')=='submit')
			    	$(val).val(esjson[i]);
			    else
				$(val).html(esjson[i])
			})
			$(".selected-lang").removeClass('selected-lang');
			$(".es").addClass('selected-lang');
		}
	};
	
	$(function(){
		//Solving cube favicon
		faviconInterval();
		setInterval(function(){
			faviconInterval();
		},3600);

		//Email library
		emailjs.init('user_3IvWZWxWgDoVAYZHs3CkZ');
        $('#contact-form').submit(function(event) {
            event.preventDefault();
            // generate the contact number value
            this.contact_number.value = Math.random() * 100000 | 0;
            emailjs.sendForm('gmail', 'template_TGgcNqcG', this);
        });

        //Smoth anchor scroll
        $(document).on('click', 'a[href^="#"]', function (event) {
		    event.preventDefault();

		    $('html, body').animate({
		        scrollTop: $($.attr(this, 'href')).offset().top
		    }, 500);
		 });
        
		languagecheck();
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		// pieChart();
		skillsWayPoint();
	});
