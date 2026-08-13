import React from 'react';
import { CheckCircle2, PackageCheck, PhoneCall, Truck, X, Sparkles } from 'lucide-react';
import { SubmittedOrder } from '../types';

interface OrderSuccessModalProps {
  order: SubmittedOrder | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative border border-amber-200 animate-scaleUp">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10 animate-bounce" />
          </div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight">
            ĐẶT HÀNG THÀNH CÔNG!
          </h2>
          <p className="text-xs text-emerald-700 font-semibold bg-emerald-50 py-1 px-3 rounded-full inline-block border border-emerald-200">
            Mã đơn hàng: <strong className="font-mono text-gray-900">#{order.id}</strong>
          </p>
        </div>

        {/* Order details summary */}
        <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-100 space-y-2 text-xs text-gray-700">
          <div className="flex justify-between">
            <span className="text-gray-500">Khách hàng:</span>
            <strong className="text-gray-900">{order.fullName}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Số điện thoại:</span>
            <strong className="text-gray-900">{order.phone}</strong>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-gray-500 shrink-0">Địa chỉ giao:</span>
            <div className="relative group/tooltip flex justify-end">
              <strong className="text-gray-900 text-right max-w-[180px] line-clamp-2 break-words cursor-pointer hover:text-amber-700 transition-colors">
                {order.addressDetail}, {order.ward}, {order.district}, {order.province}
              </strong>
              {/* Tooltip */}
              <div className="absolute bottom-full right-0 mb-2 hidden group-hover/tooltip:block group-active/tooltip:block w-52 bg-gray-950/95 backdrop-blur-sm text-white text-[11px] p-2.5 rounded-xl shadow-xl z-50 text-left pointer-events-none break-words border border-gray-800 animate-fadeIn">
                <span className="font-semibold text-amber-300 block mb-0.5">Địa chỉ đầy đủ:</span>
                <span>{order.addressDetail}, {order.ward}, {order.district}, {order.province}</span>
                <div 
                  className="absolute top-full right-5 w-0 h-0"
                  style={{
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderTop: '6px solid rgba(3, 7, 18, 0.95)',
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between pt-1 border-t border-amber-200">
            <span className="text-gray-500">Tổng thanh toán:</span>
            <strong className="text-orange-600 text-sm font-extrabold">
              {order.totalAmount.toLocaleString('vi-VN')}đ
            </strong>
          </div>
          <div className="flex justify-between text-[11px] text-gray-500">
            <span>Hình thức:</span>
            <span className="font-semibold text-gray-800">
              {order.paymentMethod === 'cod' ? 'Thanh toán COD khi nhận hàng' : 'Chuyển khoản ngân hàng'}
            </span>
          </div>
        </div>

        {/* Delivery Timeline Notice */}
        <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
          <Truck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold">Dự kiến giao hàng: 2 - 3 ngày (Freeship toàn quốc)</p>
            <p className="text-[11px] text-emerald-700 font-medium flex items-start gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Dữ liệu đơn hàng đã được tự động ghi nhận vào hệ thống quản lý Google Sheet. Nhân viên sẽ gọi điện thoại xác nhận trong ít phút!</span>
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-2 pt-1">
          <a
            href="tel:0354635234"
            className="w-full bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 border border-amber-300 transition-all"
          >
            <PhoneCall className="w-4 h-4 text-amber-700" /> Cần tư vấn gấp? Gọi 0354.635.234
          </a>

          <button
            onClick={onClose}
            className="w-full bg-gray-900 hover:bg-black text-white font-bold text-xs py-3 rounded-xl transition-all uppercase tracking-wide"
          >
            Hoàn tất & Tiếp tục
          </button>
        </div>

      </div>
    </div>
  );
};
