import { BackCommand, ForwardCommand, } from "./commands/index.js";
import { BlurFilter, DefaultFilter, GrayscaleFilter, InvertFilter, } from "./filters/index.js";
import { ChromeGrimpanFactory, IEGrimpanFactory, } from "./GrimpanFactory.js";
import { CircleMode, EraserMode, PenMode, PipetteMode, RectangleMode, } from "./modes/index.js";
import { SubscribeManager } from "./Observer.js";
export class Grimpan {
    canvas;
    ctx;
    history;
    menu;
    mode;
    color;
    active;
    saveStrategy;
    saveSetting = {
        blur: false,
        grayscale: false,
        invert: false,
    };
    // 메멘토 패턴 적용
    makeSnapshot() {
        const snapshot = {
            color: this.color,
            mode: this.mode,
            data: this.canvas.toDataURL("image/png"),
        };
        return Object.freeze(snapshot);
    }
    constructor(canvas, factory) {
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
            throw new Error("canvas 엘리먼트를 입력하세요");
        }
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.mode = null;
        this.color = "#000000";
        this.active = false;
        this.setSaveStrategy("png");
        SubscribeManager.getInstance().addEvent("saveComplete");
    }
    setSaveStrategy(imageType) {
        switch (imageType) {
            case "png":
                this.saveStrategy = () => {
                    let imageData = this.ctx.getImageData(0, 0, 300, 300);
                    /**
                     * offscreenCanvas는 화면에는 표시되지않고 메모리에만 존재하는 캔버스
                     * */
                    const offscreenCanvas = new OffscreenCanvas(300, 300);
                    const offscreenContext = offscreenCanvas.getContext("2d");
                    offscreenContext.putImageData(imageData, 0, 0);
                    const df = new DefaultFilter();
                    let filter = df;
                    if (this.saveSetting.blur) {
                        const bf = new BlurFilter();
                        filter = filter.setNext(bf);
                    }
                    if (this.saveSetting.grayscale) {
                        const gf = new GrayscaleFilter();
                        filter = filter.setNext(gf);
                    }
                    if (this.saveSetting.invert) {
                        const ivf = new InvertFilter();
                        filter = filter.setNext(ivf);
                    }
                    df.handle(offscreenCanvas).then(() => {
                        const a = document.createElement("a");
                        a.download = "canvas.png";
                        offscreenCanvas.convertToBlob().then((blob) => {
                            const reader = new FileReader();
                            reader.addEventListener("load", () => {
                                const dataURL = reader.result;
                                console.log(dataURL);
                                let url = dataURL.replace(/^data:image\/png/, "data:application/octet-stream");
                                a.href = url;
                                a.click();
                                SubscribeManager.getInstance().publish("saveComplete");
                            });
                            reader.readAsDataURL(blob);
                        });
                    });
                };
                break;
            case "jpg":
                this.saveStrategy = () => {
                    if (this.saveSetting.blur) {
                    }
                    if (this.saveSetting.grayscale) {
                    }
                    if (this.saveSetting.invert) {
                    }
                    const a = document.createElement("a");
                    a.download = "canvas.jpg";
                    const dataURL = this.canvas.toDataURL("image/jpeg");
                    let url = dataURL.replace(/^data:image\/jpeg/, "data:application/octet-stream");
                    a.href = url;
                    a.click();
                };
                break;
            case "webp":
                this.saveStrategy = () => {
                    if (this.saveSetting.blur) {
                    }
                    if (this.saveSetting.grayscale) {
                    }
                    if (this.saveSetting.invert) {
                    }
                    const a = document.createElement("a");
                    a.download = "canvas.webp";
                    const dataURL = this.canvas.toDataURL("image/webp");
                    let url = dataURL.replace(/^data:image\/webp/, "data:application/octet-stream");
                    a.href = url;
                    a.click();
                };
                break;
            case "avif":
                this.saveStrategy = () => { };
                break;
            case "gif":
                this.saveStrategy = () => { };
                break;
            case "pdf":
                this.saveStrategy = () => { };
                break;
        }
    }
    setMode(mode) {
        console.log("mode Change", mode);
        switch (mode) {
            case "pen": {
                this.mode = new PenMode(this);
                break;
            }
            case "eraser": {
                this.mode = new EraserMode(this);
                break;
            }
            case "circle": {
                this.mode = new CircleMode(this);
                break;
            }
            case "rectangle": {
                this.mode = new RectangleMode(this);
                break;
            }
            case "pipette": {
                this.mode = new PipetteMode(this);
                break;
            }
        }
    }
    invoke(command) {
        command.execute();
    }
    setColor(color) {
        this.color = color;
    }
    changeColor(color) {
        this.setColor(color);
        if (this.menu.colorBtn) {
            this.menu.colorBtn.value = color;
        }
    }
    resetState() {
        this.color = "#000000";
        this.mode = new PenMode(this);
        // clearRect로 canvas를 전체 지울수 있음
        this.ctx.clearRect(0, 0, 300, 300);
    }
    restore(history) {
        const img = new Image();
        img.addEventListener("load", () => {
            this.ctx.clearRect(0, 0, 300, 300);
            this.ctx.drawImage(img, 0, 0, 300, 300);
        });
        img.src = history.data;
    }
    static getInstance() { }
}
export class ChromeGrimpan extends Grimpan {
    static instance;
    menu;
    history;
    constructor(canvas, factory) {
        super(canvas, factory);
        this.menu = factory.createGrimpanMenu(this, document.querySelector("#menu"));
        this.history = factory.createGrimpanHistory(this);
    }
    initialize(options) {
        this.menu.initialize(options.menu);
        this.history.initialize();
        window.addEventListener("keyup", (e) => {
            if (e.code === "ShiftLeft") {
                this.menu.executeCommand(new ForwardCommand(this.history));
                return;
            }
            if (e.code === "MetaLeft") {
                this.menu.executeCommand(new BackCommand(this.history));
                return;
            }
        });
        this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
        this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
        this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
        this.canvas.addEventListener("mouseleave", this.onMouseUp.bind(this));
    }
    onMouseDown(e) {
        this.mode?.mousedown(e);
    }
    onMouseMove(e) {
        this.mode?.mousemove(e);
    }
    onMouseUp(e) {
        this.mode?.mouseup(e);
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ChromeGrimpan(document.querySelector("canvas"), ChromeGrimpanFactory);
        }
        return this.instance;
    }
}
export class IEGrimpan extends Grimpan {
    static instance;
    initialize() { }
    onMouseDown() { }
    onMouseMove() { }
    onMouseUp() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new IEGrimpan(document.querySelector("canvas"), IEGrimpanFactory);
        }
        return this.instance;
    }
}
