import { ChromeGrimpan, IEGrimpan } from "./Grimpan.js";
import { ChromeGrimpanHistory, IEGrimpanHistory } from "./GrimpanHistory.js";
import { ChromeGrimpanMenu, IEGrimpanMenu, } from "./GrimpanMenu.js";
export class AbstractGrimpanFactory {
    static createGrimpan() {
        throw new Error("createGrimpan 메서드는 구현되지 않았습니다.");
    }
    static createGrimpanMenu(grimpan, dom) {
        throw new Error("createGrimpanMenu 메서드는 구현되지 않았습니다.");
    }
    static createGrimpanHistory(grimpan) {
        throw new Error("createGrimpanHistory 메서드는 구현되지 않았습니다.");
    }
}
export class ChromeGrimpanFactory extends AbstractGrimpanFactory {
    static createGrimpan() {
        return ChromeGrimpan.getInstance();
    }
    static createGrimpanMenu(grimpan, dom) {
        return ChromeGrimpanMenu.getInstance(grimpan, dom);
    }
    static createGrimpanHistory(grimpan) {
        return ChromeGrimpanHistory.getInstance(grimpan);
    }
}
export class IEGrimpanFactory extends AbstractGrimpanFactory {
    static createGrimpan() {
        return IEGrimpan.getInstance();
    }
    static createGrimpanMenu(grimpan, dom) {
        return IEGrimpanMenu.getInstance(grimpan, dom);
    }
    static createGrimpanHistory(grimpan) {
        return IEGrimpanHistory.getInstance(grimpan);
    }
}
