import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as echarts from 'echarts';
import {StatisticsService} from '../../../../service/statistics.service';
import {DatePipe} from '@angular/common';
import * as dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import {merge, Observable} from 'rxjs';
import {Leave} from '../../../../entity/statistics/Leave';
import {map} from 'rxjs/operators';
import {ClassComing} from '../../../../entity/statistics/ClassComing';
import {HomeComing} from '../../../../entity/statistics/HomeComing';

dayjs.locale('zh-cn');

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {
  @ViewChild('echartsRoom', {static: true})
  echartsRoomElementRef: ElementRef;
  @ViewChild('echartsLeave', {static: true})
  echartsLeaveElementRef: ElementRef;
  @ViewChild('echartsAttendance', {static: true})
  echartsAttendanceElementRef: ElementRef;
  @ViewChild('apartment', {static: true})
  apartmentElementRef: ElementRef;
  @ViewChild('counselor', {static: true})
  counselorElementRef: ElementRef;
  @ViewChild('polyline', {static: true})
  polylineElementRef: ElementRef;

  echartsInstances: echarts.ECharts[] = [];
  datePipe = new DatePipe('zh-Hans');
  intervalNumber: number;
  dateRange: Date[] = [];
  nowDay = dayjs();
  lastMonthFromNow = dayjs().subtract(1, 'month');
  counselorAllChartOption: echarts.EChartOption = {
    title: {text: '各辅导员统计信息'},
    tooltip: {trigger: 'axis', axisPointer: {type: 'shadow'}},
    legend: {data: ['寝室归寝', '课堂出勤', '请假']},
    grid: {left: '3%', right: '4%', bottom: '3%', containLabel: true},
    xAxis: {type: 'value', boundaryGap: [0, 0.01]},
    yAxis: {type: 'category'},
    series: [{name: '寝室归寝', type: 'bar', data: []}, {name: '课堂出勤', type: 'bar', data: []}, {name: '请假', type: 'bar', data: []}]
  };
  polylineOption: echarts.EChartOption = {
    title: {text: '统计折线图'},
    tooltip: {trigger: 'axis'},
    dataZoom: [{type: 'slider', start: 0, end: 100}, {type: 'inside', start: 0, end: 100}],
    legend: {data: ['寝室归寝', '课堂出勤', '请假']},
    grid: {left: '3%', right: '4%', bottom: '3%', containLabel: true},
    xAxis: {type: 'category', boundaryGap: false, data: []},
    yAxis: {type: 'value'},
    series: [
      {name: '寝室归寝', type: 'line', smooth: true, data: []},
      {name: '课堂出勤', type: 'line', smooth: true, data: []},
      {name: '请假', type: 'line', smooth: true, data: []}
    ]
  };
  apartmentOption: echarts.EChartOption = {
    title: {text: '公寓人数', subtext: '', left: 'center'},
    tooltip: {trigger: 'item', formatter: '{a} <br/>{b} : {c} ({d}%)'},
    legend: {orient: 'vertical', left: 'left', data: []},
    series: [{
      name: '公寓信息',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [],
      emphasis: {itemStyle: {shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)'}}
    }]
  };
  counselorEcharts: echarts.ECharts;
  polylineEcharts: echarts.ECharts;
  apartmentEcharts: echarts.ECharts;

  constructor(private statisticsService: StatisticsService) {
    this.dateRange.push(this.lastMonthFromNow.toDate(), this.nowDay.toDate());
  }

  ngOnInit(): void {
    this.counselorEcharts = echarts.init(this.counselorElementRef.nativeElement);
    this.polylineEcharts = echarts.init(this.polylineElementRef.nativeElement);
    this.apartmentEcharts = echarts.init(this.apartmentElementRef.nativeElement);

    this.initLiveChart();
    this.getApartmentInfoChart();
    this.getCounselorAllChart(this.lastMonthFromNow.format('YYYY-MM-DD'), this.nowDay.format('YYYY-MM-DD'));
    this.getPolylineData(this.lastMonthFromNow, this.nowDay);

    window.onresize = () => {
      const eChartsResizeOption = this.getGoodWidth();
      if (eChartsResizeOption) {
        const width = (eChartsResizeOption.width as number) / 2;
        this.apartmentEcharts.resize({width});
        this.polylineEcharts.resize({width});

        const width3 = (eChartsResizeOption.width as number) / 3;
        this.echartsInstances.forEach((item) => item.resize({width: width3}));
      }
      this.counselorEcharts.resize(eChartsResizeOption);
    };
    window.onresize.apply(this);
  }

  ngOnDestroy(): void {
    window.onresize = null;
    if (this.intervalNumber) {
      window.clearInterval(this.intervalNumber);
    }
  }

  initLiveChart() {
    const date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    const comingOption = {
      tooltip: {formatter: '{a} <br/>{b} : {c}%'},
      series: [{name: '', type: 'gauge', detail: {formatter: '{value}%'}, data: [{value: 0, name: '实时归寝率'}]}]
    };

    const leaveOption = {
      tooltip: {formatter: '{a} <br/>{b} : {c}%'},
      series: [{name: '', type: 'gauge', detail: {formatter: '{value}%'}, data: [{value: 0, name: '实时请假率'}]}]
    };

    const classComingOption = {
      tooltip: {formatter: '{a} <br/>{b} : {c}%'},
      series: [{name: '', type: 'gauge', detail: {formatter: '{value}%'}, data: [{value: 0, name: '实时出勤率'}]}]
    };

    const echartsRoom = echarts.init(this.echartsRoomElementRef.nativeElement);
    const echartsLeave = echarts.init(this.echartsLeaveElementRef.nativeElement);
    const echartsAttendance = echarts.init(this.echartsAttendanceElementRef.nativeElement);

    this.echartsInstances.push(echartsRoom, echartsLeave, echartsAttendance);
    this.getHomeComingChartLive(date, echartsRoom, comingOption);
    this.getLeaveChartLive(date, echartsLeave, leaveOption);
    this.getClassComingChart(date, echartsAttendance, classComingOption);

    this.intervalNumber = setInterval(() => {
      this.getHomeComingChartLive(date, echartsRoom, comingOption);
      this.getLeaveChartLive(date, echartsLeave, leaveOption);
      this.getClassComingChart(date, echartsAttendance, classComingOption);
    }, 5000);
  }

  setOption(key: string, sum: string, instance: echarts.ECharts, option: any) {
    return (data) => {
      option.series[0].name = `${data[key]}/${data[sum]}`;
      option.series[0].data[0].value = this.percentage(data[key], data[sum]);
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
    this.apartmentEcharts.setOption(this.apartmentOption, true);
    this.statisticsService.getApartmentChart().subscribe((apartmentStatistics) => {
      const sumPeople = apartmentStatistics
        .map((item) => item.people)
        .reduce((previousValue, currentValue) => previousValue + currentValue);
      (this.apartmentOption.title as echarts.EChartTitleOption).subtext = `总人数：${sumPeople ? sumPeople : 0}人`;
      this.apartmentOption.series[0].data = apartmentStatistics.map((item => ({name: item.name, value: item.people})));
      this.apartmentOption.legend.data = apartmentStatistics.map((item) => item.name);
      this.apartmentEcharts.setOption(this.apartmentOption, true);
    });
  }

  getCounselorAllChart(startDate: string, endDate: string) {
    this.counselorEcharts.setOption(this.counselorAllChartOption, true);
    this.statisticsService.getAllCounselorChart(startDate, endDate).subscribe((allCounselors) => {
      (this.counselorAllChartOption.yAxis as echarts.EChartOption.YAxis).data =
        allCounselors.map((item) => item.user.name);
      this.counselorAllChartOption.series[0].data =
        allCounselors.map((item) => this.percentage(item.homeComing.coming, item.homeComing.sum));
      this.counselorAllChartOption.series[1].data =
        allCounselors.map((item) => this.percentage(item.classComing.coming, item.classComing.sum));
      this.counselorAllChartOption.series[2].data =
        allCounselors.map((item) => this.percentage(item.leave.leave, item.leave.sum));
      this.counselorEcharts.setOption(this.counselorAllChartOption, true);
    });
  }

  getPolylineData(startDate: dayjs.Dayjs, endDate: dayjs.Dayjs) {
    this.polylineEcharts.setOption(this.polylineOption, true);
    (this.polylineOption.xAxis as echarts.EChartOption.XAxis).data = [];
    this.polylineOption.series[0].data = [];
    this.polylineOption.series[1].data = [];
    this.polylineOption.series[2].data = [];

    const allLeaveRequest: Observable<{ index: number, value: Leave }>[] = [];
    const allClassComingRequest: Observable<{ index: number, value: ClassComing }>[] = [];
    const allHomeComingRequest: Observable<{ index: number, value: HomeComing }>[] = [];

    const day = endDate.diff(startDate, 'day') + 1;
    for (let i = 0; i < day; i++) {
      const eachDay = dayjs(startDate).add(i, 'day').format('YYYY-MM-DD');
      (this.polylineOption.xAxis as echarts.EChartOption.XAxis).data.push(eachDay);
      allHomeComingRequest.push(this.statisticsService.getHomeComingChart(eachDay).pipe(map((home) => ({index: i, value: home}))));
      allClassComingRequest.push(this.statisticsService.getClassComingChart(eachDay).pipe(map((clazz) => ({index: i, value: clazz}))));
      allLeaveRequest.push(this.statisticsService.getLeaveChart(eachDay).pipe(map((leave) => ({index: i, value: leave}))));
    }

    merge(...allHomeComingRequest).subscribe((data) => {
      this.add2Array(this.polylineOption.series[0].data as number[], data.index, this.percentage(data.value.coming, data.value.sum));
      this.polylineEcharts.setOption(this.polylineOption, true);
    });
    merge(...allClassComingRequest).subscribe((data) => {
      this.add2Array(this.polylineOption.series[1].data as number[], data.index, this.percentage(data.value.coming, data.value.sum));
      this.polylineEcharts.setOption(this.polylineOption, true);
    });
    merge(...allLeaveRequest).subscribe((data) => {
      this.add2Array(this.polylineOption.series[2].data as number[], data.index, this.percentage(data.value.leave, data.value.sum));
      this.polylineEcharts.setOption(this.polylineOption, true);
    });
  }

  percentage(now: number, sum: number): number {
    if (sum === 0) {
      return 0;
    }
    return Number(((now / sum) * 100).toFixed(2));
  }

  add2Array<T>(data: Array<T>, index: number, value: T): void {
    data.splice(index, 0, value);
  }

  onDateChange(dates: Date[]) {
    const start = dayjs(dates[0]);
    const end = dayjs(dates[1]);
    this.getCounselorAllChart(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
    this.getPolylineData(start, end);
  }

  getGoodWidth(): echarts.EChartsResizeOption {
    if (window.innerWidth < 200) {
      return undefined;
    } else {
      return {width: window.innerWidth - 200};
    }
  }
}
