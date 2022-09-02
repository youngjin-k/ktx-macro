const initialize_reload = () => {
	const isStarted = getTabStorageItem("macro") === "on";
	if (isStarted) {
		console.log('reload in ' + (PAGE_TIMEOUT / 1000) + ' seconds');
		window.setTimeout(
			function () {
				location.reload();
			},
			PAGE_TIMEOUT
		);
	}
};

(() => {
	if (!location.href.startsWith(MAIN_URI))
		return;

	chrome.extension.sendMessage(
		{type: 'tabId'}, 
		function (result) {
			tabId = result;
			initialize_reload();
		}
	);
})();