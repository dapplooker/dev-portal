import { RepositoriesInterface } from "@/app/interface";

class SortData {

  public get nonRequiredProjects() {
    return [
      "hasura/graphql-engine",
      "microstream-one/microstream",
    ];
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

  public getOrderedMonthsFromNext(currentMonth: string): string[] {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentIndex = months.indexOf(currentMonth);

    if (currentIndex === -1) throw new Error("Invalid month name");

    const nextIndex = (currentIndex + 1) % months.length;

    const orderedMonths = [...months.slice(nextIndex), ...months.slice(0, nextIndex)];

    return orderedMonths.reverse();
  }

  public sortTopProjects(topProjects: RepositoriesInterface[]) {
    const oThis = this;
    const sortedList = topProjects.filter((project) => !oThis.nonRequiredProjects.includes(project.full_name));
    return sortedList.slice(0, 10);
  }

}

const SortApiData = new SortData();
export default SortApiData;
