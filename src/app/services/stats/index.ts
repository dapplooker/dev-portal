import ApiServiceWrapper from "../ApiServiceWrapper";
import ServiceConstants from "../ServiceConstants";
import moment from "moment";

class StatsApi extends ApiServiceWrapper {
  private baseUrl: string;
  constructor() {
    super();
    this.baseUrl = ServiceConstants.githubBaseUrl;
  }

  public async getTotalDevelopers(keyword: string): Promise<any | any> {
    const endpoint = `${this.baseUrl}/search/users`;
    // const last30daysAgoDate = moment().subtract(30, 'days');
    const params = {
      q: `${keyword}`,
    }
    try {
      const res = await this.GET(endpoint, { params: params })
      return await this.resolvePromise(res);
    } catch (error) {
      return await this.rejectPromise(error)
    }
  }

  public async getTotalDevelopersWithinAMonth(keyword: string): Promise<any | any> {
    const last30daysAgoDate = moment().subtract(30, 'days');
    const endpoint = `${this.baseUrl}/search/users`;
    const params = {
      q: `${keyword}+created:>=${last30daysAgoDate}`,
    }
    try {
      const res = await this.GET(endpoint, { params: params })
      return await this.resolvePromise(res);
    } catch (error) {
      return await this.rejectPromise(error)
    }
  }

  public async getTotalProjects(keyword: string): Promise<any> {
    const endpoint = `${this.baseUrl}/search/repositories`;
    const params = {
      q: `${keyword}`,
    };
    try {
      const res = await this.GET(endpoint, { params: params });
      return await this.resolvePromise(res);
    } catch(error) {
      return await this.rejectPromise(error);
    }
  }

  public async getTotalProjectsWithinAMonth(keyword: string): Promise<any> {
    const endpoint = `${this.baseUrl}/search/repositories`;
    const last30daysAgoDate = moment().subtract(30, 'days');
    const params = {
      q: `${keyword}+created:>=${last30daysAgoDate}`,
    };
    try {
      const res = await this.GET(endpoint, { params: params });
      return await this.resolvePromise(res);
    } catch(error) {
      return await this.rejectPromise(error);
    }
  }

  public async getTotalCommits(keyword: string): Promise<any> {
    const endpoint = `${this.baseUrl}/search/commits`;
    const params = {
      q: `${keyword}`,
    };
    try {
      const res = await this.GET(endpoint, { params: params });
      return await this.resolvePromise(res);
    } catch(error) {
      return await this.rejectPromise(error);
    }
  }

  public async getTotalCommitsWithinAMonth(keyword: string): Promise<any> {
    const endpoint = `${this.baseUrl}/search/commits`;
    const last30daysAgoDate = moment().subtract(30, 'days');
    const params = {
      q: `${keyword}+created:>=${last30daysAgoDate}`,
    };
    try {
      const res = await this.GET(endpoint, { params: params });
      return await this.resolvePromise(res);
    } catch(error) {
      return await this.rejectPromise(error);
    }
  }

  public async getTotalPrs(keyword: string): Promise<any> {
    const endpoint = `${this.baseUrl}/search/issues`;
    const params = {
      q: `${keyword}`,
    };
    try {
      const res = await this.GET(endpoint, { params: params });
      return await this.resolvePromise(res);
    } catch(error) {
      return await this.rejectPromise(error);
    }
  }

  public async getTotalPrsWithinAMonth(keyword: string): Promise<any> {
    const endpoint = `${this.baseUrl}/search/commits`;
    const last30daysAgoDate = moment().subtract(30, 'days');
    const params = {
      q: `${keyword}+created:>=${last30daysAgoDate}`,
    };
    try {
      const res = await this.GET(endpoint, { params: params });
      return await this.resolvePromise(res);
    } catch(error) {
      return await this.rejectPromise(error);
    }
  }

}

const statsApi = new StatsApi();
export default statsApi;
