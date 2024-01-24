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

Highcharts.chart('overflow_tab_line_chart', {
    chart: {
        type: 'spline'
    },

    title: {
        text: 'United States of America\'s Inflation-related statistics',
        align: 'left'
    },

    subtitle: {
        text: 'Source: <a href="https://www.worldbank.org/en/home">The World Bank</a>',
        align: 'left'
    },

    data: {
        csv: document.getElementById('csv').innerHTML
    },

    yAxis: [{
        title: {
            text: 'Inflation'
        },
        plotLines: [{
            color: 'black',
            width: 2,
            value: 13.5492019749684,
            animation: {
                duration: 1000,
                defer: 4000
            },
            label: {
                text: 'Max Inflation',
                align: 'right',
                x: -20
            }
        }]
    }, {
        title: {
            text: 'Claims on central government, etc.'
        }
    }, {
        opposite: true,
        title: {
            text: 'Net foreign assets'
        }
    }, {
        opposite: true,
        title: {
            text: 'Net domestic credit'
        }
    }],

    plotOptions: {
        series: {
            animation: {
                duration: 1000
            },
            marker: {
                enabled: false
            },
            lineWidth: 2
        }
    },

    series: [{
        yAxis: 0
    }, {
        yAxis: 1,
        animation: {
            defer: 1000
        }
    }, {
        yAxis: 2,
        animation: {
            defer: 2000
        }
    }, {
        yAxis: 3,
        animation: {
            defer: 3000
        }
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                yAxis: [{
                    tickAmount: 2,
                    title: {
                        x: 15,
                        reserveSpace: false
                    }
                }, {
                    tickAmount: 2,
                    title: {
                        x: 20,
                        reserveSpace: false
                    }
                }, {
                    tickAmount: 2,
                    title: {
                        x: -20,
                        reserveSpace: false
                    }
                }, {
                    tickAmount: 2,
                    title: {
                        x: -20,
                        reserveSpace: false
                    }
                }]
            }
        }]
    }
});



// ============================ screener line chart ============================

const colors = Highcharts.getOptions().colors;

Highcharts.chart('screener_line_chart', {
    chart: {
        type: 'spline'
    },

    legend: {
        symbolWidth: 40
    },

    title: {
        text: 'Most common desktop screen readers',
        align: 'left'
    },

    subtitle: {
        text: 'Source: WebAIM. Click on points to visit official screen reader website',
        align: 'left'
    },

    yAxis: {
        title: {
            text: 'Percentage usage'
        },
        accessibility: {
            description: 'Percentage usage'
        }
    },

    xAxis: {
        title: {
            text: 'Time'
        },
        accessibility: {
            description: 'Time from December 2010 to September 2019'
        },
        categories: ['December 2010', 'May 2012', 'January 2014', 'July 2015', 'October 2017', 'September 2019']
    },

    tooltip: {
        valueSuffix: '%',
        stickOnContact: true
    },

    plotOptions: {
        series: {
            point: {
                events: {
                    click: function () {
                        window.location.href = this.series.options.website;
                    }
                }
            },
            cursor: 'pointer',
            lineWidth: 2
        }
    },

    series: [
        {
            name: 'NVDA',
            data: [34.8, 43.0, 51.2, 41.4, 64.9, 72.4],
            website: 'https://www.nvaccess.org',
            color: colors[2],
            accessibility: {
                description: 'This is the most used screen reader in 2019.'
            }
        }, {
            name: 'JAWS',
            data: [69.6, 63.7, 63.9, 43.7, 66.0, 61.7],
            website: 'https://www.freedomscientific.com/Products/Blindness/JAWS',
            dashStyle: 'ShortDashDot',
            color: colors[0]
        }, {
            name: 'VoiceOver',
            data: [20.2, 30.7, 36.8, 30.9, 39.6, 47.1],
            website: 'http://www.apple.com/accessibility/osx/voiceover',
            dashStyle: 'ShortDot',
            color: colors[1]
        }, {
            name: 'Narrator',
            data: [null, null, null, null, 21.4, 30.3],
            website: 'https://support.microsoft.com/en-us/help/22798/windows-10-complete-guide-to-narrator',
            dashStyle: 'Dash',
            color: colors[9]
        }, {
            name: 'ZoomText/Fusion',
            data: [6.1, 6.8, 5.3, 27.5, 6.0, 5.5],
            website: 'http://www.zoomtext.com/products/zoomtext-magnifierreader',
            dashStyle: 'ShortDot',
            color: colors[5]
        }, {
            name: 'Other',
            data: [42.6, 51.5, 54.2, 45.8, 20.2, 15.4],
            website: 'http://www.disabled-world.com/assistivedevices/computer/screen-readers.php',
            dashStyle: 'ShortDash',
            color: colors[3]
        }
    ],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 550
            },
            chartOptions: {
                chart: {
                    spacingLeft: 3,
                    spacingRight: 3
                },
                legend: {
                    itemWidth: 150
                },
                xAxis: {
                    categories: ['Dec. 2010', 'May 2012', 'Jan. 2014', 'July 2015', 'Oct. 2017', 'Sep. 2019'],
                    title: ''
                },
                yAxis: {
                    visible: false
                }
            }
        }]
    }
});



// ========================== segments bar chart ============================

Highcharts.chart('segments_bar_chart', {
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
ragional_tab_wrapper.querySelectorAll('[data-mdb-tab-init]').forEach(value=> {
    value.onclick = function(){
        ragional_tab_wrapper.querySelectorAll('[data-mdb-tab-init]').forEach(all=> {
            all.classList.remove('btn-primary');
            all.classList.add('btn-outline-primary');
        })
        this.classList.add('btn-primary');
        this.classList.remove('btn-outline-primary');
    }
})