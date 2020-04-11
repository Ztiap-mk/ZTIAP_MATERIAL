class SoundToggleButton extends BaseObject {
    constructor(x, y, width, height, imageOn, imageOff, defaultState = true) {
        super(x, y, width, height);
        this.imageOn = imageOn;
        this.imageOff = imageOff;
        this.isOn = defaultState;
    }

    /**
     *
     *
     * @param {CanvasRenderingContext2D} ctx
     * @memberof TextButton
     */
    render(ctx) {
        const image = this.isOn === true ? this.imageOn : this.imageOff;
        ctx.save()
        ctx.drawImage(image, this.x, this.y, this.width, this.height);
        ctx.restore()
    }
}