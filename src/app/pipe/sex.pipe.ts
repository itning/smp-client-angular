import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sex'
})
export class SexPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? '男' : '女';
  }
}
