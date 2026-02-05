import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {


    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol:"https",
        hostname:"flowbite.s3.amazonaws.com",
        port:"",
        pathname:"/**"

      },
      {
        protocol:"https",
        hostname:"images.unsplash.com",
        port:"",
        pathname:"/**"

      },
      
      {
        protocol:"https",
        hostname:"i.postimg.cc",
        port:"",
        pathname:"/**"

      },
     
      

    ],
    
  },
};

export default nextConfig;
