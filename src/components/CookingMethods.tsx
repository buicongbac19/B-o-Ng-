import React from 'react';
import { Utensils, Flame, Snowflake, Sparkles } from 'lucide-react';
import { COOKING_METHODS } from '../data/productData';

export const CookingMethods: React.FC = () => {
  return (
    <section className="max-w-md mx-auto my-4 px-4 space-y-4">
      {/* Cooking Methods Cards matching Screenshot 7 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <Utensils className="w-5 h-5 text-amber-600" />
          <h2 className="text-lg font-extrabold text-gray-900">
            Hướng dẫn các món ăn ngon
          </h2>
        </div>

        {/* Món hầm */}
        <div className="bg-gradient-to-r from-red-800 to-red-900 text-white rounded-2xl p-4 shadow-md overflow-hidden relative border border-red-700">
          <div className="flex justify-between items-start gap-3">
            <div className="space-y-2 flex-1">
              <span className="bg-amber-400 text-red-950 font-black text-xs px-2.5 py-1 rounded-md uppercase tracking-wider inline-block">
                Món hầm
              </span>
              <p className="text-xs text-amber-100 font-medium leading-relaxed pt-1">
                Phù hợp khi không có thời gian chuẩn bị, ngâm nước lạnh 15p, rửa lại, rồi mang đi hầm kèm các nguyên liệu khác trong 45-60p ở lửa vừa thêm gia vị cho phù hợp rồi thưởng thức.
              </p>
            </div>
            <div className="w-24 h-24 rounded-full border-2 border-amber-300 overflow-hidden shrink-0 shadow-lg">
              <img
                src={COOKING_METHODS[0].image}
                alt="Món hầm bào ngư"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Món xào */}
        <div className="bg-gradient-to-r from-amber-800 to-amber-900 text-white rounded-2xl p-4 shadow-md overflow-hidden relative border border-amber-700">
          <div className="flex justify-between items-start gap-3">
            <div className="w-24 h-24 rounded-full border-2 border-amber-300 overflow-hidden shrink-0 shadow-lg order-2 sm:order-1">
              <img
                src={COOKING_METHODS[1].image}
                alt="Món xào bào ngư"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-2 flex-1 order-1 sm:order-2">
              <span className="bg-white text-amber-900 font-black text-xs px-2.5 py-1 rounded-md uppercase tracking-wider inline-block">
                Món xào
              </span>
              <p className="text-xs text-amber-100 font-medium leading-relaxed pt-1">
                Phù hợp khi có thời gian chuẩn bị trước, Bào ngư cần ngâm nước lạnh 24h cho mềm, rửa lại, nếu cần thái nhỏ nên hầm cách thủy cho mềm rồi chế biến.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Storage instructions matching Screenshot 14 */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-amber-100 space-y-3">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-2.5">
          <Snowflake className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-extrabold text-gray-900">
            Các cách bảo quản
          </h2>
        </div>

        <ul className="space-y-2 text-xs text-gray-700 list-disc pl-4 leading-relaxed font-normal">
          <li>
            Bọc kín bào ngư bằng túi hút chân không hoặc hộp kín khí để tránh mùi và hơi ẩm xâm nhập.
          </li>
          <li>
            Để lên ngăn đá (tủ đông) nếu muốn lưu trữ trong nhiều tháng liền mà không sợ mất đi chất bổ dưỡng.
          </li>
        </ul>
      </div>
    </section>
  );
};
