import { BackCommand, ForwardCommand } from "./commands/index.js";
import {
  BlurFilter,
  DefaultFilter,
  GrayscaleFilter,
  InvertFilter,
} from "./filters/index.js";
import {
  AbstractGrimpanFactory,
  ChromeGrimpanFactory,
  IEGrimpanFactory,
} from "./GrimpanFactory.js";
import { ChromeGrimpanHistory, GrimpanHistory } from "./GrimpanHistory.js";
import { BtnType, ChromeGrimpanMenu, GrimpanMenu } from "./GrimpanMenu.js";
import {
  CircleMode,
  EraserMode,
  Mode,
  PenMode,
  PipetteMode,
  RectangleMode,
} from "./modes/index.js";
import { SaveCompleteObserver, SubscribeManager } from "./Observer.js";

export type GrimpanMode = "pen" | "eraser" | "pipette" | "circle" | "rectangle";

export abstract class Grimpan {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  history!: GrimpanHistory;
  menu!: GrimpanMenu;
  mode: Mode | null;
  color: string;
  active: boolean;
  saveStrategy!: () => void;
  saveSetting = {
    blur: false,
    grayscale: false,
    invert: false,
  };

  protected constructor(
    canvas: HTMLElement | null,
    factory: typeof AbstractGrimpanFactory
  ) {
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error("canvas 엘리먼트를 입력하세요");
    }
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")!;
    this.mode = null;
    this.color = "#000000";
    this.active = false;
    this.setSaveStrategy("png");
    SubscribeManager.getInstance().addEvent("saveComplete");
  }

  setSaveStrategy(imageType: "png" | "jpg" | "webp" | "avif" | "gif" | "pdf") {
    switch (imageType) {
      case "png":
        this.saveStrategy = () => {
          let imageData = this.ctx.getImageData(0, 0, 300, 300);
          /**
           * offscreenCanvas는 화면에는 표시되지않고 메모리에만 존재하는 캔버스
           * */
          const offscreenCanvas = new OffscreenCanvas(300, 300);
          const offscreenContext = offscreenCanvas.getContext("2d")!;
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
                const dataURL = reader.result as string;
                console.log(dataURL);
                let url = dataURL.replace(
                  /^data:image\/png/,
                  "data:application/octet-stream"
                );
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
          let url = dataURL.replace(
            /^data:image\/jpeg/,
            "data:application/octet-stream"
          );
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
          let url = dataURL.replace(
            /^data:image\/webp/,
            "data:application/octet-stream"
          );
          a.href = url;
          a.click();
        };
        break;
      case "avif":
        this.saveStrategy = () => {};
        break;
      case "gif":
        this.saveStrategy = () => {};
        break;
      case "pdf":
        this.saveStrategy = () => {};
        break;
    }
  }

  setMode(mode: GrimpanMode) {
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

  setColor(color: string) {
    this.color = color;
  }

  changeColor(color: string) {
    this.setColor(color);
    if (this.menu.colorBtn) {
      this.menu.colorBtn.value = color;
    }
  }

  abstract initialize(options: GrimpanOptions): void;
  abstract onMouseDown(e: MouseEvent): void;
  abstract onMouseMove(e: MouseEvent): void;
  abstract onMouseUp(e: MouseEvent): void;

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
    window.addEventListener("keyup", (e: KeyboardEvent) => {
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

  override onMouseDown(e: MouseEvent): void {
    this.mode?.mousedown(e);
  }
  override onMouseMove(e: MouseEvent): void {
    this.mode?.mousemove(e);
  }
  override onMouseUp(e: MouseEvent): void {
    this.mode?.mouseup(e);
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

  override onMouseDown() {}
  override onMouseMove() {}
  override onMouseUp() {}

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
