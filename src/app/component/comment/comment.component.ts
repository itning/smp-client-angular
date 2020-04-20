import {Component, Input, OnInit} from '@angular/core';
import {LeaveReason} from '../../entity/LeaveReason';

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

  constructor() {
  }

  ngOnInit(): void {
  }

  wantReply() {
    this.showCommentInput = !this.showCommentInput;
  }
}
