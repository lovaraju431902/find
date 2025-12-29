
// "use client"
// import { useEffect, useRef } from "react";
// import { Input } from "@/components/ui/input";
// import { icons } from "@/utils/icons";
// import { Search } from "lucide-react";

// import { BBH_Hegarty } from "next/font/google";  
// import Image from "next/image";
// import { motion } from "framer-motion";
// import Community from "./Community";

// // const bbhBartle = BBH_Bartle({
// //   subsets: ['latin'], 
// //   weight: ['400'],     
// // });

// const bbhHergarty = BBH_Hegarty({
//   subsets: ['latin'],
//   weight: ['400']
// })

// const Herosection = () => {
//   useEffect(() => {
//     // Smooth scrolling polyfill for older browsers (optional, but ensures consistency)
//     if ('scrollBehavior' in document.documentElement.style) {
//       document.documentElement.style.scrollBehavior = 'smooth';
//     }
//   }, []);

//   return (
//     <>
//       <div className="grid overflow-hidden md:grid-cols-2 pt-20 bg-linear-to-r from-slate-100 to-purple-200 no-scrollbar"> {/* Fixed: overflow-x-hidden -> overflow-hidden (full hide), added no-scrollbar class */}
//         <div className="p-5 mt-10 space-y-10 relative z-10"> {/* Added relative z-10 to layer content over animations */}
//           <Community />
//           <motion.h1 // Wrapped in motion for fade-in sync with images
//             className={`text-2xl sm:text-5xl text-black leading-tight ${bbhHergarty.className}`}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//           >
//             2M+ Curated Applications
//           </motion.h1>

//           <motion.p 
//             className="text-slate-700 leading-relaxed font-serif"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
//           >
//             Explore the best premium themes and plugins available for sale. Our unique collection is hand-curated by experts. Find and buy the perfect premium theme today.
//           </motion.p>

//           <div className="relative md:text-center xl:text-left">
//             <Search className="absolute top-1/2 right-47 md:top-1/2 md:right-20 lg:right-24 xl:right-63 -translate-y-1/2 w-10 h-10 text-white bg-gradient-to-r from-fuchsia-500 to-indigo-600 p-2 rounded-full" />
//             <Input
//               placeholder="Search for application source code"
//               className="w-[400px] md:w-2/3 text-lg text-slate-400 font-sans border-none shadow-md p-8 bg-white rounded-full pl-6 pr-20"
//             />
//           </div>

//           {/* Infinite Scrolling */}
//           <div className="mt-8 overflow-hidden max-w-xl">
//             <div className="flex animate-scroll whitespace-nowrap">
//               {[...icons, ...icons].map((icon, index) => (
//                 <div
//                   key={index}
//                   className="mx-4 inline-block transition-transform duration-300 hover:scale-110"
//                 >
//                   {icon}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Floating Logo 1 */}
//           <motion.div
//             animate={{ 
//               y: [-80, 120, -80],
//               rotate: [0, -360, -720]
//             }}
//             transition={{ 
//               duration: 10, 
//               repeat: Infinity, 
//               ease: "easeInOut",
//               delay: 1
//             }}
//             className="absolute overflow-hidden top-1/3 left-1/4 w-14 h-14 z-30" // Kept, but ensure parent has overflow-hidden
//           >
//             <Image
//               src="/images/next.dpmarket.wowtheme7.com logo67.png"
//               alt="Floating Logo"
//               width={100}
//               height={100}
//               className="w-full h-full object-contain drop-shadow-2xl"
//             />
//           </motion.div>
//         </div>

//         <div className="bg-transparent relative">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             className="relative h-[600px] overflow-hidden no-scrollbar" // Added no-scrollbar here too
//           >
//             {/* Image 1 - Mobile Design (Top Left) */}
//             <motion.div
//               animate={{ 
//                 y: [0, -20, 0],
//                 rotate: [-5, -3, -5]
//               }}
//               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
//               className="absolute top-0 left-0 w-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm bg-white/10 transform -rotate-6 hover:scale-110 hover:z-50 transition-all duration-300 cursor-pointer"
//               whileHover={{ scale: 1.1, zIndex: 50 }} // Use whileHover for smoother hover
//             >
//               <Image
//                 src="/images/mobiledesign1.png"
//                 alt="Mobile App Design"
//                 width={256}
//                 height={400}
//                 loading="eager"
//                 className="w-full h-full object-cover select-none"
//                 draggable={false}
//               />
//             </motion.div>

//             {/* Image 2 - Dashboard Design (Top Right) */}
//             <motion.div
//               animate={{ 
//                 y: [0, 20, 0],
//                 rotate: [8, 10, 8]
//               }}
//               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//               className="absolute top-10 right-10 w-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm bg-white/10 transform rotate-6 md:hover:scale-110 hover:z-50 transition-all duration-300 cursor-pointer" // Fixed: top:10 -> top-10, right-30 -> right-10 for consistency
//               whileHover={{ scale: 1.1, zIndex: 50 }}
//             >
//               <Image
//                 src="/images/webdesign1.png"
//                 alt="HR Dashboard Design"
//                 width={320}
//                 height={240}
//                 loading="eager"
//                 className="w-full h-full object-cover select-none"
//                 draggable={false}
//               />
//             </motion.div>

//             {/* Image 3 - Payment Design (Bottom Left) */}
//             <motion.div
//               animate={{ 
//                 y: [0, 15, 0],
//                 rotate: [-3, -5, -3]
//               }}
//               transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
//               className="absolute bottom-20 left-0 w-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm bg-white/10 transform -rotate-3 hover:scale-110 hover:z-50 transition-all duration-300 cursor-pointer z-20"
//               whileHover={{ scale: 1.1, zIndex: 50 }}
//             >
//               <Image
//                 src="/images/webdesign3.png"
//                 alt="Payment Platform Design"
//                 width={288}
//                 height={216}
//                 loading="eager"
//                 className="w-full h-full object-cover select-none"
//                 draggable={false}
//               />
//             </motion.div>

//             {/* Image 4 - Product Design (Bottom Right) */}
//             <motion.div
//               animate={{ 
//                 y: [0, -15, 0],
//                 rotate: [5, 3, 5]
//               }}
//               transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
//               className="absolute bottom-0 right-10 w-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm bg-white/10 transform rotate-5 hover:scale-110 hover:z-50 transition-all duration-300 cursor-pointer" // Fixed: sm:right-30 right-35 -> right-10 for mobile safety
//               whileHover={{ scale: 1.1, zIndex: 50 }}
//             >
//               <Image
//                 src="/images/webdesign2.png"
//                 alt="E-commerce Product Design"
//                 width={256}
//                 height={192}
//                 loading="eager"
//                 className="w-full h-full object-cover select-none"
//                 draggable={false}
//               />
//             </motion.div>

//             {/* Central Glow Effect */}
//             <motion.div
//               animate={{ 
//                 rotate: [0, 360],
//                 scale: [1, 1.3, 1]
//               }}
//               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//               className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-3xl opacity-40"
//             />

//             {/* Falling Rotating Logo 2 - Pink */}
//             <motion.div
//               animate={{ 
//                 y: [-80, 120, -80],
//                 rotate: [0, -360, -720]
//               }}
//               transition={{ 
//                 duration: 10, 
//                 repeat: Infinity, 
//                 ease: "easeInOut",
//                 delay: 1
//               }}
//               className="absolute top-1/3 left-1/4 w-14 h-14 z-30 overflow-hidden"
//             >
//               <Image
//                 src="/images/next.dpmarket.wowtheme7.com logo67.png"
//                 alt="Floating Logo"
//                 width={100}
//                 height={100}
//                 className="w-full h-full object-contain drop-shadow-2xl"
//               />
//             </motion.div>

//             {/* Falling Rotating Logo 3 - Purple */}
//             <motion.div
//               animate={{ 
//                 y: [-120, 80, -120],
//                 rotate: [0, 360, 720]
//               }}
//               transition={{ 
//                 duration: 9, 
//                 repeat: Infinity, 
//                 ease: "easeInOut",
//                 delay: 2
//               }}
//               className="absolute bottom-1/3 right-1/3 w-16 h-16 z-30"
//             >
//               <Image
//                 src="/images/next.dpmarket.wowtheme7.com logo30.png"
//                 alt="Floating Logo"
//                 width={64}
//                 height={64}
//                 className="w-full h-full object-contain drop-shadow-2xl"
//               />
//             </motion.div>

//             {/* Falling Rotating Logo 4 - Blue Wave */}
//             <motion.div
//               animate={{ 
//                 y: [-90, 110, -90],
//                 rotate: [0, -360, -720]
//               }}
//               transition={{ 
//                 duration: 7, 
//                 repeat: Infinity, 
//                 ease: "easeInOut",
//                 delay: 3
//               }}
//               className="absolute top-1/2 left-1/3 w-12 h-12 z-30"
//             >
//               <Image
//                 src="/images/next.dpmarket.wowtheme7.com logo32.png"
//                 alt="Floating Logo"
//                 width={64}
//                 height={64}
//                 className="w-full h-full object-contain drop-shadow-2xl"
//               />
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Herosection;


















"use client"
import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { icons } from "@/utils/icons";
import { Search } from "lucide-react";

import { BBH_Hegarty } from "next/font/google";  
import Image from "next/image";
import { motion } from "framer-motion";
import Community from "./Community";

const bbhHergarty = BBH_Hegarty({
  subsets: ['latin'],
  weight: ['400']
})

const Herosection = () => {
  useEffect(() => {
    // Smooth scrolling polyfill for older browsers (optional, but ensures consistency)
    if ('scrollBehavior' in document.documentElement.style) {
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  }, []);

  return (
    <>
        <motion.div 
           className="grid overflow-hidden md:grid-cols-2 pt-20 bg-linear-to-r from-slate-100 to-purple-200 no-scrollbar relative z-0"
        
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >


 
      
      
      
     
        <div className="p-5 mt-10 space-y-10 relative z-10">
          <Community />
          <motion.h1
            className={`text-2xl sm:text-5xl text-black leading-tight ${bbhHergarty.className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            2M+ Curated Applications
          </motion.h1>

          <motion.p 
            className="text-slate-700  w-[400px] md:w-full font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Explore the best premium themes and plugins available for sale. Our unique collection is hand-curated by experts. Find and buy the perfect premium theme today.
          </motion.p>

          <motion.div
          
        className="relative md:text-center xl:text-left"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.8, ease: "easeOut" }}>
          
          
          
          
            <Search className="absolute top-1/2 right-47 md:top-1/2 md:right-20 lg:right-24 xl:right-63 -translate-y-1/2 w-10 h-10 text-white bg-gradient-to-r from-fuchsia-500 to-indigo-600 p-2 rounded-full" />
            <Input
              placeholder="Search for application source code"
              className="w-[400px] md:w-2/3 text-lg text-slate-400 font-sans border-none shadow-md p-8 bg-white rounded-full pl-6 pr-20"
            />
          </motion.div>

          {/* Infinite Scrolling */}
          <motion.div
          
           className="mt-8 overflow-hidden max-w-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.8, ease: "easeOut" }}>
          
          
          
          
         
            <div className="flex animate-scroll whitespace-nowrap">
              {[...icons, ...icons].map((icon, index) => (
                <div
                  key={index}
                  className="mx-4 inline-block transition-transform duration-300 hover:scale-110"
                >
                  {icon}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Floating Logo 1 */}
          <motion.div
            animate={{ 
              y: [-80, 120, -80],
              rotate: [0, -360, -720]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute overflow-hidden top-1/3 left-1/4 w-14 h-14 z-[5]" // Changed from z-30 to z-[5]
          >
            <Image
              src="/images/next.dpmarket.wowtheme7.com logo67.png"
              alt="Floating Logo"
              width={100}
              height={100}
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </motion.div>
        </div>

        <div className="bg-transparent relative z-0"> {/* Added z-0 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[600px] overflow-hidden no-scrollbar"
          >
            {/* Image 1 - Mobile Design (Top Left) */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [-5, -3, -5]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm bg-white/10 transform -rotate-6 hover:scale-110 transition-all duration-300 cursor-pointer z-[1]" // Changed to z-[1] and removed hover:z-50
              whileHover={{ scale: 1.1 }} // Removed zIndex from whileHover
            >
              <Image
                src="/images/mobiledesign1.png"
                alt="Mobile App Design"
                width={256}
                height={400}
                loading="eager"
                className="w-full h-full object-cover select-none"
                draggable={false}
              />
            </motion.div>

            {/* Image 2 - Dashboard Design (Top Right) */}
            <motion.div
              animate={{ 
                y: [0, 20, 0],
                rotate: [8, 10, 8]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-10 w-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm bg-white/10 transform rotate-6 md:hover:scale-110 transition-all duration-300 cursor-pointer z-[2]" // Changed to z-[2] and removed hover:z-50
              whileHover={{ scale: 1.1 }} // Removed zIndex from whileHover
            >
              <Image
                src="/images/webdesign1.png"
                alt="HR Dashboard Design"
                width={320}
                height={240}
                loading="eager"
                className="w-full h-full object-cover select-none"
                draggable={false}
              />
            </motion.div>

            {/* Image 3 - Payment Design (Bottom Left) */}
            <motion.div
              animate={{ 
                y: [0, 15, 0],
                rotate: [-3, -5, -3]
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-20 left-0 w-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm bg-white/10 transform -rotate-3 hover:scale-110 transition-all duration-300 cursor-pointer z-[3]" // Changed to z-[3] and removed hover:z-50
              whileHover={{ scale: 1.1 }} // Removed zIndex from whileHover
            >
              <Image
                src="/images/webdesign3.png"
                alt="Payment Platform Design"
                width={288}
                height={216}
                loading="eager"
                className="w-full h-full object-cover select-none"
                draggable={false}
              />
            </motion.div>

            {/* Image 4 - Product Design (Bottom Right) */}
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [5, 3, 5]
              }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 right-10 w-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm bg-white/10 transform rotate-5 hover:scale-110 transition-all duration-300 cursor-pointer z-[4]" // Changed to z-[4] and removed hover:z-50
              whileHover={{ scale: 1.1 }} // Removed zIndex from whileHover
            >
              <Image
                src="/images/webdesign2.png"
                alt="E-commerce Product Design"
                width={256}
                height={192}
                loading="eager"
                className="w-full h-full object-cover select-none"
                draggable={false}
              />
            </motion.div>

            {/* Central Glow Effect */}
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-3xl opacity-40 z-0"
            />

            {/* Falling Rotating Logo 2 - Pink */}
            <motion.div
              animate={{ 
                y: [-80, 120, -80],
                rotate: [0, -360, -720]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute top-1/3 left-1/4 w-14 h-14 z-[5] overflow-hidden" // Changed from z-30 to z-[5]
            >
              <Image
                src="/images/next.dpmarket.wowtheme7.com logo67.png"
                alt="Floating Logo"
                width={100}
                height={100}
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Falling Rotating Logo 3 - Purple */}
            <motion.div
              animate={{ 
                y: [-120, 80, -120],
                rotate: [0, 360, 720]
              }}
              transition={{ 
                duration: 9, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute bottom-1/3 right-1/3 w-16 h-16 z-[5]" // Changed from z-30 to z-[5]
            >
              <Image
                src="/images/next.dpmarket.wowtheme7.com logo30.png"
                alt="Floating Logo"
                width={64}
                height={64}
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Falling Rotating Logo 4 - Blue Wave */}
            <motion.div
              animate={{ 
                y: [-90, 110, -90],
                rotate: [0, -360, -720]
              }}
              transition={{ 
                duration: 7, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 3
              }}
              className="absolute top-1/2 left-1/3 w-12 h-12 z-[5]" // Changed from z-30 to z-[5]
            >
              <Image
                src="/images/next.dpmarket.wowtheme7.com logo32.png"
                alt="Floating Logo"
                width={64}
                height={64}
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Herosection;





