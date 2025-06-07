import { IEGrimpanFactory } from "./GrimpanFactory.js";

function main() {
  const factory = IEGrimpanFactory;
  const grimpan = factory.createGrimpan();
  const grimpanMenu = factory.createGrimpanMenu(
    grimpan,
    document.querySelector("#menu")!
  );
  const grimpanHistory = factory.createGrimpanHistory(grimpan);
  grimpan.initialize();
  grimpanMenu.initialize([
    "pen",
    "circle",
    "rectangle",
    "eraser",
    "back",
    "forward",
    "save",
    "pipette",
    "color",
  ]);
  grimpanHistory.initialize();
}

main();
