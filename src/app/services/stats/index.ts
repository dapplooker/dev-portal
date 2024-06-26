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
    const endpoint = `${this.baseUrl}/`;
    const last30daysAgoDate = moment().subtract(30, 'days');
    const params = {
      q: `${keyword}`,
      since: last30daysAgoDate
    }
    try {
      const res = await this.GET(endpoint, { params: params })
      return await this.resolvePromise(res);
    } catch (error) {
      return await this.rejectPromise(error)
    }

  }
}

const statsApi = new StatsApi();
export default statsApi;
