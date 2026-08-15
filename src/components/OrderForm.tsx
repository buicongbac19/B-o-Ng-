import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle2, ShieldCheck, MapPin, Phone, User, Gift, CreditCard, ChevronRight, Loader2, AlertCircle, ChevronDown } from 'lucide-react';
import { QUANTITY_OPTIONS } from '../data/productData';
import { OrderFormData, SubmittedOrder } from '../types';
import { syncOrderToGoogleSheets } from '../lib/googleSheets';
import { VIETNAM_PROVINCES } from '../data/vietnamLocations';

interface OrderFormProps {
  onOrderSuccess: (order: SubmittedOrder) => void;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  addressDetail?: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { code: string; name: string }[];
  placeholder?: string;
  loading?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, options, placeholder, loading }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const selectedOption = options.find((o) => o.code === value);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  React.useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
    if (!isOpen) {
      setSearchQuery('');
    }
  }, [isOpen]);

  const filteredOptions = options.filter((opt) =>
    opt.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-gray-50 text-xs pl-4 pr-10 py-3.5 rounded-xl border transition-all cursor-pointer text-left shadow-sm font-semibold flex items-center justify-between focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/30 ${
          isOpen
            ? 'border-orange-500 ring-2 ring-orange-500/20 text-orange-950 bg-white'
            : 'border-gray-300 text-gray-850 hover:border-orange-300'
        }`}
      >
        <span>{selectedOption ? selectedOption.name : (placeholder || 'Chọn...')}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-orange-600' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-1.5 bg-white border border-orange-200 rounded-xl shadow-xl z-35 overflow-hidden animate-fadeIn flex flex-col">
          {/* Search Input */}
          <div className="p-2 border-b border-orange-100 bg-orange-50/20 flex items-center">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Nhập để tìm kiếm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-xs px-2.5 py-1.5 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 font-medium"
            />
          </div>

          <div className="max-h-60 overflow-y-auto custom-scrollbar py-1">
            {loading ? (
              <div className="px-4 py-2.5 text-xs text-gray-500 font-semibold">Đang tải...</div>
            ) : filteredOptions.length === 0 ? (
              <div className="px-4 py-2.5 text-xs text-gray-500 font-semibold">Không tìm thấy kết quả</div>
            ) : (
              filteredOptions.map((opt) => (
                <div
                  key={opt.code}
                  onClick={() => {
                    onChange(opt.code);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2.5 text-xs font-semibold cursor-pointer transition-colors ${
                    opt.code === value
                      ? 'bg-orange-50 text-orange-950 font-bold border-l-4 border-orange-500 pl-3'
                      : 'text-gray-750 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {opt.name}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const OrderForm: React.FC<OrderFormProps> = ({ onOrderSuccess }) => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    phone: '',
    province: 'Thành phố Hà Nội',
    district: 'Quận Nam Từ Liêm',
    ward: 'Phường Mỹ Đình 1',
    addressDetail: '',
    quantityOptionId: '1_pack_500g',
    note: '',
    paymentMethod: 'cod',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [provinces, setProvinces] = useState<{ code: string; name: string }[]>([]);
  const [districts, setDistricts] = useState<{ code: string; name: string }[]>([]);
  const [wards, setWards] = useState<{ code: string; name: string }[]>([]);

  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);

  const [selectedProvinceCode, setSelectedProvinceCode] = useState('');
  const [selectedDistrictCode, setSelectedDistrictCode] = useState('');
  const [selectedWardCode, setSelectedWardCode] = useState('');

  // Selected package option
  const selectedPackage = QUANTITY_OPTIONS.find((q) => q.id === formData.quantityOptionId) || QUANTITY_OPTIONS[1];

  // Listen for package selection from HeroSection price tier selector
  useEffect(() => {
    const handleSelectPackage = (e: Event) => {
      const customEvent = e as CustomEvent<{ packageId: string }>;
      if (customEvent.detail?.packageId) {
        setFormData((prev) => ({ ...prev, quantityOptionId: customEvent.detail.packageId }));
      }
    };
    window.addEventListener('select-package', handleSelectPackage);
    return () => window.removeEventListener('select-package', handleSelectPackage);
  }, []);

  // Fetch provinces on mount
  useEffect(() => {
    const fetchProvinces = async () => {
      setLoadingProvinces(true);
      try {
        const res = await fetch('https://provinces.open-api.vn/api/p/');
        if (!res.ok) throw new Error();
        const data = await res.json();
        const formatted = data.map((p: any) => ({ code: String(p.code), name: p.name }));
        setProvinces(formatted);
        
        // Default to Hanoi if found, else first province
        const defaultProvince = formatted.find((p: any) => p.name.includes('Hà Nội')) || formatted[0];
        if (defaultProvince) {
          setSelectedProvinceCode(defaultProvince.code);
          setFormData((prev) => ({ ...prev, province: defaultProvince.name }));
        }
      } catch (err) {
        console.error('Lỗi khi tải danh sách Tỉnh/Thành, sử dụng dữ liệu cục bộ:', err);
        const formatted = VIETNAM_PROVINCES.map((p) => ({ code: p.code, name: p.name }));
        setProvinces(formatted);
        
        const defaultProvince = formatted.find((p) => p.name.includes('Hà Nội')) || formatted[0];
        if (defaultProvince) {
          setSelectedProvinceCode(defaultProvince.code);
          setFormData((prev) => ({ ...prev, province: defaultProvince.name }));
        }
      } finally {
        setLoadingProvinces(false);
      }
    };
    fetchProvinces();
  }, []);

  // Fetch districts when selectedProvinceCode changes
  useEffect(() => {
    if (!selectedProvinceCode) return;
    const fetchDistricts = async () => {
      setLoadingDistricts(true);
      try {
        const res = await fetch(`https://provinces.open-api.vn/api/p/${selectedProvinceCode}?depth=2`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        const formatted = (data.districts || []).map((d: any) => ({ code: String(d.code), name: d.name }));
        setDistricts(formatted);
        
        // Default to Nam Tu Liem if found, else first district
        const defaultDistrict = formatted.find((d: any) => d.name.includes('Nam Từ Liêm')) || formatted[0];
        if (defaultDistrict) {
          setSelectedDistrictCode(defaultDistrict.code);
          setFormData((prev) => ({ ...prev, district: defaultDistrict.name }));
        } else {
          setSelectedDistrictCode('');
          setFormData((prev) => ({ ...prev, district: '' }));
        }
      } catch (err) {
        console.error('Lỗi khi tải danh sách Quận/Huyện, sử dụng dữ liệu cục bộ:', err);
        const localProvince = VIETNAM_PROVINCES.find((p) => p.code === selectedProvinceCode);
        const formatted = (localProvince?.districts || []).map((d) => ({ code: d.code, name: d.name }));
        setDistricts(formatted);

        const defaultDistrict = formatted.find((d) => d.name.includes('Nam Từ Liêm')) || formatted[0];
        if (defaultDistrict) {
          setSelectedDistrictCode(defaultDistrict.code);
          setFormData((prev) => ({ ...prev, district: defaultDistrict.name }));
        } else {
          setSelectedDistrictCode('');
          setFormData((prev) => ({ ...prev, district: '' }));
        }
      } finally {
        setLoadingDistricts(false);
      }
    };
    fetchDistricts();
  }, [selectedProvinceCode]);

  // Fetch wards when selectedDistrictCode changes
  useEffect(() => {
    if (!selectedDistrictCode) {
      setWards([]);
      setSelectedWardCode('');
      setFormData((prev) => ({ ...prev, ward: '' }));
      return;
    }
    const fetchWards = async () => {
      setLoadingWards(true);
      try {
        const res = await fetch(`https://provinces.open-api.vn/api/d/${selectedDistrictCode}?depth=2`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        const formatted = (data.wards || []).map((w: any) => ({ code: String(w.code), name: w.name }));
        setWards(formatted);
        
        // Default to My Dinh 1 if found, else first ward
        const defaultWard = formatted.find((w: any) => w.name.includes('Mỹ Đình 1')) || formatted[0];
        if (defaultWard) {
          setSelectedWardCode(defaultWard.code);
          setFormData((prev) => ({ ...prev, ward: defaultWard.name }));
        } else {
          setSelectedWardCode('');
          setFormData((prev) => ({ ...prev, ward: '' }));
        }
      } catch (err) {
        console.error('Lỗi khi tải danh sách Phường/Xã, sử dụng dữ liệu cục bộ:', err);
        const localProvince = VIETNAM_PROVINCES.find((p) => p.code === selectedProvinceCode);
        const localDistrict = localProvince?.districts.find((d) => d.code === selectedDistrictCode);
        const formatted = (localDistrict?.wards || []).map((w, idx) => ({ code: String(idx), name: w }));
        setWards(formatted);

        const defaultWard = formatted.find((w) => w.name.includes('Mỹ Đình 1')) || formatted[0];
        if (defaultWard) {
          setSelectedWardCode(defaultWard.code);
          setFormData((prev) => ({ ...prev, ward: defaultWard.name }));
        } else {
          setSelectedWardCode('');
          setFormData((prev) => ({ ...prev, ward: '' }));
        }
      } finally {
        setLoadingWards(false);
      }
    };
    fetchWards();
  }, [selectedDistrictCode]);

  const validateField = (fieldName: keyof FormErrors, value: string): string => {
    const val = value.trim();
    if (fieldName === 'fullName') {
      if (!val) return 'Vui lòng nhập họ và tên của bạn.';
      if (val.length < 2) return 'Họ và tên quá ngắn (tối thiểu 2 ký tự).';
      if (!/^[\p{L}\s]+$/u.test(val)) return 'Họ và tên chỉ được chứa chữ cái và khoảng trắng.';
    }
    if (fieldName === 'phone') {
      if (!val) return 'Vui lòng nhập số điện thoại liên hệ.';
      const cleanPhone = val.replace(/\s+/g, '');
      const phoneRegex = /^(0|\+84)[35789][0-9]{8}$/;
      if (!phoneRegex.test(cleanPhone)) {
        return 'Số điện thoại không hợp lệ (10 chữ số, ví dụ: 0912345678).';
      }
    }
    if (fieldName === 'addressDetail') {
      if (!val) return 'Vui lòng nhập địa chỉ chi tiết (số nhà, tên đường...).';
      if (val.length < 5) return 'Địa chỉ quá ngắn (tối thiểu 5 ký tự).';
    }
    return '';
  };

  const handleBlur = (fieldName: keyof FormErrors) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    const errorMsg = validateField(fieldName, formData[fieldName] || '');
    setErrors((prev) => ({ ...prev, [fieldName]: errorMsg }));
  };

  const handleChange = (fieldName: keyof FormErrors, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    if (touched[fieldName] || errors[fieldName]) {
      const errorMsg = validateField(fieldName, value);
      setErrors((prev) => ({ ...prev, [fieldName]: errorMsg }));
    }
  };

  const handleProvinceChange = (provCode: string) => {
    setSelectedProvinceCode(provCode);
    const selected = provinces.find((p) => p.code === provCode);
    if (selected) {
      setFormData((prev) => ({ ...prev, province: selected.name }));
    }
  };

  const handleDistrictChange = (distCode: string) => {
    setSelectedDistrictCode(distCode);
    const selected = districts.find((d) => d.code === distCode);
    if (selected) {
      setFormData((prev) => ({ ...prev, district: selected.name }));
    }
  };

  const handleWardSelect = (wardCode: string) => {
    setSelectedWardCode(wardCode);
    const selected = wards.find((w) => w.code === wardCode);
    if (selected) {
      setFormData((prev) => ({ ...prev, ward: selected.name }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({ fullName: true, phone: true, addressDetail: true });

    const fullNameErr = validateField('fullName', formData.fullName);
    const phoneErr = validateField('phone', formData.phone);
    const addressErr = validateField('addressDetail', formData.addressDetail);

    const newErrors: FormErrors = {
      fullName: fullNameErr || undefined,
      phone: phoneErr || undefined,
      addressDetail: addressErr || undefined,
    };

    setErrors(newErrors);

    if (fullNameErr || phoneErr || addressErr) {
      let firstErrorId = '';
      if (fullNameErr) firstErrorId = 'input-fullName';
      else if (phoneErr) firstErrorId = 'input-phone';
      else if (addressErr) firstErrorId = 'input-addressDetail';

      if (firstErrorId) {
        const elem = document.getElementById(firstErrorId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
          elem.focus({ preventScroll: true });
        }
      }
      return;
    }

    setSubmitting(true);

    const order: SubmittedOrder = {
      ...formData,
      id: `BH-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      totalAmount: selectedPackage.price,
      status: 'Đã tiếp nhận đơn hàng',
    };

    // Auto sync to Google Sheets & local storage
    await syncOrderToGoogleSheets(order);

    setSubmitting(false);
    onOrderSuccess(order);

    // Reset form về trạng thái ban đầu
    setFormData({
      fullName: '',
      phone: '',
      province: provinces.find((p) => p.name.includes('Hà Nội'))?.name || provinces[0]?.name || '',
      district: districts.find((d) => d.name.includes('Nam Từ Liêm'))?.name || districts[0]?.name || '',
      ward: wards.find((w) => w.name.includes('Mỹ Đình 1'))?.name || wards[0]?.name || '',
      addressDetail: '',
      quantityOptionId: '1_pack_500g',
      note: '',
      paymentMethod: 'cod',
    });
    setErrors({});
    setTouched({});
    
    // Reset codes back to default or first elements
    const defaultProvince = provinces.find((p) => p.name.includes('Hà Nội')) || provinces[0];
    if (defaultProvince) {
      setSelectedProvinceCode(defaultProvince.code);
    }
  };

  return (
    <section id="order-form-section" className="max-w-md mx-auto my-6 px-4">
      <div className="bg-gradient-to-b from-gray-50 to-white p-5 rounded-2xl shadow-lg border border-amber-200 space-y-4">
        
        {/* Title matching Screenshot 17 */}
        <div className="text-center space-y-1">
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
            Điền thông tin để đặt mua ngay
          </h2>
          <p className="text-xs text-emerald-600 font-semibold flex items-center justify-center gap-1">
            <ShieldCheck className="w-4 h-4" /> Cam kết bảo mật thông tin & Kiểm tra hàng trước khi thanh toán
          </p>
        </div>

        <form noValidate onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name */}
          <div className="space-y-1">
            <label htmlFor="input-fullName" className="block text-xs font-bold text-gray-800">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
                errors.fullName && touched.fullName ? 'text-red-500' : 'text-gray-400'
              }`} />
              <input
                id="input-fullName"
                type="text"
                placeholder="Nhập họ và tên"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                onBlur={() => handleBlur('fullName')}
                className={`w-full bg-gray-50 text-xs pl-9 pr-3 py-3 rounded-xl border transition-all font-medium focus:bg-white focus:outline-none ${
                  errors.fullName && touched.fullName
                    ? 'border-red-500 focus:ring-2 focus:ring-red-400 bg-red-50/20 text-red-900'
                    : 'border-gray-300 focus:ring-2 focus:ring-amber-500 text-gray-900'
                }`}
              />
            </div>
            {errors.fullName && touched.fullName && (
              <p className="text-[11px] text-red-500 font-semibold flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.fullName}</span>
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label htmlFor="input-phone" className="block text-xs font-bold text-gray-800">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
                errors.phone && touched.phone ? 'text-red-500' : 'text-gray-400'
              }`} />
              <input
                id="input-phone"
                type="tel"
                placeholder="Nhập số điện thoại (vd: 0912345678)"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                onBlur={() => handleBlur('phone')}
                className={`w-full bg-gray-50 text-xs pl-9 pr-3 py-3 rounded-xl border transition-all font-medium focus:bg-white focus:outline-none ${
                  errors.phone && touched.phone
                    ? 'border-red-500 focus:ring-2 focus:ring-red-400 bg-red-50/20 text-red-900'
                    : 'border-gray-300 focus:ring-2 focus:ring-amber-500 text-gray-900'
                }`}
              />
            </div>
            {errors.phone && touched.phone && (
              <p className="text-[11px] text-red-500 font-semibold flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>

          {/* Location Dropdowns */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-800">
              Địa chỉ giao hàng <span className="text-red-500">*</span>
            </label>
            
            <div className="space-y-2.5">
              {/* Province */}
              <CustomSelect
                value={selectedProvinceCode}
                onChange={handleProvinceChange}
                options={provinces}
                placeholder="Chọn Tỉnh / Thành phố"
                loading={loadingProvinces}
              />

              {/* District */}
              <CustomSelect
                value={selectedDistrictCode}
                onChange={handleDistrictChange}
                options={districts}
                placeholder="Chọn Quận / Huyện"
                loading={loadingDistricts}
              />

              {/* Ward */}
              <CustomSelect
                value={selectedWardCode}
                onChange={handleWardSelect}
                options={wards}
                placeholder="Chọn Phường / Xã"
                loading={loadingWards}
              />
            </div>
          </div>

          {/* Detailed Street Address */}
          <div className="space-y-1">
            <label htmlFor="input-addressDetail" className="block text-xs font-bold text-gray-800">
              Nhập địa chỉ chi tiết <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className={`w-4 h-4 absolute left-3 top-3 transition-colors ${
                errors.addressDetail && touched.addressDetail ? 'text-red-500' : 'text-gray-400'
              }`} />
              <textarea
                id="input-addressDetail"
                rows={2}
                placeholder="Số nhà + tên đường, tổ / xóm..."
                value={formData.addressDetail}
                onChange={(e) => handleChange('addressDetail', e.target.value)}
                onBlur={() => handleBlur('addressDetail')}
                className={`w-full bg-gray-50 text-xs pl-9 pr-3 py-2.5 rounded-xl border transition-all font-medium focus:bg-white focus:outline-none ${
                  errors.addressDetail && touched.addressDetail
                    ? 'border-red-500 focus:ring-2 focus:ring-red-400 bg-red-50/20 text-red-900'
                    : 'border-gray-300 focus:ring-2 focus:ring-amber-500 text-gray-900'
                }`}
              />
            </div>
            {errors.addressDetail && touched.addressDetail && (
              <p className="text-[11px] text-red-500 font-semibold flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.addressDetail}</span>
              </p>
            )}
          </div>

          {/* Select Quantity Package */}
          <div className="space-y-2 pt-1">
            <label className="block text-xs font-bold text-gray-800">
              Chọn Số Lượng <span className="text-red-500">*</span>
            </label>

            <div className="space-y-2">
              {QUANTITY_OPTIONS.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setFormData({ ...formData, quantityOptionId: opt.id })}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition-all relative ${
                    formData.quantityOptionId === opt.id
                      ? 'border-orange-500 bg-orange-50/60 ring-2 ring-orange-200 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-amber-300'
                  }`}
                >
                  {opt.popular && (
                    <span className="absolute -top-2.5 right-3 bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase shadow">
                      NÊN CHỌN
                    </span>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="quantityOption"
                        checked={formData.quantityOptionId === opt.id}
                        onChange={() => setFormData({ ...formData, quantityOptionId: opt.id })}
                        className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">{opt.label}</h4>
                        {opt.gift && (
                          <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                            <Gift className="w-3 h-3 text-orange-500" /> {opt.gift}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-extrabold text-orange-600">
                        {opt.price.toLocaleString('vi-VN')}đ
                      </div>
                      <div className="text-[10px] text-gray-400 line-through">
                        {opt.originalPrice.toLocaleString('vi-VN')}đ
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-1 pt-1">
            <label className="block text-xs font-bold text-gray-800">
              Hình thức thanh toán
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                className={`p-2.5 rounded-xl border text-center flex items-center justify-center gap-1.5 transition-all ${
                  formData.paymentMethod === 'cod'
                    ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold'
                    : 'border-gray-200 text-gray-600 bg-white'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${formData.paymentMethod === 'cod' ? 'text-amber-600' : 'text-gray-400'}`} />
                <span>Thanh toán COD</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'transfer' })}
                className={`p-2.5 rounded-xl border text-center flex items-center justify-center gap-1.5 transition-all ${
                  formData.paymentMethod === 'transfer'
                    ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold'
                    : 'border-gray-200 text-gray-600 bg-white'
                }`}
              >
                <CreditCard className={`w-4 h-4 ${formData.paymentMethod === 'transfer' ? 'text-amber-600' : 'text-gray-400'}`} />
                <span>Chuyển khoản</span>
              </button>
            </div>
          </div>

          {/* Order Summary box */}
          <div className="bg-amber-100/50 p-3 rounded-xl border border-amber-200/60 text-xs space-y-1.5">
            <div className="flex justify-between text-gray-700">
              <span>Sản phẩm:</span>
              <span className="font-semibold text-gray-900">{selectedPackage.weight}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Phí vận chuyển:</span>
              <span className="font-bold text-emerald-600">Miễn phí (0đ)</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-gray-900 pt-1 border-t border-amber-200/80">
              <span>Tổng thanh toán:</span>
              <span className="text-orange-600 text-base">{selectedPackage.price.toLocaleString('vi-VN')}đ</span>
            </div>
          </div>

          {/* Submit Order Button matching Screenshot 17 */}
          <button
            id="btn-submit-order"
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-orange-500 via-amber-600 to-orange-600 hover:brightness-110 text-white font-extrabold text-base py-3.5 px-6 rounded-xl shadow-lg shadow-orange-500/20 active:scale-[0.99] transition-all uppercase tracking-wide flex items-center justify-center gap-2 disabled:opacity-75"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Đang xử lý đơn hàng...</span>
              </>
            ) : (
              <>
                <span>Đặt mua ngay</span>
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>

        </form>

      </div>
    </section>
  );
}
