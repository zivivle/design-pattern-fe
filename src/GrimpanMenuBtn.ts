import { BtnType, GrimpanMenu } from "./GrimpanMenu.js";

abstract class GrimpanMenuElement {
  protected menu: GrimpanMenu;
  protected name: string;
  protected type: BtnType;

  protected constructor(menu: GrimpanMenu, name: string, type: BtnType) {
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

  abstract createBtn(): HTMLElement;
  abstract appendBeforeBtn(): void;
  abstract appendToDOM(btn: HTMLElement): void;
  abstract appendAfterBtn(): void;
}

abstract class GrimpanMenuElementBuilder {
  btn!: GrimpanMenuElement;
  constructor() {}

  build() {
    return this.btn;
  }
}

export class GrimpanMenuBtn extends GrimpanMenuElement {
  protected onClick?: () => void;
  protected active?: boolean;

  protected constructor(
    menu: GrimpanMenu,
    name: string,
    type: BtnType,
    onClick?: () => void,
    active?: boolean
  ) {
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

  appendToDOM(btn: HTMLButtonElement) {
    this.menu.dom.append(btn);
  }

  appendAfterBtn() {
    // 자식 로직
  }

  static Builder = class GrimpanMenuButtonBuilder extends GrimpanMenuElementBuilder {
    override btn: GrimpanMenuBtn;
    constructor(menu: GrimpanMenu, name: string, type: BtnType) {
      super();
      this.btn = new GrimpanMenuBtn(menu, name, type);
    }

    setOnClick(onClick: () => void) {
      this.btn.onClick = onClick;
      return this;
    }

    setActive(active: boolean) {
      this.btn.active = active;
      return this;
    }
  };
}

export class GrimpanMenuInput extends GrimpanMenuElement {
  protected onChange?: (e: Event) => void;
  protected value?: string | number;

  protected constructor(
    menu: GrimpanMenu,
    name: string,
    type: BtnType,
    onChange?: () => void,
    value?: string | number
  ) {
    super(menu, name, type);
    this.onChange = onChange;
    this.value = value;
  }

  createBtn(): HTMLInputElement {
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

  appendToDOM(btn: HTMLInputElement) {
    this.menu.colorBtn = btn;
    this.menu.dom.append(btn);
  }

  appendAfterBtn() {
    // 자식 로직
  }

  static Builder = class GrimpanMenuInputBuilder extends GrimpanMenuElementBuilder {
    override btn: GrimpanMenuInput;
    constructor(menu: GrimpanMenu, name: string, type: BtnType) {
      super();
      this.btn = new GrimpanMenuInput(menu, name, type);
    }

    setOnChange(onChange: (e: Event) => void) {
      this.btn.onChange = onChange;
      return this;
    }

    setValue(value: string | number) {
      this.btn.value = value;
      return this;
    }
  };
}

export class GrimpanMenuSaveBtn extends GrimpanMenuBtn {
  private onClickBlur!: (e: Event) => void;
  private onClickInvert!: (e: Event) => void;
  private onClickGrayscale!: (e: Event) => void;

  private constructor(
    menu: GrimpanMenu,
    name: string,
    type: BtnType,
    onClick?: () => void,
    active?: boolean
  ) {
    super(menu, name, type);
    this.active = active;
    this.onClick = onClick;
  }

  override appendBeforeBtn(): void {
    this.drawInput("블러", this.onClickBlur);
    this.drawInput("흑백", this.onClickGrayscale);
    this.drawInput("반전", this.onClickInvert);
  }

  drawInput(title: string, onChange: (e: Event) => void) {
    const input = document.createElement("input") as HTMLInputElement;
    input.type = "checkbox";
    input.title = title;
    input.addEventListener("change", onChange.bind(this));
    this.menu.dom.append(input);
  }

  static override Builder = class GrimpanMenuSaveButtonBuilder extends GrimpanMenuElementBuilder {
    override btn: GrimpanMenuSaveBtn;
    constructor(menu: GrimpanMenu, name: string, type: BtnType) {
      super();
      this.btn = new GrimpanMenuSaveBtn(menu, name, type);
    }

    setFilterListeners(listeners: {
      [key in "blur" | "invert" | "grayscale"]: (e: Event) => void;
    }) {
      this.btn.onClickBlur = listeners.blur;
      this.btn.onClickInvert = listeners.invert;
      this.btn.onClickGrayscale = listeners.grayscale;
      return this;
    }

    setOnClick(onClick: () => void) {
      this.btn.onClick = onClick;
      return this;
    }

    setActive(active: boolean) {
      this.btn.active = active;
      return this;
    }
  };
}
