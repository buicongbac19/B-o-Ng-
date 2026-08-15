import React from 'react';
import { MapPin, Phone, Clock, Music2, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 text-xs py-8 border-t border-gray-200 mb-16 sm:mb-0">
      <div className="max-w-md mx-auto px-5 space-y-4">
        
        {/* Brand Header */}
        <div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight">
            Bào Ngư Sấy Golden Food
          </h2>
          <p className="text-xs text-gray-600 font-medium mt-0.5">
            Bào ngư khô – lựa chọn lý tưởng cho những bữa ăn vừa ngon miệng vừa sang trọng
          </p>
        </div>

        {/* Contact Info List matching Screenshot 18 */}
        <div className="space-y-3 font-normal text-gray-700">
          
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>Tổ 17,  Phường Hải Châu 1, quận Hải Châu, Tp Đà Nẵng</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-amber-700 shrink-0" />
            <a href="tel:0352949123" className="font-bold text-gray-900 hover:text-amber-700">
              0352.949.123
            </a>
          </div>


          <div className="flex items-start gap-2.5 pt-1">
            <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">Thời gian làm việ<c:24/7></c:24/7></p>
              <p className="text-[11px] text-gray-500">(Tất cả các ngày trong tuần)</p>
            </div>
          </div>

        </div>

        {/* Social Links matching Screenshot 18 */}
        <div className="flex items-center gap-3 pt-2">
          <a
  href="https://www.facebook.com/baongusaygoldenfood?locale=vi_VN"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Facebook"
  className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow hover:opacity-90 transition-opacity"
>
  f
</a>
          
      
          <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs shadow hover:opacity-90 transition-opacity">
            ig
          </a>
          <a href="#" aria-label="TikTok" className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shadow hover:opacity-90 transition-opacity">
            <Music2 className="w-4 h-4" />
          </a>
          <a href="#" aria-label="Zalo" className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center shadow hover:opacity-90 transition-opacity">
            <Zap className="w-4 h-4 fill-white" />
          </a>
        </div>

        <div className="border-t border-gray-200 pt-3 text-center text-[11px] text-gray-500">
          © 2026 Bào Ngư Sấy Golden Food. All rights reserved.
        </div>

      </div>
    </footer>
  );
};
