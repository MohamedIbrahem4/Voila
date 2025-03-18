import { Component, inject, OnInit } from '@angular/core';
import { SliderComponent } from '../../../../shared/pages/slider/slider.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CustomTranslateService } from '../../../../shared/services/custom-translate.service';
import Aos from 'aos';
import { HomeService } from '../../services/home.service';
import { CarouselModule } from 'primeng/carousel';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [SliderComponent, CommonModule, TranslateModule,
    CarouselModule,
    RatingModule,
    FormsModule,
    ButtonModule,
    TooltipModule,

  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  private   route =inject(Router);

  protected translate = inject(CustomTranslateService);
  protected homeservices = inject(HomeService);
  protected isMobile=false;
  protected category: any[] = [];
  protected hoveredProduct: number | null = null;
  protected products:any[]=[];



  protected responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '992px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    }
  ];


  ngOnInit(): void {
    Aos.init();
    this.category=this.homeservices.categories;
    this.products=this.homeservices.products;
    this.isMobile = window.innerWidth < 768;
    window.addEventListener('resize', () => {
    this.isMobile = window.innerWidth <= 768;
    });

  }
  Categorydetails(arg0: any) {
    throw new Error('Method not implemented.');
  }
  addToCart(product: any) {
    // Implement cart logic
    console.log('Added to cart:', product);
  }
  getTruncatedTitle(title: string): string {
    if (!title) return ''; // Handle empty title
    return title.length > 20 ? title.substring(0, 20) + '...' : title;
  }
  openProductDetails()
  {
    this.route.navigate(['/products/productdetails'])
  }

}
