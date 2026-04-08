// src/pages/dashboard/Reviews.tsx
import React, { useState, useEffect } from 'react';
import { Star, MessageCircle, User, Package, Loader2 } from 'lucide-react';
import { CommerceService, type Review } from '../../../services/commerce/commerce.service';
import { useAuth } from '../../../contexts/auth/auth';


const Reviews: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'received' | 'written'>('received');
  const [receivedReviews, setReceivedReviews] = useState<Review[]>([]);
  const [writtenReviews, setWrittenReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sellerId, setSellerId] = useState<string | null>(null);

  // Fetch seller ID from user object or a separate endpoint
  // Assuming your user object has a `sellerId` field if they are a seller
  useEffect(() => {
    if (user && (user as any).sellerId) {
      setSellerId((user as any).sellerId);
    } else {
      // If not available, you might need to call an API to get seller profile
      setSellerId(null);
    }
  }, [user]);

  useEffect(() => {
    const fetchAllReviews = async () => {
      setIsLoading(true);
      try {
        // Fetch written reviews (always possible)
        const written = await CommerceService.getMyReviews();
        setWrittenReviews(written);

        // Fetch received reviews if user is a seller and we have sellerId
        if (sellerId) {
          const received = await CommerceService.getSellerReviews(sellerId);
          setReceivedReviews(received);
        } else {
          setReceivedReviews([]);
        }
      } catch (error) {
        console.error('Failed to fetch reviews', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllReviews();
  }, [sellerId]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const ReviewCard = ({ review, type }: { review: Review; type: 'received' | 'written' }) => (
    <div className="bg-white rounded-xl border border-sky-100 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          {/* Header: reviewer name (if received) or product name (if written) */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {type === 'received' ? (
              <>
                <User className="w-4 h-4 text-slate-text" />
                <span className="text-sm font-medium text-charcoal">
                  {review.userId} {/* Ideally replace with reviewer name if API provides */}
                </span>
              </>
            ) : (
              <>
                <Package className="w-4 h-4 text-slate-text" />
                <span className="text-sm font-medium text-charcoal">
                  Product: {review.productId} {/* Replace with product name if available */}
                </span>
              </>
            )}
            <span className="text-xs text-slate-text/60">{formatDate(review.createdAt)}</span>
          </div>

          {/* Rating stars */}
          {renderStars(review.rating)}

          {/* Comment */}
          <p className="text-sm text-slate-text mt-3 leading-relaxed">{review.comment}</p>

          {/* Images if any */}
          {review.images && review.images.length > 0 && (
            <div className="flex gap-2 mt-3">
              {review.images.slice(0, 3).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Review image ${idx + 1}`}
                  className="w-16 h-16 object-cover rounded-lg border border-sky-100"
                />
              ))}
              {review.images.length > 3 && (
                <div className="w-16 h-16 bg-sky-50 rounded-lg flex items-center justify-center text-xs text-slate-text">
                  +{review.images.length - 3}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const EmptyState = ({ message }: { message: string }) => (
    <div className="text-center py-12 bg-white rounded-xl border border-sky-100">
      <MessageCircle className="w-12 h-12 mx-auto text-slate-text/40 mb-3" />
      <p className="text-slate-text">{message}</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-charcoal">Reviews</h1>
        <p className="text-sm text-slate-text mt-1">Manage and respond to customer feedback</p>
      </div>

      {/* Tabs (only show both if user is seller, otherwise just written) */}
      {(sellerId || activeTab === 'written') && (
        <div className="flex border-b border-sky-100 mb-6">
          {sellerId && (
            <button
              onClick={() => setActiveTab('received')}
              className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                activeTab === 'received'
                  ? 'text-redbull-blue border-b-2 border-redbull-blue'
                  : 'text-slate-text hover:text-charcoal'
              }`}
            >
              Received
              {receivedReviews.length > 0 && activeTab !== 'received' && (
                <span className="ml-1 bg-sky-100 text-sky-600 text-xs px-1.5 py-0.5 rounded-full">
                  {receivedReviews.length}
                </span>
              )}
            </button>
          )}
          <button
            onClick={() => setActiveTab('written')}
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeTab === 'written'
                ? 'text-redbull-blue border-b-2 border-redbull-blue'
                : 'text-slate-text hover:text-charcoal'
            }`}
          >
            Written by me
            {writtenReviews.length > 0 && activeTab !== 'written' && (
              <span className="ml-1 bg-sky-100 text-sky-600 text-xs px-1.5 py-0.5 rounded-full">
                {writtenReviews.length}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {activeTab === 'received' ? (
            receivedReviews.length === 0 ? (
              <EmptyState message="No reviews received yet. When customers review your products, they'll appear here." />
            ) : (
              receivedReviews.map((review) => (
                <ReviewCard key={review.id} review={review} type="received" />
              ))
            )
          ) : (
            writtenReviews.length === 0 ? (
              <EmptyState message="You haven't written any reviews yet. Go to a product page and leave your feedback!" />
            ) : (
              writtenReviews.map((review) => (
                <ReviewCard key={review.id} review={review} type="written" />
              ))
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Reviews;