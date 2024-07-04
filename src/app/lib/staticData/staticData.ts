class StaticData {

  public fetchDataStartDate = "2024-07-01";

  public totalContributionLastSixMonths = new Map<string, number>([
    ["Jan", 1394],
    ["Feb", 1323],
    ["Mar", 1497],
    ["Apr", 1321],
    ["May", 1338],
    ["June", 1327]
  ]);

  public totalProjectsLastSixMonths = new Map<string, number>([
    ["Jan", 119],
    ["Feb", 115],
    ["Mar", 121],
    ["Apr", 103],
    ["May", 123],
    ["June", 110]
  ]);

  public totalDevelopersLastSixMonths = new Map<string, number>([
    ["Jan", 161],
    ["Feb", 459],
    ["Mar", 496],
    ["Apr", 513],
    ["May", 489],
    ["June", 473]
  ]);
}

const staticData = new StaticData()
export default staticData;

