import {Role} from './Role';
import {StudentUser} from './StudentUser';

export class User {
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
   * 创建时间
   */
  studentUser: StudentUser;
  /**
   * 创建时间
   */
  gmtCreate: string;
  /**
   * 更新时间
   */
  gmtModified: string;
}
