"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Sample() {
    useGSAP(()=>{
        gsap.registerPlugin(ScrollTrigger)
        ScrollTrigger.create({
            trigger:"#text",
            start: "top 10%",
            end:"top bottom",
            markers: true,
            onEnter(){
                gsap.fromTo("#text", {
                    // translateX:20,
                    scale: 0.5,
                    fontSize:"40px",
                    opacity: 0,
                    // y:200

                },
                 {
                    // translateX:20,
                    scale: 1,
                    fontSize:"100px",
                    color:"green",
                    opacity: 1,
                    // y:10
                    

                }
            )
            }

        })
    })
    return (
        <div className="h-[300vh]">
        <h1 id="text" className="text-brand-secondary text-lg translate-x-0 scale-0">Hello World</h1>
        </div>
    );
}