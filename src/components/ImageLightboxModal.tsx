import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCT_IMAGES } from '../data/productData';

interface LightboxProps {
  isOpen: boolean;
  initialIndex: number;
  onClose: () => void;
}

export const ImageLightboxModal: React.FC<LightboxProps> = ({ isOpen, initialIndex, onClose }) => {
  const [index, setIndex] = React.useState(initialIndex);

  React.useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  if (!isOpen) return null;

  const galleryList = [
    { src: PRODUCT_IMAGES.hero, title: 'Bào ngư khô Việt Hàn nguyên con' },
    { src: PRODUCT_IMAGES.stewDish, title: 'Bào ngư hầm súp nấm thơm ngon' },
    { src: PRODUCT_IMAGES.platePresentation, title: 'Thành phẩm bào ngư hầm sốt vàng ruộm' },
    { src: PRODUCT_IMAGES.packagedBag, title: 'Bao bì gói Bào Ngư Khô Việt Hàn 200g' },
  ];

  const prev = () => setIndex((i) => (i === 0 ? galleryList.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === galleryList.length - 1 ? 0 : i + 1));

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/40 p-2.5 rounded-full transition-all"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Main Image container */}
      <div className="max-w-2xl w-full flex flex-col items-center space-y-4">
        <div className="relative w-full aspect-square max-h-[70vh] rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-white/20">
          <img
            src={galleryList[index].src}
            alt={galleryList[index].title}
            className="max-w-full max-h-full object-contain"
            referrerPolicy="no-referrer"
          />

          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center text-white space-y-1">
          <p className="text-sm font-bold">{galleryList[index].title}</p>
          <p className="text-xs text-gray-400">Ảnh {index + 1} / {galleryList.length}</p>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2">
          {galleryList.map((item, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                index === i ? 'border-amber-500 scale-105' : 'border-transparent opacity-60'
              }`}
            >
              <img src={item.src} alt="thumb" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
