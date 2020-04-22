import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as echarts from 'echarts';

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

  constructor() {
  }

  ngOnInit(): void {
    const option = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      toolbox: {
        feature: {
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          name: '业务指标',
          type: 'gauge',
          detail: {formatter: '{value}%'},
          data: [{value: 50, name: '完成率'}]
        }
      ]
    };

    const echartsRoom = echarts.init(this.echartsRoomElementRef.nativeElement);
    const echartsLeave = echarts.init(this.echartsLeaveElementRef.nativeElement);
    const echartsAttendance = echarts.init(this.echartsAttendanceElementRef.nativeElement);
    this.echartsInstances.push(echartsRoom, echartsLeave, echartsAttendance);
    setInterval(() => {
      option.series[0].data[0].value = Number((Math.random() * 100).toFixed(2));
      echartsRoom.setOption(option, true);
      echartsLeave.setOption(option, true);
      echartsAttendance.setOption(option, true);
      this.echartsInstances.forEach((item) => item.resize());
    }, 2000);

    window.onresize = () => {
      this.echartsInstances.forEach((item) => item.resize());
    };
  }
}
