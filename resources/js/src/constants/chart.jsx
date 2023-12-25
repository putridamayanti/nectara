export const upsideDownChart = (options) => {
    return {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: { show: true },
            stacked: true,
        },
        colors: options.colors,
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '20%',
                borderRadius: [4],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },
        stroke: { show: false },
        dataLabels: { enabled: false },
        legend: { show: false },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            min: options.min,
            max: options.max,
            tickAmount: 10,
        },
        xaxis: {
            categories: options.categories,
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: 'light',
            fillSeriesColor: false,
        },
    }
};

export const basicBarChart = (options) => {
    return {
        chart: {
            type: 'bar',
            height: options.height ?? 300
        },
        labels: options.labels ?? [],
        dataLabels: {
            enabled: false
        },
        colors: options.colors ?? [],
        legend: {
            enabled: false
        },
        yaxis: {
            min: options.min,
            max: options.max,
            tickAmount: 5,
        },
        plotOptions: {
            bar: {
                borderRadius: 5,
                horizontal: false,
                barHeight: '60%',
                columnWidth: '35%',
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            }
        }
    }
};
