class HistoryStack extends Array {
    clone() {
        return this.slice();
    }
}
export class GrimpanHistory {
    grimpan;
    stack;
    constructor(grimpan) {
        this.grimpan = grimpan;
        this.stack = new HistoryStack();
        this.grimpan.saveCompleteObserver.subscribe({
            name: "history",
            publish: this.afterSaveComplete.bind(this),
        });
    }
    afterSaveComplete() {
        console.log("history save complete");
    }
    getStack() {
        return this.stack.clone();
    }
    setStack(stack) {
        this.stack = stack.clone();
    }
    static getInstance(grimpan) { }
}
export class ChromeGrimpanHistory extends GrimpanHistory {
    static instance;
    undo() {
        console.log("undo");
    }
    redo() {
        console.log("redo");
    }
    initialize() { }
    static getInstance(grimpan) {
        if (!this.instance) {
            this.instance = new ChromeGrimpanHistory(grimpan);
        }
        return this.instance;
    }
}
export class IEGrimpanHistory extends GrimpanHistory {
    static instance;
    undo() {
        console.log("undo");
    }
    redo() {
        console.log("redo");
    }
    initialize() { }
    static getInstance(grimpan) {
        if (!this.instance) {
            this.instance = new IEGrimpanHistory(grimpan);
        }
        return this.instance;
    }
}
