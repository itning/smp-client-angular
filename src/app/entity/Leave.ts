import {StudentUser} from './StudentUser';
import {LeaveType} from './LeaveType';
import {LeaveReason} from './LeaveReason';

export class Leave {
  /**
   * ID
   */
  id: string;
  /**
   * 学生
   */
  studentUser: StudentUser;
  /**
   * 请假开始时间
   */
  startTime: string;
  /**
   * 请假结束时间
   */
  endTime: string;
  /**
   * 请假类型
   */
  leaveType: LeaveType;
  /**
   * 请假原因
   */
  reason: string;
  /**
   * 审核状态（true 通过；false 未通过）
   */
  status: boolean;
  /**
   * 评论
   */
  leaveReasonList: LeaveReason[];
  /**
   * 创建时间
   */
  gmtCreate: string;
  /**
   * 更新时间
   */
  gmtModified: string;
}
