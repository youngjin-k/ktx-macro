const initialize_reload = () => {
	const isStarted = getTabStorageItem("macro") === "on";
	if (isStarted) {
		console.log('reload in ' + (PAGE_TIMEOUT / 1000) + ' seconds');
		reloadTimeoutID = window.setTimeout(
			function () {
				console.log('force reload');
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