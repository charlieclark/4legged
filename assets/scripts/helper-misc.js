var helper = window.helper || {} ;

(function() {
	

	helper.misc = function() {

		
		
	};

	helper.misc.prototype = {


		getExtension : function( frameNum)
		{

			var extension = String(frameNum);

			var extensionPrefix="";

			for (var i = 0 ; i < 5 - extension.length ; i++ )
			{
				extensionPrefix += "0";
			}

			return(extensionPrefix+extension);

		}

		
	};




		


	


})();