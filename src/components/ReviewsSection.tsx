import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquare, Plus, ThumbsUp } from 'lucide-react';
import { PRODUCT_REVIEWS } from '../data/productData';
import { Review } from '../types';

interface ReviewsSectionProps {
  onOpenGallery: (imageIndex: number) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onOpenGallery }) => {
  const [reviews, setReviews] = useState<Review[]>(PRODUCT_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) return;

    const created: Review = {
      id: `rev-${Date.now()}`,
      name: newReview.name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(newReview.name)}`,
      rating: newReview.rating,
      date: 'Vừa xong',
      comment: newReview.comment,
      verified: true,
    };

    setReviews([created, ...reviews]);
    setNewReview({ name: '', rating: 5, comment: '' });
    setShowForm(false);
  };

  const toggleLike = (id: string) => {
    setLikedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="reviews-section" className="max-w-md mx-auto my-4 px-4">
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-amber-100 space-y-4">
        
        {/* Header Summary */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-base font-extrabold text-gray-900">
              Đánh giá của khách hàng (999+)
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl font-black text-amber-600">4.8/5</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold px-3 py-2 rounded-xl border border-amber-200 flex items-center gap-1 transition-all"
          >
            <Plus className="w-4 h-4" /> Viết đánh giá
          </button>
        </div>

        {/* Add Review Form Modal / Drawer */}
        {showForm && (
          <form onSubmit={handleAddReview} className="bg-amber-50/80 p-4 rounded-xl border border-amber-200 space-y-3 animate-fadeIn">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
              Gửi nhận xét của bạn
            </h3>
            
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">Tên của bạn</label>
              <input
                type="text"
                required
                placeholder="Nhập tên của bạn"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                className="w-full bg-white text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">Đánh giá số sao</label>
              <div className="flex gap-1 text-amber-400 cursor-pointer">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className={`w-6 h-6 ${star <= newReview.rating ? 'fill-amber-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">Nội dung đánh giá</label>
              <textarea
                required
                rows={3}
                placeholder="Nêu cảm nhận của bạn về sản phẩm..."
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="w-full bg-white text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-900"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-1.5 rounded-lg shadow"
              >
                Gửi Đánh Giá
              </button>
            </div>
          </form>
        )}

        {/* Reviews List */}
        <div className="space-y-4 divide-y divide-gray-100">
          {reviews.map((rev) => (
            <div key={rev.id} className="pt-3 space-y-2">
              
              {/* User Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-8 h-8 rounded-full object-cover border border-amber-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="font-bold text-xs text-gray-900">{rev.name}</h3>
                      {rev.verified && (
                        <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100">
                          <CheckCircle className="w-2.5 h-2.5" /> Đã mua hàng
                        </span>
                      )}
                    </div>
                    <div className="flex text-amber-400 text-[10px] items-center gap-1">
                      <div className="flex">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-gray-400">{rev.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comment text */}
              <p className="text-xs text-gray-700 leading-relaxed font-normal">
                {rev.comment}
              </p>

              {/* Optional image attachments */}
              {rev.image && (
                <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 cursor-pointer shadow-sm">
                  <img
                    src={rev.image}
                    alt="Ảnh phản hồi"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onClick={() => onOpenGallery(3)}
                  />
                </div>
              )}

              {/* Like action */}
              <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                <button
                  onClick={() => toggleLike(rev.id)}
                  className={`flex items-center gap-1 transition-colors ${
                    likedReviews[rev.id] ? 'text-amber-600 font-bold' : 'hover:text-gray-600'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${likedReviews[rev.id] ? 'fill-amber-600' : ''}`} />
                  <span>{likedReviews[rev.id] ? 'Đã thích' : 'Hữu ích'}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
