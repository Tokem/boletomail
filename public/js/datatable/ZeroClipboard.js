var ZeroClipboard_TableTools={version:"1.0.4-TableTools2",clients:{},moviePath:"",nextId:1,$:function(a){if(typeof(a)=="string"){a=document.getElementById(a)}if(!a.addClass){a.hide=function(){this.style.display="none"};a.show=function(){this.style.display=""};a.addClass=function(b){this.removeClass(b);this.className+=" "+b};a.removeClass=function(b){this.className=this.className.replace(new RegExp("\\s*"+b+"\\s*")," ").replace(/^\s+/,"").replace(/\s+$/,"")};a.hasClass=function(b){return !!this.className.match(new RegExp("\\s*"+b+"\\s*"))}}return a},setMoviePath:function(a){this.moviePath=a},dispatch:function(d,b,c){var a=this.clients[d];if(a){a.receiveEvent(b,c)}},register:function(b,a){this.clients[b]=a},getDOMObjectPosition:function(b){var a={left:0,top:0,width:b.width?b.width:b.offsetWidth,height:b.height?b.height:b.offsetHeight};if(b.style.width!=""){a.width=b.style.width.replace("px","")}if(b.style.height!=""){a.height=b.style.height.replace("px","")}while(b){a.left+=b.offsetLeft;a.top+=b.offsetTop;b=b.offsetParent}return a},Client:function(a){this.handlers={};this.id=ZeroClipboard_TableTools.nextId++;this.movieId="ZeroClipboard_TableToolsMovie_"+this.id;ZeroClipboard_TableTools.register(this.id,this);if(a){this.glue(a)}}};ZeroClipboard_TableTools.Client.prototype={id:0,ready:false,movie:null,clipText:"",fileName:"",action:"copy",handCursorEnabled:true,cssEffects:true,handlers:null,sized:false,glue:function(c,d){this.domElement=ZeroClipboard_TableTools.$(c);var e=99;if(this.domElement.style.zIndex){e=parseInt(this.domElement.style.zIndex)+1}var b=ZeroClipboard_TableTools.getDOMObjectPosition(this.domElement);this.div=document.createElement("div");var a=this.div.style;a.position="absolute";a.left="0px";a.top="0px";a.width=(b.width)+"px";a.height=b.height+"px";a.zIndex=e;if(typeof d!="undefined"&&d!=""){this.div.title=d}if(b.width!=0&&b.height!=0){this.sized=true}if(this.domElement){this.domElement.appendChild(this.div);this.div.innerHTML=this.getHTML(b.width,b.height)}},positionElement:function(){var c=ZeroClipboard_TableTools.getDOMObjectPosition(this.domElement);var b=this.div.style;b.position="absolute";b.width=c.width+"px";b.height=c.height+"px";if(c.width!=0&&c.height!=0){this.sized=true}else{return}var a=this.div.childNodes[0];a.width=c.width;a.height=c.height},getHTML:function(d,a){var c="";var b="id="+this.id+"&width="+d+"&height="+a;if(navigator.userAgent.match(/MSIE/)){var e=location.href.match(/^https/i)?"https://":"http://";c+='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="'+e+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="'+d+'" height="'+a+'" id="'+this.movieId+'" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="'+ZeroClipboard_TableTools.moviePath+'" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="'+b+'"/><param name="wmode" value="transparent"/></object>'}else{c+='<embed id="'+this.movieId+'" src="'+ZeroClipboard_TableTools.moviePath+'" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="'+d+'" height="'+a+'" name="'+this.movieId+'" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+b+'" wmode="transparent" />'}return c},hide:function(){if(this.div){this.div.style.left="-2000px"}},show:function(){this.reposition()},destroy:function(){if(this.domElement&&this.div){this.hide();this.div.innerHTML="";var a=document.getElementsByTagName("body")[0];try{a.removeChild(this.div)}catch(b){}this.domElement=null;this.div=null}},reposition:function(c){if(c){this.domElement=ZeroClipboard_TableTools.$(c);if(!this.domElement){this.hide()}}if(this.domElement&&this.div){var b=ZeroClipboard_TableTools.getDOMObjectPosition(this.domElement);var a=this.div.style;a.left=""+b.left+"px";a.top=""+b.top+"px"}},clearText:function(){this.clipText="";if(this.ready){this.movie.clearText()}},appendText:function(a){this.clipText+=a;if(this.ready){this.movie.appendText(a)}},setText:function(a){this.clipText=a;if(this.ready){this.movie.setText(a)}},setCharSet:function(a){this.charSet=a;if(this.ready){this.movie.setCharSet(a)}},setBomInc:function(a){this.incBom=a;if(this.ready){this.movie.setBomInc(a)}},setFileName:function(a){this.fileName=a;if(this.ready){this.movie.setFileName(a)}},setAction:function(a){this.action=a;if(this.ready){this.movie.setAction(a)}},addEventListener:function(a,b){a=a.toString().toLowerCase().replace(/^on/,"");if(!this.handlers[a]){this.handlers[a]=[]}this.handlers[a].push(b)},setHandCursor:function(a){this.handCursorEnabled=a;if(this.ready){this.movie.setHandCursor(a)}},setCSSEffects:function(a){this.cssEffects=!!a},receiveEvent:function(d,e){d=d.toString().toLowerCase().replace(/^on/,"");switch(d){case"load":this.movie=document.getElementById(this.movieId);if(!this.movie){var c=this;setTimeout(function(){c.receiveEvent("load",null)},1);return}if(!this.ready&&navigator.userAgent.match(/Firefox/)&&navigator.userAgent.match(/Windows/)){var c=this;setTimeout(function(){c.receiveEvent("load",null)},100);this.ready=true;return}this.ready=true;this.movie.clearText();this.movie.appendText(this.clipText);this.movie.setFileName(this.fileName);this.movie.setAction(this.action);this.movie.setCharSet(this.charSet);this.movie.setBomInc(this.incBom);this.movie.setHandCursor(this.handCursorEnabled);break;case"mouseover":if(this.domElement&&this.cssEffects){if(this.recoverActive){this.domElement.addClass("active")}}break;case"mouseout":if(this.domElement&&this.cssEffects){this.recoverActive=false;if(this.domElement.hasClass("active")){this.domElement.removeClass("active");this.recoverActive=true}}break;case"mousedown":if(this.domElement&&this.cssEffects){this.domElement.addClass("active")}break;case"mouseup":if(this.domElement&&this.cssEffects){this.domElement.removeClass("active");this.recoverActive=false}break}if(this.handlers[d]){for(var b=0,a=this.handlers[d].length;b<a;b++){var f=this.handlers[d][b];if(typeof(f)=="function"){f(this,e)}else{if((typeof(f)=="object")&&(f.length==2)){f[0][f[1]](this,e)}else{if(typeof(f)=="string"){window[f](this,e)}}}}}}};