import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  categories:any[]=[
    {
      src:'imgs/home/skincare.jpeg',
      title:'home.skincare',
      route:'/products/skin'

    },
    {
      src:'imgs/home/haircare.jpeg',
      title:'home.HairCare',
      route:'/products/hair'

    },
    {
      src:'imgs/home/bodycare.jpg',
      title:'home.BodyCare',
      route:'/products/body'

    }
  ]

}
