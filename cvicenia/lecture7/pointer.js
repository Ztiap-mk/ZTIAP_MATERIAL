class Pointer {
    // Initialization
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('pointer2');
    
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.dx = Math.random() * 50 - 25
        this.dy = Math.random() * 50 - 25
        this.size = Math.random() + .3
        this.rotation = 0
    }
  
    // Movement logic
    move(dt) {
		 this.x = game.mousePosition.x;
		  this.y = game.mousePosition.y;
      if(game.mousePressed){
		  game.clickSound.play();
		  
		 //tu mozem dat pocitadlo bodov a ked dosiahiem ciet tak zovolam napr gamerover scenu
		  
	  }
    }
  
    // Render self
    draw(ctx) {
      ctx.save()
      ctx.translate(this.x, this.y)     
      ctx.drawImage(this.image, -20, -20, 40, 40)  
      ctx.restore()
    }
}