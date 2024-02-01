//nonstop 팝업 자동 닫기
function closeNonstopPopup() {
	var btn_blue_ang = document.querySelector('.btn_blue_ang');
	if (btn_blue_ang.text.indexOf('예매 계속 진행하기') != -1) {
		console.log('close popup');
		setTimeout(f_close, 1000);
	};
}

closeNonstopPopup();