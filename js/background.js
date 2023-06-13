chrome.runtime.onMessage.addListener(function (

    request,
    sender,
    sendResponse,
) {
    if (request.contentScriptQuery == 'queryPrice') {
        const url =
            'https://example.com/price-query?itemId=' +
            encodeURIComponent(request.itemId);

        fetch(url).then(response => {
            // ...
            sendResponse({ message: true });
        });

        //  use `return true` here
        return true; // Will respond asynchronously.
    }
});
