"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineLike,
  AiFillLike,
  AiOutlineCamera,
  AiOutlineVideoCamera,
  AiOutlineFilter,
  AiOutlineClose,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import {
  FaUserCircle,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaPlay,
} from "react-icons/fa";
import { BsFilterLeft } from "react-icons/bs";
import { MdVerified } from "react-icons/md";

type ReviewImage = {
  id: string;
  url: string;
  alt: string;
};

type Review = {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  images?: ReviewImage[];
  videoUrl?: string;
  purchaseVerified: boolean;
  size: string;
  color: string;
  helpfulCount: number;
  isHelpful?: boolean;
  date: string;
  location?: string;
};

type ReviewSummary = {
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  withPhotos: number;
  withVideos: number;
};

type UGCReviewProps = {
  productId: string;
  reviews: Review[];
  summary: ReviewSummary;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
};

// Sample realistic review data
const sampleReviews: Review[] = [
  {
    id: "1",
    userId: "user123",
    userName: "Priya Sharma",
    userAvatar: "/api/placeholder/48/48",
    rating: 5,
    title: "Perfect fit and beautiful design!",
    content:
      "I absolutely love this kurti! The fabric is soft and comfortable, perfect for daily wear. The embroidery work is exquisite and the color is exactly as shown in the pictures. I ordered size M and it fits perfectly. Highly recommend this for anyone looking for traditional yet trendy wear.",
    images: [
      { id: "img1", url: "/api/placeholder/400/500", alt: "Kurti front view" },
      { id: "img2", url: "/api/placeholder/400/500", alt: "Kurti back view" },
      { id: "img3", url: "/api/placeholder/400/500", alt: "Kurti detail shot" },
    ],
    purchaseVerified: true,
    size: "M",
    color: "Navy Blue",
    helpfulCount: 24,
    isHelpful: false,
    date: "2 weeks ago",
    location: "Mumbai, Maharashtra",
  },
  {
    id: "2",
    userId: "user456",
    userName: "Anjali Patel",
    rating: 4,
    title: "Great quality but runs slightly large",
    content:
      "The kurti is beautiful and the material quality is excellent. The only issue is that it runs a bit large - I ordered L but it feels more like XL. The color is vibrant and the stitching is neat. Would definitely order again but will go one size down next time.",
    images: [
      { id: "img4", url: "/api/placeholder/400/500", alt: "Kurti worn" },
      { id: "img5", url: "/api/placeholder/400/500", alt: "Kurti length" },
    ],
    purchaseVerified: true,
    size: "L",
    color: "Maroon",
    helpfulCount: 18,
    isHelpful: true,
    date: "1 week ago",
    location: "Ahmedabad, Gujarat",
  },
  {
    id: "3",
    userId: "user789",
    userName: "Meera Reddy",
    rating: 5,
    title: "Exceeded my expectations!",
    content:
      "This kurti is absolutely gorgeous! The fabric feels premium and the fit is perfect. I've received so many compliments wearing this. The delivery was quick too. Perfect for both casual and semi-formal occasions. Will definitely shop more from this brand.",
    images: [
      { id: "img6", url: "/api/placeholder/400/500", alt: "Full outfit" },
    ],
    videoUrl: "/api/placeholder/video",
    purchaseVerified: true,
    size: "S",
    color: "Emerald Green",
    helpfulCount: 31,
    isHelpful: false,
    date: "3 days ago",
    location: "Hyderabad, Telangana",
  },
  {
    id: "4",
    userId: "user101",
    userName: "Kavya Nair",
    rating: 3,
    title: "Good but not great",
    content:
      "The kurti is decent for the price. The fabric is okay but not as soft as I expected. The color is nice but the fit is a bit loose around the waist. It's good for casual wear but I wouldn't wear it for special occasions.",
    purchaseVerified: true,
    size: "M",
    color: "Powder Blue",
    helpfulCount: 12,
    isHelpful: false,
    date: "5 days ago",
    location: "Kochi, Kerala",
  },
  {
    id: "5",
    userId: "user202",
    userName: "Sneha Gupta",
    rating: 5,
    title: "Amazing quality and comfort!",
    content:
      "I'm so happy with this purchase! The kurti is exactly what I was looking for - comfortable, stylish, and well-made. The fabric is breathable and perfect for the summer. The print is beautiful and hasn't faded after multiple washes. Highly recommend!",
    images: [
      { id: "img7", url: "/api/placeholder/400/500", alt: "Kurti detail" },
      { id: "img8", url: "/api/placeholder/400/500", alt: "Fabric close-up" },
    ],
    purchaseVerified: true,
    size: "L",
    color: "Coral Pink",
    helpfulCount: 27,
    isHelpful: true,
    date: "1 day ago",
    location: "Delhi, Delhi",
  },
  {
    id: "6",
    userId: "user303",
    userName: "Ritika Singh",
    rating: 4,
    title: "Beautiful design, minor fitting issues",
    content:
      "The kurti is absolutely beautiful with intricate embroidery work. The color is vibrant and matches the description perfectly. However, the sleeves are a bit tight for my liking. Overall, it's a good purchase and I would recommend it to others.",
    images: [
      { id: "img9", url: "/api/placeholder/400/500", alt: "Embroidery detail" },
    ],
    purchaseVerified: true,
    size: "XL",
    color: "Royal Blue",
    helpfulCount: 15,
    isHelpful: false,
    date: "4 days ago",
    location: "Jaipur, Rajasthan",
  },
  {
    id: "7",
    userId: "user404",
    userName: "Deepika Joshi",
    rating: 2,
    title: "Not as expected",
    content:
      "The kurti quality is below average. The fabric feels cheap and the stitching is not neat. The color is dull compared to the website photos. I'm disappointed with this purchase and wouldn't recommend it.",
    purchaseVerified: false,
    size: "M",
    color: "Yellow",
    helpfulCount: 8,
    isHelpful: false,
    date: "1 week ago",
    location: "Pune, Maharashtra",
  },
  {
    id: "8",
    userId: "user505",
    userName: "Lakshmi Iyer",
    rating: 5,
    title: "Perfect for office wear!",
    content:
      "This kurti is perfect for my office wardrobe. The fabric is comfortable for long hours and the design is professional yet stylish. The length is perfect and it pairs well with both leggings and palazzo pants. Excellent value for money!",
    images: [
      { id: "img10", url: "/api/placeholder/400/500", alt: "Office outfit" },
      { id: "img11", url: "/api/placeholder/400/500", alt: "With palazzo" },
    ],
    purchaseVerified: true,
    size: "M",
    color: "Black",
    helpfulCount: 22,
    isHelpful: true,
    date: "6 days ago",
    location: "Bangalore, Karnataka",
  },
];

const sampleSummary: ReviewSummary = {
  averageRating: 4.2,
  totalReviews: 156,
  ratingBreakdown: {
    5: 78,
    4: 45,
    3: 18,
    2: 12,
    1: 3,
  },
  withPhotos: 89,
  withVideos: 23,
};

export default function UGCReviewComponent({
  reviews = sampleReviews,
  summary = sampleSummary,
  onLoadMore,
  hasMore = false,
  loading = false,
}: UGCReviewProps) {
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(reviews);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setFilteredReviews(reviews);
  }, [reviews]);

  const handleFilter = (filter: string) => {
    setSelectedFilter(filter);
    let filtered = reviews;

    switch (filter) {
      case "photos":
        filtered = reviews.filter(
          (review) => review.images && review.images.length > 0
        );
        break;
      case "videos":
        filtered = reviews.filter((review) => review.videoUrl);
        break;
      case "verified":
        filtered = reviews.filter((review) => review.purchaseVerified);
        break;
      case "5star":
        filtered = reviews.filter((review) => review.rating === 5);
        break;
      case "4star":
        filtered = reviews.filter((review) => review.rating === 4);
        break;
      case "3star":
        filtered = reviews.filter((review) => review.rating === 3);
        break;
      case "2star":
        filtered = reviews.filter((review) => review.rating === 2);
        break;
      case "1star":
        filtered = reviews.filter((review) => review.rating === 1);
        break;
      default:
        filtered = reviews;
    }

    setFilteredReviews(filtered);
    setShowFilters(false);
  };

  const handleHelpful = (reviewId: string) => {
    console.log("Marked helpful:", reviewId);
  };

  const openImageModal = (review: Review, imageIndex: number) => {
    setSelectedReview(review);
    setSelectedImageIndex(imageIndex);
  };

  const closeImageModal = () => {
    setSelectedReview(null);
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedReview?.images && selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex + 1) % selectedReview.images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedReview?.images && selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0
          ? selectedReview.images.length - 1
          : selectedImageIndex - 1
      );
    }
  };

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
    const sizes = {
      sm: "text-base",
      md: "text-lg",
      lg: "text-xl",
    };

    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.div
            key={star}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {star <= rating ? (
              <AiFillStar className={`${sizes[size]} text-yellow-400`} />
            ) : (
              <AiOutlineStar className={`${sizes[size]} text-gray-300`} />
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  const renderRatingBar = (rating: number, count: number) => {
    const percentage =
      summary.totalReviews > 0 ? (count / summary.totalReviews) * 100 : 0;

    return (
      <motion.div
        className="flex items-center space-x-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="font-poppins text-sm text-dark w-8">{rating}</span>
        <AiFillStar className="text-yellow-400 text-base" />
        <div className="flex-1 bg-neutral rounded-full h-2">
          <motion.div
            className="bg-primary h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
        <span className="font-poppins text-sm text-dark/70 w-8">{count}</span>
      </motion.div>
    );
  };

  const filterOptions = [
    { id: "all", label: "All Reviews", icon: null },
    {
      id: "photos",
      label: "With Photos",
      icon: <AiOutlineCamera className="text-base" />,
    },
    {
      id: "videos",
      label: "With Videos",
      icon: <AiOutlineVideoCamera className="text-base" />,
    },
    {
      id: "verified",
      label: "Verified",
      icon: <MdVerified className="text-base" />,
    },
    {
      id: "5star",
      label: "5 Stars",
      icon: <AiFillStar className="text-base text-yellow-400" />,
    },
    {
      id: "4star",
      label: "4 Stars",
      icon: <AiFillStar className="text-base text-yellow-400" />,
    },
    {
      id: "3star",
      label: "3 Stars",
      icon: <AiFillStar className="text-base text-yellow-400" />,
    },
    {
      id: "2star",
      label: "2 Stars",
      icon: <AiFillStar className="text-base text-yellow-400" />,
    },
    {
      id: "1star",
      label: "1 Star",
      icon: <AiFillStar className="text-base text-yellow-400" />,
    },
  ];

  return (
    <div className="bg-light py-8 sm:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4">
            Customer Reviews
          </h2>
          <motion.div
            className="w-20 h-1 bg-primary mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Review Summary */}
        <motion.div
          className="bg-white rounded-3xl p-6 sm:p-8 mb-8 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Overall Rating */}
            <div className="text-center lg:text-left">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="text-center">
                  <motion.div
                    className="text-6xl sm:text-7xl font-bold text-dark mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {summary.averageRating.toFixed(1)}
                  </motion.div>
                  {renderStars(Math.round(summary.averageRating), "lg")}
                  <p className="font-poppins text-dark/70 mt-2">
                    Based on {summary.totalReviews} reviews
                  </p>
                </div>
              </div>

              <div className="flex justify-center lg:justify-start space-x-6 mt-6">
                <motion.div
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <AiOutlineCamera className="text-accent text-lg" />
                  <span className="font-poppins text-sm text-dark/70">
                    {summary.withPhotos} with photos
                  </span>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <AiOutlineVideoCamera className="text-accent text-lg" />
                  <span className="font-poppins text-sm text-dark/70">
                    {summary.withVideos} with videos
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating}>
                  {renderRatingBar(
                    rating,
                    summary.ratingBreakdown[
                      rating as keyof typeof summary.ratingBreakdown
                    ]
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Mobile Filter Toggle */}
          <div className="sm:hidden">
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full bg-white rounded-xl p-4 flex items-center justify-between shadow-md"
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <BsFilterLeft className="text-primary text-xl" />
                <span className="font-poppins text-dark font-medium">
                  {filterOptions.find((f) => f.id === selectedFilter)?.label ||
                    "Filter Reviews"}
                </span>
              </div>
              <motion.div
                animate={{ rotate: showFilters ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <AiOutlineFilter className="text-dark/70 text-lg" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 bg-white rounded-xl shadow-md overflow-hidden"
                >
                  {filterOptions.map((option) => (
                    <motion.button
                      key={option.id}
                      onClick={() => handleFilter(option.id)}
                      className={`w-full p-4 flex items-center space-x-3 text-left transition-colors ${
                        selectedFilter === option.id
                          ? "bg-primary/10 border-r-4 border-primary"
                          : "hover:bg-neutral"
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option.icon}
                      <span className="font-poppins text-dark">
                        {option.label}
                      </span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Filters */}
          <div className="hidden sm:flex flex-wrap gap-3">
            {filterOptions.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => handleFilter(option.id)}
                className={`px-4 py-2 rounded-full font-poppins text-sm font-medium transition-all flex items-center space-x-2 ${
                  selectedFilter === option.id
                    ? "bg-primary text-white shadow-lg"
                    : "bg-white text-dark hover:bg-neutral border border-neutral"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {option.icon}
                <span>{option.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Reviews List */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {filteredReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    {review.userAvatar ? (
                      <Image
                        src={review.userAvatar}
                        alt={review.userName}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    ) : (
                      <FaUserCircle className="text-4xl text-gray-400" />
                    )}

                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-poppins font-semibold text-dark">
                          {review.userName}
                        </h4>
                        {review.purchaseVerified && (
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="flex items-center space-x-1 bg-accent/10 px-2 py-1 rounded-full"
                          >
                            <MdVerified className="text-accent text-sm" />
                            <span className="font-poppins text-xs text-accent font-medium">
                              Verified
                            </span>
                          </motion.div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 mt-1">
                        {renderStars(review.rating, "sm")}
                        <span className="font-poppins text-sm text-dark/70">
                          {review.rating}.0
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 mt-2 text-sm text-dark/60">
                        <div className="flex items-center space-x-1">
                          <FaCalendarAlt className="text-xs" />
                          <span className="font-poppins">{review.date}</span>
                        </div>
                        {review.location && (
                          <div className="flex items-center space-x-1">
                            <FaMapMarkerAlt className="text-xs" />
                            <span className="font-poppins">
                              {review.location}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="mb-4">
                  <h5 className="font-poppins font-semibold text-dark mb-2">
                    {review.title}
                  </h5>
                  <p className="font-poppins text-dark/80 leading-relaxed">
                    {review.content}
                  </p>
                </div>

                {/* Purchase Details */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="bg-neutral px-3 py-1 rounded-full font-poppins text-sm text-dark/70">
                    Size: {review.size}
                  </span>
                  <span className="bg-neutral px-3 py-1 rounded-full font-poppins text-sm text-dark/70">
                    Color: {review.color}
                  </span>
                </div>

                {/* Media */}
                {(review.images || review.videoUrl) && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-3">
                      {review.images?.map((image, imgIndex) => (
                        <motion.div
                          key={image.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative w-20 h-20 rounded-xl overflow-hidden cursor-pointer"
                          onClick={() => openImageModal(review, imgIndex)}
                        >
                          <Image
                            src={image.url}
                            alt={image.alt}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                            <AiOutlineCamera className="text-white text-xl" />
                          </div>
                        </motion.div>
                      ))}

                      {review.videoUrl && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative w-20 h-20 rounded-xl overflow-hidden cursor-pointer bg-black/10 flex items-center justify-center"
                        >
                          <FaPlay className="text-primary text-xl" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}

                {/* Helpful Button */}
                <motion.button
                  onClick={() => handleHelpful(review.id)}
                  className="flex items-center space-x-2 text-dark/70 hover:text-primary transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {review.isHelpful ? (
                    <AiFillLike className="text-primary text-lg" />
                  ) : (
                    <AiOutlineLike className="text-lg" />
                  )}
                  <span className="font-poppins text-sm">
                    Helpful ({review.helpfulCount})
                  </span>
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Load More Button */}
          {hasMore && (
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.button
                onClick={onLoadMore}
                disabled={loading}
                className="font-poppins bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {loading ? "Loading..." : "Load More Reviews"}
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Image Modal */}
        <AnimatePresence>
          {selectedReview && selectedImageIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeImageModal}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeImageModal}
                  className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                >
                  <AiOutlineClose className="text-2xl" />
                </button>

                {selectedReview.images && selectedReview.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
                    >
                      <AiOutlineLeft className="text-2xl" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
                    >
                      <AiOutlineRight className="text-2xl" />
                    </button>
                  </>
                )}

                <div className="relative">
                  <Image
                    src={selectedReview.images![selectedImageIndex].url}
                    alt={selectedReview.images![selectedImageIndex].alt}
                    width={800}
                    height={600}
                    className="object-contain max-h-[80vh] rounded-xl"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
