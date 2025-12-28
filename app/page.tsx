"use client"
import ArrivalProducts from "@/components/user/Home/ArrivalProducts";
import Contact from "@/components/user/Home/Contact";
import Footer from "@/components/user/Home/Fotter";
import Header from "@/components/user/Home/Header";
import Herosection from "@/components/user/Home/Herosection";
import Testimonials from "@/components/user/Home/Testinomials";

export default function Home() {
  return (
  <div>

  <Header/>
  <Herosection/>
  <ArrivalProducts/>
  <Testimonials/>

  {/* <Contact/> */}
  <Footer/>
  </div>
  
 
  );
}
