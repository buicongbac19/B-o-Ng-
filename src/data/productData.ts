import { QuantityOption, Review } from '../types';
import driedAbaloneHero from '../assets/images/dried_abalone_hero_1786525643861.jpg';
import abaloneDishStew from '../assets/images/abalone_dish_stew_1786525741598.jpg';
import abalonePlateNew from '../assets/images/abalone_plate_new_1786527320243.jpg';
import userQuadAbalone from '../assets/images/user_quad_abalone_1786592634790.jpg';
import abalonePackagedBag from '../assets/images/abalone_packaged_bag_1786613651752.jpg';
import abaloneHeroPremium from '../assets/images/abalone_hero_premium_1786615036323.jpg';
import abaloneHeroDeluxe from '../assets/images/abalone_hero_deluxe_1786615157675.jpg';
import chandung1 from '../assets/images/chandung1.png';
import chandung2 from '../assets/images/chan dung 2.png';

export const PRODUCT_IMAGES = {
  hero: 'https://sf-static.upanhlaylink.com/img/image_202608137ed7b36bdd91094bc412540370873ef3.jpg',
  stewDish: 'https://sf-static.upanhlaylink.com/img/image_2026081343c262a2972b904f6e6a387ee9b1e9d3.jpg',
  platePresentation: 'https://sf-static.upanhlaylink.com/img/image_20260813ec897c22d8a02614c6501cf6dfe09d6a.jpg',
  packagedBag: 'https://sf-static.upanhlaylink.com/img/image_202608137deb534ac5e8fb5bb497ed6a1fab14d7.jpg',
  handHoldingAbalone: driedAbaloneHero,
  driedCloseUp: driedAbaloneHero,
};

export const QUANTITY_OPTIONS: QuantityOption[] = [
  {
    id: '1_pack_200g',
    label: '1 Gói Bào Ngư Khô (200g)',
    weight: '200g',
    price: 279000,
    originalPrice: 560000,
    savings: 'Tiết kiệm 50%',
    gift: 'Miễn phí giao hàng toàn quốc',
  },
  {
    id: '1_pack_500g',
    label: '1 Gói Bào Ngư Khô (500g) - Tiết Kiệm',
    weight: '500g',
    price: 480000,
    originalPrice: 960000,
    savings: 'Tiết kiệm 50%',
    popular: true,
    gift: 'Miễn phí giao hàng toàn quốc',
  },
  {
    id: '2_packs_500g',
    label: '2 Gói Bào Ngư Khô (500g - Tổng 1kg) - Siêu Ưu Đãi',
    weight: '1kg (2 x 500g)',
    price: 900000,
    originalPrice: 1920000,
    savings: 'Tiết kiệm 1.020.000đ',
    gift: 'Miễn phí giao hàng toàn quốc',
  },
];

export const PRODUCT_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Thanh H.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: 'Hôm qua',
    comment: 'Lúc đầu sợ sấy khô bị mất vị nhưng nấu lên mới thấy nước ngọt thanh đỉnh thật sự. Tiện cái là để tủ đông dùng dần, khi nào cần tẩm bổ là có ngay, không mất công đi chợ tìm mua đồ tươi.',
    verified: true,
    image: PRODUCT_IMAGES.packagedBag,
  },
  {
    id: 'rev-2',
    name: 'Minh P.',
    avatar: chandung1,
    rating: 5,
    date: '2 ngày trước',
    comment: 'Chất lượng tốt, giao hàng nhanh, đóng gói cẩn thận. Màu sắc đúng như mô tả, rất ưng!',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Lan N.',
    avatar: chandung2,
    rating: 5,
    date: '3 ngày trước',
    comment: 'Bào ngư khô con nào con nấy dày mình lắm nha. Mình ngâm nước rồi đem hầm súp nấm, thịt ngọt, dai giòn sần sật y như bào ngư tươi luôn. Cả nhà ai cũng khen ngon.',
    verified: true,
  },
  {
    id: 'rev-4',
    name: 'Hạnh T.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '5 ngày trước',
    comment: 'Bào ngư khô của shop chất lượng đồng đều, không bị vụn hay lẫn tạp chất. Shop tư vấn cách ngâm và chế biến siêu nhiệt tình. 10 điểm cho chất lượng dịch vụ!',
    verified: true,
  },
];

export const HEALTH_BENEFITS = [
  {
    icon: 'Sparkles',
    title: 'Bổ sung protein chất lượng cao',
    desc: 'Giúp xây dựng và phục hồi cơ bắp mà ít chất béo, hỗ trợ giữ giàn vóc dáng.',
  },
  {
    icon: 'Heart',
    title: 'Tốt cho tim mạch & xương khớp',
    desc: 'Chứa hàm lượng Omega-3 và canxi cao giúp giảm mỡ máu và bảo vệ hệ tuần hoàn vững chắc.',
  },
  {
    icon: 'ThumbsUp',
    title: 'Dễ dàng mang theo & bảo quản',
    desc: 'Bào ngư sấy khô giữ nguyên dưỡng chất, tiện lợi sử dụng trong nhiều tình huống hàng ngày.',
  },
  {
    icon: 'CheckCircle2',
    title: 'Tăng cường sinh lực & sức đề kháng',
    desc: 'Hàm lượng kẽm và khoáng chất cao giúp cải thiện suy nhược, chậm lão hoá và tăng cường hệ miễn dịch.',
  },
];

export const COOKING_METHODS = [
  {
    type: 'Món hầm',
    badge: 'Tiện lợi & Nhanh chóng',
    summary: 'Phù hợp khi không có thời gian chuẩn bị',
    instructions: 'Ngâm nước lạnh 15 phút, rửa lại, rồi mang đi hầm kèm các nguyên liệu khác trong 45-60 phút ở lửa vừa, thêm gia vị cho phù hợp rồi thưởng thức.',
    image: abaloneDishStew,
  },
  {
    type: 'Món xào',
    badge: 'Thơm ngon & Đậm vị',
    summary: 'Phù hợp khi có thời gian chuẩn bị trước',
    instructions: 'Bào ngư cần ngâm nước lạnh 24h cho mềm, rửa lại, nếu cần thái nhỏ nên hầm cách thủy cho mềm rồi đem xào cùng rau củ hoặc sốt dầu hàu.',
    image: PRODUCT_IMAGES.platePresentation,
  },
];

export const PREPARATION_STEPS = [
  {
    step: 'BƯỚC 1',
    title: 'Rửa sạch bên ngoài',
    desc: 'Rửa sạch lớp vỏ ngoài và phần thịt khô để loại bỏ hoàn toàn bụi bẩn hoặc muối bám.',
  },
  {
    step: 'BƯỚC 2',
    title: 'Ngâm mềm nở đều',
    desc: 'Cho bào ngư vào bát nước ấm. Ngâm liên tục từ 1 đến 2 giờ cho đến khi bào ngư nở và mềm đều.',
  },
  {
    step: 'BƯỚC 3',
    title: 'Sẵn sàng chế biến',
    desc: 'Rửa lại bằng nước sạch rồi để ráo trước khi mang đi chế biến các món ăn bổ dưỡng.',
  },
];

export const RECENT_PURCHASES = [
  { name: 'Nguyễn Văn H.', location: 'Hà Nội', quantity: '1 gói (500g)', time: '3 phút trước' },
  { name: 'Trần Thị M.', location: 'TP. Hồ Chí Minh', quantity: '2 gói (500g)', time: '7 phút trước' },
  { name: 'Lê Hoàng K.', location: 'Đà Nẵng', quantity: '1 gói (200g)', time: '12 phút trước' },
  { name: 'Phạm Thu T.', location: 'Hải Phòng', quantity: '1 gói (500g)', time: '15 phút trước' },
];
