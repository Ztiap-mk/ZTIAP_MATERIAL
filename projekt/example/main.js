// celu logiku som zabalil do tejto class, riesi inicializaciu ball objektov + riesi rendering + nekonecny loop
class Game {

    constructor() {
        // Set up canvas for 2D rendering
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");

        this.time = Date.now();

        this.stateManager = new StateManager(resourceManager, this.ctx);
    }

    // tato funkcia sa vola v html pri startovani hry
    // inicializuje obrazky + vytvara objekty
    async start() {
        console.log('starting game');
        await resourceManager.init();
        console.log('resouces loaded');
        this.stateManager.init();
        this.initEventSystem();

        this.startLoop();
    }

    initEventSystem() {
        this.canvas.addEventListener('click', (ev) => {
            this.handleEvent(ev);
        });
        this.canvas.addEventListener('mousemove', (ev) => {
            this.handleEvent(ev);
        });
        this.canvas.addEventListener('keypress', (ev) => {
            this.handleEvent(ev);
        });
        this.canvas.addEventListener('keydown', (ev) => {
            this.handleEvent(ev);
        });
        this.canvas.addEventListener('keyup', (ev) => {
            this.handleEvent(ev);
        });
    }

    handleEvent(ev) {
        this.stateManager.handleEvent(ev);
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
        const dt = (now - this.time) / 100; // dt nadobuda hodnoty <0.15;az 0.33> 
        this.time = now;
      
        this.update(dt);
        this.render(dt);
      
        // tu treba pouzit lambda funkciu -> ktora automaticky nabinduje this pre volanu funkciu
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
        requestAnimationFrame(() => this.step());
    }

    update(dt) {
        this.stateManager.update(dt);
    }

    // render len zobrazuje a obrazok sa nacita raz pri inicializacii
    render(dt) {
        this.clearCtx();
        this.stateManager.render(dt);
    }

    // cistenie som presunul do zvlast funkcie
    clearCtx() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
