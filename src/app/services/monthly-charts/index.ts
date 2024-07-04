import ApiServiceWrapper from "../ApiServiceWrapper";
import ServiceConstants from "../ServiceConstants";
import moment from "moment";

class MonthlyChartsApi extends ApiServiceWrapper {
  private baseUrl: string;
  constructor() {
    super();
    this.baseUrl = ServiceConstants.githubBaseUrl;
  }

  public async getMonthlyProjects(keyword: string, page: number): Promise<any | any> {
    const oneYearAgoDate = moment().subtract(11, 'month').format('YYYY-MM-DD');
    const endpoint = `${this.baseUrl}/search/repositories?q=${keyword}+created:>=${oneYearAgoDate}&page=${page}&per_page=100`;
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

  public async getMonthlyContributions(keyword: string, page: number): Promise<any | any> {
    const oneYearAgoDate = moment().subtract(11, 'month').format('YYYY-MM-DD');
    const endpoint = `${this.baseUrl}/search/commits?q=${keyword}+committer-date:>=${oneYearAgoDate}&page=${page}&per_page=100`;
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

  public async getMonthlyDevelopers(keyword: string, page: number): Promise<any | any> {
    const oneYearAgoDate = moment().subtract(11, 'month').format('YYYY-MM-DD');
    const endpoint = `${this.baseUrl}/search/commits?q=${keyword}+committer-date:>=${oneYearAgoDate}&page=${page}&per_page=100`;
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
