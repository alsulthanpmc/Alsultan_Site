import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
}

interface DoctorsSliderProps {
  doctors: Doctor[];
}

export default function DoctorsSlider({ doctors }: DoctorsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % doctors.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [doctors.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % doctors.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + doctors.length) % doctors.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Calculate which doctors to show (current and next 2)
  const visibleDoctors = [
    doctors[currentIndex],
    doctors[(currentIndex + 1) % doctors.length],
    doctors[(currentIndex + 2) % doctors.length],
  ];

  return (
    <section id="doctors" className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our <span className="text-primary">Expert Doctors</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Board-certified physicians dedicated to your health and wellness
          </p>
        </div>

        <div className="relative">
          {/* Slider Container */}
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visibleDoctors.map((doctor, idx) => (
                <motion.div
                  key={`${doctor.id}-${currentIndex}-${idx}`}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35, delay: idx * 0.08, ease: 'easeOut' }}
                  className="relative bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_38px_-14px_rgba(0,0,0,0.45)] transition-shadow duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/10 pointer-events-none" />
                  <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 border border-white/30 rounded-2xl pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className={cn(
              'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4',
              'w-12 h-12 bg-white rounded-full shadow-lg',
              'flex items-center justify-center',
              'text-gray-700 hover:text-primary hover:bg-primary/10',
              'transition-all',
              'hidden md:flex'
            )}
            aria-label="Previous doctor"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className={cn(
              'absolute right-0 top-1/2 -translate-y-1/2 translate-x-4',
              'w-12 h-12 bg-white rounded-full shadow-lg',
              'flex items-center justify-center',
              'text-gray-700 hover:text-primary hover:bg-primary/10',
              'transition-all',
              'hidden md:flex'
            )}
            aria-label="Next doctor"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Mobile Navigation */}
          <div className="flex md:hidden justify-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center"
              aria-label="Previous doctor"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center"
              aria-label="Next doctor"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {doctors.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                )}
                aria-label={`Go to doctor ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
