"use client"
import {Wallet, HDNodeWallet} from "ethers"
import { useEffect, useState } from "react"
import Eye, { Copy, EyeIcon, EyeOff } from 'lucide-react'
import { toast, Toaster } from "sonner"
import {derivePath} from 'ed25519-hd-key'
import nacl from 'tweetnacl'
import { mnemonicToSeedSync } from "bip39"

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
  
  const numonic = localStorage.getItem('numonic') || ""
    
  const copyClipBoard = (text:string)=>{
    navigator.clipboard.writeText(text)
    toast.success('Your Key is Copied');
  }


 const [currentIndex, setCurrentIndex] = useState(0)
 const[hideIdx, setHideIdx] = useState(0);
 const[show, setShow] = useState(false)
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleVisibility = () => {
    setIsVisible((prev) => !prev);
  }; 

  const generateWallet = (i:number)=>{
    const seed = mnemonicToSeedSync(numonic)
    const path = `m/44'/60'/${i}'/0'` 
    const hdnode = HDNodeWallet.fromSeed(seed)
    const child = hdnode.derivePath(path)
    // const keypair = Keypair.generate()
    const secret = child.privateKey
    const wallet = new Wallet(secret)
    const public_key =  wallet.address
    // const secretKey =  keypair.secretKey
    const privateKey = Buffer.from(secret).toString('base64')
    // setCurrentIndex( currentIndex + 1)
    setkeys([...keys, {pubKey:public_key, privateKey:privateKey}])
  }


  return <div className=" items-center p-10">
      <div onMouseEnter={()=>setShow(true)} className=" cursor-pointer text-3xl font-medium text-center">
        Your Mnemonics / Secret Phrase { show? <EyeIcon size={30} className=" ml-10 inline "/>:<EyeOff size={30} className=" ml-10 inline "/>}
      </div>
       <div onMouseLeave={()=>setShow(false)} className={` ${show?'':' hidden'} translate-y-9 blur-sm hover:blur-none transition-all duration-500 flex justify-center flex-col border-2 pt-10 rounded-md pb-5 border-gray-800`}> 
  <div>
  <div className=" text-center text-2xl">
    Mnemonics
  </div>
<div className=" md:text-2xl lg:text-2xl grid grid-cols-4 w-full px-10 items-center mt-10 rounded-md">
 {numonic.split(' ').map((nm)=><div className=" bg-zinc-700 cursor-pointer hover:bg-zinc-600 transition-all duration-300 rounded-md p-2 m-2">{nm}</div>)}
</div>
<div onClick={()=>copyClipBoard(numonic)} className=" text-center hover:text-slate-400 transition-all duration-300 mt-2 cursor-pointer">
  copy <Copy className=" inline "/>
</div>
  </div>
 </div> 
    <Toaster richColors />
    <div className=" flex justify-center mt-5">
       <button
     onClick={()=>{
       setCurrentIndex(currentIndex+1)
       generateWallet(currentIndex+1)
     }}
     className=" border-2 p-3 rounded-md font-mono hover:bg-white hover:text-black transition-all duration-500">Generate Ethereum wallet</button>
    </div>
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
                 <div  onClick={()=>copyClipBoard(key.pubKey)} className=" mt-1 truncate font-mono font-thin text-slate-900 hover:font-semibold">
                   {key.pubKey}
                  </div>
              </div>
              <div className=" mt-6">
                <p className=" font-bold inline text-slate-600 ">
                   Private Key:
                </p>
                <div className=" flex relative">
                <div onClick={()=>copyClipBoard(key.privateKey)} className={`mt-1  text-base truncate font-mono font-thin mr-20 text-slate-900 hover:font-semibold`}>
        {isVisible&&hideIdx==idx ? key.privateKey : '••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••'}
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