(function () {
	var initPhoneNumber = function (){
		// get localStorge if it exists

		
		// else direct to the setting page
		var settingButton = $('<a/>', {
			id:'initSetting',
			href:'#setting',
			'data-role':'button',
			text:'Setting'
		});
		$('#phoneNumberContainer').append(settingButton);

		$('#phoneInitButton').removeClass('hidden');
	}
	$(document).ready(initPhoneNumber);
})();