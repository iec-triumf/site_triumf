!function(a){var b={kof:.4,wowani:.3,speed:200,ease:"easeOutCirc",stopOpacity:.7},c={init:function(c){var d=a.extend(b,c);return this.each(function(){var b=a(this),c=d.kof,e=d.wowani,f=d.speed,g=d.stopOpacity,h=b.children().first(),i=function(d){var i=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,j=b.offset(),k="innerHeight"in window?window.innerHeight:document.documentElement.clientHeight,l=b.outerHeight(),m=(j.top,j.top+l),n=k/3*2,o=m-i,p=a(".wow",h),q=i+k;a(".slick",b);if(q-10<=j.top&&"no"!=b.data("anitru")&&(p.css({opacity:0}).removeClass("animated_triumf slideInUp"),b.data("anitru","no").trigger("animationWowNo.hero")),q-k*e>j.top&&"yes"!=b.data("anitru")&&(p.css({opacity:1}).addClass("animated_triumf slideInUp"),b.data("anitru","yes").trigger("animationWowYes.hero")),o<n&&o>0){var r=n-o,s=r*c,t=1;t=o*c/n+g,t=t>1?1:t,!h.hasClass("will")&&(h.addClass("will"),b.addClass("will").trigger("will.hero")),b.stop().animate({opacity:t},f,"easeOutCirc"),h.stop().animate({transform:"scaleX(1) scaleY(1) translateX(0px) translateY("+s+"px)"},f,"easeOutCirc")}else o>n&&(b.stop().animate({opacity:1},f,"easeOutCirc"),h.stop().animate({transform:"scaleX(1) scaleY(1) translateX(0px) translateY(0px)"},f,"easeOutCirc",function(){h.hasClass("will")&&(h.removeClass("will"),b.removeClass("will").trigger("nowill.hero"))}))};b.addClass("animate").trigger("init.hero"),a(window).on("resize.hero scroll.hero",i).trigger("resize.hero")})},destroy:function(){return this.each(function(){var b=a(this),c=b.children().first(),d=a(".wow",c);a(window).unbind("resize.hero scroll.hero"),b.removeClass("animate"),c.stop().css({transform:"",opacity:""}).removeClass("will"),d.removeClass("animated_triumf"),b.trigger("destroy.hero")})}};a.fn.heroAnimate=function(b){return c[b]?c[b].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof b&&b?void a.error("\u041c\u0435\u0442\u043e\u0434 \u0441 \u0438\u043c\u0435\u043d\u0435\u043c "+b+" \u043d\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u0434\u043b\u044f jQuery.heroAnimate"):c.init.apply(this,arguments)}}(jQuery),function(a){var b={scaleKof:.14,speed:500,ease:"easeOutCirc"},c={init:function(c){var d=a.extend(b,c);return this.each(function(){var b=a(this),c=a(b.parent()),e=d.scaleKof,f=d.speed,g=d.ease;a(window).on("resize.background scroll.background initBackground.background",function(){var a=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,d=c.offset(),h=c.outerHeight(),i=a-d.top,j=d.top+h;if(i>=0&&a<=j){!b.hasClass("will")&&b.addClass("will");var k=i/h,l=e*k+1,m=i*e*2;b.stop().animate({transform:"scaleX("+l+") scaleY("+l+") translateY("+m+"px)"},f,g)}else b.hasClass("will")&&b.removeClass("will")}).trigger("initBackground.background")})},destroy:function(){return this.each(function(){var b=a(this);a(window).unbind("resize.background scroll.background initBackground.background"),b.removeClass("will").css({transform:""})})}};a.fn.backgroundEffect=function(b){return c[b]?c[b].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof b&&b?void a.error("\u041c\u0435\u0442\u043e\u0434 \u0441 \u0438\u043c\u0435\u043d\u0435\u043c "+b+" \u043d\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u0434\u043b\u044f jQuery.backgroundEffect"):c.init.apply(this,arguments)}}(jQuery),function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger(a.Event("hidden.bs.dropdown",f)))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.7",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger(a.Event("shown.bs.dropdown",h))}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=e.find(".dropdown-menu li:not(.disabled):visible a");if(h.length){var i=h.index(c.target);38==c.which&&i>0&&i--,40==c.which&&i<h.length-1&&i++,~i||(i=0),h.eq(i).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),function(a){a("body").removeClass("start").addClass("oninit"),a(".mainmenu").addClass("modetop"),a(window).on("load",function(){a("body").removeClass("start oninit"),a(".preloader-progress-bar").stop().animate({width:"75%"},2e3,function(){a(".preloader-progress-bar").stop().animate({width:"100%"},400,function(){a("body, .preloader").addClass("complete"),a(".header .header-wrapper").css({opacity:0}).animate({opacity:1},500,function(){a(".header .header-wrapper").css({opacity:""}),a(".header .header-wrapper").addClass("animate"),a(".progress").css({display:"none"})}),setTimeout(function(){a("body").removeClass("complete preload oninit start")},300),setTimeout(function(){a(".mainmenu").removeClass("modetop")},500)})})}),a(".hero").on("animationWowNo.hero animationWowYes.hero will.hero nowill.hero destroy.hero init.hero",function(b){switch(b.type){case"init":a(this).parent().addClass("initHero");break;case"destroy":a(this).parent().removeClass("initHero")}}).heroAnimate(),a(".header-background").backgroundEffect(),a(".close-block").on("click",function(b){b.preventDefault();var c=a("body"),d=c.hasClass("openmenu"),e=c.outerWidth(!0),f=0,g=0;return a("body").toggleClass("openmenu"),d?(c.css({paddingRight:""}),a(".mainmenu-wrapper").css({paddingRight:""})):(f=c.outerWidth(!0),g=f-e,e!=f&&(c.css({paddingRight:g+"px"}),a(".mainmenu-wrapper").css({paddingRight:g+"px"}))),!1});var b=0;a(window).on("scroll.menudown",function(c){var d=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,e=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft,f=a(".main > .header").outerHeight(!0)-80;if(a(".mainmenu").css({left:window.innerWidth>991?-e:""}),d<f)return void(a(".mainmenu").hasClass("modetop")&&a(".mainmenu").removeClass("modetop"));b<d&&!a(".mainmenu").hasClass("modetop")&&a(".mainmenu").addClass("modetop"),b>d&&a(".mainmenu").hasClass("modetop")&&a(".mainmenu").removeClass("modetop"),b=d,console.log(c)}).trigger("scroll.menudown"),a(".tabs").each(function(){var b=a(this),c=a(".tabs-head a",b),d=a(".tabs-head a.active",b),e=a(".tabs-content-pane",b),f=d.data("tab");!d.length&&c.length&&(d=a(c[0]).addClass("active"),f=d.data("tab"),e.removeClass("active"),a(".tabs-content-pane[data-tab="+f+"]",b).addClass("active")),c.on("click.tabspane",function(e){e.preventDefault();var g,h=a(".tabs-content-pane[data-tab="+f+"]",b);return c.removeClass("active"),d=a(this),f=d.data("tab"),g=a(".tabs-content-pane[data-tab="+f+"]",b),h.stop().removeClass("active"),g.stop().css({display:"block",opacity:0,"z-index":5}),g.animate({opacity:1},400,function(){a(this).css({display:""}).addClass("active")}),d.addClass("active"),a(".tabs-content-pane[data-tab="+f+"]",b).addClass("active"),a(window).trigger("orientationchange"),!1})});var c=a(".slick");!function(b){b.each(function(){var b=a(this),c=b.parent(),d=a(".slick-usedots",c),e=a(".slick-usearrows",c);b.slick({dots:!0,arrows:!0,slidesToShow:1,slidesToScroll:1,appendArrows:e,appendDots:d,prevArrow:'<span class="arrow arrow-prev"><span class="webfont"></span></span>',nextArrow:'<span class="arrow arrow-next"><span class="webfont"></span></span>',customPaging:function(b,c){return a('<span class="dot" role="button" tabindex="0" />').text("")}})})}(c),a("form").each(function(){var b=a(this);a("input[name=phone]",b).mask("+7(999)999-99-99")})}(jQuery);