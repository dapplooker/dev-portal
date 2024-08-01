class DevPortalConstants {

  get contributions(): string {
    return "Contributions";
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

  get activeContributionsMonthly(): string {
    return "Active Contributions Monthly";
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

}

const devPortalConstant = new DevPortalConstants();
export default devPortalConstant;
