class GrimpanMenuElement {
    menu;
    name;
    type;
    constructor(menu, name, type) {
        this.menu = menu;
        this.name = name;
        this.type = type;
    }
    draw() {
        const btn = this.createBtn();
        this.appendBeforeBtn();
        this.appendToDOM(btn);
        this.appendAfterBtn();
    }
}
class GrimpanMenuElementBuilder {
    btn;
    constructor() { }
    build() {
        return this.btn;
    }
}
export class GrimpanMenuBtn extends GrimpanMenuElement {
    onClick;
    active;
    constructor(menu, name, type, onClick, active) {
        super(menu, name, type);
        this.onClick = onClick;
        this.active = active;
    }
    createBtn() {
        const btn = document.createElement("button");
        btn.textContent = this.name;
        btn.id = `${this.type}-btn`;
        if (this.onClick) {
            btn.addEventListener("click", this.onClick.bind(this));
        }
        return btn;
    }
    appendBeforeBtn() {
        // 자식 로직
    }
    appendToDOM(btn) {
        this.menu.dom.append(btn);
    }
    appendAfterBtn() {
        // 자식 로직
    }
    static Builder = class GrimpanMenuButtonBuilder extends GrimpanMenuElementBuilder {
        btn;
        constructor(menu, name, type) {
            super();
            this.btn = new GrimpanMenuBtn(menu, name, type);
        }
        setOnClick(onClick) {
            this.btn.onClick = onClick;
            return this;
        }
        setActive(active) {
            this.btn.active = active;
            return this;
        }
    };
}
export class GrimpanMenuInput extends GrimpanMenuElement {
    onChange;
    value;
    constructor(menu, name, type, onChange, value) {
        super(menu, name, type);
        this.onChange = onChange;
        this.value = value;
    }
    createBtn() {
        const btn = document.createElement("input");
        btn.type = "color";
        btn.title = this.name;
        btn.id = "color-btn";
        if (this.onChange) {
            btn.addEventListener("change", this.onChange.bind(this));
        }
        return btn;
    }
    appendBeforeBtn() {
        // 자식 로직
    }
    appendToDOM(btn) {
        this.menu.colorBtn = btn;
        this.menu.dom.append(btn);
    }
    appendAfterBtn() {
        // 자식 로직
    }
    static Builder = class GrimpanMenuInputBuilder extends GrimpanMenuElementBuilder {
        btn;
        constructor(menu, name, type) {
            super();
            this.btn = new GrimpanMenuInput(menu, name, type);
        }
        setOnChange(onChange) {
            this.btn.onChange = onChange;
            return this;
        }
        setValue(value) {
            this.btn.value = value;
            return this;
        }
    };
}
export class GrimpanMenuSaveBtn extends GrimpanMenuBtn {
    onClickBlur;
    onClickInvert;
    onClickGrayscale;
    constructor(menu, name, type, onClick, active) {
        super(menu, name, type);
        this.active = active;
        this.onClick = onClick;
    }
    appendBeforeBtn() {
        this.drawInput("블러", this.onClickBlur);
        this.drawInput("흑백", this.onClickGrayscale);
        this.drawInput("반전", this.onClickInvert);
    }
    drawInput(title, onChange) {
        const input = document.createElement("input");
        input.type = "checkbox";
        input.title = title;
        input.addEventListener("change", onChange.bind(this));
        this.menu.dom.append(input);
    }
    static Builder = class GrimpanMenuSaveButtonBuilder extends GrimpanMenuElementBuilder {
        btn;
        constructor(menu, name, type) {
            super();
            this.btn = new GrimpanMenuSaveBtn(menu, name, type);
        }
        setFilterListeners(listeners) {
            this.btn.onClickBlur = listeners.blur;
            this.btn.onClickInvert = listeners.invert;
            this.btn.onClickGrayscale = listeners.grayscale;
            return this;
        }
        setOnClick(onClick) {
            this.btn.onClick = onClick;
            return this;
        }
        setActive(active) {
            this.btn.active = active;
            return this;
        }
    };
}
