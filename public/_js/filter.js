(function(a){jQuery.expr[":"].Contains=function(d,e,c){return(d.textContent||d.innerText||"").toUpperCase().indexOf(c[3].toUpperCase())>=0};function b(f,d){var e=a("<form>").attr({"class":"filterform form-search",action:"#"}),c=a("<input>").attr({"class":"filterinput",placeholder:"Type to Filter",type:"text"});a(e).append(c).appendTo(f);a(c).change(function(){var g=a(this).val();if(g){$matches=a(d).find("a:Contains("+g+")").parent();a("li",d).not($matches).slideUp();$matches.slideDown()}else{a(d).find("li").slideDown()}return false}).keyup(function(){a(this).change()})}a(function(){b(a("#form"),a("#slist"))})}(jQuery));