(() => {
	if (!location.href.startsWith(TARGET_URL))
		return;

	const isStarted = localStorage.getItem("macro") === "on";
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