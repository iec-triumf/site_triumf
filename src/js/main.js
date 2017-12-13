(function(document, window, $){
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
		};
	$('body').removeClass('start').addClass("oninit");
	$('.mainmenu').addClass('modetop');
	$('.preloader-progress-bar').stop().animate({
			width: '50%'
	}, 1000);
	
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
	$('.header-background').each(function(i){
		var $this = $(this),
			$parent = $($this.parent()),
			kof = window.scaleKof || 0.14;
		$(window).on('resize.scale scroll.scale', function(){
			
			//if(window.)
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
				offset = $parent.offset(),
				height = $parent.outerHeight(),
				top = scrollTop - offset.top,
				topHeight = offset.top + height;
			if((top >= 0) && (scrollTop <= topHeight)){
				!$this.hasClass('will') && $this.addClass('will');
				var t = top / height,
					t1 = (kof * t) + 1,
					ty = top * kof * 2;
				$this.css({
					transform: 'scaleX('+t1+') scaleY('+t1+') translateY('+ty+'px)',
					opacity: 1
				})
			}else{
				$this.hasClass('will') && $this.removeClass('will');
			}
		});
	});
	$(".hero-animation").each(function(){
		var $this = $(this),
			$parent = $($this.parent()).addClass("animate"),
			kof = window.transAniY || .4,
			wowani = window.wowOffset || .1;
		$(window).on('resize.transY scroll.transY', function(){
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
				offset = $parent.offset(),
				winHeight = ('innerHeight' in window) ? window.innerHeight : document.documentElement.clientHeight,
				height = $parent.outerHeight(),
				top = scrollTop - offset.top,
				topHeight = offset.top + height,
				iheight = (winHeight / 3) * 2,
				pos = topHeight-scrollTop,
				$wowEl = $('.wow', $this),
				pswow = scrollTop + winHeight,
				wowOffset = $wowEl.data('animation-offset'),
				$slick = $(".slick", $parent);
			
			if($wowEl.length){
				if(pswow-10 <= offset.top){
					
					if($wowEl.data('anitru')!='no'){
						$wowEl
						.css({
							opacity: 0
						})
						.removeClass('animated_triumf slideInUp')
						.data('anitru', 'no');
					}
				}
				if(pswow - winHeight * wowani > offset.top){
					if($wowEl.data('anitru') != 'yes'){
						$wowEl
						.css({
							opacity: 1
						})
						.data('anitru', 'yes')
						.addClass('animated_triumf slideInUp');
						$($('.column-standart.vertical.col.col-4', $('.prices'))[1]).addClass("active")
					}
				}
			}
			
			if(pos < iheight && pos > 0){
				!$this.hasClass('will') && $this.addClass('will');
				/*var t = top / height,
					t1 = (kof * t) + 1,
					ty = top * kof * 2;*/
				var t = iheight - pos,
					ty = t * kof,
					op = 1;
				op = ((pos * kof) / iheight) + 0.7;
				op = op > 1 ? 1 : op;
				$this.css({
					transform: 'scaleX(1) scaleY(1) translateX(0px) translateY('+ty+'px)',
					opacity: op
				});
			}else{
				$this.hasClass('will') && $this.removeClass('will');
				if(pos > iheight) {
					$this.css({
						transform: 'scaleX(1) scaleY(1) translateX(0px) translateY(0px)',
						opacity: 1
					})
				}
			}
		});
	});
	
	$(".tabs").each(function(){
		var $this = $(this),
			$links = $(".tabs-head-link", $this),
			$active = $(".tabs-head-link.active", $this),
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
			$(".slick", $next).slick('setPosition');
			$next.animate({
				opacity: 1
			}, 400, function(){
				$(this).css({display:""}).addClass("active");
			});
			
			$active.addClass("active");
			$(".tabs-content-pane[data-tab="+data+"]", $this).addClass('active');
			return !1;
		});
	});
	
	$('.column-standart', '.prices').on("click.prices mouseleave.prices mouseenter.prices", function(e){
		$('.column-standart', '.prices').removeClass("active");
	});
	
	$("form", document).on("submit.triumf", function(e){
		e.preventDefault();
		
		return !1;
	});
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
					"marginRight": w3+'px'
				});
				$('.mainmenu').css({
					'paddingRight': w3+'px'
				})
			}
		}else{
			$body.css({
				"marginRight": ""
			});
			$('.mainmenu').css({
				'paddingRight': ''
			})
		}
		return !1;
	});
	initslick($(".slick"));
	
	$(window).trigger("resize.transY").trigger("resize.scale");
	var wnScroll = 0;
	$(window).on('scroll.menudown', function(e){
		var cScr = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			hHeader = $('.main > .header').outerHeight(true)-40;
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
	})
})(document, window, jQuery);