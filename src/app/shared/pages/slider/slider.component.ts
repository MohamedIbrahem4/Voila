import {
  animate,
  AnimationBuilder,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { CustomTranslateService } from '../../services/custom-translate.service';

@Component({
  selector: 'app-slider',
  imports: [CommonModule,
    TranslateModule
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  animations: [
    // Main Slide Animation
    trigger('slideAnimation', [
      state(
        'inactive',
        style({ display: 'none', opacity: 0, transform: 'translateY(0%) ' })
      ),
      state(
        'active',
        style({
          display: 'flex',
          opacity: 1,
          transform: 'translateX(0) scale(1)',
        })
      ),

      transition('inactive => active', [
        // Slide in and fade in

        style({ display: 'flex', opacity: 0 }), // Make it visible but transparent at start
        animate(
          '1500ms ease-in',
          style({ opacity: 1, transform: 'translate(0%) ' })
        ),
        // animate('1500ms ease-out', style({ opacity: 1 })),
      ]),

      // Transition from 'active' to 'inactive'
      transition('active => inactive', [
        // Slide out and fade out
        animate(
          '3000ms ease-out',
          style({ opacity: 0, transform: 'translate(0%) ' })
        ),
        style({ display: 'none' }), // Set display to none after fade-out
      ]),
    ]),
    trigger('fadeInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX({{ start }}px)' }),
        animate('{{ duration }}ms {{ easing }}',
          style({ opacity: 1, transform: 'translateX(0)' })
        )
      ], { params: { duration: 1200, start: -100, easing: 'ease-out' } }),

      transition(':leave', [
        animate('800ms ease-in',
          style({ opacity: 0, transform: 'translateX(50px)' }) // Move right while fading out
        )
      ])
    ]),

    trigger('fadeInRight', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateX({{ start }}px)' }),
        animate('{{ duration }}ms {{ easing }}',
          style({ opacity: 1, transform: 'translateX(0)' })
        )
      ], { params: { duration: 1000, start: 100, easing: 'ease-in-out' } }),

      transition(':leave,* => *', [
        animate('1200ms ease-out',
          style({ opacity: 0, transform: 'translateX(-100px)' }) // Moves left while fading out
        )
      ])
    ]),



  ],
})
export class SliderComponent implements OnInit, OnDestroy {
  private intervalId: any;
  private cdr = inject(ChangeDetectorRef);

  protected translateservice=inject(CustomTranslateService);
  protected currentSlide = 0;
  protected animationState = 0;
  protected animationTrigger:boolean=true;
  protected slides = [
    {
      id: 1,
      img: 'imgs/slider/1.jpg',
      title: 'Hydrating Serum',
      description1: 'slider.s1.title1',
      description2: 'slider.s1.title2',
      btn: 'slider.s1.btn',
    },
    {
      id: 2,
      img: 'imgs/slider/2.jpg',
      title: 'Gentle Cleanser',
      description1: 'slider.s2.title1',
      description2: 'slider.s2.title2',
      btn: 'slider.s2.btn',
    },
    {
      id: 3,
      img: 'imgs/slider/3.jpg',
      title: 'Anti-Aging Cream',
      description1: 'slider.s3.title1',
      description2: 'slider.s3.title2',
      btn: 'slider.s3.btn',
    },
  ];


  get firstText() {
    return this.translateservice.isArabic
      ? { duration: 5000, start: 150, easing: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)' }
      : { duration: 5000, start: -150, easing: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)' };
  }
  get secondText() {
    return this.translateservice.isArabic
      ? { duration: 6500, start: 200, easing: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)' }
      : { duration: 6500, start: -200, easing: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)' };
  }
  get btnAnimation() {
    return this.translateservice.isArabic
      ? { duration: 7000, start: 250, easing: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)' }
      : { duration: 7000, start: -250, easing: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)' };
  }


  ngOnDestroy(): void {
    this.stopAutoSlide();
  }
  ngOnInit(): void {
    this.startAutoSlide();
    //  Aos.init( );
  }
  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 15000);
  }
  stopAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.cdr.detectChanges(); // Forces Angular to update

    // 🔥 Force Animation Restart
    this.animationState = -1;

    setTimeout(() => {
      this.animationState = this.currentSlide + Math.random(); // Ensure a unique number
      this.cdr.detectChanges();

    }, 10); // Small delay ensures Angular detects the change

  }
  callUs() {
    window.location.href = 'tel:+201205285555';
  }
}
