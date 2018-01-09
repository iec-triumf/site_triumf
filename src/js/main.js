!(function($){
    $('body').removeClass('start').addClass("oninit");
	$('.mainmenu').addClass('modetop');
	/*$('.preloader-progress-bar').css({width: "25%"}).stop().animate({
			width: '50%'
	}, 1000);*/

	$(window).on("load", function(){
		$("body").removeClass("start oninit");
		$('.preloader-progress-bar').stop().animate({
			width: '75%'
		}, 2000, function(){
			$('.preloader-progress-bar').stop().animate({
				width: '100%'
			}, 400, function(){
				$('body, .preloader').addClass('complete');
				$(".header .header-wrapper").css({
					opacity: 0
				}).animate({
					opacity: 1
				}, 500, function(){
					$(".header .header-wrapper").css({opacity: ""});
					$(".header .header-wrapper").addClass("animate");
					$('.progress').css({display: 'none'});
					//$("body").removeClass("preload");
				});
				setTimeout(function(){
					$("body").removeClass("complete preload oninit start");
				}, 300);
				setTimeout(function(){
					$('.mainmenu').removeClass('modetop');
				}, 500)
			})
		});

	});
    $(".hero")
        .on("animationWowNo.hero animationWowYes.hero will.hero nowill.hero destroy.hero init.hero",
            function(e){
                switch (e.type) {
                    case 'init':
                        $(this).parent().addClass('initHero');
                        break;
                    case 'destroy':
                        $(this).parent().removeClass('initHero');
                        break;
                    default:
                        break;
                }
            }
        )
        .heroAnimate();
    $(".header-background").backgroundEffect();
    $('.close-block').on('click', function(e){
    	e.preventDefault();
    	var $body = $('body'),
    		isActive = $body.hasClass('openmenu'),
    		w1 = $body.outerWidth(true),
    		w2 = 0,
    		w3 = 0;
    	$('body').toggleClass('openmenu');
    	if(!isActive){
    		w2 = $body.outerWidth(true);
    		w3 = w2 - w1;
    			if(w1 != w2) {
    			$body.css({
    				"paddingRight": w3+'px'
    			});
    			$('.mainmenu-wrapper').css({
    				'paddingRight': w3+'px'
    			})
    		}
    	}else{
    		$body.css({
    			"paddingRight": ""
    		});
    		$('.mainmenu-wrapper').css({
    			'paddingRight': ''
    		})
    	}
    	return !1;
    });
    var wnScroll = 0;
    $(window).on('scroll.menudown', function(e){
    	var cScr = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
            xScr = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
    		hHeader = $('.main > .header').outerHeight(true) - 80;
        $('.mainmenu').css(
            {
                left: (window.innerWidth > 991) ? -xScr : ""
            }
        );
    	if(cScr < hHeader) {
    		$('.mainmenu').hasClass('modetop') && $('.mainmenu').removeClass('modetop');
    		return;
    	}
    	if(wnScroll < cScr){
    		!$('.mainmenu').hasClass('modetop') && $('.mainmenu').addClass('modetop');
    	}
    	if(wnScroll > cScr){
    		$('.mainmenu').hasClass('modetop') && $('.mainmenu').removeClass('modetop');
    	}
    	wnScroll = cScr;
        console.log(e)
    }).trigger('scroll.menudown');

    // slick
    $(".tabs").each(function(){
		var $this = $(this),
			$links = $(".tabs-head a", $this),
			$active = $(".tabs-head a.active", $this),
			$panes = $(".tabs-content-pane", $this),
			data = $active.data("tab");
		if(!$active.length && $links.length){
			$active = $($links[0]).addClass("active");
			data = $active.data("tab");
			$panes.removeClass("active");
			$(".tabs-content-pane[data-tab="+data+"]", $this).addClass('active');
		}
		$links.on("click.tabspane", function(e){
			e.preventDefault();
			var $current = $(".tabs-content-pane[data-tab="+data+"]", $this),
				$next;
			$links.removeClass("active");
			//$panes.removeClass("active");
			$active = $(this);
			data = $active.data("tab");
			$next = $(".tabs-content-pane[data-tab="+data+"]", $this);

			$current.stop().removeClass("active");

			$next.stop().css({
				display: "block",
				opacity: 0,
				'z-index': 5
			});
			//$(".slick", $next).slick('setPosition');
			$next.animate({
				opacity: 1
			}, 400, function(){
				$(this).css({display:""}).addClass("active");
			});

			$active.addClass("active");
			$(".tabs-content-pane[data-tab="+data+"]", $this).addClass('active');
            $(window).trigger('orientationchange');
			return !1;
		});
	});
    var initslick = function($selector){
			$selector.each(function(){
				var $this = $(this),
					$parent = $this.parent(),
					$dots = $(".slick-usedots", $parent),
					$arrows = $(".slick-usearrows", $parent),
					$nextArrow = '<span class="arrow arrow-next"><span class="webfont"></span></span>',
					$prevArrow = '<span class="arrow arrow-prev"><span class="webfont"></span></span>';
				$this.slick({
					dots: true,
					arrows: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					appendArrows: $arrows,
					appendDots: $dots,
					prevArrow: $prevArrow,
					nextArrow: $nextArrow,
					customPaging: function(slider, i){
						return $('<span class="dot" role="button" tabindex="0" />').text("");
					}
				});
			});
		},
        $slicks = $(".slick");
    initslick($slicks);
    $("form").each(function(){
        var $this = $(this);
        $("input[name=phone]", $this).mask("+7(999)999-99-99");
    })
}(jQuery));
