export interface Product {
    id: number;
    name: string;
    price: number;
    discount: string;
    rating: number;
    reviews: number;
    image: string;
    imageDark?: string;
    badges: string[];
  }
  
  export const products: Product[] = [
    {
      id: 1,
      name: "Apple iMac 27, 1TB HDD, Retina 5K Display, M3 Max",
      price: 1699,
      discount: "Up to 35% off",
      rating: 5.0,
      reviews: 455,
      image: "/images/webdesign1.png",
      imageDark:"",
      badges: ["Fast Delivery", "Best Price"]
    },
    {
      id: 2,
      name: "Apple iPhone 15 Pro Max, 256GB, Blue Titanium",
      price: 1199,
      discount: "Up to 15% off",
      rating: 4,
      reviews: 1233,
      image:"/images/webdesign2.png",
      imageDark: "",
      badges: ["Best Seller", "Best Price"]
    },
    {
      id: 3,
      name: "iPad Pro 13-Inch (M4): XDR Display, 512GB",
      price: 799,
      discount: "Up to 35% off",
      rating: 2,
      reviews: 879,
      image: "/images/webdesign3.png",
      imageDark: "",
      badges: ["Shipping Today", "Best Price"]
    },
    {
      id: 4,
      name: "PlayStation®5 Console – 1TB, PRO Controller",
      price: 499,
      discount: "Up to 10% off",
      rating: 5,
      reviews: 2957,
      image: "/images/webdesign1.png",
      imageDark: "",
      badges: ["Fast Delivery", "Best Price"]
    },
    {
      id: 5,
      name: "Microsoft Xbox Series X 1TB Gaming Console",
      price: 499,
      discount: "Up to 10% off",
      rating: 4,
      reviews: 4263,
      image: "/images/webdesign1.png",
      imageDark: "",
      badges: ["Best Seller", "Best Price"]
    },
    {
      id: 6,
      name: "Apple MacBook PRO Laptop with M2 chip",
      price: 2599,
      discount: "Up to 5% off",
      rating: 3,
      reviews: 1076,
      image: "/images/webdesign2.png",
      imageDark: "",
      badges: ["Fast Delivery", "Best Price"]
    },
    {
      id: 7,
      name: "Apple Watch SE [GPS 40mm], Smartwatch",
      price: 699,
      discount: "Up to 20% off",
      rating: 3,
      reviews: 387,
      image: "/images/webdesign3.png",
      imageDark: "",
      badges: ["Fast Delivery", "Best Price"]
    },
    {
      id: 8,
      name: "Microsoft Surface Pro, Copilot+ PC, 13 Inch",
      price: 899,
      discount: "Up to 35% off",
      rating: 4,
      reviews: 4775,
      image: "/images/webdesign1.png",
      imageDark: "",
      badges: ["Fast Delivery", "Best Price"]
    },
    {
        id: 9,
        name: "Apple iMac 27\", 1TB HDD, Retina 5K Display, M3 Max",
        price: 1699,
        discount: "Up to 35% off",
        rating: 3,
        reviews: 455,
        image: "/images/webdesign1.png",
        imageDark:"",
        badges: ["Fast Delivery", "Best Price"]
      },
      {
        id: 10,
        name: "Apple iPhone 15 Pro Max, 256GB, Blue Titanium",
        price: 1199,
        discount: "Up to 15% off",
        rating: 4,
        reviews: 1233,
        image:"/images/webdesign2.png",
        imageDark: "",
        badges: ["Best Seller", "Best Price"]
      },
      {
        id: 11,
        name: "iPad Pro 13-Inch (M4): XDR Display, 512GB",
        price: 1,
        discount: "Up to 35% off",
        rating: 4.9,
        reviews: 879,
        image: "/images/webdesign3.png",
        imageDark: "",
        badges: ["Shipping Today", "Best Price"]
      },
      {
        id: 12,
        name: "PlayStation®5 Console – 1TB, PRO Controller",
        price: 499,
        discount: "Up to 10% off",
        rating: 3,
        reviews: 2957,
        image: "/images/webdesign1.png",
        imageDark: "",
        badges: ["Fast Delivery", "Best Price"]
      },
      {
        id: 13,
        name: "Microsoft Xbox Series X 1TB Gaming Console",
        price: 2,
        discount: "Up to 10% off",
        rating: 4.8,
        reviews: 4263,
        image: "/images/webdesign1.png",
        imageDark: "",
        badges: ["Best Seller", "Best Price"]
      },
      {
        id: 14,
        name: "Apple MacBook PRO Laptop with M2 chip",
        price: 2599,
        discount: "Up to 5% off",
        rating: 3,
        reviews: 1076,
        image: "/images/webdesign2.png",
        imageDark: "",
        badges: ["Fast Delivery", "Best Price"]
      },
      {
        id: 15,
        name: "Apple Watch SE [GPS 40mm], Smartwatch",
        price: 699,
        discount: "Up to 20% off",
        rating: 2,
        reviews: 387,
        image: "/images/webdesign3.png",
        imageDark: "",
        badges: ["Fast Delivery", "Best Price"]
      },
      {
        id: 16,
        name: "Microsoft Surface Pro, Copilot+ PC, 13 Inch",
        price: 899,
        discount: "Up to 35% off",
        rating: 4,
        reviews: 4775,
        image: "/images/webdesign1.png",
        imageDark: "",
        badges: ["Fast Delivery", "Best Price"]
      }
  ];





// export interface Product {
//     id: number;
//     image: string;
//     title: string;
//     author: string;
//     originalPrice: number;
//     discountPrice: number;
//     sales: number;
//     rating: number;
//     button: string;
//   }
  
//   export const products: Product[] = [
//     {
//       id: 1,
//       image: "/images/webdesign1.png",
//       title:"To Kill a Mockingbird",
//        author:"Admin",
//       originalPrice: 15.99,
//       discountPrice: 12.99,
//       sales: 1250,
//       rating: 4.5,
//       button: "Live Demo"
//     },
//     {
//       id: 2,
//       image: "/images/webdesign2.png",
//       title: "To Kill a Mockingbird",
//       author: "Admin",      
//       originalPrice: 18.50,
//       discountPrice: 14.80,
//       sales: 890,
//       rating: 4.8,
//       button: "Live Demo"
//     },
//     {
//       id: 3,
//       image: "/images/webdesign3.png",
//       author:"Admin",
//       title:"To Kill a MockingbirdAdmin",
//       originalPrice: 13.99,
//       discountPrice: 10.49,
//       sales: 2100,
//       rating: 4.2,
//       button: "Live Demo"
//     },
//     {
//       id: 4,
//       image: "/images/mobiledesign1.png",
//       title: "To Kill a Mockingbird",
//       author: "Admin",
//       originalPrice: 16.75,
//       discountPrice: 13.40,
//       sales: 670,
//       rating: 4.6,
//       button: "Live Demo"
//     },
//     {
//       id: 5,
//       image: "/images/webdesign1.png",
//       title: "To Kill a Mockingbird",
//       author: "Admin",
//       originalPrice: 14.25,
//       discountPrice: 11.40,
//       sales: 950,
//       rating: 4.1,
//       button: "Live Demo"
//     }
//   ];