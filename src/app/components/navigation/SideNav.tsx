'use client';

import NavLinks from './NavLinks';

export default function SideNav() {

  return (
    <>
      <div className="flex ml-2 flex-col bg-gray-_7">
        <div className="flex flex-row items-center justify-start gap-2 p-3">
          <NavLinks />
        </div>
      </div >
    </>
  );
}
