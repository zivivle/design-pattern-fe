import { ChromeGrimpan, Grimpan, IEGrimpan } from "./Grimpan.js";
import { ChromeGrimpanHistory, IEGrimpanHistory } from "./GrimpanHistory.js";
import {
  ChromeGrimpanMenu,
  GrimpanMenu,
  IEGrimpanMenu,
} from "./GrimpanMenu.js";

export abstract class AbstractGrimpanFactory {
  static createGrimpan() {
    throw new Error("createGrimpan 메서드는 구현되지 않았습니다.");
  }
  static createGrimpanMenu(grimpan: Grimpan, dom: HTMLElement) {
    throw new Error("createGrimpanMenu 메서드는 구현되지 않았습니다.");
  }
  static createGrimpanHistory(grimpan: Grimpan) {
    throw new Error("createGrimpanHistory 메서드는 구현되지 않았습니다.");
  }
}

export class ChromeGrimpanFactory extends AbstractGrimpanFactory {
  static override createGrimpan() {
    return ChromeGrimpan.getInstance();
  }
  static override createGrimpanMenu(grimpan: ChromeGrimpan, dom: HTMLElement) {
    return ChromeGrimpanMenu.getInstance(grimpan, dom);
  }
  static override createGrimpanHistory(grimpan: ChromeGrimpan) {
    return ChromeGrimpanHistory.getInstance(grimpan);
  }
}

export class IEGrimpanFactory extends AbstractGrimpanFactory {
  static override createGrimpan() {
    return IEGrimpan.getInstance();
  }
  static override createGrimpanMenu(grimpan: IEGrimpan, dom: HTMLElement) {
    return IEGrimpanMenu.getInstance(grimpan, dom);
  }
  static override createGrimpanHistory(grimpan: IEGrimpan) {
    return IEGrimpanHistory.getInstance(grimpan);
  }
}
