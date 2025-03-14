import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomTranslateService } from '../../services/custom-translate.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  protected translateService= inject(CustomTranslateService);

 protected Lang: any[]=[];
 protected selectedLang: any;


 ngOnInit(): void {
  this.Lang = [
    { name: 'العربية', code: 'EG' ,lang:'ar'},
    { name: 'English', code: 'US',lang:'en' }
  ];
  this.selectedLang = this.Lang.find(lang => lang.lang === this.translateService.currentLang);
  this.translateService.checkDirection();

 }

  onLanguageChange(event: any) {
    console.log(event)
    const selectedLanguage = event;
    this.translateService.setLanguage(selectedLanguage);
    this.selectedLang = this.Lang.find(lang => lang.lang === selectedLanguage);
  }


}
