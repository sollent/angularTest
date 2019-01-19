import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sollentoFilter'
})

export class FilterPipe implements PipeTransform {
  transform(items: any, value: string, field: string): any {
    if (items.length === 0 || !value) {
      return items;
    }

    return items.filter((i) => {

      const c = Object.assign({}, i);

      if (!isNaN(c[field])) {
        c[field] += '';
      }
      if (field === 'type') {
        c[field] = c[field] === 'income' ? 'доход' : 'расход';
      }
      return c[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }

}
