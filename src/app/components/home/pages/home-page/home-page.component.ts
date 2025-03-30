import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../products/services/product.service';
import { Product } from '../../../products/types/product';

@Component({
  selector: 'app-home-page',
  imports: [SliderComponent, CommonModule, TranslateModule,
    CarouselModule,
    RatingModule,
    FormsModule,
    ButtonModule,
    TooltipModule,
    RouterLink

  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  private   route =inject(Router);
  private productservices = inject(ProductService);
  private products=signal<Product[]>([]);

  protected translate = inject(CustomTranslateService);
  protected homeservices = inject(HomeService);
  protected isMobile=false;
  protected category: any[] = [];
  protected hoveredProduct: number | null = null;
  protected bestProduct=computed(()=>this.products());


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
    this.isMobile = window.innerWidth < 768;
    window.addEventListener('resize', () => {
    this.isMobile = window.innerWidth <= 768;
    });
    this.getBestProduct();

  }
  getBestProduct()
  {
    this.productservices.getBestRatedProducts().subscribe((data)=>{
      this.products.set(data);
    })
  }
  Categorydetails(arg0: any) {
    throw new Error('Method not implemented.');
  }
  addToCart(product: any) {
    // Implement cart logic
    this.route.navigate(['/products/productdetails'])
  }
  getTruncatedTitle(title: string): string {
    if (!title) return ''; // Handle empty title
    return title.length > 20 ? title.substring(0, 20) + '...' : title;
  }
  openProductDetails(id:number)
  {
    this.route.navigate(['/productdetails',id])
  }

}
