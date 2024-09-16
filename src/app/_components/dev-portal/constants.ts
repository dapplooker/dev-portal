import utils from "@/app/utils/utils";

class DevPortalConstants {
  private invertedFrequenciesMap!: Record<string, number>;

  get contributions(): string {
    return "Contributions";
  }

  get graphProtocolId(): number {
    return 1;
  }

  get projects(): string {
    return "Projects";
  }

  get developers(): string {
    return "Developers";
  }

  get months(): string {
    return "Months";
  }

  get activeProjectsMonthly(): string {
    return "Active Projects Monthly";
  }

  get activeProjectsCumulative(): string {
    return "Cumulative Active Projects";
  }

  get activeContributionsMonthly(): string {
    return "Active Contributions Monthly";
  }

  get activeContributionsCumulative(): string {
    return "Cumulative Active Contributions";
  }

  get activeDevelopersCumulative(): string {
    return "Cumulative Active Developers and Projects";
  }

  get activeDevelopersMonthly(): string {
    return "Active Developers and Projects Monthly";
  }

  get inlast30Days(): string {
    return "in last 30 days";
  }

  get ecosystemGrowth(): string {
    return "Ecosystem growth";
  }

  get last30days(): string {
    return "last 30 days";
  }

  get last6months(): string {
    return "last 6 months";
  }

  get topProjects(): string {
    return "Top Projects";
  }

  get topDevelopers(): string {
    return "Top Developers";
  }

  get theGraphDeveloperEcosystem(): string {
    return "The Graph Developer Ecosystem";
  }

  get SEARCH_KEYWORD(): string {
    return "subgraph";
  }

  get tableColNames() {
    return {
      STARS: "stars",
      FORKS: "forks",
      COMMITS: "commits",
      PROJECT_NAME: "project name",
      NAME: "name",
    }
  }

  get GENERAL_STATS(): string {
    return "general-stats"
  }

  get ECOSYSTEM_GROWTH(): string {
    return "ecosystem-growth"
  }

  get MONTHLY_PROJECT(): string {
    return "monthly-projects"
  }

  get MONTHLY_CONTRIBUTIONS(): string {
    return "monthly-contributions"
  }

  get MONTHLY_DEVELOPERS(): string {
    return "monthly-developers"
  }

  get TOP_PROJECTS(): string {
    return "top-projects";
  }

  get TOP_DEVELOPERS(): string {
    return "top-developers"
  }

  get COLOR_PROJECTS(): string {
    return "#4DD0E1"
  }

  get COLOR_CONTRIBUTIONS(): string {
    return "#ffa726"
  }

  public get frequencyTypeWeekly(): string {
    return 'WEEKLY'
}

public get frequencyTypeMonthly(): string {
    return 'MONTHLY'
}

public get frequencyTypeHalfYearly(): string {
    return 'HALF_YEARLY'
}

public get frequencyTypeYearly(): string {
    return 'YEARLY'
}

public get frequencyTypeTotal(): string {
    return 'TOTAL'
}

get frequencies(): Record<number, string> {
    const oThis = this
    return {
        1: 'WEEKLY',
        2: 'MONTHLY',
        3: 'HALF_YEARLY',
        4: 'YEARLY',
        5: 'TOTAL'
    }
}
get invertedFrequencies(): Record<string, number> {
  const oThis = this

  oThis.invertedFrequenciesMap =
      oThis.invertedFrequenciesMap || utils.invert(oThis.frequencies)

  return oThis.invertedFrequenciesMap
}

}

const devPortalConstant = new DevPortalConstants();
export default devPortalConstant;
