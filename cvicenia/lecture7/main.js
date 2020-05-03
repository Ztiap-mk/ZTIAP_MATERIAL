

const resourceManager = new ResourceManager();


window.onmousemove = function (event){
  game.onmousemove(event);
}
window.onmousedown = function (event){
  game.onmousedown(event);
}
window.onmouseup = function (event){
  game.onmouseup(event);
}

const game = new Game();
    game.start();


