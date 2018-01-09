yepnope('https://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js', undefined, function() {
	WebFont.load({
		google: {
			families: [
				"Roboto:100,100italic,300,300italic,regular,italic,500,500italic,700,700italic,900,900italic:latin,cyrillic,cyrillic-ext",
				"Roboto Slab:100,300,regular,700:latin,cyrillic-ext",
				"Fira Sans:100,200,300,regular,500:cyrillic,cyrillic-ext,latin",
				"Ruslan Display:regular:cyrillic,latin"
			]
		}
	});
	yepnope.injectCss({
		href: '<?php echo getFileTime("/assets/templates/triumf/css/animate.css");?>'
	});
	yepnope('<?php echo getFileTime("/assets/templates/triumf/js/app.js");?>', undefined, function() {
		yepnope('<?php echo getFileTime("/assets/templates/triumf/js/hypher.js");?>', undefined, function() {
			yepnope('<?php echo getFileTime("/assets/templates/triumf/js/main.js");?>', undefined, function(){

			})
		})
	})
});
