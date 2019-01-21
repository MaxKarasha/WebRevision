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
  var elem = getElementFromEvent(e);
  makeCapture(getTSGroupEl(elem), function() {
    var elem = getElementFromEvent(e);  
    stopAction(elem);
    var comment = prompt("Add comment", '');
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

function makeCapture(elem, callback) {
  html2canvas(elem || document.body).then(canvas => {
    saveAs(canvas.toDataURL(), 'canvas.png');
    callback();
  });
}

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

setEnableBodyListeners(true);