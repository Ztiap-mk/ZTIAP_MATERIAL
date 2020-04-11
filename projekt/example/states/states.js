const STATES = {
    SPLASH: 'splashScreenState',
    GAME: 'gameState',
    MAIN_MENU: 'mainMenu',
    INFO: 'info',
    LEVEL_SELECTOR: 'levelSelector',

    SOUND_MUTE: 'level1',
    PLATFORM_MOVEMENT: 'level2',
    CANNON_ROTATE: 'level3',
}

class StateManager {
    states = {};
    currentState = null;

    constructor(resourceManager, ctx) {
        this.resourceManager = resourceManager;
        this.ctx = ctx;
    }

    init() {
        const ctx = this.ctx;
        this.states = {
            levelSelector: new LevelSelector(this, ctx),
            splashScreenState: new SplashScreenState(this, ctx),
            gameState: new GameState(this, ctx),
            mainMenu: new MainMenu(this, ctx),
            info: new InfoState(this, ctx),

            level1: new SoundMuteState(this, ctx),
            level2: new InfoState(this, ctx),
            level3: new InfoState(this, ctx),
        };
        this.currentState = this.states.splashScreenState;
    }

    changeState(state) {
        const newState = this.states[state];
        if (!newState) {
            throw new Error(`State '${state}' not found`)
        }
        this.currentState.deinit();
        this.currentState = newState;
        this.currentState.init();
    }

    update(dt) {
        this.currentState.update(dt);
    }

    handleEvent(ev) {
        this.currentState.handleEvent(ev);
    }

    render() {
        this.currentState.render(this.ctx);
    }
}


class SplashScreenState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        const startButton = new TextButton(300, 100, 200, 40, 40, 'Click me');
        startButton.onClick(() => {
            this.stateManager.changeState(STATES.MAIN_MENU);
        });

        this.objects = [
            startButton,
        ];
    }

    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });
    }
}


class GameState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        this.bgImage = resourceManager.getImageSource('bg');
        this.pointerImage = resourceManager.getImageSource('pointer2');

        // Create 5 balls
        for (let i = 0; i < 5; i++) {
            this.objects.push(new Ball());
        }
    }

    update(dt) {
        this.objects.forEach((object) => {
            object.move(dt);
        });
    }

    render(ctx) {
        this.ctx.drawImage(this.bgImage,0,0,1000,400);
        this.ctx.drawImage(this.pointerImage,400,50,50,50);
        this.objects.forEach(object => object.render(this.ctx));
    }
}

class MainMenu extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        const startGameButton = new TextButton(100, 100, 200, 40, 40, 'Start Game');
        startGameButton.onClick((ev) => {
            this.stateManager.changeState(STATES.LEVEL_SELECTOR);
        });

        const infoButton = new TextButton(100, 200, 200, 40, 40, 'Help');
        infoButton.onClick((ev) => {
            this.stateManager.changeState(STATES.INFO);
        });

        this.objects = [
            startGameButton,
            infoButton,
        ];
    }

    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });

        if (isKeyPressEvent(ev) && ev.key === 'g') {
            this.stateManager.changeState(STATES.GAME);
        }
    }
}

class InfoState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);
        const canvas = document.getElementById("canvas");
        this.objects = [
            new Background(0, 0, canvas.width, canvas.height, resourceManager.getImageSource('bg')),
            new TextButton(100, 100, 200, 40, 40, 'Jedno Info'),
            new TextButton(100, 150, 200, 40, 40, 'Druhe Info'),
            new TextButton(100, 200, 200, 40, 40, 'Tretie Info'),
        ];
    }

    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });
    }
}