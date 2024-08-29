"use client"
import Image from "next/image";
import { SolWallet } from "../components/SolWallet";
import { useState } from "react";
import { EthWallet } from "../components/EthWallet";

export default function Home() {

    const[wallets, setWallets] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)

  return (
   <div className=" py-10">
   
       <div className=" text-4xl font-bold mt-10 text-center">
      Solana Wallets
     </div>  
     <div>
      <SolWallet/>  
     </div>
       <div className=" text-4xl font-bold mt-10 text-center">
      Ethereum Wallets
     </div>  
     <div>
      <EthWallet/>  
     </div>
   </div>
  );
}
