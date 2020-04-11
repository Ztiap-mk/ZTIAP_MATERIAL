class BaseState {

    objects = [];

    constructor(stateManager, ctx) {
        this.stateManager = stateManager;
        this.ctx = ctx;
    }

    init() {

    }

    deinit() {

    }

    render() {
        // TODO pridat logiku pre zoradovanie objektov, ktory sa ma prvy zobrazit
        this.objects.forEach(object => object.render(this.ctx));
    }

    update(dt) {

    }

    handleEvent(ev) {

    }
}