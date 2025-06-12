import { ChromeGrimpanFactory } from "./GrimpanFactory.js";

function main() {
  const factory = ChromeGrimpanFactory;
  const grimpan = factory.createGrimpan();
  grimpan.initialize({
    menu: [
      "pen",
      "circle",
      "rectangle",
      "eraser",
      "back",
      "forward",
      "save",
      "pipette",
      "color",
    ],
  });
}

main();
