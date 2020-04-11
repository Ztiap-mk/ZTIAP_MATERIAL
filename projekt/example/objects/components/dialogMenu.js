class DialogMenu extends BaseObject {
    onBackClick = () => {};
    
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.backBtn = new TextButton(320, 70, 100, 40, 40, 'Back');
        this.backBtn.onClickHandler = () => {
            this.onBackClick();
        }
    }


    handleEvent(ev) {
        this.backBtn.handleEvent(ev);
    }

    /**
     *
     *
     * @param {CanvasRenderingContext2D} ctx
     * @memberof TextButton
     */
    render(ctx) {
        const {x, y, width, height} = this;
        ctx.save();
        ctx.fillRect(x, y, width, height);
        ctx.strokeRect(x, y, width, height);
        ctx.restore();

        ctx.save();
        this.backBtn.render(ctx);

        ctx.restore();
    }
}