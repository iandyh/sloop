chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request.method === 'getLocalStorage') {
        sendResponse(localStorage[request.key]);
    } else {
        sendResponse({});
    }
})
