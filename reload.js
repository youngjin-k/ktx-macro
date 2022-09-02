const initialize_reload = (tabId) => {
	const isStarted = getTabStorageItem("macro") === "on";
	getTabStorageItem('macro');
	if (isStarted) {
		console.log('reload in ' + (PAGE_TIMEOUT / 1000) + ' seconds');
		window.setTimeout(
			function () {
				location.reload();
			},
			PAGE_TIMEOUT
		);
	}
})();