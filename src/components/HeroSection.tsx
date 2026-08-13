import React, { useState } from 'react';
import { Star, ShieldCheck, Truck, RefreshCw, CheckCircle2, ChevronLeft, ChevronRight, Eye, ShoppingBag } from 'lucide-react';
import { PRODUCT_IMAGES } from '../data/productData';
import { FlashSaleBanner } from './FlashSaleBanner';

interface HeroSectionProps {
  onOrderClick: () => void;
  onOpenGallery: (imageIndex: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOrderClick, onOpenGallery }) => {
  const images = [
    PRODUCT_IMAGES.hero,
    PRODUCT_IMAGES.stewDish,
    PRODUCT_IMAGES.platePresentation,
    PRODUCT_IMAGES.packagedBag,
  ];

  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const prevImage = () => {
    setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="overview-section" className="bg-gradient-to-b from-amber-50/50 to-white pb-6">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-b-2xl overflow-hidden border border-amber-100">
        
        {/* Main Product Banner / Poster Image */}
        <div className="relative aspect-square bg-amber-100 overflow-hidden group">
          <img
            src={images[currentImgIndex]}
            alt="Nhân bào ngư khô Việt Hàn"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
            referrerPolicy="no-referrer"
            onClick={() => onOpenGallery(currentImgIndex)}
          />

          {/* Graphical Banner Text Overlay matching screenshot */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-amber-950/40 backdrop-blur-sm px-6 py-1.5 rounded-2xl border border-amber-200/30 text-white text-center shadow-lg pointer-events-none whitespace-nowrap z-10">
            <h1 className="text-xl font-black tracking-wide text-yellow-300 drop-shadow">
              Nhân bào ngư
            </h1>
            <p className="text-[11px] font-semibold text-amber-100 italic">
              Cho bữa cơm nhà thêm dưỡng chất
            </p>
          </div>

          {/* Floating Benefit Badges matching screenshot */}
          <div className="absolute top-20 left-2.5 bg-amber-50/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow border border-amber-200 text-[11px] font-bold text-gray-900 flex items-center gap-1 z-10">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            Bổ sung dinh dưỡng
          </div>

          <div className="absolute top-36 right-2.5 bg-pink-50/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow border border-pink-200 text-[11px] font-bold text-gray-900 flex items-center gap-1 z-10">
            <span className="w-2 h-2 rounded-full bg-pink-500"></span>
            Đẹp da mượt tóc
          </div>

          <div className="absolute bottom-12 right-2.5 bg-amber-50/95 backdrop-blur-md px-3 py-1 rounded-full shadow border border-amber-200 text-[11px] font-black text-red-700 flex items-center gap-1 z-10">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            Tăng cường miễn dịch
          </div>

          {/* Bottom Badges Matching Screenshot: MIỄN PHÍ vận chuyển | Bảo hành chất lượng */}
          <div className="absolute bottom-0 left-0 right-0 bg-emerald-600 text-white p-2 px-3 flex justify-between items-center text-xs font-bold z-10">
            <div className="flex items-center gap-1">
              <Truck className="w-4 h-4 text-yellow-300" />
              <span>MIỄN PHÍ <span className="font-normal text-[11px] text-emerald-100">vận chuyển</span></span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-yellow-300" />
              <span>Bảo hành <span className="font-normal text-[11px] text-emerald-100">chất lượng</span></span>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full transition-all z-10"
            aria-label="Ảnh trước"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full transition-all z-10"
            aria-label="Ảnh tiếp"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Gallery View Indicator */}
          <button
            onClick={() => onOpenGallery(currentImgIndex)}
            className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white text-[10px] font-medium px-2 py-1 rounded-md flex items-center gap-1 backdrop-blur-sm z-20"
          >
            <Eye className="w-3 h-3" /> Xem ảnh ({currentImgIndex + 1}/{images.length})
          </button>
        </div>

        {/* Thumbnail selector */}
        <div className="flex gap-2 p-3 bg-gray-50 border-b border-gray-100 overflow-x-auto justify-center">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImgIndex(idx)}
              className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                currentImgIndex === idx ? 'border-orange-500 ring-1 ring-orange-400' : 'border-gray-200 opacity-80'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </button>
          ))}
        </div>

        {/* Flash sale live timer bar */}
        <FlashSaleBanner />

        {/* Price & Primary Details Block */}
        <div className="p-4 space-y-3">
          {/* Price Header */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-3xl font-black text-red-600 tracking-tight">
              279.000đ
            </span>
            <span className="text-sm font-semibold text-gray-400 line-through">
              560.000đ
            </span>
            <span className="bg-pink-100 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full">
              Tiết kiệm 50%
            </span>
          </div>

          {/* Deal tagline */}
          <div className="text-xs font-bold text-red-600 flex items-center gap-2 bg-pink-50/90 p-2.5 rounded-xl border border-pink-100/90">
            <ShoppingBag className="w-4 h-4 text-red-600 shrink-0" />
            <span>Ưu đãi giờ vàng! Săn ngay!</span>
          </div>

          {/* Product Title */}
          <p className="text-sm text-gray-800 leading-snug font-medium">
            Bào ngư khô-thực phẩm được chế biến từ loài bào ngư tươi sống quý hiếm, rất tiện dụng dễ dàng chế biến, và giá bán bào ngư khô hợp lý
          </p>

          {/* Rating & Sold count */}
          <div className="flex items-center gap-2 text-xs text-gray-600 border-b border-gray-100 pb-3">
            <div className="flex items-center text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
              <span>4.8/5</span>
              <span className="text-gray-400 font-normal ml-1">(250)</span>
            </div>
            <span className="text-gray-300">|</span>
            <span className="text-gray-600">Đã bán <strong className="text-gray-900">999+</strong></span>
          </div>

          {/* Shipping Guarantees */}
          <div className="space-y-2.5 pt-1 text-xs text-gray-700">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">Vận chuyển</span>
              <div className="flex items-center gap-1">
                <span className="line-through text-gray-400">30.000đ</span>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  Free
                </span>
              </div>
            </div>

            <div className="space-y-1.5 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Miễn phí vận chuyển toàn quốc</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Thanh toán khi nhận hàng (COD)</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-emerald-600" />
                <span>Trả hàng miễn phí trong 7 ngày</span>
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            id="btn-hero-buy-now"
            onClick={onOrderClick}
            className="w-full bg-gradient-to-r from-orange-500 via-amber-600 to-orange-600 text-white font-extrabold text-base py-3.5 px-6 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
          >
            SẮN NGAY VỚI GIÁ 279.000đ
          </button>
        </div>

      </div>
    </section>
  );
};
