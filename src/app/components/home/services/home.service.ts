import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  categories:any[]=[
    {
      src:'/imgs/home/skincare.jpeg',
      title:'home.skincare',

    },
    {
      src:'/imgs/home/haircare.jpeg',
      title:'home.HairCare',

    },
    {
      src:'/imgs/home/bodycare.jpg',
      title:'home.BodyCare',

    }
  ]
  products = [
    {
      id: 1,
      name: 'Hydra-Collagen Ssdfsdfsdfsdfsdfsdfsdfsdfsderum',
      image: '/imgs/dummydata/11_01.png',
      hoverImage: '/imgs/dummydata/11_04.png',
      price: 50,
      oldPrice: 60,
      rating: 4.8,
      isBestSeller: true
    },
    {
      id: 2,
      name: 'Hydra-Collagen Serum',
      image: '/imgs/dummydata/12_01.png',
      hoverImage: '/imgs/dummydata/12_02.png',
      price: 100,
      oldPrice: 120,
      rating: 4.8,
      isBestSeller: true
    },
    {
      id: 3,
      name: 'Hydra-Collagen Serum',
      image: '/imgs/dummydata/20_01.png',
      hoverImage: '/imgs/dummydata/20_03.png',
      price: 80,
      oldPrice: 150,
      rating: 4.8,
      isBestSeller: true
    },
    {
      id: 6,
      name: 'Hydra-Collagen Serum',
      image: '/imgs/dummydata/11_01.png',
      hoverImage: '/imgs/dummydata/11_05.png',
      price: 50,
      oldPrice: 60,
      rating: 4.8,
      isBestSeller: true
    },
    // Add more products...
  ];

}
