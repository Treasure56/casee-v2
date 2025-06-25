import WhiteBgPhone from "@/components/phone/WhiteBgPhone";

export default function HeroImgs() {
    return (
        <div className="relative h-115 sm:h-90 md:h-120 xl:h-80 w-full md:w-9/12 mx-auto ">
           <div className="w-50 md:w-60 absolute bottom-0 left-0 -rotate-10 sm:-rotate-30">
               <WhiteBgPhone src="/images/user4.jpg" />
           </div>
           <div className="w-50 md:w-60 absolute bottom-0 right-0 rotate-10 sm:rotate-30">
               <WhiteBgPhone src="/images/man-and-dog.jpg" />
           </div>
        </div>
    );
}