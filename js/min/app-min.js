var model={level:1,score:0,brickClickCounter:1,lives:3},controller={init:function(){view.render()},startGame:function(){document.getElementById("timer").className+="timerStart",window.setTimeout(function(){model.brickClickCounter=1,document.getElementById("timer").removeAttribute("class"),document.getElementById("gameboard").className+=" gameStarted";var e=document.getElementsByClassName("gamebrick")},3500)},readLevel:function(){return model.level},updateLevel:function(){model.level+=1,view.renderLevel()},readHighscore:function(){return"undefined"!=typeof Storage?localStorage.memoryHighscore?localStorage.memoryHighscore:0:void alert("Your browser dont support highscore")},updateHighscore:function(){"undefined"!=typeof Storage?localStorage.memoryHighscore?localStorage.memoryHighscore<model.score&&(localStorage.memoryHighscore=model.score):localStorage.memoryHighscore=model.score:alert("The highscore can not be saved")},readScore:function(){return model.score},updateScore:function(e){model.score+=e,this.readHighscore()<model.score&&this.updateHighscore(model.score),view.renderInfo()},readLives:function(){return model.lives},updateLives:function(e){model.lives+=e,model.lives<=0?(alert("You lost the game"),this.reset()):view.renderInfo()},createBricks:function(){var e=Math.ceil(Math.sqrt(model.level));e<2&&(e=2);var r=e*e,o=[];for(t=0;t<r-model.level;t++)o.push(0);for(t=0;t<model.level;t++)o.push(t+1);for(var t=o.length-1;t>=0;t--){var l=Math.floor(Math.random()*(t+1)),n=o[l];o[l]=o[t],o[t]=n}view.renderBricks(o)},brickClick:function(){document.getElementById("gameboard").classList.contains("gameStarted")&&(this.getAttribute("data-number")==model.brickClickCounter?(this.className+=" correct",controller.updateScore(100),model.brickClickCounter==controller.readLevel()&&(controller.updateScore(500+50*controller.readLevel()),controller.updateLevel()),model.brickClickCounter++):(0==this.getAttribute("data-number")||this.getAttribute("data-number")>model.brickClickCounter)&&(this.className+=" wrong",controller.updateScore(-100),controller.updateLives(-1)))},reset:function(){model.level=1,model.score=0,model.brickClickCounter=1,model.gameBricksColumns=2,model.gameBricksRows=2,model.lives=3,this.init()}},view={render:function(){this.renderLevel()},renderInfo:function(){this.showHighScore=document.getElementById("showHighScore"),this.showLevel=document.getElementById("showLevel"),this.showScore=document.getElementById("showScore"),this.showLives=document.getElementById("showLives"),this.showHighScore.innerHTML=controller.readHighscore(),this.showLevel.innerHTML=controller.readLevel(),this.showScore.innerHTML=controller.readScore(),this.showLives.innerHTML=controller.readLives()},renderBricks:function(e){var r=document.getElementById("gameboard");for(r.removeAttribute("class");r.hasChildNodes();)r.removeChild(r.lastChild);controller.readLevel()>e.length&&controller.updateLives(1),r.className+="gameboard-col-"+Math.sqrt(e.length),e.forEach(function(e){var o=document.createElement("div");if(o.className="gamebrick",o.dataset.number=e,0!==e)var t=e;else var t="";o.innerHTML="<div>"+t+"</div>",o.addEventListener("click",controller.brickClick,!1),r.insertBefore(o,r.firstChild)}),controller.startGame()},renderLevel:function(){var e=Math.floor(4*Math.random())+1;document.getElementsByTagName("body")[0].className="background-"+e,this.renderInfo(),controller.createBricks()}};window.onload=function(){controller.init()};