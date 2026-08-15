import React from 'react';
import { Star, ShieldCheck, ShoppingBag, CheckCircle } from 'lucide-react';
import { PRODUCT_IMAGES } from '../data/productData';

export const ShopBadge: React.FC = () => {
  return (
    <div className="max-w-md mx-auto my-4 px-4">
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-amber-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Shop Avatar */}
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-amber-500 shrink-0 shadow-sm">
            <img
              src={PRODUCT_IMAGES.hero}
              alt="BÀO NGƯ SẤY GOLDEN FOOD Logo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-gray-900 text-base tracking-tight">
                BÀO NGƯ SẤY GOLDEN FOOD
              </h3>
              <CheckCircle className="w-4 h-4 fill-emerald-500 text-white" />
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-amber-600" /> Shop Uy tín
              </span>

              <span className="bg-teal-50 text-teal-700 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-teal-100">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 4.8
              </span>
            </div>

            <p className="text-xs text-gray-500 font-medium mt-1.5 flex items-center gap-1">
              <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
              <span><strong>20.8k</strong> Khách hàng đã mua</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
