import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-input-edit',
  templateUrl: './input-edit.component.html',
  styleUrls: ['./input-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputEditComponent implements OnInit {
  @Input()
  key: string; // 键
  @Input()
  value: string; // 值
  @Input()
  name: string; // 名称
  @Input()
  nullable = false; // 用户输入的值允许为空
  @Input()
  mustInteger = false; // 用户输入的数据必须是整数
  @Input()
  regular: RegExp = null; // 用户的输入必须通过的正则
  @Input()
  regularErrorMessage = '您的输入有误'; // 用户的输入未通过正则验证时的消息
  @Input()
  inputRange: string[] = []; // 输入范围（用户只能输入数组中的值）
  @Input()
  inputRangeObject: { key: string, value: string }[] = []; // 输入范围（用户只能输入数组中value的值）
  @Output()
  valueChange = new EventEmitter<{ key: string, value: string }>();
  isInputDisabled = true;

  constructor(private message: NzMessageService) {
  }

  ngOnInit(): void {
  }

  verificationInputValue(): boolean {
    const value = this.value;
    // 验证是否为空
    if (!this.nullable && value.trim() === '') {
      this.message.error('输入不能为空');
      return false;
    }
    // 验证整数
    if (this.mustInteger && !(/^[\d]+$/.test(value))) {
      this.message.error('您只能输入整数');
      return false;
    }
    // 验证正则
    if (this.regular && !(this.regular.test(value))) {
      this.message.error(this.regularErrorMessage);
      return false;
    }
    // 验证固定值
    if (this.inputRange.length !== 0 && !this.inputRange.includes(value)) {
      this.message.error(`您只能输入以下固定值：${this.inputRange}`);
      return false;
    }
    return true;
  }

  onSave() {
    if (this.verificationInputValue()) {
      this.isInputDisabled = true;
      this.valueChange.emit({key: this.key, value: this.value});
    }
  }
}
