import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-white py-16 dark:bg-primary">
      <div className="text-center">
        <p className="text-primary font-normal text-base mb-2 dark:text-white">
          © {currentYear} Grupo C - Taller de Software.
        </p>
        <p className="text-primary font-semibold text-base dark:text-white">
          Hecho con {"<3"}
        </p>
      </div>
    </div>
  );
};

export default Footer;
