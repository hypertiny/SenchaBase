/*
 * Ext Core Library 3.0
 * http://www.sencha.com
 * Copyright (c) 2006-2011 Sencha Inc.
 * 
 * MIT Licensed - http://www.opensource.org/licenses/mit-license.php
 */
Ext.ns('Ext.ux');Ext.ux.Carousel=Ext.extend(Ext.util.Observable,{interval:3,transitionDuration:1,transitionType:'carousel',transitionEasing:'easeOut',itemSelector:'img',activeSlide:0,autoPlay:false,showPlayButton:false,pauseOnNavigate:false,wrap:false,freezeOnHover:false,navigationOnHover:false,hideNavigation:false,width:null,height:null,constructor:function(elId,config){config=config||{};Ext.apply(this,config);Ext.ux.Carousel.superclass.constructor.call(this,config);this.addEvents('beforeprev','prev','beforenext','next','change','play','pause','freeze','unfreeze');this.el=Ext.get(elId);this.slides=this.els=[];if(this.autoPlay||this.showPlayButton){this.wrap=true;};if(this.autoPlay&&typeof config.showPlayButton==='undefined'){this.showPlayButton=true;}
this.initMarkup();this.initEvents();if(this.carouselSize>0){this.refresh();}},initMarkup:function(){var dh=Ext.DomHelper;this.carouselSize=0;var items=this.el.select(this.itemSelector);this.els.container=dh.append(this.el,{cls:'ux-carousel-container'},true);this.els.slidesWrap=dh.append(this.els.container,{cls:'ux-carousel-slides-wrap'},true);this.els.navigation=dh.append(this.els.container,{cls:'ux-carousel-nav'},true).hide();this.els.caption=dh.append(this.els.navigation,{tag:'h2',cls:'ux-carousel-caption'},true);this.els.navNext=dh.append(this.els.navigation,{tag:'a',href:'#',cls:'ux-carousel-nav-next'},true);if(this.showPlayButton){this.els.navPlay=dh.append(this.els.navigation,{tag:'a',href:'#',cls:'ux-carousel-nav-play'},true)}
this.els.navPrev=dh.append(this.els.navigation,{tag:'a',href:'#',cls:'ux-carousel-nav-prev'},true);this.slideWidth=this.width||this.el.getWidth(true);this.slideHeight=this.height||this.el.getHeight(true);this.els.container.setStyle({width:this.slideWidth+'px',height:this.slideHeight+'px'});this.els.caption.setWidth((this.slideWidth-(this.els.navNext.getWidth()*2)-(this.showPlayButton?this.els.navPlay.getWidth():0)-20)+'px')
items.appendTo(this.els.slidesWrap).each(function(item){item=item.wrap({cls:'ux-carousel-slide'});this.slides.push(item);item.setWidth(this.slideWidth+'px').setHeight(this.slideHeight+'px');},this);this.carouselSize=this.slides.length;if(this.navigationOnHover){this.els.navigation.setStyle('top',(-1*this.els.navigation.getHeight())+'px');}
this.el.clip();},initEvents:function(){this.els.navPrev.on('click',function(ev){ev.preventDefault();var target=ev.getTarget();target.blur();if(Ext.fly(target).hasClass('ux-carousel-nav-disabled'))return;this.prev();},this);this.els.navNext.on('click',function(ev){ev.preventDefault();var target=ev.getTarget();target.blur();if(Ext.fly(target).hasClass('ux-carousel-nav-disabled'))return;this.next();},this);if(this.showPlayButton){this.els.navPlay.on('click',function(ev){ev.preventDefault();ev.getTarget().blur();if(this.playing){this.pause();}
else{this.play();}},this);};if(this.freezeOnHover){this.els.container.on('mouseenter',function(){if(this.playing){this.fireEvent('freeze',this.slides[this.activeSlide]);Ext.TaskMgr.stop(this.playTask);}},this);this.els.container.on('mouseleave',function(){if(this.playing){this.fireEvent('unfreeze',this.slides[this.activeSlide]);Ext.TaskMgr.start(this.playTask);}},this,{buffer:(this.interval/2)*1000});};if(this.navigationOnHover){this.els.container.on('mouseenter',function(){if(!this.navigationShown){this.navigationShown=true;this.els.navigation.stopFx(false).shift({y:this.els.container.getY(),duration:this.transitionDuration})}},this);this.els.container.on('mouseleave',function(){if(this.navigationShown){this.navigationShown=false;this.els.navigation.stopFx(false).shift({y:this.els.navigation.getHeight()-this.els.container.getY(),duration:this.transitionDuration})}},this);}
if(this.interval&&this.autoPlay){this.play();};},prev:function(){if(this.fireEvent('beforeprev')===false){return;}
if(this.pauseOnNavigate){this.pause();}
this.setSlide(this.activeSlide-1);this.fireEvent('prev',this.activeSlide);return this;},next:function(){if(this.fireEvent('beforenext')===false){return;}
if(this.pauseOnNavigate){this.pause();}
this.setSlide(this.activeSlide+1);this.fireEvent('next',this.activeSlide);return this;},play:function(){if(!this.playing){this.playTask=this.playTask||{run:function(){this.playing=true;this.setSlide(this.activeSlide+1);},interval:this.interval*1000,scope:this};this.playTaskBuffer=this.playTaskBuffer||new Ext.util.DelayedTask(function(){Ext.TaskMgr.start(this.playTask);},this);this.playTaskBuffer.delay(this.interval*1000);this.playing=true;if(this.showPlayButton){this.els.navPlay.addClass('ux-carousel-playing');}
this.fireEvent('play');}
return this;},pause:function(){if(this.playing){Ext.TaskMgr.stop(this.playTask);this.playTaskBuffer.cancel();this.playing=false;if(this.showPlayButton){this.els.navPlay.removeClass('ux-carousel-playing');}
this.fireEvent('pause');}
return this;},clear:function(){this.els.slidesWrap.update('');this.slides=[];this.carouselSize=0;this.pause();return this;},add:function(el,refresh){var item=Ext.fly(el).appendTo(this.els.slidesWrap).wrap({cls:'ux-carousel-slide'});item.setWidth(this.slideWidth+'px').setHeight(this.slideHeight+'px');this.slides.push(item);if(refresh){this.refresh();}
return this;},refresh:function(){this.carouselSize=this.slides.length;this.els.slidesWrap.setWidth((this.slideWidth*this.carouselSize)+'px');if(this.carouselSize>0){if(!this.hideNavigation)this.els.navigation.show();this.activeSlide=0;this.setSlide(0,true);}
return this;},setSlide:function(index,initial){if(!this.wrap&&!this.slides[index]){return;}
else if(this.wrap){if(index<0){index=this.carouselSize-1;}
else if(index>this.carouselSize-1){index=0;}}
if(!this.slides[index]){return;}
this.els.caption.update(this.slides[index].child(':first-child',true).title||'');var offset=index*this.slideWidth;if(!initial){switch(this.transitionType){case'fade':this.slides[index].setOpacity(0);this.slides[this.activeSlide].stopFx(false).fadeOut({duration:this.transitionDuration/2,callback:function(){this.els.slidesWrap.setStyle('left',(-1*offset)+'px');this.slides[this.activeSlide].setOpacity(1);this.slides[index].fadeIn({duration:this.transitionDuration/2});},scope:this})
break;default:var xNew=(-1*offset)+this.els.container.getX();this.els.slidesWrap.stopFx(false);this.els.slidesWrap.shift({duration:this.transitionDuration,x:xNew,easing:this.transitionEasing});break;}}
else{this.els.slidesWrap.setStyle('left','0');}
this.activeSlide=index;this.updateNav();this.fireEvent('change',this.slides[index],index);},updateNav:function(){this.els.navPrev.removeClass('ux-carousel-nav-disabled');this.els.navNext.removeClass('ux-carousel-nav-disabled');if(!this.wrap){if(this.activeSlide===0){this.els.navPrev.addClass('ux-carousel-nav-disabled');}
if(this.activeSlide===this.carouselSize-1){this.els.navNext.addClass('ux-carousel-nav-disabled');}}}});;function sencha_nav(){var nav_items=Ext.select('#util-nav li.with-sub, #siteNav li.with-sub, #nav li.with-sub'),previousMenu,navTimeout;function enter(e,t){var obj=Ext.get(this);clearTimeout(navTimeout);if(previousMenu&&previousMenu!==obj){previousMenu.removeClass('hover');previousMenu.select(".pop-nav").hide();}
obj.addClass('hover');obj.select(".pop-nav").show();previousMenu=obj;}
function leave(e,t){var obj=Ext.get(this);navTimeout=setTimeout(function(){if(obj!==null){obj.removeClass('hover');obj.select(".pop-nav").hide();}},300);}
nav_items.on('mouseenter',enter);nav_items.on('mouseleave',leave);}
function sencha_table_stripe(){Ext.select('table.striped tbody tr:odd').addClass('alt');}
function sencha_disable_on_submit(){Ext.select('.mainsite form').on('submit',function(e,t){var form=Ext.get(this);Ext.select('*[type=submit]',this).each(function(){this.addClass('disabled');this.dom.disabled=true;this.on('click',function(e){e.preventDefault();});});});}
function sencha_separate_pricing(){var checkbox=Ext.select('#view-separate');if(checkbox){checkbox.on('click',function(e,t){obj=Ext.getDom(this);extras=Ext.select('.separate');if(obj.checked==true){extras.setStyle('display','block');}else{extras.setStyle('display','none');}});}}
function sencha_ie_stack_fix(elem_list){var elements=Ext.select(elem_list);var z_index=100;elements.each(function(obj){obj.setStyle('z-index',z_index);z_index-=1;});}
function sencha_show_info_cell(){var links=Ext.select('.with-info .view-more');if(links){links.on('click',function(e,t){e.preventDefault();info_elem=Ext.get(this).next('.info');if(info_elem.getStyle('display')=='none'){Ext.fly(this).dom.innerHTML="less info";info_elem.setStyle('display','block');}else{Ext.fly(this).dom.innerHTML="more info";info_elem.setStyle('display','none');}});}}
function sencha_home_carousel(){if(Ext.get('home-carousel')){var navlinks=Ext.select('#feature-nav li a'),container=Ext.get('feature-nav');var carousel=new Ext.ux.Carousel('home-carousel',{itemSelector:'li',hideNavigation:true,pauseOnNavigate:true,autoPlay:true,interval:6});Ext.get(navlinks.elements[0]).addClass('active');Ext.get('home-carousel').hover(function(){carousel.pause();},function(){carousel.play();});navlinks.on('click',function(e,el){carousel.setSlide(navlinks.indexOf(el));e.preventDefault();});carousel.on('change',function(c,i){Ext.select('#feature-nav .active').removeClass('active');Ext.get(navlinks.elements[i]).addClass('active');});}
if(Ext.get('home-news')){var newsCarousel=new Ext.ux.Carousel('home-news',{itemSelector:'li',freezeOnHover:true,hideNavigation:true,interval:6,autoPlay:true,transitionType:'fade'})}}
function sencha_lightboxes(){if(Ext.ux.Lightbox){Ext.ux.Lightbox.register('a.lightbox');Ext.ux.Lightbox.register('a.lightbox-set',true);Ext.ux.Lightbox.registerDiv('a.lightbox-open','.lightbox-div');}}
function sencha_trackHomepageClicks(){Ext.select('body.ga-test #nav a').on('click',function(){_gaq.push(['_trackEvent','HomepageLinkTest','Nav',Ext.get(this).getAttribute('href')]);});Ext.select('body.ga-test .home-products a').on('click',function(){_gaq.push(['_trackEvent','HomepageLinkTest','Callout',Ext.get(this).getAttribute('href')]);});Ext.select('body.ga-test #footer a').on('click',function(){_gaq.push(['_trackEvent','HomepageLinkTest','Footer',Ext.get(this).getAttribute('href')]);});}
function sencha_trackCacheflyClicks(){Ext.select('a[href^=http://extjs.cachefly.net]').on('click',function(e){_gaq.push(['_trackPageview',e.target.href]);});}
Ext.onReady(function(){sencha_nav();sencha_table_stripe();sencha_separate_pricing();sencha_show_info_cell();sencha_home_carousel();sencha_lightboxes();sencha_disable_on_submit();if(Ext.isIE7||Ext.isIE6){sencha_ie_stack_fix('.detail-list > li');}});var _gaq=_gaq||[];_gaq.push(['_setAccount','UA-1396058-1']);_gaq.push(['_trackPageview']);_gaq.push(['_trackPageLoadTime']);