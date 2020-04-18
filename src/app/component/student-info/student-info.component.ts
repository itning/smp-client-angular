import {Component, Input, OnInit} from '@angular/core';
import {StudentUser} from '../../entity/StudentUser';
import {ApartmentService} from '../../service/apartment.service';
import {Apartment} from '../../entity/Apartment';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {
  @Input()
  data: StudentUser;
  // 电话正则
  readonly telReg = /^[1]([3-9])[0-9]{9}$/;
  // 邮箱正则
  readonly emailReg = /^([A-Za-z0-9_\-.\u4e00-\u9fa5])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,8})$/;
  readonly ethnicRangeData = ['汉', '蒙古', '回', '藏', '维吾尔', '苗', '彝', '壮', '布依', '朝鲜', '满', '侗', '瑶', '白', '土家',
    '哈尼', '哈萨克', '傣', '黎', '傈僳', '佤', '畲', '高山', '拉祜', '水', '东乡', '纳西', '景颇', '柯尔克孜',
    '土', '达斡尔', '仫佬', '羌', '布朗', '撒拉', '毛南', '仡佬', '锡伯', '阿昌', '普米', '塔吉克', '怒', '乌孜别克',
    '俄罗斯', '鄂温克', '德昂', '保安', '裕固', '京', '塔塔尔', '独龙', '鄂伦春', '赫哲', '门巴', '珞巴', '基诺'];
  readonly politicalRangeData = ['中共党员', '中共预备党员', '共青团员', '民革党员', '民盟盟员', '民建会员', '民进会员', '农工党党员',
    '致公党党员', '九三学社社员', '台盟盟员', '无党派人士', '群众'];
  apartmentData: Apartment[] = [];
  apartmentDataWithKeyValue: { key: string, value: string }[] = [];

  constructor(private apartmentService: ApartmentService) {
  }

  ngOnInit(): void {
    this.apartmentService.getAllApartment().subscribe((apartments) => {
      console.log(apartments);
      this.apartmentData = apartments;
      this.apartmentDataWithKeyValue = this.apartmentData.map(item => ({key: item.id, value: item.name}));
    });
  }

  onValueChange(data: { key: string; value: string }) {
    console.log(data);
  }
}
