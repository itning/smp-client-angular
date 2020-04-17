import {Role} from './Role';
import {Apartment} from './Apartment';

export class StudentUser {
  /**
   * 用户ID
   */
  id: string;
  /**
   * 用户姓名
   */
  name: string;
  /**
   * 电话
   */
  tel: string;
  /**
   * 邮箱
   */
  email: string;
  /**
   * 用户名
   */
  username: string;
  /**
   * 角色
   */
  role: Role;
  /**
   * 出生日期
   */
  birthday: string;
  /**
   * 性别（true 男； false 女）
   */
  sex: boolean;
  /**
   * 年龄
   */
  age: number;
  /**
   * 学号
   */
  studentId: string;
  /**
   * 该学生所属辅导员的ID
   */
  belongCounselorId: string;
  /**
   * 身份证号
   */
  idCard: string;
  /**
   * 政治面貌
   */
  politicalStatus: string;
  /**
   * 民族
   */
  ethnic: string;
  /**
   * 公寓信息
   */
  apartment: Apartment;
  /**
   * 寝室号
   */
  roomNum: string;
  /**
   * 床号
   */
  bedNum: string;
  /**
   * 家庭地址
   */
  address: string;
  /**
   * 创建时间
   */
  gmtCreate: string;
  /**
   * 更新时间
   */
  gmtModified: string;
}
