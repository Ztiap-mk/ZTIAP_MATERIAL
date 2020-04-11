class SoundMuteState extends BaseState {

    isPaused = false;
    isMenuOpened = false;

    constructor(stateManager, ctx) {
        super(stateManager, ctx);

        const virus = new ImageButton(200, 200, 50, 50, resourceManager.getImageSource('virus'));
        const soundToggleButton = new SoundToggleButton(10, 10 , 30, 30, resourceManager.getImageSource('soundOn'), resourceManager.getImageSource('soundOff'), true);

        soundToggleButton.onClickHandler = () => {
            soundManager.toggleSound();
            soundToggleButton.isOn = !(soundManager.isMuted());
        };

        virus.onClickHandler = () => {
            soundManager.playSound();
        };

        this.dialogMenu = new DialogMenu(300, 50, 300, 300);
        this.dialogMenu.onBackClick = () => {
            this.stateManager.changeState(STATES.LEVEL_SELECTOR);
        };

        this.objects.push(soundToggleButton, virus);
    }

    init() {
        super.init();
        soundManager.playMusic();
    }

    deinit() {
        super.deinit();
        soundManager.stopMusic();
    }

    render() {
        // TODO pridat logiku pre zoradovanie objektov, ktory sa ma prvy zobrazit
        this.objects.forEach(object => object.render(this.ctx));

        if (this.isMenuOpened) {
            this.dialogMenu.render(this.ctx);
        }
    }

    update(dt) {
        if (this.isPaused) {
            return;
        }
    }

    handleEvent(ev) {
        if (isKeyUpEvent(ev)) {
            this.toggleMenu();
        }
        this.objects.forEach(object => object.handleEvent(ev));
        if (this.isMenuOpened) {
            this.dialogMenu.handleEvent(ev);
        }
    }

    toggleMenu() {
        this.isMenuOpened = !this.isMenuOpened;
    }
}