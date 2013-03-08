
var sections = window.sections || {} ;

(function() {

	var el;

	var numImages = 8;
	var imagesLoaded = 0;
	var imageArray = [];
	var haveImagesLoaded = false;
	var defaultURL = "";
	var prevImage;

	var timer = null;

	sections.main = function() {

		el = $("#main-logo");
	
		defaultURL = el.css("background-image");

		init();

		el.mouseover(function(){
			if(haveImagesLoaded)
			{
				loopImages();
			}
				
			


		});

		el.mouseout(function(){
			clearTimeout(timer);
			
			$("#main-logo").css("background-image" , defaultURL);
				

		});

	

	};

	sections.main.prototype = {

		
	};

	var init = function(){

		loadImages();


	};

	var loadImages = function(){

		var urlRoot = assets + "images/special/logoAnimation/";

		var extension = misc.getExtension(imagesLoaded);
		
		var frameURL = "iconLayers" + "_" + extension +".png";
		var theURL = urlRoot +  frameURL ;
		
	
		var tempImage = new Image;
		
		tempImage.src = theURL;
		tempImage.onload = function(){ addImage( tempImage ); };
			
		

	};

	var addImage = function(img){
		imagesLoaded++;
		imageArray.push(img);
		console.log(img);
		if(imagesLoaded == numImages)
		{
			haveImagesLoaded = true;
		}
		else loadImages();
	};

	var loopImages = function(){

		var theLogo = $("#main-logo");

		var randomImage = Math.floor(Math.random() * numImages);

		while(randomImage == prevImage)
		{
			console.log("match");
		 randomImage = Math.floor(Math.random() * numImages);
		}
		
		prevImage = randomImage;

		var tempImageSrc = imageArray[randomImage].src;
		theLogo.css("background-image" , "url('" + tempImageSrc + "')");

			
			
			

			
			timer = setTimeout(	loopImages , 500);


		

	};

	var render = function(){
		
		
	};

	


})();