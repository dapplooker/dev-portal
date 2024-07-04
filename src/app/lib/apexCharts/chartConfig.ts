import devPortalConstant from "@/app/_components/dev-portal/constants";
import { ChartConfigInterface } from "@/app/interface";

class ChartConfig {

  public getChartConfig(configs: ChartConfigInterface) {

    const { chartType, xAxisValues, yAxisValues, xTitle, yTitle, chartTitle } = configs;

    const finalConfig = {
      options: {
        chart: {
          id: chartTitle,
          type: chartType,
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
          foreColor: "#fff",
          background: "#16110f",
        },
        dataLabels: {
          enabled: false,
          style: {
            colors: [chartTitle === devPortalConstant.activeContributionsMonthly ? '#ffa726' : '#4DD0E1'], // Data labels color
          },
        },
        stroke: {
          curve: "smooth",
          width: 2.5, // Reduced width of the line stroke
          colors: [chartTitle === devPortalConstant.activeContributionsMonthly ? '#ffa726' : '#4DD0E1'], // Line color
        },
        title: {
          text: chartTitle,
          align: "left",
          style: {
            fontSize: "18px", // Font size for title
          },
        },
        grid: {
          borderColor: "#333", // Dark grid lines
          strokeDashArray: 5,
        },
        tooltip: {
          theme: "dark", // Dark tooltip
        },
        theme: {
          mode: "dark", // Set the theme mode to dark
        },
        xaxis: {
          categories: [...xAxisValues],
          title: {
            text: xTitle,
            style: {
              fontSize: "14px", // Font size for y-axis title
            },
          },
        },
        yaxis: {
          title: {
            text: yTitle,
            style: {
              fontSize: "14px", // Font size for y-axis title
            },
          },
        },
        // legend: {
        // position: "top",
        // horizontalAlign: "right",
        // floating: true,
        // offsetY: -15,
        // },
      },
      series: [
        {
          name: yTitle,
          data: [...yAxisValues],
        },
      ],
    }

    return finalConfig
  }

  public getRadialBarChart(percentage: number) {

    const finalConfig = {
      series: [percentage],
      options: {
        chart: {
          width: 112,
          height: 110,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: '60%'
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                show: true, // Hide the numeric value
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#fff',
                offsetY: 6,
              },
            },
          },
        },
        labels: [`Percent`], // To Show Lable Enable show: true for name in dataLabels 
      },
    }

    return finalConfig;
  }

}

const ChartData = new ChartConfig();
export default ChartData;
