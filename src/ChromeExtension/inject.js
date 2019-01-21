function getZip() {
  return new JSZip();
}

function addSimpleFileToZip(fileName, data, zip) {
  zip.file(fileName, data)
}

function getElementFromEvent(e) {
  var e = e || window.event;
  return e.srcElement || e.target;
}

function getTSGroupEl(elem) {
  return elem.closest('.ts-controlgroup') || 
    elem.closest('.grid-layout') ||
    elem;
}

function clearRevisionStyle(elem) {
  elem.style.border="";
}

function setRevisionStyle(elem) {
  elem.style.border="5px double #f2ad60";
}

var elClicklistener = function addRecension(e) {
  setEnableBodyListeners(false);
  var elem = getElementFromEvent(e);
  var zip = getZip();
  var tsElem = getTSGroupEl(elem);
  addCaptureToZip(tsElem, zip, function() {
    var elem = getElementFromEvent(e);  
    stopAction(elem);
    var comment = prompt("Add comment", '');
    addSimpleFileToZip("comment.txt", comment, zip);
    addSimpleFileToZip("element.dat", elem.outerHTML, zip);
    if (elem != tsElem) {
      addSimpleFileToZip("groupElements.dat", tsElem.outerHTML, zip);
    }
    zip.generateAsync({type:"blob"})
      .then(function(content) {
          saveAs(content, "revision.zip");
      });
  });  
}

var mouseOverListener = function mouseOver(e) {  
  var elem = getElementFromEvent(e);
  if (elem.tagName != 'BODY') {
    setRevisionStyle(elem);    
    setElemClickListener(elem, true);
  }
}

var mouseOutListener = function mouseOut(e) {  
  var elem = getElementFromEvent(e);
  clearRevisionStyle(elem);
  setElemClickListener(elem, false);
}

function setElemClickListener(elem, enable) {
  enable ?
    elem.addEventListener("click", elClicklistener) :
    elem.removeEventListener("click", elClicklistener);
}

function setEnableBodyListeners(enable){
  enable ?
    document.body.addEventListener("mouseover", mouseOverListener) :
    document.body.removeEventListener("mouseover", mouseOverListener);
  enable ?
    document.body.addEventListener("mouseout", mouseOutListener) :
    document.body.removeEventListener("mouseout", mouseOutListener);
}

function stopAction(elem) {
  setElemClickListener(elem, false);
  clearRevisionStyle(elem);
  setEnableBodyListeners(false);
}

function saveCapture(elem, callback) {
  html2canvas(elem || document.body).then(canvas => {
    saveAs(canvas.toDataURL(), 'screenshot.png');
    callback();
  });
}

function addCaptureToZip(elem, zip, callback) {
  html2canvas(elem || document.body).then(canvas => {
    canvas.toBlob(function(blob) {
        zip.file("screenshot.png", blob, {base64: true});
        callback();
    });
  });
  
}

setEnableBodyListeners(true);