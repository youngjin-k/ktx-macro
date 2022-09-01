const TARGET_URL = "https://www.letskorail.com/ebizprd/EbizPrdTicketPr21111_i1.do";
const PAGE_TIMEOUT = 15000;

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