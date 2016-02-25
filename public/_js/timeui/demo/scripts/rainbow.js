window.Rainbow=(function(){var h={},y={},d={},v={},a=0,w=0,t=0,p=0,n,q;function g(I,F,G,H){var E=(I.getAttribute&&I.getAttribute(F))||0;if(!E){G=I.attributes;for(H=0;H<G.length;++H){if(G[H].nodeName===F){return G[H].nodeValue}}}return E}function u(E,F){E.className+=E.className?" "+F:F}function e(E,F){return(" "+E.className+" ").indexOf(" "+F+" ")>-1}function z(G){var H=g(G,"data-language")||g(G.parentNode,"data-language");if(!H){var F=/\blang(?:uage)?-(\w+)/,E=G.className.match(F)||G.parentNode.className.match(F);if(E){H=E[1]}}return H}function s(E){return E}function C(H,F,G,E){if(G>=H&&G<F){return true}return E>H&&E<F}function l(H,F,G,E){if(G==H&&E==F){return false}return G<=H&&E>=F}function r(G,E){for(var F in y[a]){F=parseInt(F,10);if(l(F,y[a][F],G,E)){delete y[a][F];delete h[a][F]}if(C(F,y[a][F],G,E)){return true}}return false}function c(E,F){return'<span class="'+E.replace(/\./g," ")+(n?" "+n:"")+'">'+F+"</span>"}function B(G,E){var F=0,H;for(H=1;H<E;++H){if(G[H]){F+=G[H].length}}return F}function b(M,J,E,P){var H=M.exec(E);if(!H){return P()}++t;if(!J.name&&typeof J.matches[0]=="string"){J.name=J.matches[0];delete J.matches[0]}var G=H[0],I=H.index,O=H[0].length+I,L=function(){var Q=function(){b(M,J,E,P)};return t%100>0?Q():setTimeout(Q,0)};if(r(I,O)){return L()}var K=function(Q){if(J.name){Q=c(J.name,Q)}if(!h[a]){h[a]={};y[a]={}}h[a][I]={replace:H[0],"with":Q};y[a][I]=O;L()},F=m(J.matches),N=function(T,Q,Y){if(T>=Q.length){return Y(G)}var V=function(){N(++T,Q,Y)},R=H[Q[T]];if(!R){return V()}var X=J.matches[Q[T]],S=X.language,U=X.name&&X.matches?X.matches:X,W=function(ab,aa,Z){G=x(B(H,Q[T]),ab,Z?c(Z,aa):aa,G);V()};if(S){return j(R,S,function(Z){W(R,Z)})}if(typeof X==="string"){return W(R,R,X)}k(R,U.length?U:[U],function(Z){W(R,Z,X.matches?X.name:0)})};N(0,F,K)}function i(E){return v[E]}function f(G){var F=d[G]||[],E=d[w]||[];return i(G)?F:F.concat(E)}function x(E,F,I,G){var H=G.substr(E);return G.substr(0,E)+H.replace(F,I)}function m(G){var E=[],H,I;for(var F in G){if(G.hasOwnProperty(F)){E.push(F)}}return E.sort(function(K,J){return J-K})}function k(G,F,H){++a;function E(J,I){if(I<J.length){return b(J[I]["pattern"],J[I],G,function(){E(J,++I)})}A(G,function(K){delete h[a];delete y[a];--a;H(K)})}E(F,0)}function A(G,H){function E(M,I,J,N){if(J<I.length){++p;var O=I[J],L=h[a][O];M=x(O,L.replace,L["with"],M);var K=function(){E(M,I,++J,N)};return p%250>0?K():setTimeout(K,0)}N(M)}var F=m(h[a]);E(G,F,0,H)}function j(F,H,G){var E=f(H);k(s(F),E,G)}function D(G,E,F){if(E<G.length){var H=G[E],I=z(H);if(!e(H,"rainbow")&&I){I=I.toLowerCase();u(H,"rainbow");return j(H.innerHTML,I,function(J){H.innerHTML=J;h={};y={};if(q){q(H,I)}setTimeout(function(){D(G,++E,F)},0)})}return D(G,++E,F)}if(F){F()}}function o(H,K){H=H&&typeof H.getElementsByTagName=="function"?H:document;var E=H.getElementsByTagName("pre"),J=H.getElementsByTagName("code"),G,I=[],F=[];for(G=0;G<E.length;++G){if(E[G].getElementsByTagName("code").length){E[G].innerHTML=E[G].innerHTML.replace(/^\s+/,"").replace(/\s+$/,"");continue}I.push(E[G])}for(G=0;G<J.length;++G){F.push(J[G])}D(F.concat(I),0,K)}return{extend:function(G,E,F){if(arguments.length==1){E=G;G=w}v[G]=F;d[G]=E.concat(d[G]||[])},onHighlight:function(E){q=E},addClass:function(E){n=E},color:function(){if(typeof arguments[0]=="string"){return j(arguments[0],arguments[1],arguments[2])}if(typeof arguments[0]=="function"){return o(0,arguments[0])}o(arguments[0],arguments[1])}}})();(function(){if(document.addEventListener){return document.addEventListener("DOMContentLoaded",Rainbow.color,false)}window.attachEvent("onload",Rainbow.color)})();Rainbow.onHighlight=Rainbow.onHighlight;Rainbow.addClass=Rainbow.addClass;Rainbow.extend([{matches:{1:{name:"keyword.operator",pattern:/\=/g},2:{name:"string",matches:{name:"constant.character.escape",pattern:/\\('|"){1}/g}}},pattern:/(\(|\s|\[|\=|:)(('|")([^\\\1]|\\.)*?(\3))/gm},{name:"comment",pattern:/\/\*[\s\S]*?\*\/|(\/\/|\#)[\s\S]*?$/gm},{name:"constant.numeric",pattern:/\b(\d+(\.\d+)?(e(\+|\-)?\d+)?(f|d)?|0x[\da-f]+)\b/gi},{matches:{1:"keyword"},pattern:/\b(and|array|as|b(ool(ean)?|reak)|c(ase|atch|har|lass|on(st|tinue))|d(ef|elete|o(uble)?)|e(cho|lse(if)?|xit|xtends|xcept)|f(inally|loat|or(each)?|unction)|global|if|import|int(eger)?|long|new|object|or|pr(int|ivate|otected)|public|return|self|st(ring|ruct|atic)|switch|th(en|is|row)|try|(un)?signed|var|void|while)(?=\(|\b)/gi},{name:"constant.language",pattern:/true|false|null/g},{name:"keyword.operator",pattern:/\+|\!|\-|&(gt|lt|amp);|\||\*|\=/g},{matches:{1:"function.call"},pattern:/(\w+?)(?=\()/g},{matches:{1:"storage.function",2:"entity.name.function"},pattern:/(function)(?=\s)(.*?)(?=\()/g}]);Rainbow.extend("javascript",[{name:"selector",pattern:/(\s|^)\$(?=\.|\()/g},{name:"support",pattern:/\b(window|document)\b/g},{matches:{1:"support.property"},pattern:/\.(length|node(Name|Value))\b/g},{matches:{1:"support.function"},pattern:/(setTimeout|setInterval)(?=\()/g},{matches:{1:"support.method"},pattern:/\.(getAttribute|push|getElementById|getElementsByClassName|log|setTimeout|setInterval)(?=\()/g},{matches:{1:"support.tag.script",2:[{name:"string",pattern:/('|")(.*?)(\1)/g},{name:"entity.tag.script",pattern:/(\w+)/g}],3:"support.tag.script"},pattern:/(&lt;\/?)(script.*?)(&gt;)/g},{name:"string.regexp",matches:{1:"string.regexp.open",2:{name:"constant.regexp.escape",pattern:/\\(.){1}/g},3:"string.regexp.close",4:"string.regexp.modifier"},pattern:/(\/)(?!\*)(.+)(\/)([igm]{0,3})/g},{matches:{1:"storage",3:"entity.function"},pattern:/(var)?(\s|^)(\S*)(?=\s?=\s?function\()/g},{matches:{1:"keyword",2:"entity.function"},pattern:/(new\s+)(.*)(?=\(.+\)$)/g},{name:"entity.function",pattern:/(\w+)(?=:\s{0,}function)/g}]);Rainbow.extend("html",[{name:"source.php.embedded",matches:{2:{language:"php"}},pattern:/&lt;\?=?(?!xml)(php)?([\s\S]*?)(\?&gt;)/gm},{name:"source.css.embedded",matches:{0:{language:"css"}},pattern:/&lt;style(.*?)&gt;([\s\S]*?)&lt;\/style&gt;/gm},{name:"source.js.embedded",matches:{0:{language:"javascript"}},pattern:/&lt;script(?! src)(.*?)&gt;([\s\S]*?)&lt;\/script&gt;/gm},{name:"comment.html",pattern:/&lt;\!--[\S\s]*?--&gt;/g},{matches:{1:"support.tag.open",2:"support.tag.close"},pattern:/(&lt;)|(\/?\??&gt;)/g},{name:"support.tag",matches:{1:"support.tag",2:"support.tag.special",3:"support.tag-name"},pattern:/(&lt;\??)(\/|\!?)(\w+)/g},{matches:{1:"support.attribute"},pattern:/([a-z-]+)(?=\=)/gi},{matches:{1:"support.operator",2:"string.quote",3:"string.value",4:"string.quote"},pattern:/(=)('|")(.*?)(\2)/g},{matches:{1:"support.operator",2:"support.value"},pattern:/(=)([a-zA-Z\-0-9]*)\b/g},{matches:{1:"support.attribute"},pattern:/\s(\w+)(?=\s|&gt;)(?![\s\S]*&lt;)/g}],true);Rainbow.extend("css",[{name:"comment",pattern:/\/\*[\s\S]*?\*\//gm},{name:"constant.hex-color",pattern:/#([a-f0-9]{3}|[a-f0-9]{6})(?=;|\s|,|\))/gi},{matches:{1:"constant.numeric",2:"keyword.unit"},pattern:/(\d+)(px|em|cm|s|%)?/g},{name:"string",pattern:/('|")(.*?)\1/g},{name:"support.css-property",matches:{1:"support.vendor-prefix"},pattern:/(-o-|-moz-|-webkit-|-ms-)?[\w-]+(?=\s?:)(?!.*\{)/g},{matches:{1:[{name:"entity.name.sass",pattern:/&amp;/g},{name:"direct-descendant",pattern:/&gt;/g},{name:"entity.name.class",pattern:/\.[\w\-_]+/g},{name:"entity.name.id",pattern:/\#[\w\-_]+/g},{name:"entity.name.pseudo",pattern:/:[\w\-_]+/g},{name:"entity.name.tag",pattern:/\w+/g}]},pattern:/([\w\ ,\n:\.\#\&\;\-_]+)(?=.*\{)/g},{matches:{2:"support.vendor-prefix",3:"support.css-value"},pattern:/(:|,)\s*(-o-|-moz-|-webkit-|-ms-)?([a-zA-Z-]*)(?=\b)(?!.*\{)/g}],true);window.Rainbow.extend("javascript",[{name:"null",pattern:/\b(null|undefined)\b/g},{name:"line-break",pattern:/\n/g},{name:"line-space",pattern:/ +/g},{name:"html-link",pattern:/<a.+>.+<\/a>/g}]);window.Rainbow.extend("html",[{name:"line-break",pattern:/\n/g},{name:"line-space",pattern:/ +/g}]);window.Rainbow.extend("css",[{name:"comment",pattern:/\/\*[\s\S]*?\*\//gm},{matches:{1:"constant.numeric",2:"keyword.unit"},pattern:/(-?\d+)(em|px|cm|s|%)?/g}],true);