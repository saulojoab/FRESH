export default function calculateColorBetween(percentage: number) {
  const green = { r: 144, g: 238, b: 144 } as Color;
  const red = { r: 255, g: 0, b: 0 } as Color;

  // calculates color between green and red based on percentage
  const color = {
    r: Math.floor((red.r - green.r) * (percentage / 30) + green.r) as number,
    g: Math.floor((red.g - green.g) * (percentage / 30) + green.g) as number,
    b: Math.floor((red.b - green.b) * (percentage / 30) + green.b) as number,
  } as Color;

  return `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
}

export interface Color {
  r: number;
  g: number;
  b: number;
}
