"use client"
import Image from "next/image";
import { MainWallet } from "../components/Wallets";
import { useState } from "react"; 
import { generateMnemonic } from 'bip39'
import { Copy } from "lucide-react";
import { toast, Toaster } from "sonner";

export default function Home() {

    const[Wallet, setWallets] = useState('')
   const[numonic, setNumonic] = useState('')
 
    
  const copyClipBoard = (text:string)=>{
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!');
  }

  return (
   <div className=" py-10">
   <Toaster richColors />
   <div className={` ${Wallet=='sol'|| Wallet=='eth'?'hidden':''}`}> 
    <div className=" text-6xl text-center" >
      Welcome to your own wallets
    </div> 
      <div className=" mt-7 flex justify-center">
 <button  onClick={async()=>{
  const nm = await generateMnemonic();
  localStorage.setItem('numonic', nm)
  setNumonic(nm)
 }} className=" cursor-pointer font-bold border-2 p-4 text-xl rounded-md font-sans hover:text-black hover:bg-white transition-all duration-500"> Generate Mnemonic</button>
 </div>
 
 { numonic!=''&& 
 <div className=" blur-sm hover:blur-none transition-all duration-500 flex justify-center flex-col mt-10 border-2 pt-10 rounded-md pb-5 border-gray-800"> 
  <div>
  <div className=" text-center text-2xl">
    Mnemonics
  </div>
<div className=" md:text-2xl lg:text-2xl grid grid-cols-4 w-full px-10 items-center mt-10 rounded-md">
 {numonic.split(' ').map((nm,idx)=><div key={idx} className=" bg-zinc-700 cursor-pointer hover:bg-zinc-600 transition-all duration-300 rounded-md p-2 m-2">{nm}</div>)}
</div>
<div onClick={()=>copyClipBoard(numonic)} className=" text-center hover:text-slate-400 transition-all duration-300 mt-2 cursor-pointer">
  copy <Copy className=" inline "/>
</div>
  </div>
 </div>
  }
 <div className={`${numonic?'':' pointer-events-none blur transition-all duration-500'}`}>
      <div className=" text-4xl text-center mt-10">
        Choose your wallet
      </div>
   <div className=" flex gap-10 justify-center mt-10">
    <button onClick={()=> setWallets('sol')} className=" cursor-pointer font-semibold border-2 p-3 rounded-md font-mono hover:text-black hover:bg-white transition-all duration-500">Solana Wallet </button>
    <button  onClick={()=> setWallets('eth')} className=" cursor-pointer font-semibold border-2 p-3 rounded-md font-mono  hover:text-black hover:bg-white transition-all duration-500">Ethereum Wallet</button>
   </div>
 </div>
 
   </div>
    <div className={`${Wallet=='sol'?'':'hidden'}`}>
       <div className=" text-4xl font-bold mt-10 text-center">
      Solana Wallets
     </div>  
     <div>
      <MainWallet walletType="Solana" />  
     </div>
    </div>
    <div className={`${Wallet=='eth'?'':'hidden'}`}>
       <div className=" text-4xl font-bold mt-10 text-center">
      Ethereum Wallets
     </div>  
     <div>
      <MainWallet walletType="Ethereum"/>  
     </div>
    </div>
   </div>
  );
}
