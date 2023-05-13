/* 不同的Option使用不同的初始化数据，否则更新Option时更新的该初始化数据 */
let cpuData = [];
let memoryData = [];
let xAxisData = [];
for (let index = 60; index > -1; index--) {
    let str = (index == 60) ? '60秒' : (index == 0) ? '0' : '';
    xAxisData.push(str);
    cpuData.push(0);
    memoryData.push(0);
}

/* CPU */
var cpuPercentChart = echarts.init(document.getElementById('cpu-percent-chart'), 'dark');
cpuPercentOption = {
    title: {
        // left: 'center',
        text: 'CPU'
    },
    grid: {
        left: '20',
        right: '1%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        data: xAxisData
    },
    yAxis: {
        name: '使用率',
        type: 'value',
        // position: 'right'
    },
    series: [
        {
            name: 'Fake Data',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
                color: 'rgb(95,174,227)'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(255, 158, 68)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(255, 70, 131)'
                    }
                ])
            },
            // data: [820, 932, 901, 934, 1290, 1330, 1320],
            data: cpuData,
            type: 'line',
            areaStyle: {}
        }
    ]
};
cpuPercentChart.setOption(cpuPercentOption);


/* 内存 */
var memoryPercentChart = echarts.init(document.getElementById('memory-percent-chart'), 'dark');
memoryPercentOption = {
    title: {
        // left: 'center',
        text: '内存',
        ubtext: '内存使用率'
    },
    grid: {
        left: '20',
        right: '1%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        data: xAxisData
    },
    yAxis: {
        name: '使用率',
        type: 'value'
    },
    series: [
        {
            name: 'Fake Data',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
                color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(255, 158, 68)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(255, 70, 131)'
                    }
                ])
            },
            // data: [820, 932, 901, 934, 1290, 1330, 1320],
            data: memoryData,
            type: 'line',
            areaStyle: {}
        }
    ]
};
memoryPercentChart.setOption(memoryPercentOption);


/* 内存容量 */
var memoryTotalChart = echarts.init(document.getElementById('memory-total-chart'), 'dark');
memoryTotalOption = {
    title: {
        // left: 'center',
        text: '内存容量'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            // Use axis to trigger tooltip
            type: 'line' // 'shadow' as default; can also be 'line' or 'shadow'
        }
    },
    legend: {},
    grid: {
        left: '20',
        right: '1%',
        bottom: '0',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        show: false
    },
    yAxis: {
        name: 'GB',
        type: 'category',
        data: [''],
        show: false
    },
    series: [
        {
            name: '总容量(GB)',
            type: 'bar',
            stack: true,
            label: {
                show: true
            },
            emphasis: {
                focus: 'series'
            },
            data: [0]
        },
        {
            name: '已用(GB)',
            type: 'bar',
            stack: true,
            label: {
                show: true
            },
            emphasis: {
                focus: 'series'
            },
            data: [0]
        },
        {
            name: '剩余(GB)',
            type: 'bar',
            stack: true,
            label: {
                show: true
            },
            emphasis: {
                focus: 'series'
            },
            data: [0]
        }
    ]
};
memoryTotalChart.setOption(memoryTotalOption);


/* 监听改变窗体尺寸事件 */
window.addEventListener('resize', function () {
    cpuPercentChart.resize();
    memoryPercentChart.resize();
    memoryTotalChart.resize();
});



/////////////////////////////////////////////////////////
// node-pyrunner
/////////////////////////////////////////////////////////

const pyrunner = require('node-pyrunner')
pyrunner.config['module_search_paths'].push('./pyscript');
pyrunner.init();
let appModule = pyrunner.import('app');
appModule.callSync('start', []);

/* 更新CPU */
UpdataCPU = (jsonStr) => {
    let obj = JSON.parse(jsonStr);
    cpuPercentOption['title']['text'] = `CPU ${obj.cpu_name}`; // 更新标题
    cpuPercentOption['yAxis']['name'] = `使用率 ${obj.cpu_avg}% `; // 更新Y轴名称
    // 更新数据
    let chartdata = cpuPercentOption['series'][0]['data'];
    chartdata.push(obj.cpu_avg);
    chartdata.shift();
    cpuPercentChart.setOption(cpuPercentOption);
}

/* 更新内存 */
UpdateMenory = (jsonStr) => {
    let obj = JSON.parse(jsonStr);
    // 内存使用率
    memoryPercentOption['yAxis']['name'] = `使用率 ${obj.menory_percent}% `;
    let chartdata = memoryPercentOption['series'][0]['data'];
    chartdata.push(obj.menory_percent);
    chartdata.shift();
    memoryPercentChart.setOption(memoryPercentOption);
    // 内存容量
    memoryTotalOption['series'][0]['data'][0] = obj.menory_total_gb;
    memoryTotalOption['series'][1]['data'][0] = obj.menory_used_gb;
    memoryTotalOption['series'][2]['data'][0] = obj.menory_available_gb;
    memoryTotalChart.setOption(memoryTotalOption);
}