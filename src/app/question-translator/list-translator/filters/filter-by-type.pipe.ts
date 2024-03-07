// filter-by-name.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByTypeTranslator',
})
export class FilterByTypePipeTranslatorPipe implements PipeTransform {
  transform(items: any[], levelFilter: string | null): any[] {
    if (!levelFilter) {
      return items;
    }

    // return items.filter(item => item.name.toLowerCase().includes(classFilter.toLowerCase()));
    return items.filter(item => item.type.toLowerCase().includes(levelFilter.toLowerCase()));
  }
}
