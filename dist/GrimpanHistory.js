import { SubscribeManager } from "./Observer.js";
export class HistoryStack extends Array {
    clone() {
        return this.slice();
    }
    slice(start, end) {
        return super.slice(start, end);
    }
}
export class GrimpanHistory {
    grimpan;
    stack;
    index = -1;
    constructor(grimpan) {
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
        }
        else {
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
    undo() {
        if (this.undoable()) {
            this.index--;
        }
        else {
            return;
        }
        this.grimpan.restore(this.stack[this.index]);
    }
    redo() {
        if (this.redoable()) {
            this.index++;
        }
        else {
            return;
        }
        this.grimpan.restore(this.stack[this.index]);
    }
    getStack() {
        return this.stack.clone();
    }
    setStack(stack) {
        this.stack = stack.clone();
    }
    initialize() { }
    static getInstance(grimpan) { }
}
export class ChromeGrimpanHistory extends GrimpanHistory {
    static instance;
    static getInstance(grimpan) {
        if (!this.instance) {
            this.instance = new ChromeGrimpanHistory(grimpan);
        }
        return this.instance;
    }
}
export class IEGrimpanHistory extends GrimpanHistory {
    static instance;
    static getInstance(grimpan) {
        if (!this.instance) {
            this.instance = new IEGrimpanHistory(grimpan);
        }
        return this.instance;
    }
}
