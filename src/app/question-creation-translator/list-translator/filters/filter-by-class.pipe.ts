// filter-by-name.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByClassTranslator',
})
export class FilterByClassTranslatorPipe implements PipeTransform {
  transform(items: any[], classFilter: string | null): any[] {
    console.log("classFilter",classFilter)
    if (!classFilter) {
      return items;
    }

    // return items.filter(item => item.name.toLowerCase().includes(classFilter.toLowerCase()));
    return items.filter(item => item.class.toLowerCase().includes(classFilter.toLowerCase()));
  }
}
