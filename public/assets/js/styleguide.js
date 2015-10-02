
var generateStyleGuide = function(event){
  event.preventDefault();
  ajax();
}

var ajax = function(){
  var req = new XMLHttpRequest();
  req.open('POST', '/lsg', true);
  req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  req.onreadystatechange = function (e) {
    if(req.readyState == 4){
      if(req.status == 200){
        createIframe(req.response);
      }
      else{
        console.error("Error loading page\n");
        createDivError();
      }
    }
  }
  req.send("code_lsg=" + encodeURIComponent(editor.getValue()));
}

var createIframe = function(result){

  var iframeResult = document.createElement('iframe');
  iframeResult.className = 'lsg--result';
  iframeResult.src = 'data:text/html;charset=utf-8,'+ encodeURI(result);
  document.getElementById('iframe--container').innerHTML = "";
  document.getElementById('iframe--container').appendChild(iframeResult);
}

var createDivError = function(){

  var divSmsError = document.createElement('div');
  divSmsError.className = 'lsg--sms-error';
  divSmsError.appendChild(document.createTextNode("Error loading page\n"));
  document.getElementById('iframe--container').innerHTML = "";
  document.getElementById('iframe--container').appendChild(divSmsError);
}

var getChallenges = function(event){
  var id = this.href.substring(this.href.lastIndexOf('#'));
  var challengeContent = document.querySelector(id + ' .challenges').innerHTML;
  setChallenges(challengeContent);
}

var setChallenges = function(content){
  editor.setValue(content);
  ajax();
}

document.addEventListener('DOMContentLoaded', function() {
  ajax();
  document.getElementById('formArea').addEventListener('submit', generateStyleGuide);
  var all = document.querySelectorAll('.challenges_examples .anchor');
  for ( var i = 0; i < all.length; i++) {
    all[i].addEventListener('click', getChallenges);
  }

  var showDoc = document.getElementById('documentation-button'),
  showChallenge = document.getElementById('challenge-button');

  showDoc.addEventListener('change', function() {
    if(this.checked)
      showChallenge.checked = false;
  });

  showChallenge.addEventListener('change', function() {
    if(this.checked)
      showDoc.checked = false;
  });

  var reset = document.getElementById('reset');
  reset.addEventListener('click', function() {
    document.getElementById('documentation-button').checked = false;
    document.getElementById('challenge-button').checked = false;
    editor.setValue("");
    document.getElementById('iframe--container').innerHTML = "";
  });

});
