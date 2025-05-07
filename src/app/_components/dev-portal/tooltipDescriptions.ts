"use client"
export const tooltipDescription = (tooltip: string) => {
  const ecosystem = getEcosystemFromUrl();
  switch (tooltip) {
    case "Developers":
      return `Total number of active developers contributing to ${ecosystem} ecosystem GitHub repositories.`;
    case "Projects":
      return `Total number of active repositories contributing to the ${ecosystem} ecosystem.`;
    case "Commits":
      return `Total number of code commits made across ${ecosystem} ecosystem.`;
    case "PR Raised":
      return `Total pull requests created across ${ecosystem} ecosystem repositories.`;
    case "Cumulative Active Projects":
      return `Cumulative active ${ecosystem} projects over time last 6 months.`;
    case "Cumulative Active Contributions":
      return `Cumulative commits across ${ecosystem} ecosystem repositories last 6 months.`;
    case "Cumulative Active Developers and Projects":
      return `Combined monthly view of developers and projects contributing to the ${ecosystem} ecosystem.`;
    case "Ecosystem Growth":
      return `Overall development growth in the ${ecosystem} ecosystem over the last 6 months, including new developers, repositories and contributions.`;
    case "Top Developers":
      return `Developers who have made the most contributions (commits) to ${ecosystem} ecosystem repositories in the last 30 days.`;
    case "Top Projects":
      return `Most active GitHub repositories in the ${ecosystem} ecosystem based on community engagement (forks and stars) in the last 30 days.`;
    default:
      return "";
  }
};

const ecosystemMapping:{[key:string]:string} = {
  "celo": "Celo",
  "the-graph":"The Graph"
}

export const getEcosystemFromUrl = (): string => {
  const segments = window.location.pathname.split('/').filter(Boolean);
  const key = segments[segments.length - 1] || '';
  return ecosystemMapping[key]
};
