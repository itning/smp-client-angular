import {Pipe, PipeTransform} from '@angular/core';
import {SERVER_HOST} from '../api';

@Pipe({
  name: 'roomCheckPicSrc'
})
export class RoomCheckPicSrcPipe implements PipeTransform {

  transform(id: string, filenameExtension: string, isFace = false): string {
    if (isFace) {
      return `${SERVER_HOST}/room/face_image/${id}`;
    } else {
      return `${SERVER_HOST}/room/check_image/${id}.${filenameExtension}`;
    }
  }
}
