import {
  AbstractGrimpanFactory,
  ChromeGrimpanFactory,
  IEGrimpanFactory,
} from "./GrimpanFactory.js";
import { ChromeGrimpanHistory, GrimpanHistory } from "./GrimpanHistory.js";
import { BtnType, ChromeGrimpanMenu, GrimpanMenu } from "./GrimpanMenu.js";

export type GrimpanMode = "pen" | "eraser" | "pipette" | "circle" | "rectangle";

export abstract class Grimpan {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  history!: GrimpanHistory;
  menu!: GrimpanMenu;
  mode: GrimpanMode;

  protected constructor(
    canvas: HTMLElement | null,
    factory: typeof AbstractGrimpanFactory
  ) {
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error("canvas 엘리먼트를 입력하세요");
    }
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")!;
    this.mode = "pen";
  }

  setMode(mode: GrimpanMode) {
    console.log("mode Change", mode);
    this.mode = mode;
  }

  abstract initialize(options: GrimpanOptions): void;

  static getInstance() {}
}

interface GrimpanOptions {
  menu: BtnType[];
}

export class ChromeGrimpan extends Grimpan {
  private static instance: ChromeGrimpan;
  override menu: ChromeGrimpanMenu;
  override history: ChromeGrimpanHistory;

  private constructor(
    canvas: HTMLElement | null,
    factory: typeof ChromeGrimpanFactory
  ) {
    super(canvas, factory);
    this.menu = factory.createGrimpanMenu(
      this,
      document.querySelector("#menu")!
    );
    this.history = factory.createGrimpanHistory(this);
  }

  initialize(options: GrimpanOptions) {
    this.menu.initialize(options.menu);
    this.history.initialize();
  }

  static override getInstance() {
    if (!this.instance) {
      this.instance = new ChromeGrimpan(
        document.querySelector("canvas")!,
        ChromeGrimpanFactory
      );
    }
    return this.instance;
  }
}

export class IEGrimpan extends Grimpan {
  private static instance: IEGrimpan;

  initialize() {}

  static override getInstance() {
    if (!this.instance) {
      this.instance = new IEGrimpan(
        document.querySelector("canvas")!,
        IEGrimpanFactory
      );
    }
    return this.instance;
  }
}
