function convertToHex(color: number) {
  if (color < 0) {
    return 0;
  } else if (color > 255) {
    return 255;
  }
  const hex = color.toString(16);
  return `0${hex}`.slice(-2);
}

export function rgb2hex(r: number, g: number, b: number) {
  return `#${convertToHex(r)}${convertToHex(g)}${convertToHex(b)}`;
}
