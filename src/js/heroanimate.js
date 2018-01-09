!(function($){
	var defaultOptions = {
			'kof'			: .4,
			'wowani'		: .3,
			'speed'			: 200,
			'ease'			: 'easeOutCirc',
			'stopOpacity'	: .7
		},
		methods = {
		init: function(options){
			var option = $.extend(defaultOptions, options);
			return this.each(function(){
				var $this = $(this),
					kof = option.kof,
					wowani = option.wowani,
					speed = option.speed,
					opacity = option.stopOpacity,
					$child = $this.children().first(),
					callbackWindow = function(e){
						var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
							offset = $this.offset(),
							winHeight = ('innerHeight' in window) ? window.innerHeight : document.documentElement.clientHeight,
							height = $this.outerHeight(),
							top = scrollTop - offset.top,
							topHeight = offset.top + height,
							iheight = (winHeight / 3) * 2,
							pos = topHeight-scrollTop,
							$wowEl = $('.wow', $child),
							pswow = scrollTop + winHeight,
							$slick = $(".slick", $this);
						if(pswow-10 <= offset.top){
							if($this.data('anitru')!='no'){
								$wowEl
								.css({
									opacity: 0
								})
								.removeClass('animated_triumf slideInUp');
								$this.data('anitru', 'no').trigger("animationWowNo.hero");
							}
						}
						if(pswow - winHeight * wowani > offset.top){
							if($this.data('anitru') != 'yes'){
								$wowEl
								.css({
									opacity: 1
								})
								.addClass('animated_triumf slideInUp');
								$this.data('anitru', 'yes').trigger("animationWowYes.hero");
							}
						}
						if(pos < iheight && pos > 0){
							var t = iheight - pos,
								ty = t * kof,
								op = 1;
							op = ((pos * kof) / iheight) + opacity;
							op = op > 1 ? 1 : op;//(op > opacity ? opacity : op);
							!$child.hasClass('will') && (
								$child.addClass('will'),
								$this.addClass('will').trigger("will.hero")
							);
							$this.stop().animate({
								opacity: op
							}, speed, 'easeOutCirc');
							$child.stop().animate({
								transform: 'scaleX(1) scaleY(1) translateX(0px) translateY('+ty+'px)'
							}, speed, 'easeOutCirc');
							/*op == opacity && (
								$child.removeClass('will'),
								$this.trigger("nowill.hero")
							);*/
						}else{
							if(pos > iheight) {
								$this.stop().animate({
									opacity: 1
								}, speed, 'easeOutCirc');
								$child.stop().animate({
									transform: 'scaleX(1) scaleY(1) translateX(0px) translateY(0px)',
								}, speed, 'easeOutCirc', function(){
									$child.hasClass('will') && (
										$child.removeClass('will'),
										$this.removeClass('will').trigger("nowill.hero")
									);
								});
							}
						}
					};
				$this.addClass('animate').trigger('init.hero');
				$(window).on('resize.hero scroll.hero', callbackWindow).trigger('resize.hero');
			});
		},
		destroy: function(){
			return this.each(function(){
					var $this = $(this),
						$child = $this.children().first(),
						$wowEl = $('.wow', $child);
					$(window).unbind('resize.hero scroll.hero');
					$this.removeClass('animate');
					$child.stop().css({
						transform: "",
						opacity: ""
					}).removeClass('will');
					$wowEl.removeClass('animated_triumf');
					$this.trigger("destroy.hero");
				});
			}
		};
	$.fn.heroAnimate = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Метод с именем ' +  method + ' не существует для jQuery.heroAnimate' );
		}
	};
}(jQuery));
