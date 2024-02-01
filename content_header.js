let tabId = 0;
let uid = 1;
let reloadTimeoutID = null;

const MAIN_URI = "https://www.letskorail.com/ebizprd/EbizPrdTicketPr21111_i1.do";
const LOGIN_PAGE_URI = "https://www.letskorail.com/korail/com/login.do";
const POPUP_URI = "https://www.letskorail.com/docs/pz/pz_msg_pop1.jsp";
const PAGE_TIMEOUT = 15000;

const getTabStorageKey = (key) => {
	return String(key) + String(tabId);
};

const getTabIdFromTabStorageKey = (key) => {
	for (var i = 0; i < key.length; i++) {
		if (!isNaN(key[i]))
			return Number(key.substring(i));
	}
	return 0;
};

const removeUnusedTabStorage = (tabs) => {
	var tabid;
	var key;
	console.log('tabs: ' + tabs);

	for (key in localStorage) {
		if (!key.startsWith('macro') && !key.startsWith('checkedItems'))
			continue;
		
		tabid = getTabIdFromTabStorageKey(key);

		console.log(
			'key: ' + key + ', ' + 
			'tabid: ' + tabid + ', ' + 
			'indexOf: ' + tabs.indexOf(tabid));

		if (tabs.indexOf(tabid) === -1) {
			console.log('removeItem: ' + key);
			localStorage.removeItem(key);
		}
	}
};

const getTabStorageItem = (key) => {
	return localStorage.getItem(getTabStorageKey(key));
};

const setTabStorageItem = (key, value) => {
	localStorage.setItem(getTabStorageKey(key), value);
};

const removeTabStorageItem = (key) => {
	localStorage.removeItem(getTabStorageKey(key));
};

(() => {
	//console.log("content_header");
	chrome.runtime.sendMessage({type: 'tabs'}, removeUnusedTabStorage);
})();