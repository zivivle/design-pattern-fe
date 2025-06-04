import Grimpan from "./AbstractGrimpan";

abstract class AbstractGrimpanFactory {
  static createGrimpan() {
    return Grimpan.getInstance() as unknown as Grimpan;
  }
}

export default AbstractGrimpanFactory;
