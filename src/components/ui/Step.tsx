"use client"

import { usePathname } from "next/navigation";

export default function Step() {
    const pathName = usePathname();
    return (
        <div>
            {/* stepper */}
            <ol className="rounded-md bg-white">
                {
                    stepContents.map((st, i )=>{
                        const currentIndex
                    })
                }
            </ol>
            
        </div>
    );
}

const stepContents = [
  { name: 'Step 1: add image', description: 'choose an image to your case', url: '/upload' },
  { name: 'Step 2: Customize design', description: 'Make the case fit your needs', url: '/design' },
  { name: 'Step 3: summary', description: 'Review your design', url: '/preview' },
];
