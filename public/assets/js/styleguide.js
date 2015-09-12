
function generateStyleGuide(event){
  event.preventDefault();

  var req = new XMLHttpRequest();
  req.open('POST', '/lsg', false);
  req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  req.send("code_lsg=" + encodeURI(document.querySelector('textarea').value));
  createIframe(req.response);
}

function createIframe(result){

  var iframeResult = document.createElement('iframe');
  iframeResult.className = 'lsg--result';
  iframeResult.src = 'data:text/html;charset=utf-8,'+ encodeURI(result);
  document.getElementById('iframe--container').innerHTML = "";
  document.getElementById('iframe--container').appendChild(iframeResult);
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('formArea').addEventListener('submit', generateStyleGuide);
});