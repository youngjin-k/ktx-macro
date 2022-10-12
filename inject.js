console.log('inject.js');
console.log('value: ' + document.currentScript.getAttribute('value'));

//nonstop 팝업 무시
function ignoreNonstopPopup() {
	if (typeof(Nopeople2) == 'function') {
		console.log('disable Nopeople2');
		const originNopeople2 = Nopeople2;
		Nopeople2 = function (intPsrm, intIdxNo, iAddInfo4, callback) {
			console.log('remove h_nonstop_msg. ' + train[intIdxNo].h_nonstop_msg);
			train[intIdxNo].h_nonstop_msg = '';
			return originNopeople2(intPsrm, intIdxNo, iAddInfo4, callback);
		}
	}
}

//인원 확인 컨펌 무시
function ignoreConfirmPeople() {
	const origin_confirm = confirm;
	confirm = function (message) {
		console.log('confirm: ' + message);
		if (message.indexOf('맞습니까') != -1) {
			return true;
		}
		return origin;
	}
}

//일일 팝업 무시
function ignoreDailyPopup() {
	if (typeof(openGwangjuShuttleDialog) == 'function') {
		console.log('disable openGwangjuShuttleDialog');
		openGwangjuShuttleDialog = function () {};
	}
}

ignoreNonstopPopup();
ignoreConfirmPeople();
ignoreDailyPopup();