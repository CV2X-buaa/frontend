import echarts from 'echarts'

// require('echarts/theme/macarons') // echarts theme


// 峰值环比
export const PeakCycleRatioOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
    },
    grid: {
        left: '2%',
        right: '3%',
        bottom: '15%',
        top: '15%',
        containLabel: true
    },
    legend: {
        data: ['上周监测总量', '上上周监测总量'],
        right: 0,
        top: 0,
        textStyle: {
            color: "#fff"
        },
        itemWidth: 10,
        itemHeight: 10,
        // itemGap: 35
    },

    xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLabel: {
            textStyle: {
                color: "rgba(255,255,255,.6)",
                // color: "rgba(255,255,255,1)",
                fontSize: 12,
            },
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,.1)'
            }

        },

        data: [
            '周一', '周二', '周三', '周四', '周五', '周六', '周日']

    }, {

        axisPointer: { show: false },
        axisLine: { show: false },
        position: 'bottom',
        offset: 20,


    }],

    yAxis: [{
        type: 'value',
        axisTick: { show: true },
        // splitNumber: 4,
        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,.1)'
            }
        },
        axisLabel: {
            textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12,
            },
        },

        splitLine: {
            lineStyle: {
                color: "rgba(255,255,255,.1)",
                type: "dotted"
            }
        }
    }],
    series: [
        {
            name: '上周监测总量',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: true,
            lineStyle: {
                normal: {
                    color: 'rgba(228, 228, 126, 1)',
                    width: 2
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(228, 228, 126, .8)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(228, 228, 126, 0.1)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                }
            },
            itemStyle: {
                normal: {
                    color: '#dddc6b',
                    borderColor: 'rgba(221, 220, 107, .1)',
                    borderWidth: 12
                }
            },
            data: [158975, 68567, 95781, 76843, 119871, 85161, 130123]
        },
        {
            name: '上上周监测总量',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: true,
            lineStyle: {
                normal: {
                    color: 'rgba(255, 128, 128, 1)',
                    width: 2
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(255, 128, 128,.8)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(255, 128, 128, .1)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgba(255, 128, 128, 1)',
                    borderColor: 'rgba(221, 220, 107, .1)',
                    borderWidth: 12
                }
            },
            data: [122891, 90683, 72857, 86780, 139761, 165487, 97564]
        },
    ]
}
// 交易峰值统计
export const TradingPeakOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: "{b} : 平均{c}人"
    },
    grid: {
        left: '2%',
        right: '2%',
        bottom: '15%',
        top: '10%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        data: ['0时', '2时', '4时', '6时', '8时', '10时', '12时', '14时', '16时', '18时', '20时', '22时', '24时'],
        axisLine: {
            show: true,
            lineStyle: {
                color: "#ffffff",
                width: 1,
                type: "solid",
                opacity: 0.3
            }
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            show: true,
            textStyle: {
                color: "rgba(255,255,255,.5)",
            }
        },
    }],
    yAxis: [{
        type: 'value',
        axisLine: {
            show: false,
        },
        axisLabel: {
            show: true,
            formatter: '{value}',
            textStyle: {
                color: "rgba(255,255,255,.5)",
            }
        },
        axisTick: {
            show: false
        },
        splitNumber: 3,
        splitLine: {
            lineStyle: {
                color: "rgba(255,255,255,.1)",
                type: "dotted"
            }
        }
    }],
    series: [{
        type: 'pictorialBar',
        symbol: 'path://M35,0L35,70L0,70z M35,0L35,70L70,70z',
        barWidth: '45%', //柱子宽度
        data: [
            { value: 4706, time: '0时' },
            { value: 2106, time: '2时' },
            { value: 1976, time: '4时' },
            { value: 7902, time: '6时' },
            { value: 16840, time: '8时' },
            { value: 15977, time: '10时' },
            { value: 10044, time: '12时' },
            { value: 11706, time: '14时' },
            { value: 10635, time: '16时' },
            { value: 17894, time: '18时' },
            { value: 14317, time: '20时' },
            { value: 9573, time: '22时' },
            { value: 4107, time: '24时' },
        ],

        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#247ed1'
                }, {
                    offset: 0.5,
                    color: '#173f9a'
                }, {
                    offset: 0.5,
                    color: '#247ed1'
                }
                    , {
                    offset: 1,
                    color: '#247ed1'
                }]),
                opacity: 1,
            }
        }
    }],
}

export const ComplaintRiskOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function (params) {
            let marker = params[0].marker;
            let address = params[0].data.address; // 地址名称
            let value = params[0].value; // 数量
            return `${marker}<br/>地址：${address}<br/>数量：${value}`
        }
    },
    color: ['#1aa1ff', '#31c17b', '#ff6535'],
    grid: {
        left: '2%',
        right: '2%',
        bottom: '15%',
        top: '10%',
        containLabel: true
    },
    xAxis: {
        data: ["海淀", "朝阳", "东城", "西城", "昌平", "石景山", "丰台", "顺义", "房山", "大兴"],
        axisLine: { show: true, },
        axisLabel: {
            color: 'rgba(255,255,255,.7)',
            fontSize: 8
        }
    },
    yAxis: {
        splitNumber: 4,
        nameTextStyle: {
            color: 'rgba(255,255,255,.6)',
            fontSize: 12
        },
        axisLine: { show: true, },
        axisLabel: {
            color: 'rgba(255,255,255,.6)',
            fontSize: 12
        },
        splitLine: {
            lineStyle: {
                color: "rgba(255,255,255,.1)",
                type: "dotted"
            }
        }
    },
    series: [{
        type: 'bar',
        barWidth: '25%',
        itemStyle: {
            normal: {
                barBorderRadius: 50,
                color: function (params) {
                    var colorList = ['#4591e3', '#04b8e5', '#04dde5', '#04e5bd', '#04e57e', '#fedb5b', '#e59e04', '#ff632d', '#ff639e', '#ff82e9', '#b562e4'];
                    return colorList[params.dataIndex]

                },

                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}',
                    color: 'rgba(255,255,255,.4)',
                    fontSize: 12
                }
            }

        },

        data: []
    }]
}

export const RecentComplaintsHotWordsOption = {
    grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        top: '10%',
        containLabel: true
    },
    tooltip: {
        trigger: 'item',
        // axisPointer: {type: 'shadow'},
        formatter: "{b}"
    },
    label: {
        show: true,  // 显示标签
        formatter: function (params) {
            return (
                params.value[0] + ',' + params.value[1]
            )
        },
        position: 'inside'  // 标签位置
    },
    xAxis: [{
        gridIndex: 0,
        min: 0,
        show: true,
        max: 100,
        nameLocation: 'middle',
        nameGap: 30,

    }],
    yAxis: [{
        gridIndex: 0,
        min: 0,
        show: true,
        max: 100,
        nameLocation: 'middle',
        nameGap: 30
    }],
    series: [
        {
            type: 'scatter',
            symbol: 'circle',
            symbolSize: 120,
            label: {
                normal: {
                    show: true,
                    formatter: '{b}',
                    color: '#FFF',
                    textStyle: {
                        fontSize: '12'
                    }

                },
            },
            data: [
                {
                    "name": "DoS",
                    "value": [56, 48],
                    "symbolSize": 80,
                    "itemStyle": {
                        "normal": {
                            "color": "#ec1818"
                        }
                    }
                },
                {
                    "name": "Fuzzy",
                    "value": [
                        30,
                        70
                    ],
                    "symbolSize": 60,
                    "itemStyle": {
                        "normal": {
                            "color": "#ef623e"
                        }
                    }
                },
                {
                    "name": "RPM",
                    "value": [
                        0,
                        43
                    ],
                    "symbolSize": 40,
                    "itemStyle": {
                        "normal": {
                            "color": "#94e03c"
                        }
                    }
                },
                {
                    "name": "Gear",
                    "value": [
                        83,
                        30
                    ],
                    "symbolSize": 40,
                    "itemStyle": {
                        "normal": {
                            "color": "#08ba79"
                        }
                    }
                },
                {
                    "name": "MITM",
                    "value": [
                        26,
                        19
                    ],
                    "symbolSize": 55,
                    "itemStyle": {
                        "normal": {
                            "color": "#069fc5"
                        }
                    }
                },
                {
                    "name": "RCE",
                    "value": [
                        75,
                        75
                    ],
                    "symbolSize": 45,
                    "itemStyle": {
                        "normal": {
                            "color": "#fc7a17"
                        }
                    }
                }
            ]
        }],
}

export const IncreaseInComplaintsOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function (params) {
            let company = params[0].data.orgName; // 公司名称
            let marker = params[0].marker
            let seriesName = params[0].seriesName
            let value = params[0].value;

            let marker1 = params[1].marker
            let seriesName1 = params[1].seriesName
            let value1 = params[1].value;
            return `${company}<br/>${marker}${seriesName}：${value}%<br/>${marker1}${seriesName1}：${value1}%`
        }

    },
    legend: {
        data: ['上周', '本周'],
        right: 0,
        top: 0,
        textStyle: {
            color: "#fff"
        },
        itemWidth: 10,
        itemHeight: 10,
        // itemGap: 35
    },
    grid: {
        left: '2%',
        right: '2%',
        bottom: '15%',
        top: '20%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        data: ['海淀', '朝阳', '西城'],
        axisLine: { show: true, },
        axisLabel: {
            color: 'rgba(255,255,255,.6)',
            fontSize: 12
        }
    }],
    yAxis: [{
        axisLabel: {
            color: 'rgba(255,255,255,.6)',
            fontSize: 12
        },

        axisLine: {
            show: false
        },
        splitLine: {
            lineStyle: {
                color: "rgba(255,255,255,.1)",
                type: "dotted"
            }
        }
    }],
    series: [
        {
            name: '上周',
            type: 'bar',
            data: [
                { value: 30, orgName: '海淀' },
                { value: 19, orgName: '朝阳' },
                { value: 22, orgName: '西城' },
            ],
            barWidth: '11px',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                        offset: 0,
                        color: "#009AFD"
                    }, {
                        offset: 0.8,
                        color: "#33DAFF"
                    }], false),
                    barBorderRadius: [30, 30, 30, 30],
                    shadowColor: 'rgba(0,160,221,1)',
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}%',
                        color: 'rgba(255,255,255,.4)',
                        fontSize: 12
                    }
                },

            },

        },
        {
            name: '本周',
            type: 'bar',
            data: [
                { value: 25, orgName: '海淀' },
                { value: 28, orgName: '朝阳' },
                { value: 30, orgName: '西城' },
            ],
            barWidth: '11px',
            itemStyle: {
                normal: {
                    // barBorderRadius: [10, 10, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                        offset: 0,
                        color: "#4033F9"
                    }, {
                        offset: 0.8,
                        color: "#ee870a"
                    }], false),
                    // shadowColor: 'rgba(0, 0, 0, 0.1)',
                    barBorderRadius: [30, 30, 30, 30],
                    shadowColor: 'rgba(0,160,221,1)',
                    shadowBlur: 4,
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}%',
                        color: 'rgba(255,255,255,.4)',
                        fontSize: 12
                    }
                }
            },
        },
    ]
}

export const ComplaintNumberOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: "{b} : {c}条"
    },
    grid: {
        left: '2%',
        right: '2%',
        bottom: '15%',
        top: '20%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        data: ['车辆1', '车辆2', '车辆3', '车辆4', '车辆5', '车辆6', '车辆7', '车辆8', '车辆9', '车辆10'],
        axisLine: { show: true, },
        axisLabel: {
            color: 'rgba(255,255,255,.6)',
            fontSize: 12
        }
    }],
    yAxis: [{
        splitNumber: 4,
        axisLabel: {
            color: 'rgba(255,255,255,.6)',
            fontSize: 12
        },

        axisLine: {
            show: true
        },
        splitLine: {
            lineStyle: {
                color: "rgba(255,255,255,.1)",
                type: "dotted"
            }
        }
    }],
    series: [{
        type: 'bar',
        data: [
            { value: 25647, name: '车辆1' },
            { value: 57453, name: '车辆2' },
            { value: 34575, name: '车辆3' },
            { value: 45864, name: '车辆4' },
            { value: 21573, name: '车辆5' },
            { value: 31797, name: '车辆6' },
            { value: 15365, name: '车辆7' },
            { value: 20679, name: '车辆9' },
            { value: 14870, name: '车辆0' },
            { value: 24085, name: '车辆8' }
        ],
        barWidth: '11px',
        itemStyle: {
            normal: {
                // barBorderRadius: [10, 10, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 0,
                    color: "#4033F9"
                }, {
                    offset: 0.8,
                    color: "#BA97F9"
                }], false),
                // shadowColor: 'rgba(0, 0, 0, 0.1)',
                barBorderRadius: [30, 30, 30, 30],
                shadowColor: 'rgba(0,160,221,1)',
                shadowBlur: 4,
            }
        },
        label: {
            normal: {
                show: true,
                lineHeight: 20,
                width: 50,
                height: 20,
                backgroundColor: 'rgba(0,160,221,0.1)',
                borderRadius: 200,
                position: ['-12', '-40'],
                distance: 0,
                formatter: [
                    '    {d|●}',
                    ' {a|{c}}     \n',
                    '    {b|}'
                ].join(','),
                rich: {
                    d: {
                        color: '#BA97F9',
                    },
                    a: {
                        color: '#fff',
                        align: 'center',
                    },
                    b: {
                        width: 1,
                        height: 10,
                        borderWidth: 1,
                        borderColor: '#234e6c',
                        align: 'left'
                    },
                }
            }
        }
    }]
}

// 车速分布
export const SpeedOption = {
    grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        top: '10%',
        containLabel: true
    },
    tooltip: {
        trigger: "item",
        right: 0,
        top: 0,
        formatter: "{b} : ({d}%)"
    },
    calculable: true,
    series: [{
        name: " ",
        color: ['#ba97f9', '#a073f1', "#8277f1", '#7668f3', "#bfbaf5",],
        // color: ["#62c98d", "#2f89cf", "#4cb9cf", "#53b666", "#62c98d", "#205acf", "#c9c862", "#c98b62", "#c962b9", "#7562c9", "#c96262", "#c25775", "#00b7be"],
        type: "pie",
        radius: [15, 40],
        center: ["50%", "50%"],
        roseType: "radius",
        label: {
            normal: {
                show: true
            },
            emphasis: {
                show: true
            }
        },
        lableLine: {
            normal: {
                show: true
            },
            emphasis: {
                show: true
            }
        },
        data: [{
            value: 80,
            name: "30-50km/h",
            /*label: {
              color: '##ff6535',
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: "#ff6535"
                }, {
                  offset: 0.8,
                  color: "#33DAFF"
                }], false),
                barBorderRadius: [30, 30, 30, 30],
              },
            }*/
        }, {
            value: 50,
            name: "0-30km/h"
        }, {
            value: 45,
            name: "50-60km/h"
        }, {
            value: 12,
            name: ">=80km/h"
        }, {
            value: 60,
            name: "60-80km/h"
        },]
    },]
}
// 时间段分布
export const TimeOption = {
    tooltip: {
        trigger: "item",
        right: 0,
        top: 0,
        formatter: "{b} : {c}(%)"
    },
    grid: {
        left: '8%',
        top: '5%',
        right: '2%',
        bottom: '2%',
        containLabel: true
    },
    xAxis: {
        show: false
    },
    yAxis: [{
        show: true,
        data: ['白天', '夜晚'],
        inverse: true,
        axisLine: { show: false },
        splitLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
            textStyle: {
                color: '#fff'
            },
        },

    }, {
        show: false,
        inverse: true,
        data: [683, 234],
        axisLabel: { textStyle: { color: '#fff' } },
        axisLine: { show: false },
        splitLine: { show: false },
        axisTick: { show: false },
    }],
    series: [{
        name: '车',
        type: 'bar',
        yAxisIndex: 0,
        data: [71.6, 28.4],
        barWidth: 10,
        itemStyle: {
            normal: {
                color: function (params) {
                    var colorList = ['#4591e3', '#b562e4', '#ff82e9', '#b562e4'];
                    return new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                        offset: 0,
                        color: colorList[params.dataIndex]
                    }, {
                        offset: 0.8,
                        color: colorList[params.dataIndex + 1]
                    }], false)

                },
                barBorderRadius: 50,

            }
        },
        label: {
            normal: {
                show: true,
                position: 'right',
                formatter: '{c}%',
                textStyle: { color: 'rgba(255,255,255,.5)' }
            }
        },
    }]
}
