import {User} from './User';

export class LeaveReason {
  /**
   * ID
   */
  id: string;
  /**
   * 评论
   */
  comment: string;
  /**
   * 评论用户ID
   */
  fromUser: User;
  /**
   * 创建时间
   */
  gmtCreate: string;
  /**
   * 更新时间
   */
  gmtModified: string;
}
