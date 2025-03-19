import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Product } from '../../types/product';
import { InputNumberModule } from 'primeng/inputnumber';
import { RatingModule } from 'primeng/rating';
import { ImageZoomDirective } from '../../../../shared/dirctives/image-zoom.directive';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-product-details',
  animations: [
    trigger('slideFade', [
      transition(':increment', [
        style({ opacity: 0, transform: 'translateX(100px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':decrement', [
        style({ opacity: 0, transform: 'translateX(-100px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputNumberModule,
    RatingModule,
    ImageZoomDirective
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit ,OnDestroy  {
  @ViewChild('thumbnailContainer') thumbnailContainer!: ElementRef<HTMLElement>;

  private intervalId: any;

  protected   isAnimating: boolean = false;
  protected productQuantity: number = 1;
  protected ratingvalue:number=3.5;
  protected   isShaking = false;

  currentIndex = 0;
  animationState = 0;

  mainImage: string = '';
  shippingMessage: string = 'Free Shipping';
  product:Product={
    id: '1',
    name: 'Hydrating Facial Cream',
    price: 25.99,
    description: 'A lightweight, non-greasy cream that deeply hydrates and nourishes the skin.',
    images: [
      '/imgs/dummydata/11_01.png',
      '/imgs/dummydata/11_02.png',
      '/imgs/dummydata/11_04.png',
      '/imgs/dummydata/11_05.png',
      '/imgs/dummydata/12_01.png',
      '/imgs/dummydata/12_02.png',
      '/imgs/dummydata/20_01.png',

    ],

    ingredients: [
      'Hyaluronic Acid',
      'Shea Butter',
      'Vitamin E'
    ],
  } as Product;

  ngOnInit() {
    if (this.product?.images?.length) {
      this.mainImage = this.product.images[0];
    }

    // for add cart animation
    this.intervalId = setInterval(() => {
      this.isShaking = true;

      setTimeout(() => {
        this.isShaking = false;
      }, 1000); // Shake duration (adjust if needed)
    }, 7000); // Repeat every 5 seconds

  }

  ngOnDestroy(): void {
    if(this.intervalId)
    {
      clearInterval(this.intervalId);
    }
  }

  addToCart() {
    // Implement cart logic
    console.log('Added to cart:', this.product);
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
        behavior: 'smooth'
      });
    }
  }



}
