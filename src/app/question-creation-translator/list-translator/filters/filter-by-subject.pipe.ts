// filter-by-name.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBySubjectTranslator',
})
export class FilterBySubjectTranslatorPipe implements PipeTransform {
  transform(items: any[], subjectFilter: string | null): any[] {
    if (!subjectFilter) {
      return items;
    }

    // return items.filter(item => item.name.toLowerCase().includes(classFilter.toLowerCase()));
    return items.filter(item => item.subject.toLowerCase().includes(subjectFilter.toLowerCase()));
  }
}
