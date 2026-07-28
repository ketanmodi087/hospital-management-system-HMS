export function convertToJSONFormat(input: string): any {
  if (input === null) {
    return null;
  }
  // Remove curly braces and split by comma
  const keyValuePairs = input.slice(1, -1).split(", ");

  // Reduce to an object format with key-value pairs
  const result = keyValuePairs.reduce<any>((acc, pair) => {
    const [key, value] = pair.split("=");
    acc[key] = value;
    return acc;
  }, {});

  return result;
}
