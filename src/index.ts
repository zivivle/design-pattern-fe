import { IEGrimpanFactory } from "./GrimpanFactory";

function main() {
  const grimpan = IEGrimpanFactory.createGrimpan();
  const grimpanMenu = IEGrimpanFactory.createGrimpanMenu(grimpan);
  const grimpanHistory = IEGrimpanFactory.createGrimpanHistory(grimpan);
  grimpan.initialize();
  grimpanMenu.initialize();
  grimpanHistory.initialize();
}

main();
