//移动端适配
(function(d,g){var s=d.document;var c=s.documentElement;var m=s.querySelector('meta[name="viewport"]');var p=s.querySelector('meta[name="flexible"]');var b=0;var r=0;var n;var e=g.flexible||(g.flexible={});if(m){console.warn("将根据已有的meta标签来设置缩放比例");var f=m.getAttribute("content").match(/initial\-scale=([\d\.]+)/);if(f){r=parseFloat(f[1]);b=parseInt(1/r)}}else{if(p){var l=p.getAttribute("content");if(l){var q=l.match(/initial\-dpr=([\d\.]+)/);var i=l.match(/maximum\-dpr=([\d\.]+)/);if(q){b=parseFloat(q[1]);r=parseFloat((1/b).toFixed(2))}if(i){b=parseFloat(i[1]);r=parseFloat((1/b).toFixed(2))}}}}if(!b&&!r){var j=d.navigator.appVersion.match(/android/gi);var k=d.navigator.appVersion.match(/iphone/gi);var o=d.devicePixelRatio;if(k){if(o>=3&&(!b||b>=3)){b=3}else{if(o>=2&&(!b||b>=2)){b=2}else{b=1}}}else{b=1}r=1/b}c.setAttribute("data-dpr",b);if(!m){m=s.createElement("meta");m.setAttribute("name","viewport");m.setAttribute("content","initial-scale="+r+", maximum-scale="+r+", minimum-scale="+r+", user-scalable=no");if(c.firstElementChild){c.firstElementChild.appendChild(m)}else{var h=s.createElement("div");h.appendChild(m);s.write(h.innerHTML)}}function a(){var t=c.getBoundingClientRect().width;if(t/b>540){t=540*b}var u=t/10;c.style.fontSize=u+"px";e.rem=d.rem=u}d.addEventListener("resize",function(){clearTimeout(n);n=setTimeout(a,300)},false);d.addEventListener("pageshow",function(t){if(t.persisted){clearTimeout(n);n=setTimeout(a,300)}},false);if(s.readyState==="complete"){s.body.style.fontSize=12*b+"px"}else{s.addEventListener("DOMContentLoaded",function(t){s.body.style.fontSize=12*b+"px"},false)}a();e.dpr=d.dpr=b;e.refreshRem=a;e.rem2px=function(u){var t=parseFloat(u)*this.rem;if(typeof u==="string"&&u.match(/rem$/)){t+="px"}return t};e.px2rem=function(u){var t=parseFloat(u)/this.rem;if(typeof u==="string"&&u.match(/px$/)){t+="rem"}return t}})(window,window.lib||(window.lib={}));

//解决ios双击页面上移问题
window.onload=function(){(function(){var b=navigator.userAgent.toLowerCase();var a=null;if(b.indexOf("iphone")>=0||b.indexOf("ipad")>=0){document.body.addEventListener("touchend",function(d){var c=new Date().getTime();a=a||c+1;var e=c-a;if(e<500&&e>0){d.preventDefault();return false}a=c},false)}})();};

//识别设备
(function() {
	var browser = navigator.userAgent.toLowerCase();
	var isAPP = /juaica/.test(browser) ? true : false;
	var isAndroid = browser.indexOf('android') > -1 || browser.indexOf('linux') > -1;
	var isIOS = !!browser.match(/\(i[^;]+;( u;)? cpu.+mac os x/);
	var version = isAndroid ? browser.substring(browser.indexOf('juaicai') + 17) : browser.substring(browser.indexOf('juaicai') + 13);		
	return versionMsg = {
		browser: browser,
		isAPP: isAPP,
		isAndroid: isAndroid,
		isIOS: isIOS,
		version: version
	};
})();


//解析url
function parseURL(url) { 
	var a = document.createElement('a'); 
	a.href = url; 
	return { 
		source: url, 
		protocol: a.protocol.replace(':',''), 
		host: a.hostname, 
		port: a.port, 
		query: a.search, 
		params: (function(){ 
			var ret = {}, 
			seg = a.search.replace(/^\?/,'').split('&'), 
			len = seg.length, i = 0, s; 
			for (;i<len;i++) { 
			if (!seg[i]) { continue; } 
				s = seg[i].split('='); 
				ret[s[0]] = s[1]; 
			} 
			return ret; 
		})(), 
		file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1], 
		hash: a.hash.replace('#',''), 
		path: a.pathname.replace(/^([^\/])/,'/$1'), 
		relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1], 
		segments: a.pathname.replace(/^\//,'').split('/') 
	}; 
};

/*
if(versionMsg.isAndroid){
    //以下是安卓调用方法

    //安卓设置title
    // window.androidShare.setActTitle("Plus聚粉社区");

    // 分享成功调用:
    //   window.androidShare.wxcallback(“true”)

    // 分享失败调用:
    //   window.androidShare.wxcallback(“false")

    // 跳转页面
    // window.androidShare.gotoPage(10000)
    // 10000：打开plus转盘页面
    // 10001：打开plus反馈页面
    // 10002：打开plus基金页面

    // 获取客户端当前用户信息
    // window.androidShare.getUserInfo()

}else if(versionMsg.isIOS){
    //以下是ios调用方法

    // ios设置title
    // setActTitle("Plus聚粉社区");

    // 分享成功调用:
    //    wxcallback(“true")

    // 分享失败调用:
    //    wxcallback("false")

    // 跳转页面
    // gotoPage(10000)

    // 获取客户端当前用户信息
    // getUserInfo()
}*/


