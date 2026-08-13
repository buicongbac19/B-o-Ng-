import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

export const FlashSaleBanner: React.FC = () => {
  // Countdown state: starts at 6 minutes 0 seconds
  const [timeLeft, setTimeLeft] = useState(6 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 12 * 3600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formatNum = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="bg-orange-600 text-white shadow-md">
      <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-black text-sm uppercase tracking-wide">
          <Zap className="w-4 h-4 text-white fill-white" />
          <span>ƯU ĐÃI GIỜ VÀNG!</span>
        </div>

        <div className="bg-red-800/90 text-yellow-300 font-mono font-extrabold text-xs px-3 py-1 rounded-md tracking-wider shadow-inner">
          {formatNum(hours)} : {formatNum(minutes)} : {formatNum(seconds)}
        </div>
      </div>
    </div>
  );
};

