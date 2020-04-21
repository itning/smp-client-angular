import '@amap/amap-jsapi-types';
import {Component, OnInit} from '@angular/core';
import {load} from '@amap/amap-jsapi-loader';
import {RoomService} from '../../../../service/room.service';
import {DatePipe} from '@angular/common';
import {StudentRoomCheck} from '../../../../entity/StudentRoomCheck';
import {API} from '../../../../api';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  checkTime: string;
  checkTimeMilliseconds: number;
  datePipe = new DatePipe('zh-Hans');
  totalStudentNum = 0;
  countStudent = 0;
  countInEffectLeaves = 0;
  studentRoomChecks: StudentRoomCheck[] = [];
  polyEditor: any;
  map: any;
  polygon: any;
  AMap: any;
  nowDate = new Date();
  nowMarkers: AMap.Marker[] = [];
  isChangeCheckTimeModalVisible = false;
  checkTimeUpdate: Date;
  whereDay: string;

  constructor(private roomService: RoomService,
              private message: NzMessageService) {
  }

  ngOnInit(): void {
    this.whereDay = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.getCheckDateData();
    this.getCountShouldRoomCheckData();
    this.initMap();
  }

  getCheckDateData() {
    this.roomService.getCheckDateData().subscribe((dateString) => {
      const date = new Date(dateString);
      this.checkTimeUpdate = date;
      this.checkTimeMilliseconds = new Date().setHours(date.getHours(), date.getMinutes(), 0, 0);
      this.checkTime = dateString;
    });
  }

  getCountShouldRoomCheckData(date: string = this.datePipe.transform(new Date(), 'yyyy-MM-dd')) {
    this.roomService.getCountShouldRoomCheckData(date).subscribe((data) => {
      console.log('获取学生打卡统计数据成功');
      this.countStudent = data.t1;
      this.countInEffectLeaves = data.t2;
      this.totalStudentNum = this.countStudent - this.countInEffectLeaves;
    });
  }

  getCheckAllData(date: string = this.datePipe.transform(new Date(), 'yyyy-MM-dd')) {
    this.roomService.getCheckAllData(date).subscribe((studentRoomChecks) => {
      console.log('获取学生寝室打卡数据成功');
      this.studentRoomChecks = studentRoomChecks;
      this.initMarker();
    });
  }

  getGpsRangeData() {
    this.roomService.getGPSRange().subscribe((data) => {
      console.log('获取打卡范围数据成功');
      const path: any = data;
      this.polygon = new this.AMap.Polygon({
        path,
        strokeColor: '#FF33FF',
        strokeWeight: 6,
        strokeOpacity: 0.2,
        fillOpacity: 0.4,
        fillColor: '#1791fc',
        zIndex: 50,
      });
      this.map.add(this.polygon);
      this.map.setFitView();
      console.log('初始化范围标记成功');
      this.initPolyEditor();
    });
  }

  setFitView(isPolygon: boolean) {
    if (isPolygon) {
      this.map?.setFitView([this.polygon]);
    } else {
      this.map?.setFitView();
    }
  }

  initPolyEditor() {
    // noinspection TypeScriptUnresolvedFunction
    this.polyEditor = new this.AMap.PolyEditor(this.map, this.polygon);

    this.polyEditor.on('end', (event: Event) => {
      console.log('触发事件： end ' + event.target);
      this.roomService.updateGPSRange(event.target.toString()).subscribe(() => {
        this.message.success('修改成功');
      });
    });
    console.log('初始化范围编辑插件成功');
  }

  initMap() {
    load({
      key: API.aMapKey,
      version: '2.0',
      plugins: ['AMap.PolyEditor']
    }).then((AMap) => {
      console.log('初始化地图成功');
      this.AMap = AMap;
      this.map = new AMap.Map('map-container', {
        resizeEnable: true, // 是否监控地图容器尺寸变化
        center: [127.21220960201039, 45.74218945848489],
        zoom: 15
      });
      this.getGpsRangeData();
      this.getCheckAllData();
    }).catch(e => {
      console.error(e);
    });
  }

  handleDateChange(date: Date) {
    if (date) {
      this.whereDay = this.datePipe.transform(date, 'yyyy-MM-dd');
      this.getCheckAllData(this.whereDay);
      this.getCountShouldRoomCheckData(this.whereDay);
    }
  }

  initMarker() {
    console.log('开始初始化点标记');
    this.nowMarkers.forEach((item) => item.clearEvents('click'));
    this.map.remove(this.nowMarkers);
    this.studentRoomChecks.forEach((item) => {
      const marker = new this.AMap.Marker({
        map: this.map,
        position: [item.longitude, item.latitude],
        topWhenClick: true,
        extData: item,
        animation: 'AMAP_ANIMATION_DROP',
      });
      this.setOnMouseClickMarker(marker);
      this.nowMarkers.push(marker);
    });
    console.log('初始化点标记成功');
  }

  setOnMouseClickMarker(marker: AMap.Marker) {
    marker.on('click', (e) => {
      const position = e.target.getPosition();
      const data: StudentRoomCheck = e.target.getExtData();
      const infoWindow = new AMap.InfoWindow({
        content: `
<p>学号：${data.user.studentUser.studentId}</p>
<p>姓名：${data.user.name}</p>
<p>公寓：${data.user.studentUser.apartment.name}</p>
<p>打卡时间：${this.datePipe.transform(data.checkTime, 'yyyy-MM-dd HH:mm:ss')}</p>
`,
        offset: new AMap.Pixel(1, -30)
      });
      infoWindow.open(this.map, position, 100);
    });
  }

  handleChangeCheckTime() {
    this.isChangeCheckTimeModalVisible = false;
    if (this.checkTimeUpdate) {
      this.roomService.updateCheckDate(this.datePipe.transform(this.checkTimeUpdate, 'HH:mm')).subscribe(() => {
        this.message.success('修改成功');
        this.getCheckDateData();
      });
    }
  }

  exportCheckData() {
    this.roomService.exportCheckData(this.whereDay);
  }
}
