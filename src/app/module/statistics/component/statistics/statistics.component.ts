import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as echarts from 'echarts';
import {StatisticsService} from '../../../../service/statistics.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  @ViewChild('echartsRoom', {static: true})
  echartsRoomElementRef: ElementRef;
  @ViewChild('echartsLeave', {static: true})
  echartsLeaveElementRef: ElementRef;
  @ViewChild('echartsAttendance', {static: true})
  echartsAttendanceElementRef: ElementRef;
  @ViewChild('apartment', {static: true})
  apartmentElementRef: ElementRef;

  echartsInstances: echarts.ECharts[] = [];
  datePipe = new DatePipe('zh-Hans');

  constructor(private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.initLiveChart();
    this.getApartmentInfoChart();
  }

  initLiveChart() {
    const date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    const comingOption = {
      tooltip: {formatter: '{a} <br/>{b} : {c}%'},
      series: [{name: '归寝', type: 'gauge', detail: {formatter: '{value}%'}, data: [{value: 0, name: '归寝率'}]}]
    };

    const leaveOption = {
      tooltip: {formatter: '{a} <br/>{b} : {c}%'},
      series: [{name: '请假', type: 'gauge', detail: {formatter: '{value}%'}, data: [{value: 0, name: '请假率'}]}]
    };

    const classComingOption = {
      tooltip: {formatter: '{a} <br/>{b} : {c}%'},
      series: [{name: '出勤', type: 'gauge', detail: {formatter: '{value}%'}, data: [{value: 0, name: '出勤率'}]}]
    };

    const echartsRoom = echarts.init(this.echartsRoomElementRef.nativeElement);
    const echartsLeave = echarts.init(this.echartsLeaveElementRef.nativeElement);
    const echartsAttendance = echarts.init(this.echartsAttendanceElementRef.nativeElement);

    this.echartsInstances.push(echartsRoom, echartsLeave, echartsAttendance);
    this.getHomeComingChartLive(date, echartsRoom, comingOption);
    this.getLeaveChartLive(date, echartsLeave, leaveOption);
    this.getClassComingChart(date, echartsAttendance, classComingOption);

    setInterval(() => {
      this.echartsInstances.forEach((item) => item.resize());

      this.getHomeComingChartLive(date, echartsRoom, comingOption);
      this.getLeaveChartLive(date, echartsLeave, leaveOption);
      this.getClassComingChart(date, echartsAttendance, classComingOption);
    }, 5000);

    window.onresize = () => {
      this.echartsInstances.forEach((item) => item.resize());
    };
  }

  setOption(key: string, sum: string, instance: echarts.ECharts, option: any) {
    return (data) => {
      if (data[sum] === 0) {
        option.series[0].name = '0/0';
        option.series[0].data[0].value = 0;
      } else {
        option.series[0].name = `${data[key]}/${data[sum]}`;
        option.series[0].data[0].value = Number(((data[key] / data[sum]) * 100).toFixed(2));
      }
      instance.setOption(option, true);
    };
  }

  getHomeComingChartLive(date: string,
                         instance: echarts.ECharts,
                         option: echarts.EChartOption | echarts.EChartsResponsiveOption) {
    instance.setOption(option, true);
    this.statisticsService.getHomeComingChart(date).subscribe(this.setOption('coming', 'sum', instance, option));
  }

  getLeaveChartLive(date: string,
                    instance: echarts.ECharts,
                    option: echarts.EChartOption | echarts.EChartsResponsiveOption) {
    instance.setOption(option, true);
    this.statisticsService.getLeaveChart(date).subscribe(this.setOption('leave', 'sum', instance, option));
  }

  getClassComingChart(date: string,
                      instance: echarts.ECharts,
                      option: echarts.EChartOption | echarts.EChartsResponsiveOption) {
    instance.setOption(option, true);
    this.statisticsService.getClassComingChart(date).subscribe(this.setOption('coming', 'sum', instance, option));
  }

  getApartmentInfoChart() {
    const option: echarts.EChartOption | echarts.EChartsResponsiveOption = {
      title: {
        text: '公寓人数',
        subtext: '',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: []
      },
      series: [
        {
          name: '公寓信息',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    const apartmentEcharts = echarts.init(this.apartmentElementRef.nativeElement);
    this.statisticsService.getApartmentChart().subscribe((apartmentStatistics) => {
      const sumPeople = apartmentStatistics
        .map((item) => item.people)
        .reduce((previousValue, currentValue) => previousValue + currentValue);
      (option.title as echarts.EChartTitleOption).subtext = `总人数：${sumPeople ? sumPeople : 0}人`;
      option.series[0].data = apartmentStatistics.map((item => ({name: item.name, value: item.people})));
      option.legend.data = apartmentStatistics.map((item) => item.name);
      apartmentEcharts.setOption(option, true);
    });
  }
}
