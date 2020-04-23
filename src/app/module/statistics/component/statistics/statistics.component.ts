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
  echartsInstances: echarts.ECharts[] = [];
  datePipe = new DatePipe('zh-Hans');

  constructor(private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
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

  refresh(key: string, sum: string, instance: echarts.ECharts, option: any) {
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
    this.statisticsService.getHomeComingChart(date).subscribe(this.refresh('coming', 'sum', instance, option));
  }

  getLeaveChartLive(date: string,
                    instance: echarts.ECharts,
                    option: echarts.EChartOption | echarts.EChartsResponsiveOption) {
    instance.setOption(option, true);
    this.statisticsService.getLeaveChart(date).subscribe(this.refresh('leave', 'sum', instance, option));
  }

  getClassComingChart(date: string,
                      instance: echarts.ECharts,
                      option: echarts.EChartOption | echarts.EChartsResponsiveOption) {
    instance.setOption(option, true);
    this.statisticsService.getClassComingChart(date).subscribe(this.refresh('coming', 'sum', instance, option));
  }
}
