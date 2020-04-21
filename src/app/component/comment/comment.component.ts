import {Component, Input, OnInit} from '@angular/core';
import {LeaveReason} from '../../entity/LeaveReason';
import {NzMessageService} from 'ng-zorro-antd';
import {LeaveService} from '../../service/leave.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input()
  leaveReasons: LeaveReason[];
  @Input()
  id: string;
  @Input()
  canReply = true;
  showCommentInput = false;
  replyValue: string;

  constructor(private message: NzMessageService,
              private leaveService: LeaveService) {
  }

  ngOnInit(): void {
  }

  wantReply() {
    this.showCommentInput = !this.showCommentInput;
  }

  onReply() {
    if (this.replyValue && this.replyValue.trim() !== '') {
      this.leaveService.newComment(this.id, this.replyValue.trim()).subscribe((leaveReason) => {
        this.leaveReasons.unshift(leaveReason);
        this.message.success('评论成功');
      });
      this.replyValue = undefined;
    } else {
      this.message.error('请输入评论内容');
    }
  }
}
