import { paths } from "@/utils/paths";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";

export default function Navbar() {
  return (
    <header className="h-16 w-full sticky top-0 bg-white/90 z-30 flex  items-center app-container justify-between py-2 border-b border-gray-100 backdrop-blur-sm  gap-4">
      <div className="flex gap-4 h-full items-center text-brand-primary">
        <p className="text-2xl font-bold text-brand-primary">
          Ca<span className="text-brand-secondary">see</span>
        </p>
      </div>
      <nav className="flex gap-4 h-full items-center">
        <div className="flex gap-4 border-r border-gray-100 pr-4 items-center max-md:hidden">
          <Link href={paths.login} className=" btn !px-2">
            Login
          </Link>
          <Link href={paths.register} className="btn !px-2">
            Register
          </Link>
        </div>
        <Link href={paths.upload} className="btn btn-primary md:text-sm text-xs truncate ">
          Create Case <LuArrowUpRight />
        </Link>
      </nav>
    </header>
  );
}
