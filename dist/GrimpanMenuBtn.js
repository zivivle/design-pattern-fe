class GrimpanMenuElement {
    menu;
    name;
    constructor(menu, name) {
        this.menu = menu;
        this.name = name;
    }
    static Builder = class GrimpanMenuBtnBuilder {
        btn;
        constructor(menu, name) {
            this.btn = new GrimpanMenuElement(menu, name);
        }
        setOnClick(onClick) {
            this.btn.onClick = onClick;
            return this;
        }
        setOnChange(onChange) {
            this.btn.onChange = onChange;
            return this;
        }
        setActive(active) {
            this.btn.active = active;
            return this;
        }
        setValue(value) {
            this.btn.value = value;
            return this;
        }
        build() {
            return this.btn;
        }
    };
}
export class GrimpanMenuButton extends GrimpanMenuElement {
    onClick;
    active;
    constructor(menu, name, onClick, active) {
        super(menu, name);
        this.onClick = onClick;
        this.active = active;
    }
    draw() {
        const btn = document.createElement("button");
        btn.textContent = this.name;
        if (this.onClick) {
            btn.addEventListener("click", this.onClick.bind(this));
        }
        this.menu.dom.append(btn);
    }
}
export class GrimpanMenuInput extends GrimpanMenuElement {
    onChange;
    value;
    constructor(menu, name, onChange, value) {
        super(menu, name);
        this.onChange = onChange;
        this.value = value;
    }
    draw() {
        const btn = document.createElement("input");
        btn.type = "color";
        btn.title = this.name;
        if (this.onChange) {
            btn.addEventListener("change", this.onChange.bind(this));
        }
        this.menu.dom.append(btn);
    }
}
