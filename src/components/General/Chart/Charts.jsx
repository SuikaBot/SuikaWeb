import React from "react";
import Chart from "react-apexcharts";

const getColor = (value) => {
  if (value <= 35) return "#149618";
  if (value <= 75) return "#f0d90c";
  return "#dd3c31";
};

const BarChart = () => {
  const options = {
    chart: {
      type: "bar",
      height: 300,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    series: [
      {
        name: "Chosen Period",
        data: [
          23000, 44000, 55000, 57000, 56000, 61000, 58000, 63000, 60000, 66000,
          34000, 78000,
        ],
      },
      {
        name: "Last Period",
        data: [
          17000, 76000, 85000, 101000, 98000, 87000, 105000, 91000, 114000,
          94000, 67000, 66000,
        ],
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "16px",
        borderRadius: 0,
      },
    },
    dataLabels: {
      enabled: false, // Disable data labels
    },
    xaxis: {
      categories: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      labels: {
        style: {
          colors: "#9ca3af",
          fontSize: "13px",
        },
        formatter: (title) => title.slice(0, 3),
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => (value >= 1000 ? `${value / 1000}k` : value),
      },
    },
  };

  return (
    <Chart options={options} series={options.series} type="bar" height={300} />
  );
};

const AreaChart = () => {
  const options = {
    chart: {
      type: "area",
      height: 300,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    series: [
      {
        name: "Visitors",
        data: [180, 51, 60, 38, 88, 50, 40, 52, 88, 80, 60, 70],
      },
    ],
    dataLabels: {
      enabled: false, // Disable data labels
    },
    xaxis: {
      categories: [
        "25 Jan 2023",
        "26 Jan 2023",
        "27 Jan 2023",
        "28 Jan 2023",
        "29 Jan 2023",
        "30 Jan 2023",
        "31 Jan 2023",
        "1 Feb 2023",
        "2 Feb 2023",
        "3 Feb 2023",
        "4 Feb 2023",
        "5 Feb 2023",
      ],
      labels: {
        style: {
          colors: "#9ca3af",
          fontSize: "13px",
        },
        formatter: (title) => {
          if (!title) return "";

          const parts = title.split(" ");
          return `${parts[0]} ${parts[1].slice(0, 3)}`;
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => (value >= 1000 ? `${value / 1000}k` : value),
      },
    },
  };

  return (
    <Chart options={options} series={options.series} type="area" height={300} />
  );
};

const RadialBarChart = ({ series, labels, title }) => {
  const options = {
    chart: {
      height: 350,
      type: "radialBar",
      offsetY: -10,
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            // show: true,
            fontSize: "16px",
            color: "#265073",
            offsetY: 120,
          },
          value: {
            // show: true,
            offsetY: 76,
            fontSize: "22px",
            color: "#265073",
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: [series].map(getColor),
    },
    // fill: {
    //   type: "gradient",
    //   gradient: {
    //     shade: "dark",
    //     shadeIntensity: 0.15,
    //     inverseColors: false,
    //     opacityFrom: 1,
    //     opacityTo: 1,
    //     stops: [0, 50, 65, 91],
    //   },
    // },
    stroke: {
      dashArray: 4,
    },
    labels: [labels],
    // legend: {
    //   show: true,
    // },
  };

  return (
    <Chart options={options} series={[series]} type="radialBar" height={350} />
  );
};

export { BarChart, AreaChart, RadialBarChart };
