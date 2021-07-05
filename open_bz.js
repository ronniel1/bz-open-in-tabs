
// @name        Open BZs from list in new tabs
// @version     0.0.1
// @namespace   http://arantius.com/misc/greasemonkey/
// @description Add button to Bugzilla's ticket list for opening the tickets in bew tabs

// Constants
const LOG_TAG = '[BZ-open]'

log("open_bz.js")

const buglist = document.getElementById("bz_buglist_wrapper");
if (buglist) {
	var openNode = document.createElement('div')
	openNode.innerHTML = '<button id="openBzs" type="button">'
		+ 'open bugs in tabs</button>'
	buglist.appendChild(openNode)
	document.getElementById('openBzs').addEventListener("click", ButtonClickAction, false);
}


function ButtonClickAction(_) {
	const links = [...document.getElementsByClassName("first-child bz_id_column")];
	var lls = [];
	links.forEach(link => {
		var l = link.children[0].getAttribute("href");
		lls.push(l)
	})
	chrome.runtime.sendMessage({links: lls}, (response) => {
		console.log("Got a response" + response);
	})
}

// adds a tag prefix to logs for easy filters
function log(...args) {
	const msg = args.reduce((msg, data) => {
		return `${msg} ${data}`
	}, LOG_TAG)
	console.log(msg);
}

