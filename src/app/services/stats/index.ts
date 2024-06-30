import ApiServiceWrapper from "../ApiServiceWrapper";
import ServiceConstants from "../ServiceConstants";
import moment from "moment";

class StatsApi extends ApiServiceWrapper {
  private baseUrl: string;
  private headers: any;
  constructor() {
    super();
    this.baseUrl = ServiceConstants.githubBaseUrl;
    this.headers = {
      "Authorization": `Bearer ${process.env.GITHUB_BEARER_TOKEN}`,
      "Accept": "application/vnd.github+json"
    }
  }

  public async getTotalDevelopers(keyword: string, dateParams: { withinLast30Days?: boolean, withinLastSixMonths?: boolean, withinLast12Months?: boolean } = { withinLast30Days: false, withinLastSixMonths: false, withinLast12Months: false }): Promise<any | any> {
    const endpoint = `${this.baseUrl}/search/users`;
    let query: string = `${keyword}`;

    if (dateParams.withinLast30Days && dateParams.withinLastSixMonths) {
      throw new Error('Both withinLast30Days and withinLastSixMonths cannot be true simultaneously.');
    }

    if (dateParams.withinLast30Days) {
      const last30daysAgoDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
      query += ` created:>=${last30daysAgoDate}`;
    } else if (dateParams.withinLastSixMonths) {
      const lastSixMonthsAgoDate = moment().subtract(6, 'months').format('YYYY-MM-DD');
      query += ` created:>=${lastSixMonthsAgoDate}`;
    } else if (dateParams.withinLast12Months) {
      const lastOneYearAgoDate = moment().subtract(12, 'months').format('YYYY-MM-DD');
      query += ` created:>=${lastOneYearAgoDate}`;
    }

    const params: any = {
      q: query,
    };

    try {
      const res = await this.GET(endpoint, { params, headers: this.headers });
      return await this.resolvePromise(res);
    } catch (error) {
      return await this.rejectPromise(error);
    }
  }

  public async getTotalProjects(keyword: string, dateParams: { withinLast30Days?: boolean, withinLastSixMonths?: boolean, withinLast12Months?: boolean } = { withinLast30Days: false, withinLastSixMonths: false, withinLast12Months: false }): Promise<any> {
    const endpoint = `${this.baseUrl}/search/repositories`;
    let query: string = `${keyword}`;

    if (dateParams.withinLast30Days && dateParams.withinLastSixMonths) {
      throw new Error('Both withinLast30Days and withinLastSixMonths cannot be true simultaneously.');
    }

    if (dateParams.withinLast30Days) {
      const last30daysAgoDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
      query += ` created:>=${last30daysAgoDate}`;
    } else if (dateParams.withinLastSixMonths) {
      const lastSixMonthsAgoDate = moment().subtract(6, 'months').format('YYYY-MM-DD');
      query += ` created:>=${lastSixMonthsAgoDate}`;
    } else if (dateParams.withinLast12Months) {
      const lastOneYearAgoDate = moment().subtract(12, 'months').format('YYYY-MM-DD');
      query += ` created:>=${lastOneYearAgoDate}`;
    }

    const params: any = {
      q: query,
    };

    try {
      const res = await this.GET(endpoint, { params, headers: this.headers });
      return await this.resolvePromise(res);
    } catch (error) {
      return await this.rejectPromise(error);
    }
  }


  public async getTotalCommits(keyword: string, dateParams: { withinLast30Days?: boolean, withinLastSixMonths?: boolean, withinLast12Months?: boolean } = { withinLast30Days: false, withinLastSixMonths: false, withinLast12Months: false }): Promise<any> {
    const endpoint = `${this.baseUrl}/search/commits`;
    let query: string = `${keyword}`;

    if (dateParams.withinLast30Days && dateParams.withinLastSixMonths) {
      throw new Error('Both withinLast30Days and withinLastSixMonths cannot be true simultaneously.');
    }

    if (dateParams.withinLast30Days) {
      const last30daysAgoDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
      query += ` committer-date:>=${last30daysAgoDate}`;
    } else if (dateParams.withinLastSixMonths) {
      const lastSixMonthsAgoDate = moment().subtract(6, 'months').format('YYYY-MM-DD');
      query += ` committer-date:>=${lastSixMonthsAgoDate}`;
    } else if (dateParams.withinLast12Months) {
      const lastOneYearAgoDate = moment().subtract(12, 'months').format('YYYY-MM-DD');
      query += ` committer-date:>=${lastOneYearAgoDate}`;
    }
    const params = { q: query };

    try {
      const res = await this.GET(endpoint, { params, headers: this.headers });
      return await this.resolvePromise(res);
    } catch (error) {
      console.error('Error:', error);
      return await this.rejectPromise(error);
    }
  }


  public async getTotalPrs(keyword: string, withinLast30Days: boolean = false): Promise<any> {
    let endpoint = `${this.baseUrl}/search/issues?q=${keyword}+is:pull-request`;

    if (withinLast30Days) {
      const last30daysAgoDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
      endpoint += `+created:>=${last30daysAgoDate}`;
    }

    try {
      const res = await this.GET(endpoint, { headers: this.headers });
      return await this.resolvePromise(res);
    } catch (error) {
      return await this.rejectPromise(error);
    }
  }
}

const statsApi = new StatsApi();
export default statsApi;
