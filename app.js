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

	var SetLaunched = function(){
		localStorage['firstLaunch'] = 1;
	}

	app.model.InitPhoneNumber = InitPhoneNumber;
	app.model.SavePhoneNumber = SavePhoneNumber;
	app.model.IsFirstLaunch = IsFirstLaunch;
	app.model.SetLaunched = SetLaunched;
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
		var phoneLink = $('#callButton');
		phoneLink.attr('href', "tel:" + phoneNumber);
		phoneLink.html(app.view.callDescription + " : "+ phoneNumber);

		// phoneLink = $('#phoneLink');
		//phoneLink.attr('href', "tel:" + phoneNumber);
		// phoneLink.html(phoneNumber);
	}

	var InitView = function(){
		// show the welcome page
		$(document).bind('pageshow', function(event, ui) {
		  if ($(event.target).attr('id') === 'welcome') {
		  	// if (window.mySwipe){
		  	// 	window.mySwipe.kill();
		  	// }
		    window.mySwipe = Swipe(document.getElementById('slider'), {
				speed: 1000,
				auto: 4000,
				continuous: false
			});
			// $("#close-welcome-btn").click(function(){
			// 	window.mySwipe.kill();
			// });
			$("#welcome").on("pagebeforehide", function(e){
				window.mySwipe.kill();
			});
			app.model.SetLaunched();
		  }
		});

		$.mobile.defaultPageTransition = 'slide';

		app.view.callDescription = $('#callDes').text();
	}
	app.view.UpdatePhoneLink = UpdatePhoneLink;
	app.view.DisplayInitButton = DisplayInitButton;
	app.view.InitView = InitView;
}).call(this, jQuery);

// controller
;(function($){
	var InitGeneralEvent = function() {
		if (window.Touch) {
		  $('a').bind('touchstart', function(e) {
		    e.preventDefault();
		  });
		  $('a').bind('touchend', function(e) {
		    e.preventDefault();
		    return $(this).trigger('click');
		  });
		}
	}
	var InitSetting = function(){
		// InitGeneralEvent();

		// init view display
		app.view.InitView();
		var retFlag = app.model.InitPhoneNumber();
		app.view.DisplayInitButton(retFlag);
		app.view.UpdatePhoneLink(app.model.emergencyCall.val());	


		// if it is a new installed program, set time out to display 
		if (app.model.IsFirstLaunch()){
			setTimeout(function(){
			  $.mobile.changePage('#welcome', {transition:'slideup'});
			}, 500);
		}

		// bind event for user input
		var backButton = $('#backButton');
		var telInput = $('#emergencyCall');

		app.model.emergencyCall.keydown(function(e){
			var code = e.keyCode || e.which;
			if (code == 9 || code == 13){
				e.preventDefault();
				backButton.click();
				return;
			}
		});

		$("#setting").on("pagebeforehide", function(e){
			app.model.SavePhoneNumber();
			var displayFlag = false;
			if (app.model.emergencyCall.val().length != 0){
				displayFlag = true;
			}
			app.view.DisplayInitButton(displayFlag);
			app.view.UpdatePhoneLink(app.model.emergencyCall.val());
		});
	}

	// app is in window scope
	$(document).ready(InitSetting);
}).call(this, jQuery);


