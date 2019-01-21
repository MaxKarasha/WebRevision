document.addEventListener('DOMContentLoaded', function() {
    var makeRecensionButton = document.getElementById('MakeRecension');
    makeRecensionButton.addEventListener('click', function() {	
        chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.executeScript(tab.id, {file: "js/html2canvas.min.js"}, function(response) {
			    chrome.tabs.executeScript(tab.id, {file: "captureUtils.js"}, function(response) {				
                    chrome.tabs.executeScript(tab.id, {file: "inject.js"}, function(response) {				
                        window.close();
                    });
                });
			});
        });
    }, false);

    var makeCaptureButton = document.getElementById('MakeCapture');
    makeCaptureButton.addEventListener('click', function() {
        chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.executeScript(tab.id, {file: "js/html2canvas.min.js"}, function(response) {
			    chrome.tabs.executeScript(tab.id, {file: "captureUtils.js"}, function(response) {				
                    chrome.tabs.executeScript(tab.id, {code: "makeCapture()"}, function(response) {				
                        window.close();
                    });
                });
			});
        });
        

        /*html2canvas(document.body).then(canvas => {
            document.body.appendChild(canvas)
        });

        html2canvas(document.body).then(canvas => {
            saveAs(canvas.toDataURL(), 'canvas.png');
        });*/
    }, false);
}, false);

function saveAs(uri, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        link.href = uri;
        link.download = filename;

        //Firefox requires the link to be in the body
        document.body.appendChild(link);

        //simulate click
        link.click();

        //remove the link when done
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
}