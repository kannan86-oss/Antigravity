
(function () {
    var errorContainer = document.createElement('div');
    errorContainer.style.position = 'fixed';
    errorContainer.style.top = '0';
    errorContainer.style.left = '0';
    errorContainer.style.width = '100%';
    errorContainer.style.backgroundColor = '#f8d7da';
    errorContainer.style.color = '#721c24';
    errorContainer.style.padding = '10px';
    errorContainer.style.zIndex = '9999';
    errorContainer.style.borderBottom = '1px solid #f5c6cb';
    errorContainer.style.fontFamily = 'monospace';
    errorContainer.style.whiteSpace = 'pre-wrap';
    errorContainer.id = 'debug-error-container';
    document.body.appendChild(errorContainer);

    function logError(msg) {
        errorContainer.textContent += msg + '\n';
        console.error(msg);
    }

    window.onerror = function (message, source, lineno, colno, error) {
        logError('Global Error: ' + message + ' at ' + source + ':' + lineno + ':' + colno);
    };

    window.addEventListener('unhandledrejection', function (event) {
        logError('Unhandled Promise Rejection: ' + event.reason);
    });

    console.log("Debug script injected");
})();
