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
        },
        stroke: {
          curve: "smooth",
          width: 2.5, // Reduced width of the line stroke
          colors: ["#4DD0E1"], // Line color
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
}

const ChartData = new ChartConfig();
export default ChartData;
