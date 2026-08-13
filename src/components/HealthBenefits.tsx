import React from 'react';
import { Heart, Sparkles, ThumbsUp, Check, ShieldAlert, Award } from 'lucide-react';
import { HEALTH_BENEFITS, PRODUCT_IMAGES } from '../data/productData';

export const HealthBenefits: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-600" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-red-600" />;
      case 'ThumbsUp':
        return <ThumbsUp className="w-5 h-5 text-blue-600" />;
      default:
        return <Check className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <section className="max-w-md mx-auto my-4 px-4 space-y-4">
      {/* Top Banner Graphic matching Screenshot 6 */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 p-4 rounded-2xl text-white shadow-md space-y-3">
        <div className="text-center">
          <h2 className="text-2xl font-black uppercase tracking-wide text-yellow-100 drop-shadow">
            NHÂN BÀO NGƯ
          </h2>
          <p className="text-xs text-amber-100 font-medium">Bổ dưỡng - Cao cấp - An toàn cho cả gia đình</p>
        </div>

        {/* 3 Red Pills matching Screenshot 6 */}
        <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold">
          <div className="bg-red-700/90 backdrop-blur p-2 rounded-xl border border-red-500/40 shadow-sm">
            Tốt cho tim mạch, xương chắc khoẻ
          </div>
          <div className="bg-red-700/90 backdrop-blur p-2 rounded-xl border border-red-500/40 shadow-sm">
            Giàu Protein, Vitamin A, B1, B2,...
          </div>
          <div className="bg-red-700/90 backdrop-blur p-2 rounded-xl border border-red-500/40 shadow-sm">
            Chậm lão hoá, cải thiện suy nhược
          </div>
        </div>

        {/* Banner image preview */}
        <div className="rounded-xl overflow-hidden shadow border border-amber-300/40">
          <img
            src={PRODUCT_IMAGES.hero}
            alt="Bào ngư bổ dưỡng"
            className="w-full h-44 object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Main Benefits List matching Screenshot 13 */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-amber-100 space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <Award className="w-5 h-5 text-amber-600" />
          <h2 className="text-lg font-extrabold text-gray-900">
            Lợi ích của bào ngư đối với sức khỏe
          </h2>
        </div>

        <div className="space-y-3.5">
          {HEALTH_BENEFITS.map((item, idx) => (
            <div key={idx} className="flex gap-3 items-start bg-amber-50/40 p-3 rounded-xl border border-amber-100/60">
              <div className="p-2.5 bg-white rounded-xl shadow-sm shrink-0 border border-amber-100">
                {getIcon(item.icon)}
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-gray-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
