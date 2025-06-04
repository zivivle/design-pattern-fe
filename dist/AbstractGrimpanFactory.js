import Grimpan from "./AbstractGrimpan";
class AbstractGrimpanFactory {
    static createGrimpan() {
        return Grimpan.getInstance();
    }
}
export default AbstractGrimpanFactory;
