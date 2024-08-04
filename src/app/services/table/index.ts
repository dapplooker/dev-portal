import ApiServiceWrapper from "../ApiServiceWrapper";
import ServiceConstants from "../ServiceConstants";
import moment from "moment";

class TableApi extends ApiServiceWrapper {
  private baseUrl: string;
  constructor() {
    super();
    this.baseUrl = ServiceConstants.githubBaseUrl;
  }

  //Top Developers
  public async getTopDevelopers(keyword: string, page: number): Promise<any | any> {
    const oneMonthAgoDate = moment().subtract(1, 'months').format('YYYY-MM-DD');
    const endpoint = `${this.baseUrl}/search/commits?q=${keyword}+committer-date:>=${oneMonthAgoDate}&page=${page}&per_page=100`;
    try {
      const res = await this.GET(endpoint, {
        headers: {
          "Authorization": `Bearer ${ServiceConstants.gitHubToken3}`,
          "Accept": "application/vnd.github+json"
        }
      })
      return await this.resolvePromise(res);
    } catch (error) {
      return await this.rejectPromise(error)
    }
  }

  public async getDevelopersCommits(authorName: string, page: number): Promise<any | any> {
    const oneMonthAgoDate = moment().subtract(1, 'months').format('YYYY-MM-DD');
    const endpoint = `${this.baseUrl}/search/commits?q=author:${authorName}+committer-date:>=${oneMonthAgoDate}&page=${page}&per_page=100`;
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

  //Top Projects
  public async getTopProjects(keyword: string): Promise<any | any> {
    const oneMonthAgoDate = moment().subtract(1, 'months').format('YYYY-MM-DD');
    const endpoint = `${this.baseUrl}/search/repositories?q=${keyword}+pushed:>=${oneMonthAgoDate}+language:Typescript&sort=stars&per_page=20`;
    try {
      const res = await this.GET(endpoint, {
        headers: {
          "Authorization": `Bearer ${ServiceConstants.gitHubToken6}`,
          "Accept": "application/vnd.github+json"
        }
      })
      return await this.resolvePromise(res);
    } catch (error) {
      return await this.rejectPromise(error)
    }
  }

  // public async getTotalProjectDevelopers(fullName: string, page: number): Promise<any | any> {
  // const endpoint = `${this.baseUrl}/repos/${fullName}/contributors?page=${page}&per_page=100`;
  // try {
  //   const res = await this.GET(endpoint, { headers: this.headers })
  //   return await this.resolvePromise(res);
  // } catch (error) {
  //   return await this.rejectPromise(error)
  // }
  // }

  // public async getTotalProjectContributions(fullName: string, page: number): Promise<any | any> {
  // const endpoint = `${this.baseUrl}/repos/${fullName}/commits?page=${page}&per_page=100`;
  // try {
  //   const res = await this.GET(endpoint, { headers: this.headers })
  //   return await this.resolvePromise(res);
  // } catch (error) {
  //   return await this.rejectPromise(error)
  // }
  // }
}

const tableApi = new TableApi();
export default tableApi;
