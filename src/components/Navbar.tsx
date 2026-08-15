import React from 'react';
import { ShoppingCart, Award, PhoneCall, Flame } from 'lucide-react';

interface NavbarProps {
  activeTab: 'overview' | 'reviews' | 'description';
  setActiveTab: (tab: 'overview' | 'reviews' | 'description') => void;
  onOrderClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOrderClick }) => {
  const scrollTo = (id: string, tab: 'overview' | 'reviews' | 'description') => {
    setActiveTab(tab);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-amber-100">
      {/* Top micro bar */}
      <div className="bg-amber-600 text-white text-xs py-1 px-4 text-center font-medium flex justify-between items-center max-w-5xl mx-auto">
        <span className="truncate flex items-center justify-center sm:justify-start gap-1 font-bold">
          <Flame className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300 shrink-0" />
          <span>BÀO NGƯ KHÔ VIỆT HÀN - THỰC PHẨM CAO CẤP GIẢM 50%</span>
        </span>
        <div className="hidden sm:flex items-center gap-4">
          <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5" /> Cam kết chính hãng</span>
          <a href="tel:0354635234" className="flex items-center gap-1 hover:underline font-bold">
            <PhoneCall className="w-3.5 h-3.5" /> Hotline: 0352.949.123
          </a>
        </div>
      </div>

      {/* Main Tab Bar */}
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Navigation Tabs (matching image: Tổng quan | Đánh giá | Mô tả) */}
        <nav className="flex items-center gap-6 text-sm font-semibold text-gray-600 w-full justify-around sm:justify-start">
          <button
            id="nav-tab-overview"
            onClick={() => scrollTo('overview-section', 'overview')}
            className={`py-3 px-2 relative transition-colors ${
              activeTab === 'overview' ? 'text-amber-700 font-bold' : 'hover:text-amber-600'
            }`}
          >
            Tổng quan
            {activeTab === 'overview' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
            )}
          </button>

          <button
            id="nav-tab-reviews"
            onClick={() => scrollTo('reviews-section', 'reviews')}
            className={`py-3 px-2 relative transition-colors ${
              activeTab === 'reviews' ? 'text-amber-700 font-bold' : 'hover:text-amber-600'
            }`}
          >
            Đánh giá
            {activeTab === 'reviews' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
            )}
          </button>

          <button
            id="nav-tab-description"
            onClick={() => scrollTo('description-section', 'description')}
            className={`py-3 px-2 relative transition-colors ${
              activeTab === 'description' ? 'text-amber-700 font-bold' : 'hover:text-amber-600'
            }`}
          >
            Mô tả
            {activeTab === 'description' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
            )}
          </button>
        </nav>

        <div className="hidden sm:flex items-center gap-2">

          {/* CTA Button */}
          <button
            id="btn-nav-order"
            onClick={onOrderClick}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold text-xs uppercase px-4 py-2 rounded-full shadow-md hover:brightness-105 transition-all whitespace-nowrap"
          >
            <ShoppingCart className="w-4 h-4" /> Đặt mua ngay
          </button>
        </div>
      </div>
    </header>
  );
};
