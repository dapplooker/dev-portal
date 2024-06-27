// Function to sort the map based on the custom order
export function sortContributionsMap(map: Map<string, number>, currentMonth: string): Map<string, number> {
  const orderedMonths = getOrderedMonthsFromNext(currentMonth);

  const sortedEntries = Array.from(map.entries()).sort((a, b) => {
    return orderedMonths.indexOf(a[0]) - orderedMonths.indexOf(b[0]);
  });

  return new Map(sortedEntries.reverse());
}

function getOrderedMonthsFromNext(currentMonth: string): string[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentIndex = months.indexOf(currentMonth);

  if (currentIndex === -1) throw new Error("Invalid month name");

  const nextIndex = (currentIndex + 1) % months.length;

  const orderedMonths = [...months.slice(nextIndex), ...months.slice(0, nextIndex)];

  return orderedMonths.reverse();
}
