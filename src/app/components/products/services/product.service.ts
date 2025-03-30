import { Injectable, signal } from '@angular/core';
import { Product, Review } from '../types/product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _reviews = signal<Review[]>(dummyreviews());
  private _product = signal<Product[]>(dummyProducts());


  constructor() { }

  getProductByCategory(category:string)
  {
    return of(this._product().filter(product=>product.category ===category));
  }
  getProductDetails(id:string)
  {
    return of(this._product().find(product=>product.id===id));
  }


  getReviewsByProductID(productID: number) {
    return of(this._reviews().filter(review => review.productID === productID));
  }

  //best product
  getBestRatedProducts() {
    return of([...this._product()]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10));
  }

  //related products
  getRelatedProducts(productId: string) {
    const currentProduct = this._product().find(p => p.id === productId);
    if (!currentProduct) return of([]);

    return of(this._product()
      .filter(p =>
        p.category === currentProduct.category &&
        p.id !== productId
      )
      .slice(0, 6));
  }


  addReview(newReview: Review): Observable<Review[]> {
    return new Observable((observer) => {
      this._reviews.update(reviews => [...reviews, newReview]); // Efficient update
      observer.next(this._reviews()); // Emit the new list
      observer.complete();
    });
  }




}


function dummyreviews() :Review[] {
  return [
    {
      productID: 1,
      rating: 5,
      comment: "Amazing product! The quality is excellent, and the scent lasts all day.",
      author: "Ahmed Ali"
    },
    {
      productID: 1,
      rating: 4,
      comment: "Very nice fragrance, but the bottle could be bigger.",
      author: "Sarah Mohamed"
    },
    {
      productID: 2,
      rating: 3,
      comment: "Good scent, but it fades faster than expected.",
      author: "Omar Hassan"
    },
    {
      productID: 3,
      rating: 5,
      comment: "Loved it! Will definitely buy again.",
      author: "Nour El-Din"
    },
    {
      productID: 2,
      rating: 2,
      comment: "Not what I expected. The scent is too strong for my liking.",
      author: "Mariam Khaled"
    },
    {
      productID: 1,
      rating: 4,
      comment: "Decent perfume for the price. The packaging is also nice.",
      author: "Hassan Youssef"
    }
  ];
}
function dummyProducts():Product[]{
  return  [
    {
      id: "1",
      nameEn: "Herbal Shampoo",
      category: "hair",
      nameAr: "شامبو عشبي",
      price: 120,
      oldPrice: 150,
      descriptionEn: "A natural herbal shampoo for strong and shiny hair.",
      descriptionAr: "شامبو عشبي طبيعي لشعر قوي ولامع.",
      images: ['imgs/dummydata/11_01.png',
      'imgs/dummydata/11_02.png',
      'imgs/dummydata/11_04.png',
      'imgs/dummydata/11_05.png',],
      ingredientsEn: "Aloe Vera, Argan Oil, Keratin",
      ingredientsAr: "الصبار، زيت الأرغان، الكيراتين",
      usageEn: "Apply on wet hair, massage gently, and rinse.",
      usageAr: "يوضع على الشعر المبلل، يدلك بلطف ثم يشطف.",
      size: 250,
      rating: 4.5,
      inStock: true,
      review: [{ productID: 1, rating: 5, comment: "Great shampoo, makes my hair so smooth!", author: "Sarah" }]
    },
    {
      id: "2",
      category: "hair",
      nameEn: "Argan Oil Serum",
      nameAr: "سيروم زيت الأرغان",
      price: 200,
      descriptionEn: "A nourishing serum enriched with argan oil.",
      descriptionAr: "سيروم مغذي غني بزيت الأرغان.",
      images: ['imgs/dummydata/4_03.png',
        'imgs/dummydata/4_05.png',
        ],
        ingredientsEn: "Argan Oil, Vitamin E",
      ingredientsAr: "زيت الأرغان، فيتامين E",
      usageEn: "Apply a few drops on damp hair.",
      usageAr: "يُوضع بضع قطرات على الشعر المبلل.",
      size: 100,
      rating: 4.8,
      inStock: true,
      review: [{ productID: 2, rating: 4, comment: "Good quality but a bit expensive.", author: "Ahmed" }],
    },
    {
      id: "3",
      category: "skin",
      nameEn: "Rose Water Toner",
      nameAr: "تونر ماء الورد",
      price: 90,
      oldPrice: 110,
      descriptionEn: "A refreshing toner with pure rose water.",
      descriptionAr: "تونر منعش بماء الورد النقي.",
      images: ['imgs/dummydata/5_01.png',
        'imgs/dummydata/5_05.png',
        ],
      ingredientsEn: "Rose Water, Witch Hazel",
      ingredientsAr: "ماء الورد، بندق الساحرة",
      usageEn: "Spray on face for hydration.",
      usageAr: "يرش على الوجه للترطيب.",
      size: 150,
      rating: 4.7,
      inStock: true,
      review: [{ productID: 3, rating: 5, comment: "Best toner I've used!", author: "Lina" }]
    },
    {
      id: "4",
      category: "skin",
      nameEn: "Vitamin C Serum",
      nameAr: "سيروم فيتامين سي",
      price: 250,
      descriptionEn: "Brightening serum with Vitamin C and Hyaluronic Acid.",
      descriptionAr: "سيروم تفتيح بفيتامين سي وحمض الهيالورونيك.",
      images: ['imgs/dummydata/9_01.png',
        'imgs/dummydata/9_03.png',
        ],
      ingredientsEn: "Vitamin C, Hyaluronic Acid",
      ingredientsAr: "فيتامين سي، حمض الهيالورونيك",
      usageEn: "Apply a few drops on clean skin.",
      usageAr: "يُوضع بضع قطرات على البشرة النظيفة.",
      size: 50,
      rating: 4.9,
      inStock: true,
      review: [{ productID: 4, rating: 5, comment: "Amazing glow after using this!", author: "Nadia" }]
    },
    {
      id: "5",
      category: "skin",
      nameEn: "Charcoal Face Mask",
      nameAr: "قناع الفحم للوجه",
      price: 180,
      oldPrice: 210,
      descriptionEn: "Deep cleansing charcoal mask for smooth skin.",
      descriptionAr: "قناع الفحم لتنظيف عميق للبشرة الملساء.",
      images: ['imgs/dummydata/10_01.png',
        'imgs/dummydata/10_03.png',
        'imgs/dummydata/10_05.png'
        ],
      ingredientsEn: "Activated Charcoal, Kaolin Clay",
      ingredientsAr: "فحم منشط، طين الكاولين",
      usageEn: "Apply a thin layer, let dry, then rinse.",
      usageAr: "يُوضع طبقة رقيقة، يُترك ليجف ثم يُشطف.",
      size: 100,
      rating: 4.6,
      inStock: true,
      review: [{ productID: 5, rating: 4, comment: "Feels great but drying if overused.", author: "Omar" }]
    },
    {
      id: "6",
      category: "skin",
      nameEn: "Aloe Vera Moisturizer",
      nameAr: "مرطب الصبار",
      price: 150,
      oldPrice: 180,
      descriptionEn: "Soothing moisturizer with pure aloe vera extract",
      descriptionAr: "مرطب مهدئ مع مستخلص الصبار النقي",
      images: ['imgs/dummydata/12_01.png',
        'imgs/dummydata/12_02.png',
        ],
      ingredientsEn: "Aloe Vera, Shea Butter, Vitamin E",
      ingredientsAr: "الصبار، زبدة الشيا، فيتامين E",
      usageEn: "Apply daily on clean face and neck",
      usageAr: "يوضع يوميًا على الوجه والرقبة النظيفة",
      size: 200,
      rating: 4.7,
      inStock: true,
      review: [{ productID: 6, rating: 5, comment: "Perfect for sensitive skin!", author: "Fatima" }]
    },
    {
      id: "7",
      nameEn: "Tea Tree Face Wash",
      category: "skin",
      nameAr: "غسول وجه شجرة الشاي",
      price: 95,
      descriptionEn: "Antibacterial face wash for acne-prone skin",
      descriptionAr: "غسول وجه مضاد للبكتيريا للبشرة المعرضة لحب الشباب",
      images: ['imgs/dummydata/13_01.png',
        'imgs/dummydata/13_02.png',
        ],
      ingredientsEn: "Tea Tree Oil, Salicylic Acid",
      ingredientsAr: "زيت شجرة الشاي، حمض الساليسيليك",
      usageEn: "Use morning and evening",
      usageAr: "يستخدم صباحًا ومساءً",
      size: 150,
      rating: 4.6,
      inStock: true,
      review: [{ productID: 7, rating: 4, comment: "Helped clear my skin", author: "Khalid" }]
    },
    {
      id: "8",
      nameEn: "Sunscreen Lotion SPF 50",
      category: "body",
      nameAr: "لوشن واقي من الشمس SPF 50",
      price: 220,
      oldPrice: 250,
      descriptionEn: "Lightweight non-greasy sun protection",
      descriptionAr: "حماية شمسية خفيفة غير دهنية",
      images: ['imgs/dummydata/16_01.png',
        'imgs/dummydata/16_05.png',
        ],
      ingredientsEn: "Zinc Oxide, Vitamin C",
      ingredientsAr: "أكسيد الزنك، فيتامين سي",
      usageEn: "Apply 15 minutes before sun exposure",
      usageAr: "يوضع قبل التعرض للشمس بـ 15 دقيقة",
      size: 100,
      rating: 4.8,
      inStock: true,
      review: [{ productID: 8, rating: 5, comment: "Best sunscreen for UAE weather", author: "Mariam" }]
    },
    {
      id: "9",
      nameEn: "Hair Mask with Keratin",
      category: "hair",
      nameAr: "قناع شعر بالكيراتين",
      price: 280,
      descriptionEn: "Intensive repair treatment for damaged hair",
      descriptionAr: "علاج مكثف للإصلاح للشعر التالف",
      images: ['imgs/dummydata/18_01.png',
        'imgs/dummydata/18_02.png',
        ],
      ingredientsEn: "Keratin, Argan Oil, Collagen",
      ingredientsAr: "كيراتين، زيت أرغان، كولاجين",
      usageEn: "Apply once weekly for 20 minutes",
      usageAr: "يوضع مرة أسبوعيًا لمدة 20 دقيقة",
      size: 300,
      rating: 4.9,
      inStock: true,
      review: [{ productID: 9, rating: 5, comment: "Saved my bleached hair!", author: "Layla" }]
    },
    {
      id: "10",
      nameEn: "Lavender Body Lotion",
      nameAr: "لوشن الجسم باللافندر",
      category: "body",
      price: 130,
      oldPrice: 160,
      descriptionEn: "Calming lavender-scented moisturizer",
      descriptionAr: "مرطب مهدئ برائحة اللافندر",
      images: ['imgs/dummydata/19_01.png',
        'imgs/dummydata/19_02.png',
        'imgs/dummydata/19_05.png',
        ],
      ingredientsEn: "Lavender Oil, Shea Butter",
      ingredientsAr: "زيت اللافندر، زبدة الشيا",
      usageEn: "Apply after showering",
      usageAr: "يوضع بعد الاستحمام",
      size: 400,
      rating: 4.5,
      inStock: true,
      review: [{ productID: 10, rating: 4, comment: "Love the fragrance", author: "Noura" }]
    },
    {
      id: "11",
      nameEn: "Shea Butter Hand Cream",
      nameAr: "كريم يدين بزبدة الشيا",
      category: "body",
      price: 80,
      descriptionEn: "Intensive hand repair cream",
      descriptionAr: "كريم مكثف لإصلاح اليدين",
      images: ['imgs/dummydata/20_01.png',
        'imgs/dummydata/20_03.png',
        'imgs/dummydata/21_01.png',
        ],
      ingredientsEn: "Shea Butter, Coconut Oil",
      ingredientsAr: "زبدة الشيا، زيت جوز الهند",
      usageEn: "Apply throughout the day as needed",
      usageAr: "يوضع خلال اليوم حسب الحاجة",
      size: 75,
      rating: 4.7,
      inStock: true,
      review: [{ productID: 11, rating: 5, comment: "Saved my dry hands", author: "Youssef" }]
    },
    {
      id: "12",
      nameEn: "Coconut Lip Balm",
      nameAr: "مرطب شفاه جوز الهند",
      category: "body",
      price: 45,
      oldPrice: 60,
      descriptionEn: "Nourishing lip treatment with coconut flavor",
      descriptionAr: "علاج مغذي للشفاه بنكهة جوز الهند",
      images: ['imgs/dummydata/13_01.png',
        'imgs/dummydata/13_02.png',
        ],
              ingredientsEn: "Coconut Oil, Beeswax",
      ingredientsAr: "زيت جوز الهند، شمع العسل",
      usageEn: "Apply liberally on lips",
      usageAr: "يوضع بكمية وفيرة على الشفاه",
      size: 15,
      rating: 4.8,
      inStock: true,
      review: [{ productID: 12, rating: 5, comment: "My favorite lip balm!", author: "Aisha" }]
    },
    {
      id: "13",
      nameEn: "Herbal Shampoo",
      category: "hair",
      nameAr: "شامبو عشبي",
      price: 120,
      oldPrice: 150,
      descriptionEn: "A natural herbal shampoo for strong and shiny hair.",
      descriptionAr: "شامبو عشبي طبيعي لشعر قوي ولامع.",
      images: ['imgs/dummydata/11_01.png',
      'imgs/dummydata/11_02.png',
      'imgs/dummydata/11_04.png',
      'imgs/dummydata/11_05.png',],
      ingredientsEn: "Aloe Vera, Argan Oil, Keratin",
      ingredientsAr: "الصبار، زيت الأرغان، الكيراتين",
      usageEn: "Apply on wet hair, massage gently, and rinse.",
      usageAr: "يوضع على الشعر المبلل، يدلك بلطف ثم يشطف.",
      size: 250,
      rating: 4.5,
      inStock: true,
      review: [{ productID: 1, rating: 5, comment: "Great shampoo, makes my hair so smooth!", author: "Sarah" }]
    },
    {
      id: "14",
      category: "hair",
      nameEn: "Argan Oil Serum",
      nameAr: "سيروم زيت الأرغان",
      price: 200,
      descriptionEn: "A nourishing serum enriched with argan oil.",
      descriptionAr: "سيروم مغذي غني بزيت الأرغان.",
      images: ['imgs/dummydata/4_03.png',
        'imgs/dummydata/4_05.png',
        ],
        ingredientsEn: "Argan Oil, Vitamin E",
      ingredientsAr: "زيت الأرغان، فيتامين E",
      usageEn: "Apply a few drops on damp hair.",
      usageAr: "يُوضع بضع قطرات على الشعر المبلل.",
      size: 100,
      rating: 4.8,
      inStock: true,
      review: [{ productID: 2, rating: 4, comment: "Good quality but a bit expensive.", author: "Ahmed" }],
    },
    {
      id: "15",
      category: "skin",
      nameEn: "Rose Water Toner",
      nameAr: "تونر ماء الورد",
      price: 90,
      oldPrice: 110,
      descriptionEn: "A refreshing toner with pure rose water.",
      descriptionAr: "تونر منعش بماء الورد النقي.",
      images: ['imgs/dummydata/5_01.png',
        'imgs/dummydata/5_05.png',
        ],
      ingredientsEn: "Rose Water, Witch Hazel",
      ingredientsAr: "ماء الورد، بندق الساحرة",
      usageEn: "Spray on face for hydration.",
      usageAr: "يرش على الوجه للترطيب.",
      size: 150,
      rating: 4.7,
      inStock: true,
      review: [{ productID: 3, rating: 5, comment: "Best toner I've used!", author: "Lina" }]
    },
    {
      id: "16",
      category: "skin",
      nameEn: "Vitamin C Serum",
      nameAr: "سيروم فيتامين سي",
      price: 250,
      descriptionEn: "Brightening serum with Vitamin C and Hyaluronic Acid.",
      descriptionAr: "سيروم تفتيح بفيتامين سي وحمض الهيالورونيك.",
      images: ['imgs/dummydata/9_01.png',
        'imgs/dummydata/9_03.png',
        ],
      ingredientsEn: "Vitamin C, Hyaluronic Acid",
      ingredientsAr: "فيتامين سي، حمض الهيالورونيك",
      usageEn: "Apply a few drops on clean skin.",
      usageAr: "يُوضع بضع قطرات على البشرة النظيفة.",
      size: 50,
      rating: 4.9,
      inStock: true,
      review: [{ productID: 4, rating: 5, comment: "Amazing glow after using this!", author: "Nadia" }]
    },
    {
      id: "17",
      category: "skin",
      nameEn: "Charcoal Face Mask",
      nameAr: "قناع الفحم للوجه",
      price: 180,
      oldPrice: 210,
      descriptionEn: "Deep cleansing charcoal mask for smooth skin.",
      descriptionAr: "قناع الفحم لتنظيف عميق للبشرة الملساء.",
      images: ['imgs/dummydata/10_01.png',
        'imgs/dummydata/10_03.png',
        'imgs/dummydata/10_05.png'
        ],
      ingredientsEn: "Activated Charcoal, Kaolin Clay",
      ingredientsAr: "فحم منشط، طين الكاولين",
      usageEn: "Apply a thin layer, let dry, then rinse.",
      usageAr: "يُوضع طبقة رقيقة، يُترك ليجف ثم يُشطف.",
      size: 100,
      rating: 4.6,
      inStock: true,
      review: [{ productID: 5, rating: 4, comment: "Feels great but drying if overused.", author: "Omar" }]
    },
    {
      id: "18",
      category: "skin",
      nameEn: "Aloe Vera Moisturizer",
      nameAr: "مرطب الصبار",
      price: 150,
      oldPrice: 180,
      descriptionEn: "Soothing moisturizer with pure aloe vera extract",
      descriptionAr: "مرطب مهدئ مع مستخلص الصبار النقي",
      images: ['imgs/dummydata/12_01.png',
        'imgs/dummydata/12_02.png',
        ],
      ingredientsEn: "Aloe Vera, Shea Butter, Vitamin E",
      ingredientsAr: "الصبار، زبدة الشيا، فيتامين E",
      usageEn: "Apply daily on clean face and neck",
      usageAr: "يوضع يوميًا على الوجه والرقبة النظيفة",
      size: 200,
      rating: 4.7,
      inStock: true,
      review: [{ productID: 6, rating: 5, comment: "Perfect for sensitive skin!", author: "Fatima" }]
    },
    {
      id: "19",
      nameEn: "Tea Tree Face Wash",
      category: "skin",
      nameAr: "غسول وجه شجرة الشاي",
      price: 95,
      descriptionEn: "Antibacterial face wash for acne-prone skin",
      descriptionAr: "غسول وجه مضاد للبكتيريا للبشرة المعرضة لحب الشباب",
      images: ['imgs/dummydata/13_01.png',
        'imgs/dummydata/13_02.png',
        ],
      ingredientsEn: "Tea Tree Oil, Salicylic Acid",
      ingredientsAr: "زيت شجرة الشاي، حمض الساليسيليك",
      usageEn: "Use morning and evening",
      usageAr: "يستخدم صباحًا ومساءً",
      size: 150,
      rating: 4.6,
      inStock: true,
      review: [{ productID: 7, rating: 4, comment: "Helped clear my skin", author: "Khalid" }]
    },
    {
      id: "20",
      nameEn: "Sunscreen Lotion SPF 50",
      category: "body",
      nameAr: "لوشن واقي من الشمس SPF 50",
      price: 220,
      oldPrice: 250,
      descriptionEn: "Lightweight non-greasy sun protection",
      descriptionAr: "حماية شمسية خفيفة غير دهنية",
      images: ['imgs/dummydata/16_01.png',
        'imgs/dummydata/16_05.png',
        ],
      ingredientsEn: "Zinc Oxide, Vitamin C",
      ingredientsAr: "أكسيد الزنك، فيتامين سي",
      usageEn: "Apply 15 minutes before sun exposure",
      usageAr: "يوضع قبل التعرض للشمس بـ 15 دقيقة",
      size: 100,
      rating: 4.8,
      inStock: true,
      review: [{ productID: 8, rating: 5, comment: "Best sunscreen for UAE weather", author: "Mariam" }]
    },
    {
      id: "21",
      nameEn: "Hair Mask with Keratin",
      category: "hair",
      nameAr: "قناع شعر بالكيراتين",
      price: 280,
      descriptionEn: "Intensive repair treatment for damaged hair",
      descriptionAr: "علاج مكثف للإصلاح للشعر التالف",
      images: ['imgs/dummydata/18_01.png',
        'imgs/dummydata/18_02.png',
        ],
      ingredientsEn: "Keratin, Argan Oil, Collagen",
      ingredientsAr: "كيراتين، زيت أرغان، كولاجين",
      usageEn: "Apply once weekly for 20 minutes",
      usageAr: "يوضع مرة أسبوعيًا لمدة 20 دقيقة",
      size: 300,
      rating: 4.9,
      inStock: true,
      review: [{ productID: 9, rating: 5, comment: "Saved my bleached hair!", author: "Layla" }]
    },
    {
      id: "22",
      nameEn: "Lavender Body Lotion",
      nameAr: "لوشن الجسم باللافندر",
      category: "body",
      price: 130,
      oldPrice: 160,
      descriptionEn: "Calming lavender-scented moisturizer",
      descriptionAr: "مرطب مهدئ برائحة اللافندر",
      images: ['imgs/dummydata/19_01.png',
        'imgs/dummydata/19_02.png',
        'imgs/dummydata/19_05.png',
        ],
      ingredientsEn: "Lavender Oil, Shea Butter",
      ingredientsAr: "زيت اللافندر، زبدة الشيا",
      usageEn: "Apply after showering",
      usageAr: "يوضع بعد الاستحمام",
      size: 400,
      rating: 4.5,
      inStock: true,
      review: [{ productID: 10, rating: 4, comment: "Love the fragrance", author: "Noura" }]
    },
    {
      id: "23",
      nameEn: "Shea Butter Hand Cream",
      nameAr: "كريم يدين بزبدة الشيا",
      category: "body",
      price: 80,
      descriptionEn: "Intensive hand repair cream",
      descriptionAr: "كريم مكثف لإصلاح اليدين",
      images: ['imgs/dummydata/20_01.png',
        'imgs/dummydata/20_03.png',
        'imgs/dummydata/21_01.png',
        ],
      ingredientsEn: "Shea Butter, Coconut Oil",
      ingredientsAr: "زبدة الشيا، زيت جوز الهند",
      usageEn: "Apply throughout the day as needed",
      usageAr: "يوضع خلال اليوم حسب الحاجة",
      size: 75,
      rating: 4.7,
      inStock: true,
      review: [{ productID: 11, rating: 5, comment: "Saved my dry hands", author: "Youssef" }]
    },
    {
      id: "23",
      nameEn: "Coconut Lip Balm",
      nameAr: "مرطب شفاه جوز الهند",
      category: "body",
      price: 45,
      oldPrice: 60,
      descriptionEn: "Nourishing lip treatment with coconut flavor",
      descriptionAr: "علاج مغذي للشفاه بنكهة جوز الهند",
      images: ['imgs/dummydata/13_01.png',
        'imgs/dummydata/13_02.png',
        ],
              ingredientsEn: "Coconut Oil, Beeswax",
      ingredientsAr: "زيت جوز الهند، شمع العسل",
      usageEn: "Apply liberally on lips",
      usageAr: "يوضع بكمية وفيرة على الشفاه",
      size: 15,
      rating: 4.8,
      inStock: true,
      review: [{ productID: 12, rating: 5, comment: "My favorite lip balm!", author: "Aisha" }]
    }
  ]
}

// Addpricing(body: Omit<PackageDetails, 'id'>) {
//   return new Observable((observer) => {
//     this._carrierPricing.update((pre) => [
//       ...pre,
//       {
//         ...body,
//         id: this._carrierPricing().reduce(
//           (pre, curr) => (pre > curr.id ? pre : curr.id),
//           0
//         ) + 1,
//       },
//     ]);


//     observer.next();
//     observer.complete();
//   });
// }
//  public getCompanyPricingById(id: number) {
//    return of(this._carrierPricing().filter((price) => price.carrierid === id));
//  }

//  getAllLocation()
//  {
//      return of<Locations[]>(Location());

//  }
//  delete(id: number) {
//    const currentpricing = this._carrierPricing();
//    const indexToRemove = currentpricing.findIndex(pricing => pricing.id === id);
//    if (indexToRemove !== -1) {
//      currentpricing.splice(indexToRemove, 1);
//      this._carrierPricing.update(() => [...currentpricing]);

//    }
//  }

//  public update(id: number, body: Omit<PackageDetails, 'id' >) {
//    return new Observable((observer) => {
//      this._carrierPricing.update(pre => pre.map(CARRIER => CARRIER.id !== id
//        ? CARRIER
//        : {
//          id,
//          ...body,
//        }
//      ))

//      observer.next();
//    })
//  }


