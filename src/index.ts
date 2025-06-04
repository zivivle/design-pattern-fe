import AbstractGrimpanFactory from "./AbstractGrimpanFactory";
import ChromeGrimpan from "./ChromGrimpan";
import Grimpan from "./ChromGrimpan";
import IEGrimpan from "./IEGrimpan";

class ChromeGrimpanFactory extends AbstractGrimpanFactory {
  static override createGrimpan() {
    return ChromeGrimpan.getInstance();
  }
}

class IEGrimpanFactory extends AbstractGrimpanFactory {
  static override createGrimpan() {
    return IEGrimpan.getInstance();
  }
}

function main() {
  const grimpan = IEGrimpanFactory.createGrimpan();
  grimpan.initialize();
  grimpan.initializeMenu();
}

main();
