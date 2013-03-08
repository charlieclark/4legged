var assets = "assets/";

var misc;

//items for scripts
var headerHeight = 40;
var parallaxObjectArray = new Array();


$(document).ready(function(){

		//do this first
		initPre();
			
		eventListeners();


	

		//initializing sections
		misc = new helper.misc();

		var header = new sections.header();
		var main = new sections.main();
		var intructions = new sections.instructions();


		//post

		initPost();

	

	});

	//init scripts and such

	function initPre(){
		
		// checkVisible(".section");
		// addParalax( $("#home .inner") , $("#home .inner").height() );
		// addParalax( $("#instructions .inner") , 500 );

		// $("#listContainer li").click(function(){

		// });
	};

	function initPost(){
		
		checkVisible(".section");
		//addParalax( $("#home .inner") , 200 );
		//addParalax( $("#instructions .inner") , 200 );

		// 	//arrow height

		var objectHeight = $("#home").outerHeight();

		 $(".down-arrow").offset( {top: objectHeight-100} );
	

		
	};
	function eventListeners(){

		 $(".down-arrow").click(function(){

		 	$("#listContainer li.about").click();

		 });

		$("#listContainer li").click(function(){

			var theElement;

			if($(this).hasClass("home")) { theElement =  $("#home"); }
			if($(this).hasClass("about")) { theElement =  $("#about"); }
			if($(this).hasClass("instructions")) { theElement =  $("#instructions"); }
			if($(this).hasClass("contact")) { theElement =  $("#contact"); }

			var _scrollTop = theElement.position().top - headerHeight;



			$("body").animate( {"scrollTop" : _scrollTop } , 500);

		});

		$("#test").click(function(){

			var emailaddress = $("#emailForm").val();

			if( isValidEmailAddress( emailaddress ) ) 
			{
				var theURL = assets + "php/email.php";
				console.log(theURL)

				$.get(theURL, {email: emailaddress} , function(data)
				{
					alert("you'll be hearing from us soon");
				});

			}
			else
			{
				alert("incorrect email");
			}

			
		});

		$(window).scroll(function(){
			
			checkVisible(".section");
			checkAllParallax();

		});

	};

	//FUNCTIONALYITY

	//check if email is valid
	function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
	};

	//VISIBLE

	function checkVisible(name){

		var scrollValue = $(window).scrollTop();

		$(name).each(function(){

			var divTop = $(this).position().top;
			var divBottom = divTop + $(this).outerHeight();
			var windowTop = scrollValue;
			var windowBottom = windowTop + $(window).height();

			if( !( (divTop > windowBottom && divBottom > windowBottom) || (divTop < windowTop && divBottom < windowTop) ) )
			{
				$(this).addClass("inView");
			}
			else
			{
				$(this).removeClass("inView");
			}

		});

	}


	// PARALAX

	function addParalax(_item , _multiplier)
	{
		var tempObject = new Object();

		var theHeight = _item.parent().outerHeight();
		//if(theHeight > $(window).height()) theHeight += (theHeight - $(window).height());


		_item.height(theHeight);
		_item.parent().height(theHeight);

	



		//_item.height();
		
		tempObject = {
			"item": _item,
			"initialPos": parseInt(_item.css("margin-top") , 10),
			"multiplier": _multiplier,
			"theHeight": theHeight
		}

		parallaxObjectArray.push(tempObject);

		checkParallax( parallaxObjectArray.length - 1 );
	}


	function checkParallax( i ){


		var selectedElement = parallaxObjectArray[i].item;
		var selectedTop = parallaxObjectArray[i].initialPos;
		var selectedMultiplier = parallaxObjectArray[i].multiplier;
		var selectedHeight = parallaxObjectArray[i].theHeight;

		var windowTop = $(window).scrollTop() + headerHeight;
		var parentTop = selectedElement.parent().position().top;
		var parentOffset = selectedElement.parent().offset().top;
		var windowOffset = -(parentTop - windowTop);

		var addedHeight = 0;

		if( selectedHeight > $(window).height() ) addedHeight = selectedHeight - $(window).height() ;

		selectedElement.height( 5000 );

		var ratio = windowOffset / (selectedHeight + addedHeight) ;




		selectedElement.css("margin-top" , Math.floor(selectedTop + ratio * selectedMultiplier));

	}

	function checkAllParallax(){

	
		for( var i = 0 ; i < parallaxObjectArray.length ; i++ )
		{
			if(parallaxObjectArray[i].item.parent().hasClass("inView"))
			{
				checkParallax(i);
			}
		}

	}
