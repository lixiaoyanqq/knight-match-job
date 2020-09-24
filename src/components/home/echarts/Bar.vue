<template>
    <div :class="className" :tooltip="tooltip" :title="title" :id="id" :style="{height:height,width:width}"></div>
</template>
<script>
//引入Echarts模块
const echarts = require('echarts/lib/echarts')
// 引入提示框和标题组件
require('echarts/lib/chart/bar')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/toolbox')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
export default {
    name: 'resume',
    props: {
        className: {
            type: String,
            default: 'chart'
        },
        id: {
            type: String,
            default: 'chart'
        },
        width: {
            type: String,
            default: '200px'
        },
        height: {
            type: String,
            default: '180px'
        },
        title: {
            type: String,
            default: '简历图谱'
        },
        tooltip: {
            type: Array,
            default: function (){
                return []
            }
        },
        typeNames: {
            type: Array,
            default: function () {
                return []
            }
        },
        typeValue: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    data () {
        return {
            chart: null
        }
    },
    watch: {
        typeNames (nameList) {
            this.initChart()
        },
        typeValue (valueList) {
           this.initChart() 
        }
    },
    mounted () {
        this.initChart()
    },
    methods: {
        initChart () {
            if(!this.chart){
                this.chart = echarts.init(document.getElementById(this.id))
            }
            var xIndex,Ymonth
            let option = {
                title: {
                    top: '3',
                    show: true,
                    text: this.title,
                    textStyle: {
                        color: '#9ba8ae',
                        fontSize : 16,
                        fontWeight: 'bolder'
                    }
                },
                legend: {
                    right: '5%',
                    show: true,
                    orient: 'horizontal',
                    itemWidth: 10,
                    itemHeight: 5,
                    padding: 0,
                    textStyle: {
                        color: '#9ba8ae'
                    }
                },
                tooltip: {
                    data: this.tooltip,
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow',
                        shadowStyle: {
                            color: "rgba(178, 191, 243, 0)",
                        },
                    },
                    backgroundColor: 'rgba(209,210,243,0.7)',
                    textStyle: {
                        fontSize: '10',
                        color: '#030303'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.typeNames || ["项目经历", "潜力", "求职目标", "教育", "工作经历", "基本信息"],
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            interval: 0,
                            color: '#9ba8ae'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#9ba8ae'
                            }
                        },
                        axisTick: {
                            show: false,
                            interval: 0
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name: this.tooltip[0],
                        type: 'bar',
                        barWidth: 5,
                        stack: '广告',
                        data: this.typeValue.postNum || this.typeValue.number,
                        itemStyle:{
                            color: '#283ac8',
                            barBorderRadius: [3,3,3,3],
                        },
                        showBackground: true,
                        backgroundStyle: {
                            barBorderRadius: [4,4,4,4]
                        }
                    },
                    {
                        name: this.tooltip[1],
                        type: 'bar',
                        barWidth: 5,
                        stack: '广告',
                        data: this.typeValue.deliverNum || this.typeValue.rate,
                        itemStyle:{
                            color: '#f61e67',
                            barBorderRadius: [3,3,3,3]
                        },
                        showBackground: true,
                        backgroundStyle: {
                            barBorderRadius: [4,4,4,4]
                        }
                    }
                ]
            }
            this.chart.setOption(option, true)
            let that = this
            this.chart.getZr().on('click', function(param) {
                var pointInPixel= [param.offsetX, param.offsetY]
                if(that.chart.containPixel('grid', pointInPixel)) {
                    let pointInGrid = that.chart.convertFromPixel({seriesIndex: 0}, pointInPixel)
                    // X轴序号
                    xIndex = pointInGrid[0]
                    // 获取当前图表的option
                    var op = that.chart.getOption()
                    // 获得图表中我们想要的数据
                    // Ymonth = op.series[0].data[xIndex]
                    that.chart.setOption({
                        xAxis: [{
                            axisLabel: {
                                textStyle: {
                                    color: function (value, index) {
                                        return index === xIndex ? 'red' : '#9ba8ae'
                                    }
                                }
                            }
                        }]
                    })
                }
            })
        }
    }
}
</script>
<style lang="stylus" scoped>

</style>