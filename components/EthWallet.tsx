"use client"
import {ethers} from "ethers"
import { useEffect, useState } from "react"
import Eye, { EyeIcon, EyeOff } from 'lucide-react'
import {toast, Toaster} from 'sonner'
import  bs58  from 'bs58'

export const EthWallet = ()=>{
  interface Key {
    pubKey: string;
    privateKey: any; // Use a more specific type if possible instead of 'any'
  }
  
  const [keys, setkeys] = useState<Key[]>([
    {
      pubKey: '',
      privateKey: '',
    },
  ]);
  
  const copyClipBoard = (text:string)=>{
    navigator.clipboard.writeText(text)
    toast.success('Your Key is Copied');
  }

 const wallet = ethers.Wallet.createRandom()
 
 const [currentIndex, setCurrentIndex] = useState(0)
 const[hideIdx, setHideIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleVisibility = () => {
    setIsVisible((prev) => !prev);
  }; 

  return <div className=" flex justify-center flex-col items-center p-10">
    <Toaster richColors />
       <button
     onClick={()=>{ 
       const public_key =  wallet.address
       const secretKey =  wallet.privateKey
       const privateKey = secretKey
       setCurrentIndex( currentIndex + 1)
       setkeys([...keys, {pubKey:public_key, privateKey:privateKey}])
     }}
     className=" border-2 p-3 rounded-md font-mono ">Generate Ethereum wallet</button>
        <div className=" w-full mt-24 text-lg">
        {keys.map((key,idx)=>(
            key.pubKey!='' &&
            <div key={idx} className=" mt-10 shadow-lg shadow-slate-500 rounded-md ">
              <div className=" flex justify-center font-bold text-3xl bg-slate-800 rounded-t-md p-2">
                Wallet {idx}
              </div>
              <div className=" p-3 bg-purple-400 rounded-b-md">
              <div>
              <p className=" font-bold  text-slate-600 ">
                   Public Key:
                </p>
                 <div onClick={()=>copyClipBoard(key.pubKey)} className=" hover:font-semibold cursor-pointer transition-all duration-300 mt-1 truncate font-mono font-thin text-slate-900">
                   {key.pubKey}
                  </div>
              </div>
              <div className=" mt-6">
                <p className=" font-bold inline text-slate-600 ">
                   Private Key:
                </p>
                <div className=" flex relative">
                <div onClick={()=> copyClipBoard(key.privateKey)} className={`mt-1  text-base truncate hover:font-semibold transition-all duration-500 cursor-pointer font-mono font-thin mr-20 text-slate-900`}>
        {isVisible&&hideIdx==idx ? key.privateKey : '•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••• '}
      </div>
       <div onClick={()=>{handleToggleVisibility();setHideIdx(idx)}} className=" items-center transition-all duration-500 rounded-md flex cursor-pointer absolute right-1 hover:bg-purple-800 p-2">
         {isVisible&&hideIdx==idx  ? <EyeOff className=" inline" />: <EyeIcon className=" inline" />}
        </div> 
                </div>
              </div>
              </div>
            </div>
          ))}
        </div> 
  </div>
}