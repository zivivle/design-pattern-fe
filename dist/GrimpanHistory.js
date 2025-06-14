import { SubscribeManager } from "./Observer.js";
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
        SubscribeManager.getInstance().subscribe("saveComplete", {
            name: "history",
            publish: this.afterSaveComplete.bind(this),
        });
    }
    afterSaveComplete() {
        console.log("history save complete");
    }
    cancleSaveComplete() {
        SubscribeManager.getInstance().unsubscribe("saveComplete", "history");
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
