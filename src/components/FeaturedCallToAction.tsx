import React, { useState, useEffect } from 'react';
import { Truck, Sparkles } from 'lucide-react';
import { PRODUCT_IMAGES } from '../data/productData';

interface FeaturedCallToActionProps {
  onOrderClick: () => void;
}

export const FeaturedCallToAction: React.FC<FeaturedCallToActionProps> = ({ onOrderClick }) => {
  const [timeLeft, setTimeLeft] = useState(9 * 60 + 21);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 12 * 3600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  const millis = Math.floor((timeLeft * 10) % 99);

  const formatNum = (num: number) => String(num).padStart(2, '0');

  return (
    <section className="max-w-md mx-auto my-6 px-4">
      <div className="bg-white p-5 rounded-2xl shadow-md border border-amber-200 text-center space-y-4">
        
        {/* Title matching screenshot 16 */}
        <div className="space-y-1">
          <h2 className="text-lg font-black text-gray-900 tracking-tight uppercase leading-snug">
            BÀO NGƯ THƯỢNG HẠNG – XỨNG TẦM THƯỢNG KHÁCH
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full" />
        </div>

        {/* 4-Image collage grid matching screenshot 16 */}
        <div className="grid grid-cols-2 gap-1.5 rounded-xl overflow-hidden shadow-sm border border-amber-100">
          <img src={PRODUCT_IMAGES.hero} alt="Bào ngư 1" className="w-full h-28 object-cover" referrerPolicy="no-referrer" />
          <img src={PRODUCT_IMAGES.stewDish} alt="Bào ngư 2" className="w-full h-28 object-cover" referrerPolicy="no-referrer" />
          <img src={PRODUCT_IMAGES.platePresentation} alt="Bào ngư 3" className="w-full h-28 object-cover" referrerPolicy="no-referrer" />
          <img src={PRODUCT_IMAGES.hero} alt="Bào ngư 4" className="w-full h-28 object-cover" referrerPolicy="no-referrer" />
        </div>

        {/* Pricing */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-gray-500">Giá ưu đãi từ:</span>
            <span className="text-2xl font-black text-gray-900">279.000đ</span>
            <span className="bg-orange-100 text-orange-600 font-bold text-xs px-2 py-0.5 rounded-full">
              - 50%
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <span className="line-through">560.000đ</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" /> Miễn phí vận chuyển toàn quốc
            </span>
          </div>
        </div>

        {/* Countdown boxes matching screenshot 16 */}
        <div className="space-y-2 pt-1">
          <p className="text-xs font-semibold text-gray-500">Kết thúc sau:</p>
          <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto font-mono">
            <div className="bg-gray-100 p-2.5 rounded-xl font-black text-xl text-gray-900 shadow-inner">
              {formatNum(hours)}
            </div>
            <div className="bg-gray-100 p-2.5 rounded-xl font-black text-xl text-gray-900 shadow-inner">
              {formatNum(minutes)}
            </div>
            <div className="bg-gray-100 p-2.5 rounded-xl font-black text-xl text-gray-900 shadow-inner">
              {formatNum(seconds)}
            </div>
            <div className="bg-gray-100 p-2.5 rounded-xl font-black text-xl text-orange-600 shadow-inner">
              {formatNum(millis)}
            </div>
          </div>
        </div>

        {/* SẮN NGAY Button */}
        <button
          id="btn-cta-san-ngay"
          onClick={onOrderClick}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-lg py-4 px-6 rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 transition-all transform hover:scale-[1.01] uppercase tracking-wider flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-yellow-200" />
          SẮN NGAY
        </button>

      </div>
    </section>
  );
};
