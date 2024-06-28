import ApiServiceWrapper from "../ApiServiceWrapper";
import ServiceConstants from "../ServiceConstants";
import moment from "moment";

class TableApi extends ApiServiceWrapper {
  private baseUrl: string;
  private headers: any;
  constructor() {
    super();
    this.baseUrl = ServiceConstants.githubBaseUrl;
    console.log("ENV..", process.env.GITHUB_BEARER_TOKEN)
    this.headers = {
      "Authorization": `Bearer ${process.env.GITHUB_BEARER_TOKEN}`,
      "Accept": "application/vnd.github+json"
    }
  }

  //Top Developers
  public async getTopDevelopers(keyword: string, page: number): Promise<any | any> {
    const oneMonthAgoDate = moment().subtract(1, 'months').format('YYYY-MM-DD');
    const endpoint = `${this.baseUrl}/search/repositories?q=${keyword}+pushed:>=${oneMonthAgoDate}&sort=forks&page=${page}&per_page=100`;
    console.log("date", oneMonthAgoDate)
    console.log("endpint", endpoint)
    try {
      const res = await this.GET(endpoint, { headers: this.headers })
      return await this.resolvePromise(res);
    } catch (error) {
      return await this.rejectPromise(error)
    }
  }

  public async getDevelopersCommits(authorName: string, page: number): Promise<any | any> {
    const oneMonthAgoDate = moment().subtract(1, 'months').format('YYYY-MM-DD');
    const endpoint = `${this.baseUrl}/search/commits?q=author:${authorName}+committer-date:>=${oneMonthAgoDate}&page=${page}&per_page=100`;
    console.log("date", oneMonthAgoDate)
    console.log("endpint", endpoint)
    try {
      const res = await this.GET(endpoint, { headers: this.headers })
      return await this.resolvePromise(res);
    } catch (error) {
      return await this.rejectPromise(error)
    }
  }

  //Top Projects
  public async getTopProjects(keyword: string): Promise<any | any> {
    const endpoint = `${this.baseUrl}/search/repositories?q=${keyword}&sort=forks&page=1&per_page=10`;
    console.log("endpint", endpoint)
    try {
      const res = await this.GET(endpoint)
      return await this.resolvePromise(res);
    } catch (error) {
      return await this.rejectPromise(error)
    }
  }

  public async getTotalProjectDevelopers(fullName: string, page: number): Promise<any | any> {
    const endpoint = `${this.baseUrl}/repos/${fullName}/contributors?page=${page}&per_page=100`;
    console.log("endpint", endpoint)
    try {
      const res = await this.GET(endpoint, { headers: this.headers })
      return await this.resolvePromise(res);
    } catch (error) {
      return await this.rejectPromise(error)
    }
  }

  public async getTotalProjectContributions(fullName: string, page: number): Promise<any | any> {
    const endpoint = `${this.baseUrl}/repos/${fullName}/commits?page=${page}&per_page=100`;
    console.log("endpint", endpoint)
    try {
      const res = await this.GET(endpoint, { headers: this.headers })
      return await this.resolvePromise(res);
    } catch (error) {
      return await this.rejectPromise(error)
    }
  }
}

const tableApi = new TableApi();
export default tableApi;
