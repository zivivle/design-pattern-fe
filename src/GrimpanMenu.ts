import { ChromeGrimpan, Grimpan, IEGrimpan } from "./Grimpan.js";
import { GrimpanMenuBtn, GrimpanMenuInput } from "./GrimpanMenuBtn.js";

type BtnType =
  | "pen"
  | "circle"
  | "rectangle"
  | "eraser"
  | "back"
  | "forward"
  | "save"
  | "pipette"
  | "color";

export abstract class GrimpanMenu {
  grimpan: Grimpan;
  dom: HTMLElement;

  protected constructor(grimpan: Grimpan, dom: HTMLElement) {
    this.grimpan = grimpan;
    this.dom = dom;
  }

  abstract initialize(types: BtnType[]): void;

  static getInstance(grimpan: Grimpan, dom: HTMLElement) {}
}

export class IEGrimpanMenu extends GrimpanMenu {
  private static instance: IEGrimpanMenu;

  override initialize(types: BtnType[]): void {
    types.forEach(this.drawButtonByType.bind(this));
  }

  drawButtonByType(type: BtnType) {
    let btn;
    switch (type) {
      case "pen":
        btn = new GrimpanMenuBtn.Builder(this, "펜").build();
        break;
      case "circle":
        btn = new GrimpanMenuBtn.Builder(this, "원").build();
        break;
      case "rectangle":
        btn = new GrimpanMenuBtn.Builder(this, "사각형").build();
        break;
      case "eraser":
        btn = new GrimpanMenuBtn.Builder(this, "지우개").build();
        break;
      case "back":
        btn = new GrimpanMenuBtn.Builder(this, "뒤로가기").build();
        break;
      case "forward":
        btn = new GrimpanMenuBtn.Builder(this, "앞으로가기").build();
        break;
      case "save":
        btn = new GrimpanMenuBtn.Builder(this, "저장").build();
        break;
      case "pipette":
        btn = new GrimpanMenuBtn.Builder(this, "파이프티").build();
        break;
      case "color":
        btn = new GrimpanMenuInput.Builder(this, "컬러").build();
        break;
    }
    btn.draw();
    return btn;
  }

  static override getInstance(
    grimpan: IEGrimpan,
    dom: HTMLElement
  ): IEGrimpanMenu {
    if (!this.instance) {
      this.instance = new IEGrimpanMenu(grimpan, dom);
    }
    return this.instance;
  }
}

export class ChromeGrimpanMenu extends GrimpanMenu {
  private static instance: ChromeGrimpanMenu;

  override initialize(types: BtnType[]): void {
    types.forEach(this.drawButtonByType);
  }

  drawButtonByType(type: BtnType) {
    let btn;
    switch (
      type
      //
    ) {
    }
  }

  static override getInstance(
    grimpan: ChromeGrimpan,
    dom: HTMLElement
  ): ChromeGrimpanMenu {
    if (!this.instance) {
      this.instance = new ChromeGrimpanMenu(grimpan, dom);
    }
    return this.instance;
  }
}
