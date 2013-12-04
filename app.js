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
	var UpdatePhoneNumberContainer = function(){
		
	}
	app.view.UpdatePhoneNumberContainer = UpdatePhoneNumberContainer;
	app.view.DisplayInitButton = DisplayInitButton;
}).call(this, jQuery);

// controller
;(function($){
	
	var InitSetting = function(){
		var retFlag = app.model.InitPhoneNumber();
		app.view.DisplayInitButton(retFlag);
		app.model.emergencyCall.keyup(app.model.SavePhoneNumber);
		
		var backButton = $('#backButton');
		backButton.click(function (){
			var displayFlag = true;
			if (app.model.emergencyCall.val().length == 0){
				displayFlag = false;
			}
			app.view.DisplayInitButton(displayFlag);
		});
	}

	// app is in window scope
	$(document).ready(InitSetting);
}).call(this, jQuery);


