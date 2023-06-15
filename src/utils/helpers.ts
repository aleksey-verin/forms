export function countCharactersWithoutSpaces(str: string): number {
  const stringWithoutSpaces = str.replace(/\s/g, '');
  return stringWithoutSpaces.length;
}
