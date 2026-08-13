import React from 'react';
import { Camera, ZoomIn } from 'lucide-react';
import { PRODUCT_IMAGES } from '../data/productData';

interface ProductGalleryProps {
  onOpenGallery: (index: number) => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ onOpenGallery }) => {
  const images = [
    { src: PRODUCT_IMAGES.hero, title: 'Bào ngư khô nguyên con' },
    { src: PRODUCT_IMAGES.packagedBag, title: 'Túi đựng Bào Ngư Khô Việt Hàn' },
    { src: PRODUCT_IMAGES.stewDish, title: 'Bào ngư ngâm nở chế biến' },
    { src: PRODUCT_IMAGES.platePresentation, title: 'Đĩa bào ngư sấy khô cao cấp' },
  ];

  return (
    <section className="max-w-md mx-auto my-4 px-4">
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-amber-100 space-y-4">
        
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-extrabold text-gray-900">
              Hình ảnh sản phẩm thực tế
            </h2>
          </div>
          <span className="text-xs text-amber-600 font-semibold cursor-pointer hover:underline" onClick={() => onOpenGallery(0)}>
            Xem tất cả ({images.length})
          </span>
        </div>

        {/* Asymmetric Image Grid matching Screenshot 15 */}
        <div className="grid grid-cols-3 gap-2">
          {/* Main Large Image */}
          <div
            onClick={() => onOpenGallery(0)}
            className="col-span-2 relative aspect-[4/5] rounded-xl overflow-hidden border border-gray-200 cursor-pointer group shadow-sm"
          >
            <img
              src={images[0].src}
              alt={images[0].title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <ZoomIn className="w-6 h-6" />
            </div>
            <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded">
              Thực tế
            </div>
          </div>

          {/* Right Thumbnails Column */}
          <div className="col-span-1 flex flex-col gap-2">
            {images.slice(1, 4).map((img, idx) => (
              <div
                key={idx}
                onClick={() => onOpenGallery(idx + 1)}
                className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 cursor-pointer group shadow-sm"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
