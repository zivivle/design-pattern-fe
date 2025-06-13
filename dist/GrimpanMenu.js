import { BackCommand, PenSelectCommand, SaveCommand, } from "./commands/index.js";
import { GrimpanMenuBtn, GrimpanMenuInput } from "./GrimpanMenuBtn.js";
export class GrimpanMenu {
    grimpan;
    dom;
    colorBtn;
    constructor(grimpan, dom) {
        this.grimpan = grimpan;
        this.dom = dom;
    }
    setActiveBtn(type) {
        document.querySelector(".active")?.classList.remove("active");
        document.querySelector(`#${type}-btn`)?.classList.add("active");
    }
    executeCommand(command) {
        // 조건에 따라서 command를 호출할수도 있고 호출하지 않을수도 있음
        command.execute();
    }
    static getInstance(grimpan, dom) { }
}
export class IEGrimpanMenu extends GrimpanMenu {
    static instance;
    initialize(types) {
        types.forEach(this.drawButtonByType.bind(this));
        document.addEventListener("keydown", this.onClickBack);
        this.grimpan.setMode("pen");
    }
    onClickBack() {
        this.executeCommand(new BackCommand(this.grimpan.history));
    }
    drawButtonByType(type) {
        let btn;
        switch (type) {
            case "pen":
                btn = new GrimpanMenuBtn.Builder(this, "펜", type).build();
                break;
            case "circle":
                btn = new GrimpanMenuBtn.Builder(this, "원", type).build();
                break;
            case "rectangle":
                btn = new GrimpanMenuBtn.Builder(this, "사각형", type).build();
                break;
            case "eraser":
                btn = new GrimpanMenuBtn.Builder(this, "지우개", type).build();
                break;
            case "back":
                btn = new GrimpanMenuBtn.Builder(this, "뒤로가기", type)
                    .setOnClick(() => {
                    // 뒤로가기 작업
                })
                    .build();
                break;
            case "forward":
                btn = new GrimpanMenuBtn.Builder(this, "앞으로가기", type)
                    .setOnClick(() => {
                    // 앞으로가기 작업
                })
                    .build();
                break;
            case "save":
                btn = new GrimpanMenuBtn.Builder(this, "저장", type).build();
                break;
            case "pipette":
                btn = new GrimpanMenuBtn.Builder(this, "파이프티", type).build();
                break;
            case "color":
                btn = new GrimpanMenuInput.Builder(this, "컬러", type)
                    .setOnChange((e) => {
                    if (e.target) {
                        this.grimpan.setColor(e.target.value);
                    }
                })
                    .build();
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
        types.forEach(this.drawButtonByType.bind(this));
        document.addEventListener("keydown", this.onClickBack.bind(this));
        this.grimpan.setMode("pen");
    }
    onSave() {
        this.executeCommand(new SaveCommand(this.grimpan));
    }
    onClickBack() {
        this.executeCommand(new BackCommand(this.grimpan.history));
    }
    onClickPen() {
        const command = new PenSelectCommand(this.grimpan);
        this.executeCommand(command);
        this.grimpan.history.stack.push(command);
    }
    onClickEraser() {
        this.grimpan.setMode("eraser");
    }
    onClickCircle() {
        this.grimpan.setMode("circle");
    }
    onClickRectangle() {
        this.grimpan.setMode("rectangle");
    }
    onClickPipette() {
        this.grimpan.setMode("pipette");
    }
    drawButtonByType(type) {
        let btn;
        switch (type) {
            case "pen":
                btn = new GrimpanMenuBtn.Builder(this, "펜", type)
                    .setOnClick(this.onClickPen.bind(this))
                    .build();
                break;
            case "circle":
                btn = new GrimpanMenuBtn.Builder(this, "원", type)
                    .setOnClick(this.onClickCircle.bind(this))
                    .build();
                break;
            case "rectangle":
                btn = new GrimpanMenuBtn.Builder(this, "사각형", type)
                    .setOnClick(this.onClickRectangle.bind(this))
                    .build();
                break;
            case "eraser":
                btn = new GrimpanMenuBtn.Builder(this, "지우개", type)
                    .setOnClick(this.onClickEraser.bind(this))
                    .build();
                break;
            case "back":
                btn = new GrimpanMenuBtn.Builder(this, "뒤로가기", type)
                    .setOnClick(this.onClickBack.bind(this))
                    .build();
                break;
            case "forward":
                btn = new GrimpanMenuBtn.Builder(this, "앞으로가기", type)
                    .setOnClick(() => {
                    // 앞으로가기 작업
                })
                    .build();
                break;
            case "pipette":
                btn = new GrimpanMenuBtn.Builder(this, "파이프티", type)
                    .setOnClick(this.onClickPipette.bind(this))
                    .build();
                break;
            case "color":
                btn = new GrimpanMenuInput.Builder(this, "컬러", type)
                    .setOnChange((e) => {
                    if (e.target) {
                        this.grimpan.setColor(e.target.value);
                    }
                })
                    .build();
                break;
            case "save":
                btn = new GrimpanMenuBtn.Builder(this, "저장", type)
                    .setOnClick(this.onSave.bind(this))
                    .build();
                break;
        }
        btn.draw();
        return btn;
    }
    static getInstance(grimpan, dom) {
        if (!this.instance) {
            this.instance = new ChromeGrimpanMenu(grimpan, dom);
        }
        return this.instance;
    }
}
