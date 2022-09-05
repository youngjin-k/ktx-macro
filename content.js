const CHECKBOX_COLUMN = [5, 6, 10];

const createHeaderCheckbox = () => {
	const row = document.querySelector("#tableResult > thead > tr");
	var child;

	for (var col of CHECKBOX_COLUMN) {
		child = row.querySelector(`th:nth-child(${col})`);
		child.insertAdjacentHTML("beforeend", 
			`
				<div>
					<label>
						<input type="checkbox" value="${col}" class="ktx-macro-header-checkbox">
						매크로
					</label>
				</div>
			`
		);
	}

};

const setHeaderCheckboxEvent = () => {
	const header = document.querySelector("#tableResult > thead > tr");

	for (var col of CHECKBOX_COLUMN) {
		header.querySelector(`th:nth-child(${col}) .ktx-macro-header-checkbox`)
			.addEventListener('change', changeHeaderCheckbox);
	}
};

const changeHeaderCheckbox = (event) => {
	const rows = document.querySelectorAll("#tableResult > tbody > tr");
	const child_num = event.target.value;

	if (!rows || !rows.length) {
		return;
	}

	rows.forEach(row => {
		row.querySelector(`td:nth-child(${child_num}) .ktx-macro-checkbox`)
			.checked = event.target.checked;
	});
	saveCheckboxState();
};

const createCheckbox = () => {
	const $rows = document.querySelectorAll("#tableResult > tbody > tr");

	if (!$rows.length) {
		return;
	}

	$rows.forEach($row => {
		$row
			.querySelector("td:nth-child(5)")
			.insertAdjacentHTML("beforeend", getCheckboxTemplate(uid++));
		$row
			.querySelector("td:nth-child(6)")
			.insertAdjacentHTML("beforeend", getCheckboxTemplate(uid++));
		$row
			.querySelector("td:nth-child(10)")
			.insertAdjacentHTML("beforeend", getCheckboxTemplate(uid++));
	});
};

const isChecked = uid => {
	const checkedItemsStr = getTabStorageItem("checkedItems");
	const checkedItems = checkedItemsStr ? checkedItemsStr.split(",") : [];

	if (!checkedItems.length) {
		return false;
	}

	return checkedItems.includes(String(uid));
};

const isLogin = () => !!document.querySelectorAll(".gnb_list > .log_nm").length;

const getCheckboxTemplate = uid => {
	if (!uid) {
		return;
	}

	return `
		<div>
			<label>
				<input type="checkbox" class="ktx-macro-checkbox" value="${uid}" ${isChecked(uid) && "checked"}>
				매크로
			</label>
		</div>
	`;
};

const setCheckboxEvent = () => {
	const $checkboxes = document.querySelectorAll(".ktx-macro-checkbox");

	for (let i = 0; i < $checkboxes.length; i++) {
		$checkboxes[i].addEventListener("click", () => {
			saveCheckboxState();
		});
	}
};

const setEscapeEvent = () => {
	window.addEventListener("keydown", e => {
		if (e.key === "Escape") {
			macroStop();
		}
	});
};

const macroStart = () => {
	if (!isLogin()) {
		if (confirm("로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?")) {
			location.href = LOGIN_PAGE_URI;
		}
		return;
	}

	if (!getTabStorageItem("checkedItems")) {
		alert("선택 된 항목이 없습니다.\n1개 이상 선택해주세요.");
		return;
	}

	alert(
		"자동 예매를 시작합니다.\n" +
			"예매 성공 후 20분내에 결제하지 않을 경우 자동으로 예매가 취소됩니다.\n" +
			"자동 예매 종료는 '자동 예매 정지' 혹은 esc키를 눌러주세요."
	);

	setTabStorageItem("macro", "on");

	reload();
};

const macroStop = () => {
	alert("자동 예매를 종료합니다.");
	removeTabStorageItem("macro");
	removeTabStorageItem("checkedItems");

	reload();
};

const macro = () => {
	let uid = 0;
	let $row;
	const $rows = document.querySelectorAll("#tableResult > tbody > tr");
	const len = $rows.length;
	var succeeded = false;

	if (!len) {
		return;
	}

	for (let i = 0; i < len; i++) {
		$row = $rows[i];

		if (isChecked(++uid)) {
			$row.querySelector("td:nth-child(5)").style.backgroundColor = "#f03e3e";
			const $button =
				$row
					.querySelector("td:nth-child(5)")
					.querySelector('[src="/docs/2007/img/common/icon_apm_bl.gif"]') ||
				$row
					.querySelector("td:nth-child(5)")
					.querySelector('[src="/docs/2007/img/common/icon_apm_rd.gif"]');

			if ($button) {
				$button.closest("a").click();
				removeTabStorageItem("macro");
				chrome.extension.sendMessage({ type: "successTicketing" });
				succeeded = true;
				break;
			}
		}

		if (isChecked(++uid)) {
			$row.querySelector("td:nth-child(6)").style.backgroundColor = "#f03e3e";
			const $button =
				$row
					.querySelector("td:nth-child(6)")
					.querySelector('[src="/docs/2007/img/common/icon_apm_bl.gif"]') ||
				$row
					.querySelector("td:nth-child(6)")
					.querySelector('[src="/docs/2007/img/common/icon_apm_rd.gif"]');

			if ($button) {
				$button.closest("a").click();
				removeTabStorageItem("macro");
				chrome.extension.sendMessage({ type: "successTicketing" });
				succeeded = true;
				break;
			}
		}

		if (isChecked(++uid)) {
			$row.querySelector("td:nth-child(10)").style.backgroundColor = "#f03e3e";
			const $button = 
				$row
					.querySelector("td:nth-child(10)")
					.querySelector('[src="/docs/2007/img/common/icon_wait.gif"]');

			if ($button) {
				$button.closest("a").click();
				removeTabStorageItem("macro");
				chrome.extension.sendMessage({ type: "successTicketing" });
				succeeded = true;
				break;
			}
		}
	}

	if (!succeeded)
		setTimeout(reload, 1000);
};

const reload = () => {
	document.querySelector(".btn_inq > a").click();
};

//nonstop 팝업 자동 닫기
const closeNonstopPopup = () => {

	if (!document.querySelector(".btn_blue_ang"))
		return;

	var s = document.createElement('script');
	s.innerHTML = `
		var btn_blue_ang = document.querySelector('.btn_blue_ang');
		if (btn_blue_ang.text.indexOf('예매 계속 진행하기') != -1) {
			console.log('close popup');
			setTimeout(f_close, 1000);
		};
	`;
	document.body.appendChild(s);
};

//nonstop 팝업 무시
const ignoreNonstopPopup = () => {
	var s = document.createElement('script');
	s.innerHTML = `
		if (typeof(Nopeople2) == 'function') {
			console.log('disable Nopeople2');
			const originNopeople2 = Nopeople2;
			Nopeople2 = function (intPsrm, intIdxNo, iAddInfo4, callback) {
				console.log('remove h_nonstop_msg. ' + train[intIdxNo].h_nonstop_msg);
				train[intIdxNo].h_nonstop_msg = '';
				return originNopeople2(intPsrm, intIdxNo, iAddInfo4, callback);
			}
		}
	`;
	document.body.appendChild(s);
}

//인원 확인 컨펌 무시
const ignoreConfirmPeople = () => {
	var s = document.createElement('script');
	s.innerHTML = `
		const origin_confirm = confirm;
		confirm = function (message) {
			console.log('confirm: ' + message);
			if (message.indexOf('맞습니까') != -1) {
				return true;
			}
			return origin_confirm(message);
		}
	`;
	document.body.appendChild(s);
}

//일일 팝업 무시
const ignoreDailyPopup = () => {
	var s = document.createElement('script');
	s.innerHTML = `;
		if (typeof(openGwangjuShuttleDialog) == 'function') {
			console.log('disable openGwangjuShuttleDialog');
			openGwangjuShuttleDialog = function () {};
		}
	`;
	document.body.appendChild(s);
}

const saveCheckboxState = () => {
	let checkedItems = [];
	const $checkboxes = document.querySelectorAll(".ktx-macro-checkbox");

	for (let i = 0; i < $checkboxes.length; i++) {
		if ($checkboxes[i].checked) {
			checkedItems.push($checkboxes[i].value);
		}
	}

	if (checkedItems.length) {
		setTabStorageItem("checkedItems", checkedItems.join(","));
	} else {
		removeTabStorageItem("checkedItems");
	}
};

const checkAllCheckbox = () => {
	var i;
	var list = document.querySelectorAll(".ktx-macro-checkbox");
	for (i = 0; i < list.length; i++) {
		list[i].checked = true;
	}
	saveCheckboxState();
};

const initialize = () => {
	console.log("tabId: " + tabId);

	const isStarted = getTabStorageItem("macro") == "on";

	if (isStarted) {
		if (reloadTimeoutID) {
			console.log('stop realod timer ' + reloadTimeoutID);
			window.clearTimeout(reloadTimeoutID);
			reloadTimeoutID = null;
		}
		macro();
		setEscapeEvent();
	} else {
		removeTabStorageItem("checkedItems");
	}

	document.querySelector(".btn_inq").insertAdjacentHTML(
		"beforeend",
		`
			<button type="button" class="ktx-macro-button">
				${isStarted ? "자동 예매 정지" : "자동 예매 시작"}
			</button>
			<button type="button" class="check-all-button">
				전체 선택
			</button>
		`
	);

	document
		.querySelector(".ktx-macro-button")
		.addEventListener("click", isStarted ? macroStop : macroStart);

	document
		.querySelector(".check-all-button")
		.addEventListener("click", checkAllCheckbox);

	createHeaderCheckbox();
	createCheckbox();
	setHeaderCheckboxEvent();
	setCheckboxEvent();
	ignoreNonstopPopup();
	ignoreConfirmPeople();
	ignoreDailyPopup();
};

(() => {
	if (location.href.startsWith(POPUP_URI)) {
		closeNonstopPopup();
		return;
	}
	else if (!location.href.startsWith(MAIN_URI) || !document.querySelector(".btn_inq")) {
		return;
	}

	chrome.extension.sendMessage(
		{type: 'tabId'}, 
		function (result) {
			tabId = result;
			initialize();
		}
	);
})();
