import ApiServiceWrapper from "../ApiServiceWrapper";
import ServiceConstants from "../ServiceConstants";
import moment from "moment";

class StatsApi extends ApiServiceWrapper {
  private baseUrl: string;
  constructor() {
    super();
    this.baseUrl = ServiceConstants.githubBaseUrl;
  }

  public async getTotalDevelopers(keyword: string, withinLast30Days: boolean = false): Promise<any | any> {
    const endpoint = `${this.baseUrl}/search/users`;
    let params: any = {
      q: `${keyword}`
    };
  
    if (withinLast30Days) {
      const last30daysAgoDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
      params.q += `+created:>=${last30daysAgoDate}`;
    }
  
    try {
      const res = await this.GET(endpoint, { params: params });
      return await this.resolvePromise(res);
    } catch (error) {
      return await this.rejectPromise(error);
    }
  }
  

  public async getTotalProjects(keyword: string, withinLast30Days: boolean = false): Promise<any> {
    const endpoint = `${this.baseUrl}/search/repositories`;
    let params: any = {
      q: `${keyword}`
    };
  
    if (withinLast30Days) {
      const last30daysAgoDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
      params.q += `+created:>=${last30daysAgoDate}`;
    }
  
    try {
      const res = await this.GET(endpoint, { params: params });
      return await this.resolvePromise(res);
    } catch (error) {
      return await this.rejectPromise(error);
    }
  }
  

  public async getTotalCommits(keyword: string, withinLast30Days: boolean = false): Promise<any> {
    const endpoint = `${this.baseUrl}/search/commits`;
    let params: any = {
      q: `${keyword}`
    };
  
    if (withinLast30Days) {
      const last30daysAgoDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
      params.q += `+created:>=${last30daysAgoDate}`;
    }
  
    try {
      const res = await this.GET(endpoint, { params: params });
      return await this.resolvePromise(res);
    } catch (error) {
      return await this.rejectPromise(error);
    }
  }
  

  public async getTotalPrs(keyword: string, withinLast30Days: boolean = false): Promise<any> {
    const endpoint = `${this.baseUrl}/search/issues`;
    let params: any = {
      q: `${keyword}`
    };
  
    if (withinLast30Days) {
      const last30daysAgoDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
      params.q += `+created:>=${last30daysAgoDate}`;
    }
  
    try {
      const res = await this.GET(endpoint, { params: params });
      return await this.resolvePromise(res);
    } catch (error) {
      return await this.rejectPromise(error);
    }
  }
  

}

const statsApi = new StatsApi();
export default statsApi;
