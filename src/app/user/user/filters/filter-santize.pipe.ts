import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeHtmluser',
})
export class SanitizeHtmlUserPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(html: string): SafeHtml {
    console.log('html',html)
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}