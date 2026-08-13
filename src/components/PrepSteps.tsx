import React from 'react';
import { Clock, ChefHat } from 'lucide-react';
import { PREPARATION_STEPS } from '../data/productData';

export const PrepSteps: React.FC = () => {
  return (
    <section className="max-w-md mx-auto my-4 px-4">
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-amber-100 space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <ChefHat className="w-5 h-5 text-amber-600" />
          <h2 className="text-base font-extrabold text-gray-900">
            Tiến hành chế biến:
          </h2>
        </div>

        <div className="space-y-3.5">
          {PREPARATION_STEPS.map((stepItem, idx) => (
            <div key={idx} className="flex gap-3 items-start">
              <div className="bg-amber-100 text-amber-900 font-extrabold text-[11px] px-2.5 py-1 rounded-lg uppercase shrink-0 tracking-wider">
                {stepItem.step}:
              </div>
              <p className="text-xs text-gray-700 leading-relaxed font-normal pt-0.5">
                {stepItem.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
