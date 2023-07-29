export default function clamp(number: number, min: number, max: number) {
  //number = 10, min = 0, max = 30 => 10
  return Math.max(min, Math.min(number, max));
}
