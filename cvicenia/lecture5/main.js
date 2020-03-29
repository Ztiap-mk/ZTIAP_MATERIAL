const IMAGES = [
    {name: 'ball', src: 'img/ball.png'},
    {name: 'virus', src: 'img/virus.png'},
    {name: 'pointer2', src: 'img/pointer2.png'},
    {name: 'crowd', src: 'img/crowd.png'},
];

// toto je viac menej bez zmeny len som sa zbavil globalnych premennych
// pridal ctx parameter do draw
class Ball {
    // Initialization
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('ball');
    
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.dx = Math.random() * 50 - 25
        this.dy = Math.random() * 50 - 25
        this.size = Math.random() + .3
        this.rotation = 0
    }
  
    // Movement logic
    move(dt) {
        const canvas = this.canvas;
        if (this.x > canvas.width) {
            this.x = canvas.width
            this.dx = -Math.abs(this.dx)
        }
        if (this.x < 0) {
            this.x = 0
            this.dx = Math.abs(this.dx)
        }
        if (this.y > canvas.height) {
            this.y = canvas.height
            this.dy = -Math.abs(this.dy)
        }
        if (this.y < 0) {
            this.y = 0
            this.dy = Math.abs(this.dy) * 0.95
        }
    
        // Movement
        this.x += this.dx * dt
        this.y += 0 * dt
        this.rotation +=dt/3
    }
  
    // Render self
    draw(ctx) {
      ctx.save()
      ctx.translate(this.x, this.y)
      ctx.rotate(this.rotation)
      ctx.scale(this.size, this.size)
      ctx.drawImage(this.image, -20, -20, 40, 40)
      ctx.restore()
    }
}

// toto sluzi na inicialne loadnutie vsetkych obrazkov... aby to nebolo ako hidden image v html
class ResourceManager {
    loadedImages = new Map();

    async init() {
        await this.loadImages();
    }

    async loadImages() {
        await Promise.all(
            IMAGES.map(image => this.loadImage(image)),
        )
    }

    // dynamicky vytvorenie Image objectov spolu s tym aby sa nacitali obrazky
    // pouzili sa promise a async/await -> lepsie sa pracuje s asynchronnymi operaciami pri nacitavani obrazkov
    // nejaky tutorial ako to funguje -> 
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
    async loadImage(imgResource) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = imgResource.src;
            img.onload = () => {
                this.loadedImages.set(imgResource.name, img);
                resolve(img);
            }
            img.onerror = (err) => {
                reject(err);
            }
        });
    }

    // ziskat js object Image, ktory sa posle do canvas
    getImageSource(imageName) {
        const image = this.loadedImages.get(imageName);
        if (image == null) {
            throw new Error(`Image '${imageName}' not found`);
        }
        return image;
    }
}

const resourceManager = new ResourceManager();

// celu logiku som zabalil do tejto class, riesi inicializaciu ball objektov + riesi rendering + nekonecny loop
class Game {
    time = Date.now();
    
    // Set up canvas for 2D rendering
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    objects = [];

    // tato funkcia sa vola v html pri startovani hry
    // inicializuje obrazky + vytvara objekty
    async start() {
        console.log('starting game');
        await resourceManager.init();
        console.log('resouces loaded');

        this.bgImage = resourceManager.getImageSource('crowd');
        this.pointerImage = resourceManager.getImageSource('pointer2');

        // Create 5 balls
        for (let i = 0; i < 5; i++) {
            this.objects.push(new Ball());
        }

        this.startLoop();
    }

    // spusta nekonecnu sluzku
    startLoop() {
        this.time = Date.now();
        this.step();
    }

    // 
    step() {
        // console.log("Step");
      
        // Get time delta
        const now = Date.now();
        const dt = (now - this.time) / 100;
        this.time = now;
      
        this.move(dt);
        this.render();
      
        // tu treba pouzit lambda funkciu -> ktora automaticky nabinduje this pre volanu funkciu
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
        requestAnimationFrame(() => this.step());
    }

    move(dt) {
        this.objects.forEach((object) => {
            object.move(dt);
        });
    }

    // cistenie som presunul do zvlast funkcie
    clearCtx() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // render len zobrazuje a obrazok sa nacita raz pri inicializacii
    render() {
        this.clearCtx();
        this.ctx.drawImage(this.bgImage,0,0,1000,400);
        this.ctx.drawImage(this.pointerImage,400,50,50,50);
        
        // Render all objects in scene
        this.objects.forEach((object) => {
            object.draw(this.ctx);
        });
        
    }
}
