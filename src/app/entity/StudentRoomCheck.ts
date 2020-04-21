import {User} from './User';

export class StudentRoomCheck {
  /**
   * ID
   */
  id: string;
  /**
   * 学生
   */
  user: User;
  /**
   * 签到时间
   */
  checkTime: string;
  /**
   * 经度
   */
  longitude: number;
  /**
   * 纬度
   */
  latitude: number;
  /**
   * 文件扩展名
   */
  filenameExtension: string;
  /**
   * 打卡时的人脸相似度
   */
  checkFaceSimilarity: number;
  /**
   * 创建时间
   */
  gmtCreate: string;
  /**
   * 更新时间
   */
  gmtModified: string;
}
