import { parseToHsl, hslToColorString } from 'polished';

export function getContrastingTextColor(hex: string): string {
  const { hue, saturation, lightness } = parseToHsl(hex);

  // Define a threshold to decide when to darken or lighten
  const threshold = 0.5;

  let newLightness;
  let newSaturation;

  if (lightness > threshold) {
    // If the color is lighter than the threshold, make it darker
    newLightness = Math.max(lightness - 0.5, 0); // Decrease lightness
    newSaturation = Math.min(saturation + 0.9, 1); // Increase saturation
  } else {
    // If the color is darker than the threshold, make it lighter
    newLightness = Math.min(lightness + 0.5, 1); // Increase lightness
    newSaturation = Math.min(saturation + 0.9, 1); // Increase saturation
  }

  return hslToColorString({
    hue,
    saturation: newSaturation,
    lightness: newLightness,
  });
}
