(function (H) {
    const animateSVGPath = (svgElem, animation, callback = void 0) => {
        const length = svgElem.element.getTotalLength();
        svgElem.attr({
            'stroke-dasharray': length,
            'stroke-dashoffset': length,
            opacity: 1
        });
        svgElem.animate({
            'stroke-dashoffset': 0
        }, animation, callback);
    };

    H.seriesTypes.line.prototype.animate = function (init) {
        const series = this,
            animation = H.animObject(series.options.animation);
        if (!init) {
            animateSVGPath(series.graph, animation);
        }
    };

    H.addEvent(H.Axis, 'afterRender', function () {
        const axis = this,
            chart = axis.chart,
            animation = H.animObject(chart.renderer.globalAnimation);

        axis.axisGroup
            // Init
            .attr({
                opacity: 0,
                rotation: -3,
                scaleY: 0.9
            })

            // Animate
            .animate({
                opacity: 1,
                rotation: 0,
                scaleY: 1
            }, animation);
        if (axis.horiz) {
            axis.labelGroup
                // Init
                .attr({
                    opacity: 0,
                    rotation: 3,
                    scaleY: 0.5
                })

                // Animate
                .animate({
                    opacity: 1,
                    rotation: 0,
                    scaleY: 1
                }, animation);
        } else {
            axis.labelGroup
                // Init
                .attr({
                    opacity: 0,
                    rotation: 3,
                    scaleX: -0.5
                })

                // Animate
                .animate({
                    opacity: 1,
                    rotation: 0,
                    scaleX: 1
                }, animation);
        }

        if (axis.plotLinesAndBands) {
            axis.plotLinesAndBands.forEach(plotLine => {
                const animation = H.animObject(plotLine.options.animation);

                // Init
                plotLine.label.attr({
                    opacity: 0
                });

                // Animate
                animateSVGPath(
                    plotLine.svgElem,
                    animation,
                    function () {
                        plotLine.label.animate({
                            opacity: 1
                        });
                    }
                );
            });
        }
    });
}(Highcharts));




// ======================================== real_gdp_growth_chart =================
Highcharts.chart('real_gdp_growth_chart', {
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: '',
        align: 'left'
    },
    subtitle: {
        text: '',
        align: 'left'
    },
    xAxis: [{
        categories: ['Jilin', 'Shanghai', 'Hainan', 'Beijing', 'Tianjin', 'Tibet',
            'Guizhou', 'Guangdong', 'Liaoning', 'Qinghai', 'Chongqing', 'Heilongjiang',
            'Jiangsu', 'Guangxi', 'Sichuan', 'Henan', 'Zhejiang', 'Xinjiang', 'Anhui', 'Hebei',
            'Shandong', 'Ningxia', 'Inner Mongolia', 'Shaanxi', 'Yunman', 'Hubei', 'Shanxi', 'Gansu',
            'Hunana', 'Fujian', 'Jiangxi'],
        crosshair: true
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            format: '{value}%',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: '',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },

        opposite: true
    }, { // Secondary yAxis
        title: {
            text: 'RMB trillion',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value}',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        opposite: false
    },
    { // Secondary yAxis 2
        title: {
            text: '',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value}',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        opposite: false
    },
    { // Secondary yAxis 3
        title: {
            text: '',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value}',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        opposite: false
    }

    ],
    tooltip: {
        shared: true
    },
    legend: {
        align: 'left',
        x: 0,
        verticalAlign: 'bottom',
        y: 20,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || // theme
            'rgba(255,255,255,0.25)'
    },
    series: [{
        name: '2022 GDP -left axis',
        type: 'column',
        color: '#009775',
        yAxis: 1,
        data: [1.5, 4, 1, 3.8, 2, .5, 2.2, 12, 3, 1, 4, 3, 11, 4, 5, 6, 7, 3, 4, 3.5, 7, 1.1, 3, 4, 3.3, 5, 3, 2, 4, 5, 4.4],
        tooltip: {
            valueSuffix: ''
        }

    }, {
        name: 'Year on Year Growth (2022) -right axis',
        type: 'spline',
        color: '#001450',
        data: [1.9, 2.5, 2.5, 2.5, 2.5, 2.5, 3, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 4, 4, 4, 4, 4, 4, 3.7, 3.7, 3.7, 3.7, 3.7, 3.7, 3.7, 3.7, 3.7, 2, 2],
        tooltip: {
            valueSuffix: ''
        }
    },
    {
        name: 'Year-on- Year Growth 2021 -right axis',
        type: 'spline',
        color: '#001400',
        dashStyle: 'ShortDash', // or 'Dash' for a dashed line
        data: [3, 4, 4, 4, 4, 4, 3, 5, 5, 5, 5, 5, 5, 5, 3.3, 3.3, 3.3, 3.3, 3.3, 3.3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2, 2],
        tooltip: {
            valueSuffix: ''
        }
    },
    {
        name: 'National GDP Growth (2022) - right axis',
        type: 'spline',
        color: '#BA0C2F',
        dashStyle: 'ShortDash', // or 'Dash' for a dashed line
        data: [3, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2],
        tooltip: {
            valueSuffix: ''
        }
    },
    ]
});


// ======================================== debt_to_gdp_chart =================
Highcharts.chart('debt_to_gdp_chart', {
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: '',
        align: 'left'
    },
    subtitle: {
        text: '',
        align: 'left'
    },
    xAxis: [{
        categories: ['Jilin', 'Shanghai', 'Hainan', 'Beijing', 'Tianjin', 'Tibet',
            'Guizhou', 'Guangdong', 'Liaoning', 'Qinghai', 'Chongqing', 'Heilongjiang',
            'Jiangsu', 'Guangxi', 'Sichuan', 'Henan', 'Zhejiang', 'Xinjiang', 'Anhui', 'Hebei',
            'Shandong', 'Ningxia', 'Inner Mongolia', 'Shaanxi', 'Yunman', 'Hubei', 'Shanxi', 'Gansu',
            'Hunana', 'Fujian', 'Jiangxi'],
        crosshair: true
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            format: '{value}%',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: '',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        opposite: true
    }, { // Secondary yAxis
        title: {
            text: 'RMB trillion',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value}',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        opposite: false
    },
    ],
    tooltip: {
        shared: true
    },
    legend: {
        align: 'left',
        x: 0,
        verticalAlign: 'bottom',
        y: 20,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || // theme
            'rgba(255,255,255,0.25)'
    },
    series: [{
        name: '2022 GDP -left axis',
        type: 'column',
        color: '#009775',
        yAxis: 1,
        data: [1.5, 4, 1, 3.8, 2, .5, 2.2, 12, 3, 1, 4, 3, 11, 4, 5, 6, 7, 3, 4, 3.5, 7, 1.1, 3, 4, 3.3, 5, 3, 2, 4, 5, 4.4],
        tooltip: {
            valueSuffix: ''
        }

    }, {
        name: 'Year on Year Growth (2022) -right axis',
        type: 'spline',
        color: '#001450',
        data: [1.9, 2.5, 2.5, 2.5, 2.5, 2.5, 3, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 4, 4, 4, 4, 4, 4, 3.7, 3.7, 3.7, 3.7, 3.7, 3.7, 3.7, 3.7, 3.7, 2, 2],
        tooltip: {
            valueSuffix: ''
        }
    },
    ]
});



// ======================================== fixed_assets_chart =================
Highcharts.chart('fixed_assets_chart', {
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: '',
        align: 'left'
    },
    subtitle: {
        text: '',
        align: 'left'
    },
    xAxis: [{
        categories: ['Jilin', 'Shanghai', 'Hainan', 'Beijing', 'Tianjin', 'Tibet',
            'Guizhou', 'Guangdong', 'Liaoning', 'Qinghai', 'Chongqing', 'Heilongjiang',
            'Jiangsu', 'Guangxi', 'Sichuan', 'Henan', 'Zhejiang', 'Xinjiang', 'Anhui', 'Hebei',
            'Shandong', 'Ningxia', 'Inner Mongolia', 'Shaanxi', 'Yunman', 'Hubei', 'Shanxi', 'Gansu',
            'Hunana', 'Fujian', 'Jiangxi'],
        crosshair: true
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            format: '{value}%',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: '',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        opposite: true
    }, { // Secondary yAxis
        title: {
            text: 'RMB trillion',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value}',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        opposite: false
    },
    ],
    tooltip: {
        shared: true
    },
    legend: {
        align: 'left',
        x: 0,
        verticalAlign: 'bottom',
        y: 20,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || // theme
            'rgba(255,255,255,0.25)'
    },
    series: [{
        name: '2022 GDP -left axis',
        type: 'column',
        color: '#009775',
        yAxis: 1,
        data: [1.5, 4, 1, 3.8, 2, .5, 2.2, 12, 3, 1, 4, 3, 11, 4, 5, 6, 7, 3, 4, 3.5, 7, 1.1, 3, 4, 3.3, 5, 3, 2, 4, 5, 4.4],
        tooltip: {
            valueSuffix: ''
        }

    }, {
        name: 'Year on Year Growth (2022) -right axis',
        type: 'spline',
        color: '#001450',
        data: [1.9, 2.5, 2.5, 2.5, 2.5, 2.5, 3, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 4, 4, 4, 4, 4, 4, 3.7, 3.7, 3.7, 3.7, 3.7, 3.7, 3.7, 3.7, 3.7, 2, 2],
        tooltip: {
            valueSuffix: ''
        }
    },
    ]
});




// ======================================== bonds_chart =================
Highcharts.chart('bonds_chart', {
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: '',
        align: 'left'
    },
    subtitle: {
        text: '',
        align: 'left'
    },
    xAxis: [{
        categories: ['Jilin', 'Shanghai', 'Hainan', 'Beijing', 'Tianjin', 'Tibet',
            'Guizhou', 'Guangdong', 'Liaoning', 'Qinghai', 'Chongqing', 'Heilongjiang',
            'Jiangsu', 'Guangxi', 'Sichuan', 'Henan', 'Zhejiang', 'Xinjiang', 'Anhui', 'Hebei',
            'Shandong', 'Ningxia', 'Inner Mongolia', 'Shaanxi', 'Yunman', 'Hubei', 'Shanxi', 'Gansu',
            'Hunana', 'Fujian', 'Jiangxi'],
        crosshair: true
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            format: '{value}%',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: '',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        opposite: true
    }, { // Secondary yAxis
        title: {
            text: 'RMB trillion',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value}',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        opposite: false
    },
    ],
    tooltip: {
        shared: true
    },
    legend: {
        align: 'left',
        x: 80,
        verticalAlign: 'top',
        y: 60,
        floating: true,
        x: 0,
        verticalAlign: 'bottom',
        y: 20,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || // theme
            'rgba(255,255,255,0.25)'
    },
    series: [{
        name: '2022 GDP -left axis',
        type: 'column',
        color: '#009775',
        yAxis: 1,
        data: [1.5, 4, 1, 3.8, 2, .5, 2.2, 12, 3, 1, 4, 3, 11, 4, 5, 6, 7, 3, 4, 3.5, 7, 1.1, 3, 4, 3.3, 5, 3, 2, 4, 5, 4.4],
        tooltip: {
            valueSuffix: ''
        }

    }, {
        name: 'Year on Year Growth (2022) -right axis',
        type: 'spline',
        color: '#001450',
        data: [1.9, 2.5, 2.5, 2.5, 2.5, 2.5, 3, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 4, 4, 4, 4, 4, 4, 3.7, 3.7, 3.7, 3.7, 3.7, 3.7, 3.7, 3.7, 3.7, 2, 2],
        tooltip: {
            valueSuffix: ''
        }
    },
    ]
});



// ======================================== fixed_assets_chart =================
Highcharts.chart('fixed_assets_chart', {
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: '',
        align: 'left'
    },
    subtitle: {
        text: '',
        align: 'left'
    },
    xAxis: [{
        categories: ['Jilin', 'Shanghai', 'Hainan', 'Beijing', 'Tianjin', 'Tibet',
            'Guizhou', 'Guangdong', 'Liaoning', 'Qinghai', 'Chongqing', 'Heilongjiang',
            'Jiangsu', 'Guangxi', 'Sichuan', 'Henan', 'Zhejiang', 'Xinjiang', 'Anhui', 'Hebei',
            'Shandong', 'Ningxia', 'Inner Mongolia', 'Shaanxi', 'Yunman', 'Hubei', 'Shanxi', 'Gansu',
            'Hunana', 'Fujian', 'Jiangxi'],
        crosshair: true
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            format: '{value}%',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: '',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        opposite: true
    }, { // Secondary yAxis
        title: {
            text: 'RMB trillion',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value}',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        opposite: false
    },
    ],
    tooltip: {
        shared: true
    },
    legend: {
        align: 'left',
        x: 0,
        verticalAlign: 'bottom',
        y: 20,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || // theme
            'rgba(255,255,255,0.25)'
    },
    series: [{
        name: '2022 GDP -left axis',
        type: 'column',
        color: '#009775',
        yAxis: 1,
        data: [1.5, 4, 1, 3.8, 2, .5, 2.2, 12, 3, 1, 4, 3, 11, 4, 5, 6, 7, 3, 4, 3.5, 7, 1.1, 3, 4, 3.3, 5, 3, 2, 4, 5, 4.4],
        tooltip: {
            valueSuffix: ''
        }

    }, {
        name: 'Year on Year Growth (2022) -right axis',
        type: 'spline',
        color: '#001450',
        data: [1.9, 2.5, 2.5, 2.5, 2.5, 2.5, 3, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 4, 4, 4, 4, 4, 4, 3.7, 3.7, 3.7, 3.7, 3.7, 3.7, 3.7, 3.7, 3.7, 2, 2],
        tooltip: {
            valueSuffix: ''
        }
    },
    ]
});



// ========================== sector_contribue_chart ============================
Highcharts.chart('sector_contribe_chart', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Sector contribution to GDP, 2018-2022',
        align: 'left'
    },
    xAxis: {
        categories: ['2018', '2019', '2020', '2021', '2022']
    },
    yAxis: {
        min: 0,
        max: 100,
        title: {
            text: ''
        },
        stackLabels: {
            enabled: true
        },
    },
    legend: {
        align: 'left',
        x: 0,
        verticalAlign: 'bottom',
        y: 10,
        floating: false,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    series: [
        {
            name: 'Services',
            data: [54, 54, 54, 54, 54],
            color: '#0028A0'
        },
        {
            name: 'Industry',
            data: [40, 40, 40, 40, 40],
            color: '#41B6E6'
        },
        {
            name: 'Agriculture',
            data: [6, 6, 6, 6, 6],
            color: '#009775'
        }

    ]
});



// ========================== national_gdb_chart ============================
{
    const national_gdb_data = [{
        name: '2018',
        low: 55000,
        high: 60000
    }, {
        name: '2019',
        low: 60000,
        high: 65000
    }, {
        name: '2020',
        low: 65000,
        high: 72000
    }, {
        name: '2021',
        low: 70000,
        high: 75000
    }, {
        name: '2022',
        low: 75000,
        high: 85000
    }];

    try {
        Highcharts.chart('national_gdb_chart', {

            chart: {
                type: 'dumbbell',
                inverted: true
            },

            legend: {
                enabled: false
            },

            subtitle: {
                text: ''
            },

            title: {
                text: 'GDP per capita and national average',
                align: 'left'
            },

            tooltip: {
                shared: true
            },

            xAxis: {
                type: 'category'
            },

            yAxis: {
                title: {
                    text: ''
                }
            },
            series: [{
                name: 'GDP per capita and national average',
                data: national_gdb_data,
            }]

        });
    } catch (err) {
        // console.log(err)
    }
}


// ========================== debt_summary_bar_chart ============================
Highcharts.chart('debt_summary_bar_chart', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Debt ceiling and debt outstanding, 2018-2022',
        align: 'left'
    },
    subtitle: {
        text: '',
        align: 'left'
    },
    xAxis: {
        categories: ['2018', '2019', '2020', '2021', '2022'],
        crosshair: true,
        accessibility: {
            description: 'Countries'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'RMB billion'
        }
    },
    tooltip: {
        valueSuffix: ' (1000 MT)'
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [
        {
            name: 'Debt ceiling',
            data: [700, 880, 1050, 1300, 1450],
            color: '#009775',
        },
        {
            name: 'Debt outstanding',
            data: [650, 780, 950, 1150, 1300],
            color: '#41B6E6'
        }
    ]
});



// ========================== bond_by_tenor_chart ============================
Highcharts.chart('bond_by_tenor_chart', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Onshore bond issuance, by tenor (2018-22) ',
        align: 'left'
    },
    xAxis: {
        categories: ['2018', '2019', '2020', '2021', '2022']
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        },
        stackLabels: {
            enabled: true
        },
    },
    legend: {
        align: 'left',
        x: 0,
        verticalAlign: 'bottom',
        y: 10,
        floating: false,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    series: [
        {
            name: '30Y',
            data: [42, 2, 33, 4, 2],
            color: '#E35205'
        },
        {
            name: '20Y',
            data: [2, 3.3, 3, 15, 13],
            color: '#5C068C'
        },
        {
            name: '15Y',
            data: [1, 13, 14, 15, 13],
            color: '#002E5D'
        },
        {
            name: '10Y',
            data: [3, 3, 4, 5, 10],
            color: '#75787B'
        },

        {
            name: '7Y',
            data: [30, 20, 30, 15, 25],
            color: '#78BE20'
        },

        {
            name: '5Y',
            data: [100, 10, 50, 5, 20],
            color: '#0028A0'
        },
        {
            name: '3Y',
            data: [4, 5, 3, 2, 1],
            color: '#41B6E6'
        },
        {
            name: '1Y',
            data: [2, 3, 4, 4, 1],
            color: '#009775'
        },
    ]
});


// ========================== bond_by_category_chart ============================
Highcharts.chart('bond_by_category_chart', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Onshore bond issuance, by category (2018-22)',
        align: 'left'
    },
    xAxis: {
        categories: ['2018', '2019', '2020', '2021', '2022']
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        },
        stackLabels: {
            enabled: true
        },
    },
    legend: {
        align: 'left',
        x: 0,
        verticalAlign: 'bottom',
        y: 10,
        floating: false,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    series: [
        {
            name: 'Special purpose project bond',
            data: [70, 100, 140, 180, 150],
            color: '#0028A0'
        },
        {
            name: 'Non-project-linked special purpose bond',
            data: [50, 10, 10, 40, 35],
            color: '#41B6E6'
        },

        {
            name: 'General purpose bond',
            data: [100, 45, 53, 55, 52],
            color: '#009775'
        },

    ]
});


// ======================================== bond_by_coupon_chart =================
Highcharts.chart('bond_by_coupon_chart', {
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: 'Onshore bond issuance, by coupon rate (2018-22)',
        align: 'left'
    },
    subtitle: {
        text: '',
        align: 'left'
    },

    xAxis: [{
        categories: ['2018', '2019', '2020', '2021', '2022'],
        crosshair: true
    }],

    yAxis: [{ // Secondary yAxis
        title: {
            text: '',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value}',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        opposite: false
    },
    ],
    tooltip: {
        shared: true
    },
    legend: {
        align: 'left',
        x: 0,
        verticalAlign: 'bottom',
        y: 10,
        floating: false,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || // theme
            'rgba(255,255,255,0.25)'
    },
    series: [
        {
            name: '3Y',
            type: 'spline',
            color: '#38AE93',
            data: [1.9, 5, 10, 3, 7],
            tooltip: {
                valueSuffix: ''
            }
        },
        {
            name: '5Y',
            type: 'spline',
            color: '#41B6E6',
            data: [3, 4, 3, 5, 12],
            tooltip: {
                valueSuffix: ''
            }
        },
        {
            name: '7Y',
            type: 'spline',
            color: '#0028A0',
            data: [5, 3.4, 6, 2, 3],
            tooltip: {
                valueSuffix: ''
            }
        },
        {
            name: '10Y',
            type: 'spline',
            color: '#78BE20',
            data: [3, 5.4, 7, 3, 11],
            tooltip: {
                valueSuffix: ''
            }
        },
        {
            name: '15Y',
            type: 'spline',
            color: '#75787B',
            data: [13, 3.4, 5.5, 13, 1],
            tooltip: {
                valueSuffix: ''
            }
        },
        {
            name: '20Y',
            type: 'spline',
            color: '#002E5D',
            data: [3, 7, 3.5, 9, 5],
            tooltip: {
                valueSuffix: ''
            }
        },
        {
            name: '30Y',
            type: 'spline',
            color: '#5C068C',
            data: [13, 3, 7.5, 0, 3],
            tooltip: {
                valueSuffix: ''
            }
        },
    ]
});





// ==============================mdb tab code ========================
let ragional_tab_wrapper = document.querySelector('#ragional_tab_wrapper');
ragional_tab_wrapper.querySelectorAll('[data-mdb-tab-init]').forEach(value => {
    value.onclick = function () {
        ragional_tab_wrapper.querySelectorAll('[data-mdb-tab-init]').forEach(all => {
            all.classList.remove('btn-primary');
            all.classList.add('btn-outline-primary');
        })
        this.classList.add('btn-primary');
        this.classList.remove('btn-outline-primary');
    }
})

let onshore_bond_tab_wrapper = document.querySelector('#onshore_bond_tab_wrapper');
onshore_bond_tab_wrapper.querySelectorAll('[data-mdb-tab-init]').forEach(value => {
    value.onclick = function () {
        onshore_bond_tab_wrapper.querySelectorAll('[data-mdb-tab-init]').forEach(all => {
            all.classList.remove('btn-primary');
            all.classList.add('btn-outline-primary');
        })
        this.classList.add('btn-primary');
        this.classList.remove('btn-outline-primary');
    }
})