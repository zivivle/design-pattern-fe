import { ChromeGrimpan, Grimpan, IEGrimpan } from "./Grimpan.js";

interface Clonable {
  clone(): Clonable;
}

class HistoryStack extends Array implements Clonable {
  clone() {
    return this.slice() as HistoryStack;
  }
}

export abstract class GrimpanHistory {
  grimpan: Grimpan;
  stack: HistoryStack;

  protected constructor(grimpan: Grimpan) {
    this.grimpan = grimpan;
    this.stack = new HistoryStack();
  }

  abstract undo(): void;
  abstract redo(): void;

  getStack() {
    return this.stack.clone();
  }

  setStack(stack: HistoryStack) {
    this.stack = stack.clone();
  }

  abstract initialize(): void;

  static getInstance(grimpan: Grimpan) {}
}

export class ChromeGrimpanHistory extends GrimpanHistory {
  private static instance: ChromeGrimpanHistory;

  override undo(): void {
    console.log("undo");
  }
  override redo(): void {
    console.log("redo");
  }

  override initialize(): void {}

  static override getInstance(grimpan: ChromeGrimpan): ChromeGrimpanHistory {
    if (!this.instance) {
      this.instance = new ChromeGrimpanHistory(grimpan);
    }
    return this.instance;
  }
}

export class IEGrimpanHistory extends GrimpanHistory {
  private static instance: IEGrimpanHistory;

  override undo(): void {
    console.log("undo");
  }

  override redo(): void {
    console.log("redo");
  }

  override initialize(): void {}

  static override getInstance(grimpan: IEGrimpan): IEGrimpanHistory {
    if (!this.instance) {
      this.instance = new IEGrimpanHistory(grimpan);
    }
    return this.instance;
  }
}
