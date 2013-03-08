var sections = window.sections || {} ;

(function() {

	var el;
	var numFrames = 6;
	var animationsLoaded = 0;
	var framesLoaded = 0;
	var animationLengths = new Array(60 , 60 , 60 , 60 , 60 , 60);// , 0 , 0 , 0 , 0);
	var animationArray=new Array();
	var animationForward = true;
	var theTimer;
	var curAnimation;
	var isStopped = true;

	var skipNum = 3;

	var theLoader = new Image;


	sections.instructions = function() {

		theLoader.src = assets+"images/elements/loader.gif";
		console.log(theLoader);

		el= $("#instructions .inner");

		buildStructure();
		addNumbers();

		loadFrames(0,0);
	
		
		

	};

	sections.instructions.prototype = {

		
	};

	var buildStructure = function(){

		var structure = "<ul class='clearfix'>";

		for( var i=0; i < numFrames ; i++)
		{
			structure += "<li><img class='loader' src='" + theLoader.src +"'/></li>";
			tempArray = new Array();
			animationArray.push(tempArray);
		}

		structure += "</ul>";
		
		el.append(structure);

		var theList = el.find("li");


		theList.mouseout(function(){
			
			
			$(this).find(".circle").removeClass("active");
			clearTimeout(theTimer);	
			theList.each(function(){
				var index = $(this).index();
				if(animationsLoaded >= index)
				{
			
				resetAnimation($(this).index());
				}
			});

			
		});

		theList.mouseover(function(){ 
			var index = $(this).index();
			$(this).find(".circle").addClass("active");
			if(animationsLoaded >= index)
			{
			
				playAnimation(index , 0);
				curAnimation = index;

	

			}
		});

		

		

	};


	var loadFrames = function (animationNum , frameNum){

		if(frameNum >= animationLengths[animationNum])
		{
			console.log($("#instructions li"));
			$("#instructions li").eq(animationNum).find(".loader").addClass("hide");
			resetAnimation(animationNum);
			animationsLoaded++;
			framesLoaded = 0;
			loadFrames( animationsLoaded , 0);
		}
		else if(animationNum > numFrames)
		{
			loadingDone();
		}
		else if( animationNum < numFrames && frameNum < animationLengths[animationNum])
		{
			var tempImage = new Image;
			tempImage.src = animationURL(animationNum ,frameNum); 
			animationArray[animationsLoaded].push(tempImage);
			
	
			tempImage.onload=function(){
				
				framesLoaded+=skipNum;
				loadFrames(animationsLoaded , framesLoaded);
				
			}

		}

	};

	var loadingDone = function()
	{

	};

	var addNumbers = function(){

		var theList = el.find("li");
	


		for( var i = 0 ; i < numFrames ; i++)
		{

			var temp = theList.eq(i).append("<div class='circle'>"+ (i+1) +"</div>");

			var isEven = false;
			if ( i == 0 || i % 2 == 0 ) isEven = true;

			if(isEven)
			{
				temp.children(".circle").addClass("even");
			}


		}	

	};

	var playAnimation = function(animationNum , frameNum){

		
		if(frameNum*skipNum < animationLengths[animationNum])
		{
			theTimer = setTimeout(function(){
				changeBackground(animationNum , frameNum);
				playAnimation(animationNum , frameNum+1 );

			} , 30*skipNum);
		}
		else
		{
			playAnimation(animationNum , 0 );
		}

	};

	var changeBackground = function(animationNum , frameNum){

		var theElement = el.find("li").eq(animationNum);


		var theURL = animationArray[animationNum][frameNum].src;
		theElement.css("background-image" , "url(" + theURL +")");

	};

	var resetAnimation = function(num){


		var theElement = el.find("li").eq(num);
		var theURL = animationURL(num , 0);
		theElement.css("background-image" , "url(" + theURL +")");

	};

	var animationURL = function ( animationNum , frameNum ){

		var theURL = assets + "images/special/instructions/frame"+ animationNum + "/"; 

		var extension = misc.getExtension(frameNum);
		

		

		var frameURL = "animation" + (animationNum + 1) + "_" + extension +".png";
		theURL += frameURL ;
		return theURL;


	};

	


})();