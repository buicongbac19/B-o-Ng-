import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle, X } from 'lucide-react';
import { RECENT_PURCHASES } from '../data/productData';

export const RecentOrderToast: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show toast every 12 seconds for 5 seconds
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % RECENT_PURCHASES.length);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 5000);
    }, 12000);

    // Initial show after 3s
    const initialTimer = setTimeout(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimer);
    };
  }, []);

  if (!visible) return null;

  const current = RECENT_PURCHASES[index];

  return (
    <div className="fixed bottom-16 left-3 z-50 max-w-xs bg-white p-2.5 pr-8 rounded-2xl shadow-xl border border-amber-200 flex items-center gap-2.5 animate-bounce-short text-xs">
      <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 border border-amber-300">
        <ShoppingBag className="w-4 h-4 text-amber-700" />
      </div>

      <div className="space-y-0.5">
        <div className="flex items-center gap-1 font-bold text-gray-900 text-[11px]">
          <span>{current.name}</span>
          <span className="text-gray-400 font-normal">({current.location})</span>
          <CheckCircle className="w-3 h-3 text-emerald-500 fill-emerald-500 text-white" />
        </div>
        <p className="text-[10px] text-amber-800 font-medium">
          Vừa đặt <strong>{current.quantity}</strong> • {current.time}
        </p>
      </div>

      <button
        onClick={() => setVisible(false)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
