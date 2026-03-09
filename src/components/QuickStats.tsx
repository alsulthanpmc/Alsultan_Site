import { useEffect, useRef, useState } from 'react';
import statsData from '@/data/stats.json';

interface Stat {
  id: number;
  label: string;
  value: number;
  suffix: string;
}

interface QuickStatsProps {}

export default function QuickStats(_props: QuickStatsProps = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Check if already in viewport (common with client:visible hydration)
    const rect = el.getBoundingClientRect();
    if (
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.width > 0 &&
      rect.height > 0
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-primary text-white">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-12 max-w-4xl mx-auto">
          {statsData.map((stat: Stat) => (
            <StatCard key={stat.id} stat={stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, isVisible }: { stat: Stat; isVisible: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = stat.value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, stat.value]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'k';
    }
    return num.toString();
  };

  return (
    <div className="text-center px-2">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">
        {formatNumber(count)}
        {count === stat.value && stat.suffix}
      </div>
      <div className="text-xs sm:text-sm lg:text-base text-primary-100">{stat.label}</div>
    </div>
  );
}
