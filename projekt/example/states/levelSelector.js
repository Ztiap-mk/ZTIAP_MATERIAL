class LevelSelector extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);
        const canvas = document.getElementById("canvas");
        this.objects = [
            new Background(0, 0, canvas.width, canvas.height, resourceManager.getImageSource('bg')),
        ];

        const soundMute = new ImageButton(20, 20, 50, 50, resourceManager.getImageSource('virus'));
        soundMute.onClickHandler = () => {
            this.stateManager.changeState(STATES.SOUND_MUTE);
        };

        const platformMovement = new ImageButton(90, 20, 50, 50, resourceManager.getImageSource('virus'));
        platformMovement.onClickHandler = () => {
            this.stateManager.changeState(STATES.PLATFORM_MOVEMENT);
        };

        const cannonMouseRotate = new ImageButton(160, 20, 50, 50, resourceManager.getImageSource('virus'));
        cannonMouseRotate.onClickHandler = () => {
            this.stateManager.changeState(STATES.CANNON_ROTATE);
        };

        this.objects.push(soundMute, platformMovement, cannonMouseRotate);
    }

    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });
    }
}