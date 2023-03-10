import { Pipe, PipeTransform } from '@angular/core';
import { Stops } from '../constants/Stops';

@Pipe({
  name: 'enumToArray',
})
export class EnumToArrayPipe implements PipeTransform {
  stop = Stops;
  transform(data: object, start: number, end: number) {
    var list = [];
    if (typeof end == 'string') {
      end = Number(Stops[end]);
    }

    for (var i = 1; i <= 10; i++) {
      if (i > start && i < end) {
        var temp = Stops[i];
        list.push(temp);
      }
    }
    return list;
  }
}
