// pages/dashboard/reviews.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  ThumbsUp,
  MessageCircle,
  Flag,
  Search} from 'lucide-react';

const ReviewsPage: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      product: 'iPhone 13 Pro Max',
      productId: 'p1',
      customer: 'John Kamau',
      rating: 5,
      comment: 'Excellent phone! Fast delivery and exactly as described. The camera is amazing and battery life is great.',
      date: '2026-03-10',
      helpful: 12,
      replied: true,
      image: 'https://images.unsplash.com/photo-1632661674596-df8be6a1c9e1?w=50&h=50&fit=crop',
    },
    {
      id: 2,
      product: 'Leather Jacket',
      productId: 'p2',
      customer: 'Mary Wanjiku',
      rating: 4,
      comment: 'Good quality jacket, fits well. Slightly smaller than expected but overall happy with purchase.',
      date: '2026-03-08',
      helpful: 8,
      replied: false,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=50&h=50&fit=crop',
    },
    {
      id: 3,
      product: 'Fresh Farm Eggs',
      productId: 'p3',
      customer: 'Peter Muthoka',
      rating: 5,
      comment: 'Freshest eggs in Tala! My family loves them. Will definitely order again.',
      date: '2026-03-05',
      helpful: 15,
      replied: true,
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=50&h=50&fit=crop',
    },
    {
      id: 4,
      product: 'Wireless Headphones',
      productId: 'p4',
      customer: 'Sarah Kimani',
      rating: 3,
      comment: 'Sound quality is okay for the price. Battery life could be better.',
      date: '2026-03-03',
      helpful: 5,
      replied: false,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=50&h=50&fit=crop',
    },
  ];

  const stats = {
    averageRating: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
    totalReviews: reviews.length,
    fiveStar: reviews.filter(r => r.rating === 5).length,
    fourStar: reviews.filter(r => r.rating === 4).length,
    threeStar: reviews.filter(r => r.rating === 3).length,
    twoStar: reviews.filter(r => r.rating === 2).length,
    oneStar: reviews.filter(r => r.rating === 1).length,
  };

  const filteredReviews = reviews.filter(r => {
    if (filter === 'replied' && !r.replied) return false;
    if (filter === 'unreplied' && r.replied) return false;
    if (searchTerm && !r.product.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
          Customer Reviews
        </h1>
        <p className="text-slate-text mt-1">
          See what customers are saying about your products
        </p>
      </div>

      {/* Rating Summary */}
      <div className="bg-white rounded-xl border border-sky-100 p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-charcoal">{stats.averageRating}</div>
            <div className="flex items-center gap-0.5 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(Number(stats.averageRating))
                      ? 'text-yellow-500 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-slate-text mt-1">Based on {stats.totalReviews} reviews</p>
          </div>

          <div className="flex-1 space-y-2 w-full">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = stats[`${star}Star` as keyof typeof stats] as number;
              const percentage = (count / stats.totalReviews) * 100;
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-sm text-slate-text w-8">{star} star</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-500 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-slate-text w-8">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
          <input
            type="text"
            placeholder="Search by product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-sky-200 rounded-lg text-sm focus:outline-none focus:border-redbull-blue"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 bg-white border border-sky-200 rounded-lg text-sm text-slate-text focus:outline-none focus:border-redbull-blue"
        >
          <option value="all">All Reviews</option>
          <option value="replied">Replied</option>
          <option value="unreplied">Not Replied</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl border border-sky-100 p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <img
                src={review.image}
                alt={review.product}
                className="w-16 h-16 rounded-lg object-cover"
              />
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div>
                    <Link to={`/marketplace/product/${review.productId}`} className="text-lg font-display font-semibold text-charcoal hover:text-redbull-blue">
                      {review.product}
                    </Link>
                    <p className="text-sm text-slate-text">by {review.customer}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? 'text-yellow-500 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-sm text-charcoal mb-3">{review.comment}</p>

                <div className="flex items-center gap-4 text-xs text-slate-text">
                  <span>{review.date}</span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    {review.helpful} found helpful
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-4 pt-3 border-t border-sky-100">
                  {review.replied ? (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Replied
                    </span>
                  ) : (
                    <button className="text-xs bg-redbull-blue text-white px-3 py-1.5 rounded-full hover:bg-redbull-blue/90 flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      Reply to Review
                    </button>
                  )}
                  <button className="text-xs text-slate-text hover:text-red-600 flex items-center gap-1">
                    <Flag className="w-3 h-3" />
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;