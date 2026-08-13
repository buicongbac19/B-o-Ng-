import React from 'react';
import { Info, PackageCheck, Globe, Scale } from 'lucide-react';

export const ProductDetails: React.FC = () => {
  return (
    <section id="description-section" className="max-w-md mx-auto my-4 px-4">
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-amber-100 space-y-4">
        
        {/* Title */}
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <Info className="w-5 h-5 text-amber-600" />
          <h2 className="text-lg font-extrabold text-gray-900">
            Giới thiệu về sản phẩm
          </h2>
        </div>

        {/* Content Paragraph */}
        <p className="text-sm text-gray-700 leading-relaxed font-normal">
          Bào ngư là món ngon cực bổ dưỡng và nhiều chất đạm. Vì thế, bào ngư được mọi người ưa chuộng làm món ăn bổ dưỡng hoặc tự thưởng. Tuy nhiên, so với bào ngư tươi, bào ngư khô giúp ta bảo quản được tốt hơn nên món này đã nhanh chóng trở thành món ăn không thể thiếu trong thực đơn các món trong quý của mỗi gia đình.
        </p>

        {/* Product Specs List */}
        <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-100 space-y-2.5 text-xs text-gray-800 font-medium">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-4 h-4 text-amber-600 shrink-0" />
            <span><strong>Tên sản phẩm:</strong> Bào Ngư Sấy Khô Việt Hàn</span>
          </div>
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-600 shrink-0" />
            <span><strong>Quy cách đóng gói:</strong> Gói 200g & Gói 500g</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-600 shrink-0" />
            <span><strong>Xuất xứ:</strong> Việt Nam</span>
          </div>
        </div>

      </div>
    </section>
  );
};
