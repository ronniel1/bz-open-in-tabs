
console.log("in background")

chrome.runtime.onMessage.addListener(
	function (request, _, sendResponse) {
		request.links.forEach(link => {
			chrome.tabs.create({url: "https://bugzilla.redhat.com/" + link})
			sendResponse({response: ""});
		})
	});
