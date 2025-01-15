import React from 'react';
import { ShoppingBag, Film, Gamepad2 } from 'lucide-react';

interface NavigationButtonsProps {
  onShopClick: () => void;
}

export function NavigationButtons({ onShopClick }: NavigationButtonsProps) {
  return (
    <div className="absolute bottom-20 left-4 flex space-x-4">
      <NavButton icon={<ShoppingBag size={20} />} label="Main Shop" onClick={onShopClick} />
      <NavButton icon={<Gamepad2 size={20} />} label="Arcade" href="#arcade" />
      <NavButton icon={<Film size={20} />} label="Cinema" href="#cinema" />
    </div>
  );
}

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
}

function NavButton({ icon, label, onClick, href }: NavButtonProps) {
  const ButtonContent = () => (
    <>
      <div className="block w-14 h-14 sm:w-20 sm:h-20 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-500 gothic-button">
        <div className="text-red-400">{icon}</div>
      </div>
      <p className="mt-2 text-xs sm:text-sm font-light text-red-400 text-center">{label}</p>
    </>
  );

  return href ? (
    <a href={href} className="flex flex-col items-center">
      <ButtonContent />
    </a>
  ) : (
    <button onClick={onClick} className="flex flex-col items-center">
      <ButtonContent />
    </button>
  );
}