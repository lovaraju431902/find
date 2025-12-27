import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products,Product } from '@/lib/arrivaldemodata';
import Image from 'next/image';
import { useState } from 'react';
import { Heart } from 'lucide-react';

import { Oswald, Roboto_Mono } from 'next/font/google'
import { ProductCard } from './ProductCard';


const oswald = Oswald({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  
})


const ArrivalProducts = () => {
    const [likedItems, setLikedItems] = useState<Set<number>>(new Set());

    const toggleLike = (id: number) => {
      setLikedItems(prev => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
        return newSet;
      });
    };
  return (
    <div className="bg-linear-to-r from-slate-100 to-purple-200  h-auto ">

        <div className="pt-10 space-y-5">
     <h1 className="text-center font-bold text-2xl">New Arrival Products</h1>
    <div className="flex flex-wrap justify-center gap-3 px-4">
    <Button variant="outline" className="whitespace-nowrap">All Item</Button>
    <Button variant="outline" className="whitespace-nowrap">MERN Stack</Button>
    <Button variant="outline" className="whitespace-nowrap">React Native Apps</Button>
    <Button variant="outline" className="whitespace-nowrap">Full Stack Projects</Button>
    <Button variant="outline" className="whitespace-nowrap">Machine Learning Projects</Button>
    <Button variant="outline" className="whitespace-nowrap">AI&ML Projects</Button>
    <Button variant="outline" className="whitespace-nowrap">Java&Spring</Button>
    <Button variant="outline" className="whitespace-nowrap">Python&Django</Button>
</div>




            {/* <div className="px-5 mt-5 md:mt-15">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:px-20 gap-5">
        {products.map((item: Product) => (
        
          <Card 
            key={item.id} 
            className="bg-white  border-0 overflow-hidden shadow-xl flex flex-row md:flex-col"
          >
            <div className='m-2'>
                <Image src={item.image} alt={item.image} width={400} height={400} className='w-full h-48  md:w-[320px] md:h-[180px] transition-transform duration-300 hover:scale-110  rounded-xl object-cover -mt-6'/>
            </div>
            <CardContent className=' mr-4'>
                <h1 className='font-bold'>{item.title}</h1>
                <div className='flex relative'>
                    <p className='text-slate-500 m-2 '>{item.author}</p>
                    <p className={`text-xl font-bold text-black absolute right-14 font-serif`} >${item.discountPrice.toFixed(2)} </p>
                    <span className='text-slate-500 line-through absolute right-0' >${item.originalPrice.toFixed(2)}</span>
                </div>
                <hr className="border-slate-400 m-2 md:m-3"/>

                <div className='flex flex-row justify-between'>
                <div className='flex flex-col md:mt-7'>
                    <p className='text-slate-700'>{item.sales} Sales</p>
                    <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < Math.floor(item.rating) ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">{item.rating}</span>
              </div>


                </div>
                    <Button variant="outline" className='rounded-3xl md:mt-7 hover:bg-black hover:text-white'>{item.button}</Button>
                </div>
                 


            </CardContent>
            </Card>
          
          
        ))}
      </div>
    </div> */}






<section className="py-8 antialiased  md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
 




          



        </div>
    </div>
  )
}

export default ArrivalProducts