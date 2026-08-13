import React from 'react';
import { Phone, ShoppingCart, Zap } from 'lucide-react';

interface MobileStickyBarProps {
  onOrderClick: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOrderClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-amber-200 p-2.5 shadow-2xl sm:hidden">
      <div className="max-w-md mx-auto flex items-center gap-2">
        
        {/* Call Hotline Button */}
        <a
          href="tel:0354635234"
          className="flex-1 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs py-3 px-3 rounded-xl border border-amber-300 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
        >
          <Phone className="w-4 h-4 text-amber-600 animate-bounce" />
          <span>Gọi Hotline</span>
        </a>

        {/* Buy Now Button */}
        <button
          id="btn-sticky-buy-now"
          onClick={onOrderClick}
          className="flex-[2] bg-gradient-to-r from-orange-500 via-amber-600 to-orange-600 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-1.5 uppercase tracking-wide active:scale-95 transition-all"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>ĐẶT HÀNG NGAY (279K)</span>
        </button>

      </div>
    </div>
  );
};
