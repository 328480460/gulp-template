//扩展tap事件
!function(a){var b={},c={};c.attachEvent=function(b,c,d){return"addEventListener"in a?b.addEventListener(c,d,!1):void 0},c.fireFakeEvent=function(a,b){return document.createEvent?a.target.dispatchEvent(c.createEvent(b)):void 0},c.createEvent=function(b){if(document.createEvent){var c=a.document.createEvent("HTMLEvents");return c.initEvent(b,!0,!0),c.eventName=b,c}},c.getRealEvent=function(a){return a.originalEvent&&a.originalEvent.touches&&a.originalEvent.touches.length?a.originalEvent.touches[0]:a.touches&&a.touches.length?a.touches[0]:a};var d=[{test:("propertyIsEnumerable"in a||"hasOwnProperty"in document)&&(a.propertyIsEnumerable("ontouchstart")||document.hasOwnProperty("ontouchstart")||a.hasOwnProperty("ontouchstart")),events:{start:"touchstart",move:"touchmove",end:"touchend"}},{test:a.navigator.msPointerEnabled,events:{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}},{test:a.navigator.pointerEnabled,events:{start:"pointerdown",move:"pointermove",end:"pointerup"}}];b.options={eventName:"tap",fingerMaxOffset:11};var e,f,g,h,i={};e=function(a){return c.attachEvent(document.documentElement,h[a],g[a])},g={start:function(a){a=c.getRealEvent(a),i.start=[a.pageX,a.pageY],i.offset=[0,0]},move:function(a){return i.start||i.move?(a=c.getRealEvent(a),i.move=[a.pageX,a.pageY],void(i.offset=[Math.abs(i.move[0]-i.start[0]),Math.abs(i.move[1]-i.start[1])])):!1},end:function(d){if(d=c.getRealEvent(d),i.offset[0]<b.options.fingerMaxOffset&&i.offset[1]<b.options.fingerMaxOffset&&!c.fireFakeEvent(d,b.options.eventName)){if(a.navigator.msPointerEnabled||a.navigator.pointerEnabled){var e=function(a){a.preventDefault(),d.target.removeEventListener("click",e)};d.target.addEventListener("click",e,!1)}d.preventDefault()}i={}},click:function(a){return c.fireFakeEvent(a,b.options.eventName)?void 0:a.preventDefault()}},f=function(){for(var a=0;a<d.length;a++)if(d[a].test){h=d[a].events,e("start"),e("move"),e("end");break}return c.attachEvent(document.documentElement,"click",g.click)},c.attachEvent(a,"load",f),"function"==typeof define&&define.amd?define(function(){return f(),b}):a.Tap=b}(window);

//使用时请阻止默认 e.preventDefault();



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

//动态设置rem
function SFS(){ 
    var client=document.documentElement.clientWidth;
    if(/samsung sm-n910h/.test(navigator.userAgent.toLowerCase())){
        var s=(client*100)/800;
    }else{
        var s=(client*100)/720;
    }
    document.getElementsByTagName('html')[0].style['font-size']=s+'px'; 
};
SFS();
window.onresize = function(){
    SFS();
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

// 解析url
String.prototype.parseURL = function(){
    var url =this.toString()
    var a = document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/'),
        params: (function() {
            var ret = {};
            var seg = a.search.replace(/^\?/, '').split('&').filter(function(v,i){
                if (v!==''&&v.indexOf('=')) {
                    return true;
                }
            });
            seg.forEach( function(element, index) {
                var idx = element.indexOf('=');
                var key = element.substring(0, idx);
                var val = element.substring(idx+1);
                ret[key] = val;
            });
            return ret;
        })()
    };
}