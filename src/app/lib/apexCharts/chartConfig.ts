import { ChartConfigInterface } from "@/app/interface";
import millify from "millify";

class ChartConfig {

  public getChartConfig(configs: ChartConfigInterface) {

    const { chartType, xAxisValues, yAxisValues, xTitle, yTitle, chartTitle, strokeColor } = configs;

    const chartData = {
      labels: [...xAxisValues],
      datasets: [
        {
          label: yTitle,
          data: [...yAxisValues], // Y-axis data points
          borderColor: strokeColor, // Line color
          backgroundColor: "transparent", // Background color for line area
          pointBackgroundColor: strokeColor, // Data points color
          pointBorderColor: strokeColor, // Data points border color
          borderWidth: 2.5, // Line stroke width
          tension: 0.4, // Smooth the curve of the line
        },
      ],
    };

    // Chart options
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top", // Position the legend at the top
          align: "end", // Align legend to the right (end of the top)
          labels: {
            color: "#fff", // Legend text color
            font: {
              weight: "bold", // Legend font weight
            },
          },
        },
        title: {
          display: true,
          text: chartTitle,
          align: "start", // Align title to the left
          color: "#fff", // Title color
          font: {
            size: 18, // Title font size
            weight: "bold", // Title font weight
          },
          padding: {
            left: 20, // Padding from the left side
            top: 10, // Padding from the top
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: xTitle,
            color: "#fff", // X-axis title color
            font: {
              size: 14, // X-axis title font size
              weight: "bold", // X-axis title font weight
            },
          },
          grid: {
            display: false, // Disable vertical grid lines
          },
          ticks: {
            color: "#fff", // X-axis labels color
            padding: 10, // Gap between x-axis values and grid lines
          },
        },
        y: {
          title: {
            display: true,
            text: yTitle,
            color: "#fff", // Y-axis title color
            font: {
              size: 14, // Y-axis title font size
              weight: "bold", // Y-axis title font weight
            },
          },
          grid: {
            color: "#333", // Horizontal grid lines color
            borderDash: [5], // Dashed horizontal grid lines
          },
          ticks: {
            color: "#fff", // Y-axis labels color
            padding: 10, // Gap between y-axis values and grid lines
            callback: (value: any) => millify(value), // Format Y-axis values using millify
          },
        },
      },
    };

    return { chartData, options }
  }

  public getStackedBarChartData(responseDataSet: ChartConfigInterface, dataSet2: ChartConfigInterface) {

    const { chartTitle, xAxisValues, yAxisValues, xTitle, yTitle }: ChartConfigInterface = responseDataSet;

    const barColor = "#4DD0E1";
    const stackedBarColor = "#ffa726";

    const chartData = {
      labels: [...xAxisValues],
      datasets: [
        {
          label: yTitle,
          data: [...yAxisValues], // Y-axis data points
          backgroundColor: barColor, // Fill color for the bars
          borderColor: barColor,
          borderWidth: 0,
          stack: "Stack 0",
        },
        {
          label: dataSet2?.yTitle,
          data: [...dataSet2?.yAxisValues], // Y-axis data points
          backgroundColor: stackedBarColor, // Fill color for the bars
          borderColor: stackedBarColor,
          borderWidth: 0,
          stack: "Stack 0",
        },
      ],
    };

    // Chart options
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top", // Position the legend at the top
          align: "end", // Align legend to the right (end of the top)
          labels: {
            color: "#fff", // Legend text color
            font: {
              weight: "bold", // Legend font weight
            },
          },
        },
        title: {
          display: true,
          text: chartTitle,
          align: "start", // Align title to the left
          color: "#fff", // Title color
          font: {
            size: 18, // Title font size
            weight: "bold", // Title font weight
          },
          padding: {
            left: 20, // Padding from the left side
            top: 10, // Padding from the top
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          title: {
            display: true,
            text: xTitle,
            color: "#fff", // X-axis title color
            font: {
              size: 14, // X-axis title font size
              weight: "bold", // X-axis title font weight
            },
          },
          grid: {
            display: false, // Disable vertical grid lines
          },
          ticks: {
            color: "#fff", // X-axis labels color
            padding: 10, // Gap between x-axis values and grid lines
          },
        },
        y: {
          stacked: true,
          title: {
            display: true,
            text: yTitle,
            color: "#fff", // Y-axis title color
            font: {
              size: 14, // Y-axis title font size
              weight: "bold", // Y-axis title font weight
            },
          },
          grid: {
            color: "#333", // Horizontal grid lines color
            borderDash: [5], // Dashed horizontal grid lines
          },
          ticks: {
            color: "#fff", // Y-axis labels color
            padding: 10, // Gap between y-axis values and grid lines
            callback: (value: any) => millify(value), // Format Y-axis values using millify
          },
        },
      },
    };

    return { chartData, options };
  }

}

const ChartData = new ChartConfig();
export default ChartData;
