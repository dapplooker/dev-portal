import { MonthRange, RepositoriesInterface } from "@/app/interface";

class SortData {

  public get nonRequiredProjects() {
    return [
      "hasura/graphql-engine",
      "microstream-one/microstream",
    ];
  }

  public get monthsList() {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }

  // Function to sort the map by values and take the first 10 entries
  public sortAndTakeTopEntries(map: Map<string, number>, topN: number): Map<string, number> {
    const entriesArray = Array.from(map.entries());
    const sortedArray = entriesArray.sort((a, b) => b[1] - a[1]);

    const topEntries = sortedArray.slice(0, topN);

    return new Map(topEntries);
  }

  // Function to sort the map based on the custom order
  public sortContributionsMap(map: Map<string, number>, currentMonth: string): Map<string, number> {
    const orderedMonths = this.getOrderedMonthsFromNext(currentMonth);

    const sortedEntries = Array.from(map.entries()).sort((a, b) => {
      return orderedMonths.indexOf(a[0]) - orderedMonths.indexOf(b[0]);
    });

    return new Map(sortedEntries.reverse());
  }

  private getOrderedMonthsFromNext(currentMonth: string): string[] {
    const currentIndex = this.monthsList.indexOf(currentMonth);

    if (currentIndex === -1) throw new Error("Invalid month name");

    const nextIndex = (currentIndex + 1) % this.monthsList.length;

    const orderedMonths = [...this.monthsList.slice(nextIndex), ...this.monthsList.slice(0, nextIndex)];

    return orderedMonths.reverse();
  }

  public sortTopProjects(topProjects: RepositoriesInterface[]) {
    const oThis = this;
    const sortedList = topProjects.filter((project) => !oThis.nonRequiredProjects.includes(project.full_name));
    return sortedList.slice(0, 10);
  }

  public getMonthRanges(startDate: string, currentDate: string): MonthRange[] {
    const start = new Date(startDate);
    const end = new Date(currentDate);
    const result: MonthRange[] = [];

    // Iterate over each month between startDate and currentDate
    for (let date = new Date(start); date <= end; date.setMonth(date.getMonth() + 1)) {
      const monthStart = new Date(date);
      const monthEnd = new Date(date);

      // Set the end of the month to the last day of the month or currentDate, whichever is earlier
      monthEnd.setMonth(monthEnd.getMonth() + 1, 0); // 0 sets to the last day of the previous month
      if (monthEnd > end) {
        monthEnd.setTime(end.getTime());
      }

      result.push({
        month: this.monthsList[monthStart.getMonth()],
        range: `${monthStart.toISOString().split('T')[0]}..${monthEnd.toISOString().split('T')[0]}`
      });
    }

    return result;
  }
}

const SortApiData = new SortData();
export default SortApiData;
