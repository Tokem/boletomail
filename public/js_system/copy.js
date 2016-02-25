$(document).ready(function(){
		
		$("a.copy").zclip({
			path:'../js_system//ZeroClipboard.swf',
			copy:$('#teste').val(),
			beforeCopy:function(){
				alert("depois");
			},
			afterCopy:function(){
				alert("antes");
			}
		});

})