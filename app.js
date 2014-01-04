// model
;(function ($) {
	
	var app = this.app || (this.app = {});
	app.model = {};
	
	var emergencyCall = $('#emergencyCall');
	app.model.emergencyCall = emergencyCall;
	
	var InitPhoneNumber = function (){
		// get localStorge if it exists, return true for getting phone number successfully
		if (typeof localStorage['phoneNumber'] != 'undefined' && localStorage['phoneNumber'].length !=0 ){
			var phoneNumber = localStorage['phoneNumber'];
			emergencyCall.val(phoneNumber);
			return true;
		}else{
			return false;
		}
	}
	
	var SavePhoneNumber = function (){
		localStorage['phoneNumber'] = emergencyCall.val();
	}
	
	var IsFirstLaunch = function(){
		if (typeof localStorage['firstLaunch'] != 'undefined' && localStorage['firstLaunch'].length !=0 ){
			return false;
		}else{
			return true;
		}
	}

	var Launched = function(){
		localStorage['firstLaunch'] = 1;
	}

	app.model.InitPhoneNumber = InitPhoneNumber;
	app.model.SavePhoneNumber = SavePhoneNumber;
	app.model.IsFirstLaunch = IsFirstLaunch;
	app.model.Launched = Launched;
}).call(this, jQuery);

// view, must be init after "app.model" is ready
;(function($){
	var app = this.app || (this.app = {});
	
	app.view = {};
	
	var DisplayInitButton = function(displayFlag){
		if (displayFlag == true){
			// set button for reminding user to add the phone number.
			$('#phoneInitButton').addClass('hidden');
			$('#phoneNumberContainer').removeClass('hidden');			
		}else{
			// set button for reminding user to add the phone number.
			$('#phoneInitButton').removeClass('hidden');
			$('#phoneNumberContainer').addClass('hidden');
		}
	}
	var UpdatePhoneLink = function(phoneNumber){
		var phoneLink = $('.phoneLink');
		phoneLink.attr('href', "tel:" + phoneNumber);
		phoneLink.html("Call now: " + phoneNumber);

		phoneLink = $('#phoneLink');
		//phoneLink.attr('href', "tel:" + phoneNumber);
		phoneLink.html(phoneNumber);
	}

	var InitView = function(){
		// show the welcome page
		$(document).bind('pageshow', function(event, ui) {
		  if ($(event.target).attr('id') === 'welcome') {
		    window.mySwipe = Swipe(document.getElementById('slider'), {
				speed: 300,
				auto: 2000,
				continuous: false
			});

			app.model.Launched();
		  }
		});

		// if it is a new installed program, set time out to display 
		if (app.model.IsFirstLaunch()){
			setTimeout(function(){
			  $.mobile.changePage('#welcome', {transition:'slideup'});
			}, 500);
		}

		$.mobile.defaultPageTransition = 'slide';
	}
	app.view.UpdatePhoneLink = UpdatePhoneLink;
	app.view.DisplayInitButton = DisplayInitButton;
	app.view.InitView = InitView;
}).call(this, jQuery);

// controller
;(function($){
	
	var InitSetting = function(){
		app.model.emergencyCall.keyup(app.model.SavePhoneNumber);

		var retFlag = app.model.InitPhoneNumber();
		app.view.DisplayInitButton(retFlag);
		app.view.UpdatePhoneLink(app.model.emergencyCall.val());
		
		var backButton = $('#backButton');
		backButton.click(function (){
			var displayFlag = false;
			if (app.model.emergencyCall.val().length != 0){
				displayFlag = true;
			}
			app.view.DisplayInitButton(displayFlag);
			app.view.UpdatePhoneLink(app.model.emergencyCall.val());
		});

		app.view.InitView();
		
		console.log("height:" + $( window ).height());
		console.log("width:" + $( window ).width());
	}

	// app is in window scope
	$(document).ready(InitSetting);
}).call(this, jQuery);


