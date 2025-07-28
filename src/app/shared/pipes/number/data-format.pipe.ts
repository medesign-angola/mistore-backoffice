import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dataFormat',
    standalone: false
})
export class DataFormatPipe implements PipeTransform {

  transform(value: number, decimals: number = 0): unknown {
      if (value === 0) {
        return '0 Bytes';
      }
      const k = 1024;
      const dm = decimals <= 0 ? 0 : decimals || 2;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(value) / Math.log(k));
      return parseFloat((value / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    
}
