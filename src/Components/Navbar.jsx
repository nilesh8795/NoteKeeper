import React from 'react';

export default function Navbar() {
  return (
    <nav className=" bg-yellow-300">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <span className="self-center text-[35px] font-semibold whitespace-nowrap dark:text-white">
           Note Keeper
          </span>
      </div>
    </nav>
  );
}
