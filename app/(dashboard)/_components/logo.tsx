import Image from "next/image";

import React from "react";

const Logo = () => {
  return (
    <div className="flex justify-center">
      <Image height={130} width={130} alt="Logo" src="/logo.svg" />
    </div>
  );
};

export default Logo;
