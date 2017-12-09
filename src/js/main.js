(function(document, window, $){
	$('.header-background').each(function(i){
		var $this = $(this),
			$parent = $($this.parent()),
			kof = 0.14;
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
				console.log(t)
				$this.css({
					transform: 'scaleX('+t1+') scaleY('+t1+') translateY('+ty+'px)'
				})
			}else{
				$this.hasClass('will') && $this.removeClass('will');
			}
		}).trigger("resize.scale");
	});
	$(".slick").slick();
	setTimeout(function(){
		$(".header .header-wrapper").addClass("animate")
	},1000);
	
})(document, window, jQuery);