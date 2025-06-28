/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

export type WhiteBgPhoneProps = {
    src:string
    className?:string
}

export default function WhiteBgPhone({src, className}:WhiteBgPhoneProps) {
    return (
        <div className={`relative aspect-[896/1831] overflow-hidden ${className}`} 
        style={{
            borderTopRightRadius: "12% 10%",
            borderTopLeftRadius: "12% 10%",
            borderBottomRightRadius: "12% 10%",
            borderBottomLeftRadius: "14% 10%"
        }}
        >
             <Image  className="h-full w-full relative object-cover" src={src} alt="hero-img" width={500} height={1000} />
             <Image className="h-full w-full absolute inset-0" src="/images/phone-template-white-edges.png" alt="hero-img" width={500} height={1000} />
        </div>
    );
}