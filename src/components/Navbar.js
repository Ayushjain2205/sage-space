import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="bg-[#10002B] text-[#E0AAFF] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-1">
          <Link
            href="/"
            className="font-permanent-marker text-2xl text-[#3BF4FB]"
          >
            SageSpace
          </Link>
        </div>

        <div className="flex-1 flex justify-center space-x-8">
          <Link
            href="/"
            className={`font-space-grotesk text-lg ${
              router.pathname === "/"
                ? "text-[#3BF4FB] border-b-2 border-[#3BF4FB]"
                : "text-[#E0AAFF] hover:text-[#C77DFF]"
            }`}
          >
            Explore
          </Link>
          <Link
            href="/create"
            className={`font-space-grotesk text-lg ${
              router.pathname === "/create"
                ? "text-[#3BF4FB] border-b-2 border-[#3BF4FB]"
                : "text-[#E0AAFF] hover:text-[#C77DFF]"
            }`}
          >
            Create
          </Link>
        </div>

        <div className="flex-1 flex justify-end">
          <button className="bg-[#7B2CBF] text-[#E0AAFF] font-space-grotesk px-4 py-2 rounded-lg hover:bg-[#9D4EDD] transition-colors duration-300">
            Connect Wallet
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
