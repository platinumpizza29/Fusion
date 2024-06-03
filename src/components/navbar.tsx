import Image from "next/image";
import logo from "../../public/logo.png";
import { auth } from "@clerk/nextjs/server";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { CgMenuLeftAlt } from "react-icons/cg";

export default function NavbarComp() {
  const { userId } = auth();

  ("use client");
  return (
    <div className="navbar bg-base-100 ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <CgMenuLeftAlt className="text-xl" />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/create">Create</a>
            </li>
            <li>
              <a href="/articles">Articles</a>
            </li>
            <li>
              <a href="/aboutus">About Us</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <Image src={logo} alt="food icon" width={40} height={40} />
          Fusion
        </a>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/create">Create</a>
          </li>
          <li>
            <a>Articles</a>
          </li>
          <li>
            <a>About Us</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {userId ? <UserButton afterSignOutUrl="/" /> : <SignInButton />}
      </div>
    </div>
  );
}
