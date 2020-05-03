	

class Game {
	 constructor() {
		 this.canvas = document.getElementById("canvas");
		 this.music=new Sound("./sounds/battleThemeA.mp3");		
		this.music.play_started=true;	
		this.clickSound = new Sound("./sounds/jump.mp3");
		this.clickSound.sound.volume = 0.5;
		
	this.mousePosition = {
      x: 0,
      y: 0
    };
    this.mousePressed = false;
	 }
    time = Date.now();
	
	onmousemove(event) {
    this.mousePosition.x = event.offsetX || event.layerX;
    this.mousePosition.y = event.offsetY || event.layerY;
  };

  onmousedown(event) {
    this.mousePressed = true;
    this.click = true;
	
  };
  onmouseup (event) {
    this.mousePressed = false;
    this.click = false;
  };
  

	
    // Set up canvas for 2D rendering
    
    ctx = canvas.getContext("2d");

    // tato funkcia sa vola v html pri startovani hry
    // inicializuje obrazky + vytvara objekty
    async start() {
        console.log('starting game');
        await resourceManager.init();
        console.log('resouces loaded');
       
		this.objects = menu(); 		
        this.startLoop();
    }

    // spusta nekonecnu slucku
    startLoop() {
        this.time = Date.now();
        this.step();
    }

    step() {
        // console.log("Step");
      
        // Get time delta
        const now = Date.now();
        const dt = (now - this.time) / 100;
        this.time = now;
      
        this.move(dt);
        this.render();

        requestAnimationFrame(() => this.step());
    }

    move(dt) {
        this.objects.forEach((object) => {
            object.move(dt);
        });
    }

    // cistenie Canvasu
    clearCtx() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // render len zobrazuje a pozadie sa nacita raz pri inicializacii
    render() {
        this.clearCtx();
      
        // Render all objects in scene
        this.objects.forEach((object) => {
            object.draw(this.ctx);
        });
    }
}
