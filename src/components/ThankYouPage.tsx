import React from 'react';
import { 
  CheckCircle2, 
  Package, 
  PhoneCall, 
  Home, 
  Calendar,
  CreditCard,
  MapPin,
  Sparkles
} from 'lucide-react';
import { SubmittedOrder } from '../types';
import { QUANTITY_OPTIONS } from '../data/productData';

interface ThankYouPageProps {
  order: SubmittedOrder | null;
  onBackToHome: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ order, onBackToHome }) => {
  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md bg-white rounded-3xl p-8 shadow-xl border border-amber-100 space-y-6">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
            <Package className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-gray-900">Không tìm thấy thông tin đơn hàng</h2>
          <p className="text-gray-600 text-sm">Vui lòng quay lại trang chủ và đặt hàng lại.</p>
          <button
            onClick={onBackToHome}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  const selectedProduct = QUANTITY_OPTIONS.find(opt => opt.id === order.quantityOptionId);


  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30 text-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Animated Celebration & Thank You Banner */}
        <div className="text-center space-y-4 relative overflow-hidden bg-white border border-amber-200/60 rounded-3xl p-8 shadow-lg">
          {/* Decorative Sparkles */}
          <div className="absolute top-4 left-6 text-amber-400 animate-pulse">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="absolute bottom-4 right-6 text-amber-400 animate-pulse delay-75">
            <Sparkles className="w-5 h-5" />
          </div>

          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full shadow-inner animate-bounce">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">
            CẢM ƠN BẠN ĐÃ ĐẶT HÀNG!
          </h1>
          <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
            Đơn hàng của bạn đã được tiếp nhận thành công. Chúng tôi đang xử lý và sẽ liên hệ sớm nhất để xác nhận giao hàng.
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Order Details Column */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md space-y-4">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b border-gray-100 pb-2">Thông tin chi tiết</h3>
            
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-start">
                <span className="text-gray-500">Sản phẩm:</span>
                <span className="text-gray-900 font-bold text-right max-w-[200px]">
                  {selectedProduct ? selectedProduct.label : 'Bào Ngư Sấy Golden Food'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Tổng tiền thanh toán:</span>
                <span className="text-orange-600 font-extrabold text-sm">
                  {order.totalAmount.toLocaleString('vi-VN')}đ
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-100">
                <span className="text-gray-500 flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-gray-400" /> Thanh toán:
                </span>
                <span className="font-semibold text-gray-800 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 text-[11px]">
                  {order.paymentMethod === 'cod' ? 'COD (Nhận hàng trả tiền)' : 'Chuyển khoản ngân hàng'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" /> Ngày đặt:
                </span>
                <span className="text-gray-800 font-medium">
                  {!isNaN(new Date(order.createdAt).getTime())
                    ? `${new Date(order.createdAt).toLocaleDateString('vi-VN')} ${new Date(order.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`
                    : order.createdAt}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Address Details Column */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md space-y-4">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b border-gray-100 pb-2">Thông tin giao nhận</h3>
            
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Người nhận:</span>
                <strong className="text-gray-900">{order.fullName}</strong>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Điện thoại:</span>
                <strong className="text-gray-900">{order.phone}</strong>
              </div>

              <div className="flex justify-between items-start gap-2">
                <span className="text-gray-500 shrink-0 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" /> Địa chỉ:
                </span>
                <span className="text-gray-850 font-medium text-right max-w-[180px] break-words">
                  {order.addressDetail}, {order.ward}, {order.district}, {order.province}
                </span>
              </div>

              {order.note && (
                <div className="pt-2 border-t border-dashed border-gray-100">
                  <span className="text-gray-500 block mb-0.5">Ghi chú giao hàng:</span>
                  <p className="text-[11px] text-gray-600 bg-gray-50 p-2 rounded border border-gray-100 italic">
                    "{order.note}"
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <a
            href="tel:0354635234"
            className="flex-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 font-bold text-xs py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
          >
            <PhoneCall className="w-4 h-4 text-amber-700" /> Hotline: 0354.635.234
          </a>
        </div>

        <div className="pt-2">
          <button
            onClick={onBackToHome}
            className="w-full bg-gray-900 hover:bg-black text-white font-bold text-xs py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-98 uppercase tracking-wider"
          >
            <Home className="w-4 h-4" /> Quay Lại Cửa Hàng
          </button>
        </div>

      </div>
    </div>
  );
};
