// app/page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Playfair_Display, Poppins } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
});

const kurtis = [
  {
    id: 1,
    title: "Floral Elegance Kurti",
    description: "Hand-embroidered floral design on premium cotton",
    price: "₹2,499",
    originalPrice: "₹3,299",
    discount: "24% OFF",
    colors: ['#E07A5F', '#8A9B6E', '#D57A7A', '#F5F0E6'],
    mediaType: "image",
    mediaSrc: "/kurti1.jpg",
    likes: 1280,
    comments: 45,
  },
  {
    id: 2,
    title: "Contemporary Silk Kurti",
    description: "Pure silk with modern geometric patterns",
    price: "₹3,299",
    originalPrice: "₹4,299",
    discount: "23% OFF",
    colors: ['#4A4A48', '#E07A5F', '#D57A7A', '#F8F5F2'],
    mediaType: "video",
    mediaSrc: "/kurti-video.mp4",
    likes: 2450,
    comments: 78,
  },
  {
    id: 3,
    title: "Boho Chic Kurti Set",
    description: "Printed cotton set with dupatta and leggings",
    price: "₹3,799",
    originalPrice: "₹4,999",
    discount: "24% OFF",
    colors: ['#8A9B6E', '#D57A7A', '#F5F0E6', '#4A4A48'],
    mediaType: "image",
    mediaSrc: "/kurti3.jpg",
    likes: 1890,
    comments: 62,
  },
  {
    id: 4,
    title: "Designer Anarkali Kurti",
    description: "Floor-length with intricate embroidery details",
    price: "₹4,299",
    originalPrice: "₹5,499",
    discount: "22% OFF",
    colors: ['#D57A7A', '#4A4A48', '#E07A5F', '#F8F5F2'],
    mediaType: "video",
    mediaSrc: "/anarkali-video.mp4",
    likes: 3120,
    comments: 112,
  },
];

export default function KurtiReels() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const videoRefs = useRef([]);
  const [liked, setLiked] = useState(Array(kurtis.length).fill(false));

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe up
      setCurrentIndex((prev) => (prev === kurtis.length - 1 ? 0 : prev + 1));
    }

    if (touchEnd - touchStart > 100) {
      // Swipe down
      setCurrentIndex((prev) => (prev === 0 ? kurtis.length - 1 : prev - 1));
    }
  };

  const handleWheel = (e) => {
    if (e.deltaY > 0) {
      setCurrentIndex((prev) => (prev === kurtis.length - 1 ? 0 : prev + 1));
    } else if (e.deltaY < 0) {
      setCurrentIndex((prev) => (prev === 0 ? kurtis.length - 1 : prev - 1));
    }
  };

  const togglePlay = (index) => {
    if (kurtis[index].mediaType === 'video') {
      const video = videoRefs.current[index];
      if (video) {
        if (video.paused) {
          video.play();
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      }
    }
  };
  
  const handleLike = (index) => {
    setLiked(prev => {
        const newLiked = [...prev];
        newLiked[index] = !newLiked[index];
        return newLiked;
    })
  }

  useEffect(() => {
    // Auto-play videos when they become active
    if (kurtis[currentIndex].mediaType === 'video') {
      const video = videoRefs.current[currentIndex];
      if (video) {
        video.play().catch(e => console.log("Auto-play prevented", e));
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(false);
    }

    // Pause other videos
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentIndex) {
        video.pause();
      }
    });
  }, [currentIndex]);

  return (
    <div className={`${playfair.variable} ${poppins.variable} min-h-screen bg-[#F8F5F2] relative overflow-hidden`}>
      {/* Reels container */}
      <div
        className="h-screen w-full relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        {kurtis.map((kurti, index) => (
          <div
            key={kurti.id}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentIndex ? 'translate-y-0' : index > currentIndex ? 'translate-y-full' : '-translate-y-full'
            }`}
          >
            {/* Media display */}
            <div className="absolute inset-0" onClick={() => togglePlay(index)}>
              {kurti.mediaType === 'image' ? (
                <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: `url(${kurti.mediaSrc})`}}>
                    <div className="w-full h-full bg-black/10"></div>
                </div>
              ) : (
                <video
                  ref={el => videoRefs.current[index] = el}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                >
                  <source src={kurti.mediaSrc} type="video/mp4" />
                </video>
              )}
            </div>

            {/* Overlay for UI elements */}
            <div className="absolute inset-0 flex justify-between items-end p-6 bg-gradient-to-t from-black/60 to-transparent">
                {/* Left Side: Product Info */}
                <div className="flex-1 max-w-lg text-white">
                    <h2 className="text-2xl font-playfair font-bold">{kurti.title}</h2>
                    <p className="font-poppins text-white/90 mb-2">{kurti.description}</p>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="text-xl font-poppins font-bold">{kurti.price}</div>
                        <span className="font-poppins text-red-400 line-through">{kurti.originalPrice}</span>
                        <span className="bg-red-400 text-white font-poppins text-xs px-2 py-1 rounded-full">{kurti.discount}</span>
                    </div>
                     <div className="flex items-center gap-4">
                        <h3 className="font-playfair mb-2">Colors:</h3>
                        <div className="flex gap-2">
                          {kurti.colors.map((color, i) => (
                            <div
                              key={i}
                              className="w-6 h-6 rounded-full border-2 border-white/80"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                    </div>
                    <button className="bg-[#E07A5F] hover:bg-[#C86A50] text-white font-poppins font-semibold py-2 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl mt-4">
                        Add to Cart
                    </button>
                </div>

                {/* Right Side: Action Buttons */}
                <div className="flex flex-col items-center gap-4 text-white">
                    <button onClick={() => handleLike(index)} className="flex flex-col items-center">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill={liked[index] ? 'red' : 'currentColor'}>
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span className="font-poppins text-sm">{liked[index] ? kurti.likes + 1 : kurti.likes}</span>
                    </button>
                    <button className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="font-poppins text-sm">{kurti.comments}</span>
                    </button>
                    <button className="flex flex-col items-center">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                       <span className="font-poppins text-sm">Share</span>
                    </button>
                     {kurti.mediaType === 'video' && (
                       <button onClick={() => togglePlay(index)} className="mt-2">
                        {isPlaying && index === currentIndex ? (
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        ) : (
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                        )}
                       </button>
                    )}
                </div>
            </div>

            {/* Progress indicator */}
            <div className="absolute top-4 left-0 right-0 flex justify-center gap-2">
              {kurtis.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'w-8 bg-[#E07A5F]' : 'w-4 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Navigation instructions */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center">
          <div className="bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white animate-bounce" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span className="font-poppins text-white text-sm">Swipe to explore</span>
          </div>
        </div>
      </div>

      {/* Floating cart button */}
      <button className="fixed top-4 left-4 bg-white rounded-full p-3 shadow-lg z-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4A4A48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </button>

      {/* Floating logo */}
      <div className="fixed top-6 right-6 z-10">
        <div className="font-playfair font-bold text-2xl text-white" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.5)'}}>ZENGY</div>
      </div>
    </div>
  );
}