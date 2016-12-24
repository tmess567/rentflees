Inject.rawModHtml('inject a script at the beginning of the head', function(html) {
    return html.replace('<head>', 
    	"<head>\
    		<div id='loading' \
    		style='display:flex; \
    			align-items: center;\
    			justify-content: center;\
    			position:fixed; \
    			width:100%; \
    			height:100vh;\
    			background:#EAEBED;\
    			z-index:10;'>\
    				<div id='loader_inner'>\
    					<img style='height:100vh;' src='images/loading.gif' /> \
    				</div>\
    		</div>");
});