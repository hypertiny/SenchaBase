/*
 * Ext Core Library 3.0
 * http://www.sencha.com
 * Copyright (c) 2006-2011 Sencha Inc.
 *
 * MIT Licensed - http://www.opensource.org/licenses/mit-license.php
 */

function leave(e,t){var obj=Ext.get(this);navTimeout=setTimeout(function(){if(obj!==null){obj.removeClass('hover');obj.select(".pop-nav").hide();}},300);}
function sencha_nav(){var nav_items=Ext.select('#util-nav li.with-sub, #siteNav li.with-sub, #nav li.with-sub'),previousMenu,navTimeout;function enter(e,t){var obj=Ext.get(this);clearTimeout(navTimeout);if(previousMenu&&previousMenu!==obj){previousMenu.removeClass('hover');previousMenu.select(".pop-nav").hide();}
obj.addClass('hover');obj.select(".pop-nav").show();previousMenu=obj;}
nav_items.on('mouseenter',enter);nav_items.on('mouseleave',leave);}
Ext.onReady(function(){sencha_nav();});
