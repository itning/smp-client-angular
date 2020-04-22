import '@amap/amap-jsapi-types';
import {Component, OnInit} from '@angular/core';
import {load} from '@amap/amap-jsapi-loader';
import {RoomService} from '../../../../service/room.service';
import {DatePipe} from '@angular/common';
import {StudentRoomCheck} from '../../../../entity/StudentRoomCheck';
import {API} from '../../../../api';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';

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
  nowDate: Date;
  nowMarkers: AMap.Marker[] = [];
  isChangeCheckTimeModalVisible = false;
  checkTimeUpdate: Date | null = null;
  nowOpenInfoWindow: AMap.InfoWindow[] = [];

  constructor(private roomService: RoomService,
              private message: NzMessageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.nowDate = new Date(this.roomService.getWhereDay());
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

  getCountShouldRoomCheckData() {
    this.roomService.getCountShouldRoomCheckData(this.roomService.getWhereDay()).subscribe((data) => {
      this.countStudent = data.t1;
      this.countInEffectLeaves = data.t2;
      this.totalStudentNum = this.countStudent - this.countInEffectLeaves;
    });
  }

  getCheckAllData() {
    this.roomService.getCheckAllData(this.roomService.getWhereDay()).subscribe((studentRoomChecks) => {
      this.studentRoomChecks = studentRoomChecks;
      this.initMarker();
    });
  }

  getGpsRangeData() {
    this.roomService.getGPSRange().subscribe((data) => {
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
      this.roomService.updateGPSRange(event.target.toString()).subscribe(() => {
        this.message.success('修改成功');
      });
    });
  }

  initMap() {
    load({
      key: API.aMapKey,
      version: '2.0',
      plugins: ['AMap.PolyEditor']
    }).then((AMap) => {
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
      this.roomService.setWhereDay(this.datePipe.transform(date, 'yyyy-MM-dd'));
      this.nowOpenInfoWindow.forEach((item) => item.close());
      this.getCheckAllData();
      this.getCountShouldRoomCheckData();
    }
  }

  initMarker() {
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
      this.nowOpenInfoWindow.push(infoWindow);
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
    this.roomService.exportCheckData(this.roomService.getWhereDay());
  }

  viewPic() {
    this.roomService.setStudentRoomCheckArray(this.studentRoomChecks);
    this.router.navigate(['/room_pic_view']).catch((error) => console.error(error));
  }
}
