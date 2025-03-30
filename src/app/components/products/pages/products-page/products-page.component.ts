import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../types/product';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { TranslateModule } from '@ngx-translate/core';
import { CustomTranslateService } from '../../../../shared/services/custom-translate.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-page',
  imports: [
    CommonModule,
    FormsModule,
    CardModule ,
    ButtonModule ,
    TagModule ,
    RatingModule ,
    CardModule ,
    TranslateModule,
    RouterLink

  ],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent implements OnInit{
addToCart(_t5: Product) {
throw new Error('Method not implemented.');
}
private productservices=inject(ProductService);
private customtranslate = inject(CustomTranslateService);
private router = inject(ActivatedRoute);
private categoryID:string='';

 protected products = signal<Product[]>([]);
 protected visibleProducts: Product[] = [];
 protected itemsPerPage = 10;
 protected currentPage = 1;
 protected showLoadMore = true;
 protected responsiveColumns = [
  { breakpoint: '1024px', numCols: 4 },
  { breakpoint: '768px', numCols: 2 },
  { breakpoint: '560px', numCols: 1}
];
protected isArabic: boolean = false;

ngOnInit(): void {
this.isArabic = this.customtranslate.isArabic;
this.customtranslate.languageChange$.subscribe(Ar=>{
  if(Ar==='ar')
  {
    this.isArabic=true;
  }else
  this.isArabic=false;

})
this.router.paramMap.subscribe(params => {
  if(params)
  {
this.categoryID = params.get('category')!;
this.loadProducts(this.categoryID);

    }

});



}
loadProducts(cat:string) {
  this.productservices.getProductByCategory(cat).subscribe(data=>{
    this.products.set(data);
  })
}

}
