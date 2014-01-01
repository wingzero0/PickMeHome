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
	
	app.model.InitPhoneNumber = InitPhoneNumber;
	app.model.SavePhoneNumber = SavePhoneNumber;
	
}).call(this, jQuery);

// view
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
		var phoneLink = $('#phoneLink');
		phoneLink.attr('href', "tel:" + phoneNumber);
		phoneLink.html(phoneNumber);
	}

	var ShowWelcomePage = function(){
		// show the welcome page
		$(document).bind('pageshow', function(event, ui) {
		  if ($(event.target).attr('id') === 'welcome') {
		    Swipe(document.getElementById('slider'), {continuous:false});
		  }
		});
		setTimeout(function(){
		  $.mobile.changePage('#welcome', {transition:'slideup'});
		  $('#close-welcome-btn').click(function(){timer.restart();});
		}, 500);
	}
	app.view.UpdatePhoneLink = UpdatePhoneLink;
	app.view.DisplayInitButton = DisplayInitButton;
	app.view.ShowWelcomePage = ShowWelcomePage;
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

		$(function(){
			window.mySwipe = Swipe(document.getElementById('slider'), {
				auto: 3000
			});
		});
		app.view.ShowWelcomePage();
	}

	// app is in window scope
	$(document).ready(InitSetting);
}).call(this, jQuery);


