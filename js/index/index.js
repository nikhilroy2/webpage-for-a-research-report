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
        text: 'Source: ' +
            '<a href="https://www.yr.no/nb/historikk/graf/5-97251/Norge/Troms%20og%20Finnmark/Karasjok/Karasjok?q=2021"' +
            'target="_blank">YR</a>',
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
        x: 80,
        verticalAlign: 'top',
        y: 60,
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
        text: 'Source: ' +
            '<a href="https://www.yr.no/nb/historikk/graf/5-97251/Norge/Troms%20og%20Finnmark/Karasjok/Karasjok?q=2021"' +
            'target="_blank">YR</a>',
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
        text: 'Source: ' +
            '<a href="https://www.yr.no/nb/historikk/graf/5-97251/Norge/Troms%20og%20Finnmark/Karasjok/Karasjok?q=2021"' +
            'target="_blank">YR</a>',
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
        text: 'Source: ' +
            '<a href="https://www.yr.no/nb/historikk/graf/5-97251/Norge/Troms%20og%20Finnmark/Karasjok/Karasjok?q=2021"' +
            'target="_blank">YR</a>',
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
        text: 'Source: ' +
            '<a href="https://www.yr.no/nb/historikk/graf/5-97251/Norge/Troms%20og%20Finnmark/Karasjok/Karasjok?q=2021"' +
            'target="_blank">YR</a>',
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
        x: 70,
        verticalAlign: 'top',
        y: 70,
        floating: true,
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



// ========================== capital_structure_bar_chart ============================
// Data retrieved from https://en.wikipedia.org/wiki/Winter_Olympic_Games
Highcharts.chart('capital_structure_bar_chart', {

    chart: {
        type: 'column'
    },

    title: {
        text: 'Olympic Games all-time medal table, grouped by continent',
        align: 'left'
    },

    xAxis: {
        categories: ['Gold', 'Silver', 'Bronze']
    },

    yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
            text: 'Count medals'
        }
    },

    tooltip: {
        format: '<b>{key}</b><br/>{series.name}: {y}<br/>' +
            'Total: {point.stackTotal}'
    },

    plotOptions: {
        column: {
            stacking: 'normal'
        }
    },

    series: [{
        name: 'Norway',
        data: [148, 133, 124],
        stack: 'Europe'
    }, {
        name: 'Germany',
        data: [102, 98, 65],
        stack: 'Europe'
    }, {
        name: 'United States',
        data: [113, 122, 95],
        stack: 'North America'
    }, {
        name: 'Canada',
        data: [77, 72, 80],
        stack: 'North America'
    }]
});



// ========================== debt_summary_bar_chart ============================
Highcharts.chart('debt_summary_bar_chart', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Corn vs wheat estimated production for 2020',
        align: 'left'
    },
    subtitle: {
        text:
            'Source: <a target="_blank" ' +
            'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>',
        align: 'left'
    },
    xAxis: {
        categories: ['USA', 'China', 'Brazil', 'EU', 'India', 'Russia'],
        crosshair: true,
        accessibility: {
            description: 'Countries'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: '1000 metric tons (MT)'
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
            name: 'Corn',
            data: [406292, 260000, 107000, 68300, 27500, 14500]
        },
        {
            name: 'Wheat',
            data: [51086, 136000, 5500, 141000, 107180, 77000]
        }
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