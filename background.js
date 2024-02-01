let tabs = [];

const playSound = () => {
	if (typeof (audio) != "undefined" && audio) {
		audio.pause();
		document.body.removeChild(audio);
		audio = null;
	}
	audio = document.createElement('audio');
	document.body.appendChild(audio);
	audio.autoplay = true;
	audio.src = chrome.runtime.getURL('tada.mp3');
	audio.play();
};

const sendTelegramMessage = () => {
	chrome.storage.local.get(
		['ktx-macro-bot-token', 'ktx-macro-chat-id'],
		function (result) {
			const msg = encodeURI('예약을 시도하였습니다. 예약을 확인해주세요.');
			const url = `https://api.telegram.org/bot${result['ktx-macro-bot-token']}/sendmessage?chat_id=${result['ktx-macro-chat-id']}&text=${msg}`;

			fetch(url);
		}
	);
}

function addTab(tabid) {
	if (tabs.indexOf(tabid) === -1)
		tabs.push(tabid);
}

function removeTab(tabid) {
	console.log('remove tab tabs: ' + tabs + ', tabid: ' + tabid);
	var index = tabs.indexOf(tabid);
	if (index != -1)
		tabs.splice(index, 1);
}

function checkTabs() {
	var tabid;
	for (tabid of tabs) {
		chrome.tabs.get(tabid, function (tab) {
			if (chrome.runtime.lastError) {
				console.log(chrome.runtime.lastError);
			}
			if (!tab) {
				removeTab(tabid);
			}
		});
	}
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	//console.log('message: ' + message);
	if (message && message.type == 'successTicketing') {
		//playSound();
		sendTelegramMessage();
		sendResponse(true);
	}
	else if (message && message.type == 'tabId') {
		addTab(sender.tab.id);
		sendResponse(sender.tab.id);
	}
	else if (message && message.type == 'tabs') {
		checkTabs();
		sendResponse(tabs);
  	}
});

chrome.tabs.onRemoved.addListener(function (tabid, removed) {
	removeTab(tabid);
});