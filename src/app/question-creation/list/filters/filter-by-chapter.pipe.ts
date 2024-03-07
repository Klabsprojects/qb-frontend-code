import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByChapter',
})

export class FilterByChapterPipe implements PipeTransform{
    transform(items: any[], chapterFilter: string | null): any[] {
        if (!chapterFilter) {
          return items;
        }
    return items.filter(item => item.chapter.toLowerCase().includes(chapterFilter.toLowerCase()));
    }
}