import ApiServiceWrapper from "../ApiServiceWrapper";
import ServiceConstants from "../ServiceConstants";

class MonthlyChartsApi extends ApiServiceWrapper {
  private baseUrl: string;
  constructor() {
    super();
    this.baseUrl = ServiceConstants.githubBaseUrl;
  }

  public async getMonthlyProjects(keyword: string, dateRange: string): Promise<any | any> {
    const endpoint = `${this.baseUrl}/search/repositories?q=${keyword}+created:${dateRange}`;
    try {
      const res = await this.GET(endpoint, {
        headers: {
          "Authorization": `Bearer ${ServiceConstants.gitHubToken1}`,
          "Accept": "application/vnd.github+json"
        }
      })
      return await this.resolvePromise(res);
    } catch (error) {
      return await this.rejectPromise(error)
    }
  }

  public async getMonthlyContributions(keyword: string, dateRange: string): Promise<any | any> {
    const endpoint = `${this.baseUrl}/search/commits?q=${keyword}+committer-date:${dateRange}`;
    try {
      const res = await this.GET(endpoint, {
        headers: {
          "Authorization": `Bearer ${ServiceConstants.gitHubToken2}`,
          "Accept": "application/vnd.github+json"
        }
      })
      return await this.resolvePromise(res);
    } catch (error) {
      return await this.rejectPromise(error)
    }
  }

  public async getMonthlyDevelopers(keyword: string, dateRange: string, page: number): Promise<any | any> {
    const endpoint = `${this.baseUrl}/search/commits?q=${keyword}+committer-date:${dateRange}&page=${page}&per_page=100`;
    try {
      const res = await this.GET(endpoint, {
        headers: {
          "Authorization": `Bearer ${ServiceConstants.gitHubToken4}`,
          "Accept": "application/vnd.github+json"
        }
      })
      return await this.resolvePromise(res);
    } catch (error) {
      return await this.rejectPromise(error)
    }
  }
}

const monthlyChartsApi = new MonthlyChartsApi();
export default monthlyChartsApi;
