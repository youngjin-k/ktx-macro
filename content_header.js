let tabId = 0;
let uid = 1;

const MAIN_URI = "https://www.letskorail.com/ebizprd/EbizPrdTicketPr21111_i1.do";
const LOGIN_PAGE_URI = "https://www.letskorail.com/korail/com/login.do";
const POPUP_URI = "https://www.letskorail.com/docs/pz/pz_msg_pop1.jsp";
const PAGE_TIMEOUT = 15000;

const getTabStorageKey = (key) => {
	return String(key);// + String(tabId);
};

const getTabStorageItem = (key) => {
	return sessionStorage.getItem(getTabStorageKey(key));
};

const setTabStorageItem = (key, value) => {
	sessionStorage.setItem(getTabStorageKey(key), value);
};

const removeTabStorageItem = (key) => {
	sessionStorage.removeItem(getTabStorageKey(key));
};