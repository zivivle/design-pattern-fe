import { GrimpanMenuBtn } from "./GrimpanMenuBtn.js";
export class GrimpanMenu {
    grimpan;
    dom;
    constructor(grimpan, dom) {
        this.grimpan = grimpan;
        this.dom = dom;
    }
    static getInstance(grimpan, dom) { }
}
export class IEGrimpanMenu extends GrimpanMenu {
    static instance;
    initialize(types) {
        types.forEach(this.drawButtonByType.bind(this));
    }
    drawButtonByType(type) {
        let btn;
        switch (type) {
            case "pen":
                btn = new GrimpanMenuBtn.Builder(this, "펜", "button").build();
                break;
            case "circle":
                btn = new GrimpanMenuBtn.Builder(this, "원", "button").build();
                break;
            case "rectangle":
                btn = new GrimpanMenuBtn.Builder(this, "사각형", "button").build();
                break;
            case "eraser":
                btn = new GrimpanMenuBtn.Builder(this, "지우개", "button").build();
                break;
            case "back":
                btn = new GrimpanMenuBtn.Builder(this, "뒤로가기", "button").build();
                break;
            case "forward":
                btn = new GrimpanMenuBtn.Builder(this, "앞으로가기", "button").build();
                break;
            case "save":
                btn = new GrimpanMenuBtn.Builder(this, "저장", "button").build();
                break;
            case "pipette":
                btn = new GrimpanMenuBtn.Builder(this, "파이프티", "button").build();
                break;
            case "color":
                btn = new GrimpanMenuBtn.Builder(this, "색상", "input").build();
                break;
        }
        btn.draw();
        return btn;
    }
    static getInstance(grimpan, dom) {
        if (!this.instance) {
            this.instance = new IEGrimpanMenu(grimpan, dom);
        }
        return this.instance;
    }
}
export class ChromeGrimpanMenu extends GrimpanMenu {
    static instance;
    initialize(types) {
        types.forEach(this.drawButtonByType);
    }
    drawButtonByType(type) {
        let btn;
        switch (type
        //
        ) {
        }
    }
    static getInstance(grimpan, dom) {
        if (!this.instance) {
            this.instance = new ChromeGrimpanMenu(grimpan, dom);
        }
        return this.instance;
    }
}
