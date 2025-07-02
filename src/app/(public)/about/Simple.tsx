// "use client"
// import gsap from "gsap";
// import { useRef } from "react";

// export default function Page() {
//     const buttonRef = useRef<HTMLButtonElement>(null)
//     return (
//         <div>
//             <button ref={buttonRef} onClick={()=> gsap.fromTo(buttonRef.current, {
//                 scale: 0,
//             }, {
//                 scale: 1,
//                 backgroundColor:"yellow"
//             })} className="btn-primary p-2 rounded">Hello</button>
//         </div>
//     );
// }