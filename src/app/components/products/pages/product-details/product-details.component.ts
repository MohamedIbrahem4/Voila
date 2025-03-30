import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Product, Review } from '../../types/product';
import { InputNumberModule } from 'primeng/inputnumber';
import { RatingModule } from 'primeng/rating';
import { ImageZoomDirective } from '../../../../shared/dirctives/image-zoom.directive';
import { animate, style, transition, trigger } from '@angular/animations';
import { TabViewModule } from 'primeng/tabview';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { TextareaModule } from 'primeng/textarea';
import { ProductService } from '../../services/product.service';
import { MessageService } from 'primeng/api';
import { CarouselModule } from 'primeng/carousel';
import { TooltipModule } from 'primeng/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomTranslateService } from '../../../../shared/services/custom-translate.service';

@Component({
  selector: 'app-product-details',
  animations: [
    trigger('slideFade', [
      transition(':increment', [
        style({ opacity: 0, transform: 'translateX(100px)' }),
        animate(
          '400ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
      transition(':decrement', [
        style({ opacity: 0, transform: 'translateX(-100px)' }),
        animate(
          '400ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
    ]),
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputNumberModule,
    RatingModule,
    ImageZoomDirective,
    TabViewModule,
    TranslateModule,
    CardModule,
    ReactiveFormsModule,
    TextareaModule,
    CarouselModule,
    TooltipModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('thumbnailContainer') thumbnailContainer!: ElementRef<HTMLElement>;

  private intervalId: any;
  private fb = inject(FormBuilder);
  private productservices = inject(ProductService);
  private messageService = inject(MessageService);
  private route = inject(Router);
  private router = inject(ActivatedRoute);
  private customtranslate = inject(CustomTranslateService);
  private relatedProductsSignal = signal<Product[]>([]);
  private productID!:string;

  protected isAnimating: boolean = false;
  protected productQuantity: number = 1;
  protected ratingvalue: number = 3.5;
  protected isShaking = false;
  protected reviewForm: FormGroup;
  protected reviews: Review[] = [];
  protected product: Product = {} as Product;
  protected isArabic: boolean = false;
  protected relatedProducts = computed(() => this.relatedProductsSignal());

  currentIndex = 0;
  animationState = 0;

  mainImage: string = '';
  shippingMessage: string = 'Free Shipping';
  protected responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '992px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1,
    },
  ];

  constructor() {
    // review form
    this.reviewForm = this.fb.group({
      rating: [null, [Validators.required, Validators.min(1)]],
      comment: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      if(params)
      {
        this.productID = params.get('id')!;
        this.getProuctReview();
        this.getProductDetails();
        this.getRelatedProduct();
        if (this.product?.images?.length) {
          this.mainImage = this.product.images[0];
        }
      }
    });
    // for add cart animation
    this.intervalId = setInterval(() => {
      this.isShaking = true;

      setTimeout(() => {
        this.isShaking = false;
      }, 1000); // Shake duration (adjust if needed)
    }, 7000); // Repeat every 5 seconds

    //to check for arabic or english
    this.isArabic = this.customtranslate.isArabic;
    this.customtranslate.languageChange$.subscribe(Ar=>{
      if(Ar==='ar')
      {
        this.isArabic=true;
      }else
      this.isArabic=false;

    })

  }

  getProductDetails() {
    if (this.productID) {
      this.productservices.getProductDetails(this.productID).subscribe((data) => {
        if (data) this.product = data;
      });
    }
  }
   getRelatedProduct()
   {
    if (this.productID) {
    this.productservices.getRelatedProducts(this.productID).subscribe(data=>{
      this.relatedProductsSignal.set(data);
    })
    }
   }

  getProuctReview() {
    this.reviews;
    this.productservices.getReviewsByProductID(1).subscribe((data) => {
      this.reviews = data;
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  addToCart() {
    // Implement cart logic
    console.log('Added to cart:', this.product);
  }

  openProductDetails(id:number) {
    this.route.navigate(['/productdetails',id]);
  }
  getTruncatedTitle(title: string): string {
    if (!title) return ''; // Handle empty title
    return title.length > 20 ? title.substring(0, 20) + '...' : title;
  }

  // Optional: Add auto-center for active thumbnail
  changeImage(thumbnail: string, newIndex: number) {
    const direction = newIndex > this.currentIndex ? 'right' : 'left';
    this.currentIndex = newIndex;
    this.animationState = newIndex; // Update animation state

    // Update main image after calculating direction
    this.mainImage = thumbnail;

    // Scroll thumbnail container
    const container = this.thumbnailContainer.nativeElement;
    const thumbnailElement = container.children[newIndex] as HTMLElement;

    if (thumbnailElement) {
      const containerWidth = container.offsetWidth;
      const thumbnailLeft = thumbnailElement.offsetLeft;
      const thumbnailWidth = thumbnailElement.offsetWidth;

      container.scrollTo({
        left: thumbnailLeft - (containerWidth - thumbnailWidth) / 2,
        behavior: 'smooth',
      });
    }
  }

  submitReview(): void {
    if (this.reviewForm.valid) {
      const newReview: Review = {
        rating: this.reviewForm.value.rating,
        comment: this.reviewForm.value.comment,
        author: 'mohamed ibrahem',
        productID: 1,
      };
      this.productservices.addReview(newReview).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Review Added ',
          life: 3000,
        });
      });
      this.reviews.unshift(newReview);
      this.reviewForm.reset();
    }
  }
}
