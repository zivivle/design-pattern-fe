import { ChromeGrimpan, Grimpan, IEGrimpan } from "./Grimpan.js";
import { SubscribeManager } from "./Observer.js";

interface Clonable {
  clone(): Clonable;
}

class HistoryStack extends Array implements Clonable {
  clone() {
    return this.slice() as HistoryStack;
  }
  override slice(start?: number, end?: number): HistoryStack {
    return super.slice(start, end) as HistoryStack;
  }
}

export abstract class GrimpanHistory {
  grimpan: Grimpan;
  stack: HistoryStack;
  index = -1;

  protected constructor(grimpan: Grimpan) {
    this.grimpan = grimpan;
    this.stack = new HistoryStack();
    SubscribeManager.getInstance().subscribe("saveComplete", {
      name: "history",
      publish: this.afterSaveComplete.bind(this),
    });
  }

  saveHistory() {
    const snapshot = this.grimpan.makeSnapshot();
    if (this.index === this.stack.length - 1) {
      this.stack.push(snapshot);
      this.index++;
    } else {
      // 뒤로가기를 몇번 누른 상태 or 히스토리 스택의 마지막 상태가 아닌 경우
      this.stack = this.stack.slice(0, this.index + 1);
      this.stack.push(snapshot);
      this.index++;
    }
  }

  afterSaveComplete() {
    console.log("history save complete");
  }

  cancleSaveComplete() {
    SubscribeManager.getInstance().unsubscribe("saveComplete", "history");
  }

  undoable() {
    return this.index > 0;
  }

  redoable() {
    return this.index < this.stack.length - 1;
  }

  undo(): void {
    if (this.undoable()) {
      this.index--;
    } else {
      return;
    }
    this.grimpan.restore(this.stack[this.index]);
  }
  redo(): void {
    if (this.redoable()) {
      this.index++;
    } else {
      return;
    }
    this.grimpan.restore(this.stack[this.index]);
  }

  getStack() {
    return this.stack.clone();
  }

  setStack(stack: HistoryStack) {
    this.stack = stack.clone();
  }

  initialize() {}

  static getInstance(grimpan: Grimpan) {}
}

export class ChromeGrimpanHistory extends GrimpanHistory {
  private static instance: ChromeGrimpanHistory;

  static override getInstance(grimpan: ChromeGrimpan): ChromeGrimpanHistory {
    if (!this.instance) {
      this.instance = new ChromeGrimpanHistory(grimpan);
    }
    return this.instance;
  }
}

export class IEGrimpanHistory extends GrimpanHistory {
  private static instance: IEGrimpanHistory;

  static override getInstance(grimpan: IEGrimpan): IEGrimpanHistory {
    if (!this.instance) {
      this.instance = new IEGrimpanHistory(grimpan);
    }
    return this.instance;
  }
}
