import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { CustomTranslateService } from '../../services/custom-translate.service';
import { TranslatePipe } from '@ngx-translate/core';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { StyleClass } from 'primeng/styleclass';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-nav-bar',
  imports: [
    CommonModule,
    SelectModule,
    FormsModule,
    InputTextModule,
    TranslatePipe,
    DrawerModule,
    ButtonModule,
    AvatarModule,
    TagModule,
    Ripple,
    StyleClass,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  @ViewChild('drawerRef') drawerRef!: Drawer;

  protected translateService = inject(CustomTranslateService);
  private lastScrollTop = 0;

  protected Lang: any[] = [];
  protected selectedLang: any;
  protected isScrollingDown = false;
  protected isAtTop = false;
  protected isMobile = false;
  protected visible: boolean = false;
  protected isArabic = false;

  ngOnInit(): void {
    this.isArabic= this.translateService.currentLanguage ==='ar';
   console.log(this.translateService.currentLanguage ==='ar')
   this.translateService.languageChange$.subscribe((lang)=>{
    if(lang==='ar')
    {
      this.isArabic=true;
    }else{
      this.isArabic=false;
    }
   })
    // Set default language to English
    this.selectedLang = this.Lang.find(
      (lang) => lang.lang === this.translateService.currentLang
    );
    this.translateService.checkDirection();
    this.isMobile = window.innerWidth < 768;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    this.isScrollingDown = scrollTop > this.lastScrollTop;
    this.isAtTop = scrollTop === 0;
  }

  onLanguageChange(event: any) {
    const selectedLanguage = event;
    this.translateService.setLanguage(selectedLanguage);
    this.selectedLang = this.Lang.find(
      (lang) => lang.lang === selectedLanguage
    );
  }
  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }
}
