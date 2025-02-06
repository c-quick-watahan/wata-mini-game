import Link from "next/link";

export default function NavBar() {
  return (
    <>
      <div className="navbar bg-white shadow-xl z-40">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost bg-white md:hidden text-[#0066A5]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white shadow-xl rounded-box z-[1] mt-3 w-52 p-2 text-[#0066A5]"
            >
              <li>
                <Link href={"/"}>
                  <button className="text-[#0066A5] text-md">Home</button>
                </Link>
              </li>
              <li>
                <Link href={"/"}>
                  <button className=" text-[#0066A5] text-md">About</button>
                </Link>
              </li>
            </ul>
          </div>
          <button className="btn btn-ghost text-[#0066A5] text-3xl">
            <Link href={"/"}>Wata Mini Game</Link>
          </button>
          {/* <a className="btn btn-ghost text-[#0066A5] text-xl">Wata Mini Game</a> */}
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-[#0066A5]">
            <li>
              <Link href={"/"}>
                <button className="btn btn-ghost text-[#0066A5] text-lg">
                  Home
                </button>
              </Link>
            </li>
            <li></li>
            <li>
              <Link href={"/"}>
                <button className="btn btn-ghost text-[#0066A5] text-lg">
                  About
                </button>
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn bg-white btn-ghost text-[#0066A5] text-lg">
            Sign In
          </a>
        </div>
      </div>
    </>
  );
}
