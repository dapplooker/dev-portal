// Function to sort the map by values and take the first 10 entries
export function sortAndTakeTopEntries(map: Map<string, number>, topN: number): Map<string, number> {
  const entriesArray = Array.from(map.entries());
  const sortedArray = entriesArray.sort((a, b) => b[1] - a[1]);

  const topEntries = sortedArray.slice(0, topN);

  return new Map(topEntries);
}