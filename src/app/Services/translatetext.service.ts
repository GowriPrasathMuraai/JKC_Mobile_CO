import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslatetextService {
  constructor(public translateService: TranslateService) {}

  getTranslatedText(text: string): string {
    let translatedText = '';
    this.translateService.get(text).subscribe((result) => {
      translatedText = result;
    });
    return translatedText;
  }
}
