(function(){
	//判断是否为微信
	var isWeiXin = function(){
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	};
	function downloadRules(a){
			a = a||{};
			var opts = {
				"channelType":a.channelType || "channelType",
				"downloadButton":a.downloadButton || ".downloadButton",
				"plusOrjac":a.plusOrjac || "plus",
				"plusIsWeiXin":a.plusIsWeiXin || "http://a.app.qq.com/o/simple.jsp?pkgname=cn.jac.finance",               //iphone plus微信
				"jacIsIponeWeiXin":a.jacIsIponeWeiXin ||"http://a.app.qq.com/o/simple.jsp?pkgname=cn.jac.fund",           //iphone聚爱财微信
				"plusIsNotWeiXin":a.plusIsNotWeiXin || "https://itunes.apple.com/cn/app/ju-ai-caiplus/id981522006?mt=8",  //iphone plus非微信
				"jacIsNotWeiXin":a.jacIsNotWeiXin || "https://itunes.apple.com/cn/app/ju-ai-cai-li-cai/id947843524?mt=8", //iphone聚爱财非微信
				"openBrowser":a.openBrowser || "http://juaicaicn.oss-cn-beijing.aliyuncs.com/jacplus1166.apk",            //安卓App下载
				"androidNotWeiXinplus":a.androidNotWeiXinplus ||"http://juaicaicn.oss-cn-beijing.aliyuncs.com/jacplus",   //安卓plus非微信
				"androidNotWeiXinjac":a.androidNotWeiXinjac || "http://juaicaicn.oss-cn-beijing.aliyuncs.com/%E8%81%9A%E7%88%B1%E8%B4%A2",//安卓聚爱财非微信
				"debug": a.debug || false,
				"imgSrc":a.imgSrc||''
			};

			//获取地址栏地址
			var winHref = window.location.href;
			//判断是否为安卓APP
			var isApp = winHref.match(/isapp=y/);
			//匹配渠道号
			var qudaohaoNumber = 0;
			//检测渠道key值
			var key = "";
			if(opts.channelType != "channelType" && opts.channelType != "channelId"){
				qudaohaoNumber = getQueryString(opts.channelType);
			}else{
				key = winHref.match(/channelType|channelId/);
				if(!key){qudaohaoNumber = "000";}
				else{
					qudaohaoNumber = getQueryString(key[0]);
				}
				
			}
			//匹配渠道号方法、默认channerType
			function getQueryString(name) { 
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
				var r = window.location.search.substr(1).match(reg); 
				if (r != null) return unescape(r[2]); return "000"; 
			}
			
			//移动设备判断
			var browser = {
				versions: function() {
					var u = navigator.userAgent,
						app = navigator.appVersion;
					return { //移动终端浏览器版本信息 
						ios: !! u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
						//ios终端 
						android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
						//android终端或uc浏览器 
						iPhone: u.indexOf('iPhone') > -1,
						//是否为iPhone或者QQHD浏览器 
						iPad: u.indexOf('iPad') > -1,
						//是否iPad 
					};
				}(),
			};
			if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
				//判断是否为微信
				if (isWeiXin()) {
					//判断是否为plus还是聚爱财
					if(opts.plusOrjac == "plus"){
						
						$(opts.downloadButton).attr("href",opts.plusIsWeiXin);
					}else{
						$(opts.downloadButton).attr("href",opts.jacIsIponeWeiXin);
					}
				} else {
					//判断是否为plus还是聚爱财
					if(opts.plusOrjac == "plus"){
						$(opts.downloadButton).attr("href",opts.plusIsNotWeiXin);
					}else{
						$(opts.downloadButton).attr("href",opts.jacIsNotWeiXin);
					}
				}
			} else if (browser.versions.android) {
				//判断是否为app
				if(!!isApp){
					//alert('1')
					$(opts.downloadButton).attr("href","javascript:;");
					$(opts.downloadButton).on("touchstart",function(){
						window.androidShare.openBrowser(opts.openBrowser);
					});
				}else{

					//判断是否为微信
					debug({"imgSrc":opts.imgSrc,"plusOrjac":opts.plusOrjac,"debug":opts.debug,"btn":opts.downloadButton,"androidNotWeiXinplus":opts.androidNotWeiXinplus,"androidNotWeiXinjac":opts.androidNotWeiXinjac,"qudaohaoNumber":qudaohaoNumber});
				}
			} else {
				//判断是否为plus还是聚爱财
				if(opts.plusOrjac == "plus"){
					$(opts.downloadButton).attr("href",opts.androidNotWeiXinplus + qudaohaoNumber + ".apk");
				}else{

					$(opts.downloadButton).attr("href",opts.androidNotWeiXinjac + qudaohaoNumber + ".apk");
				}
			}
			
	}
	function debug(isDebug){
		var ifElse = null;
		if(isDebug.debug){
			ifElse = true;
		}else{
			ifElse = isWeiXin()	
		}
		if (ifElse) {
			//安卓微信里
			var count=0;
			$(isDebug.btn).attr("href","javascript:;");
			$(isDebug.btn).on("touchstart",function(){
				if(count!==0){
					console.log(11)
					return 
				}else{
					$(document.body).append(
						$('<div id="wx-tishi">'+
							'<p>点击右上角的“更多”，选则使用浏览器打开。</p>'+
							'<img src="'+isDebug.imgSrc+'">'+
						'</div>')
					);
					$(document.body).append(
						$('<style>'+
							'#wx-tishi{ position:absolute; top: -100px; width:80%; color:#FFF; padding:2px 10%; height:56px; line-height:22px; background-color:#d73037; overflow:hidden;}'+
							'#wx-tishi p{ width:81%; float:left;margin-top:4px; font-size:1.3em;}'+
							'#wx-tishi img{float:right; width:4em; padding-top:1em; margin-left:1%;position: absolute;}'+
							'#wx-tishi.weixinshow {position: absolute;box-shadow: 0 0 8px rgba(0,0,0,.6);top: 0px;transition: all .3s;-moz-transition: all .3s;-webkit-transition: all .3s;-o-transition: all .3s;z-index:100000;}'+
						'</style>')
					)
					$("#wx-tishi").addClass("weixinshow");
					count++;
				}
			});
		} else {
			//判断是否为plus还是聚爱财
			if(isDebug.plusOrjac == "plus"){
				$(isDebug.btn).attr("href",isDebug.androidNotWeiXinplus + isDebug.qudaohaoNumber + ".apk");
			}else{
				$(isDebug.btn).attr("href",isDebug.androidNotWeiXinjac + isDebug.qudaohaoNumber + ".apk");
			}
		}
	}
	window.downloadRules=downloadRules;
})();