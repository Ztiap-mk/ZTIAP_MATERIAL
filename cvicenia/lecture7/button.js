class Button {
    // Initialization
    constructor(id,x, y , width, height,imgName) {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource(imgName);
    
        this.x = x
        this.y = y 
		this.width = width
        this.height = height  		
		this.id=id;
		
    }
  
    // Movement logic
    move(dt) {
       
	    if(game.mousePosition.x>this.x 
      && game.mousePosition.y>this.y 
      && game.mousePosition.x<(this.x+this.width) 
      && game.mousePosition.y<(this.y+this.height)){
		if(game.mousePressed){
			//debugger;
			if(this.id=='level'){
				if(game.music.play_started) game.music.play();
			game.objects = level();
			game.mousePressed=false;} 
			if(this.id=='menu'){
			
			game.objects = menu();} 
			if(this.id=='instructions'){
			game.objects = instructions();
			game.mousePressed=false;} 
			if(this.id=='sound'){
				if(game.music.play_started){
					game.music.stop();
					game.clickSound.sound.volume = 0;
				}
				else{ //game.music.refresh();  //vzdy zacne hrat hudba od znova
					game.music.play();		
					game.clickSound.sound.volume = 0.5;
				}					
				game.mousePressed=false;				
				} 
					}  
        console.log("hover: "+this.id);
    }}
  
    // Render self
    draw(ctx) {
      ctx.save()    
      ctx.drawImage(this.image,this.x, this.y, this.width, this.height )  
      ctx.restore()
    }
}