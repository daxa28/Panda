export function getRandomString(array: string[]): string {
  return array[Math.floor(Math.random() * array.length)] ?? "";
}
