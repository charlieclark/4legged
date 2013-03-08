var sections = window.sections || {} ;

(function() {


	sections.header = function() {

		var tempNav = $("#header ul");
		var tempWidth = 20;
		tempNav.children().each(function(){ tempWidth += $(this).outerWidth() });
		tempNav.css("width" , tempWidth);

	};

	sections.header.prototype = {

		
	};

	var render = function(){
		
		
	};

	


})();