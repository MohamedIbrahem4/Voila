import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
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
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

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
    RouterLink
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  @ViewChild('drawerRef') drawerRef!: Drawer;

  private lastScrollTop = 0;
  private activatedRoute=inject(ActivatedRoute);
  private cd=inject( ChangeDetectorRef);

  protected router=inject(Router);

  protected translateService = inject(CustomTranslateService);
  protected Lang: any[] = [];
  protected selectedLang: any;
  protected isScrollingDown = false;
  protected isAtTop = false;
  protected isMobile = false;
  protected visible: boolean = false;
  protected isArabic = false;
  protected isHomePage: boolean = false;

  ngOnInit(): void {
    this.checkHomePageState();
    this.isArabic= this.translateService.currentLanguage ==='ar';
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

    //check if this home page
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.checkHomePageState();
    });


  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    this.isScrollingDown = scrollTop > this.lastScrollTop;
    this.isAtTop = scrollTop === 0;
  }

  private checkHomePageState(): void {
    let currentRoute = this.activatedRoute;

    // Traverse through all child routes
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    // Check if the final child route is the home route (path: '')
    this.isHomePage = currentRoute.snapshot.routeConfig?.path === '';
    this.cd.markForCheck();
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
