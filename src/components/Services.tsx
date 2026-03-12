import * as Tabs from '@radix-ui/react-tabs';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Smile, Sparkles, Stethoscope, FlaskConical, Dumbbell, ChevronRight, Activity, Pill } from 'lucide-react';
import { cn } from '@/utils/cn';

interface Service {
  id: string;
  slug: string;
  data: {
    title: string;
    category: 'cosmetic-dentistry' | 'general-dentistry' | 'dermatology' | 'orthodontics' | 'general-medicine' | 'laboratory' | 'physiotherapy' | 'pharmacy';
    description: string;
    price?: string;
    services?: string[];
  };
}

interface Department {
  id: string;
  slug: string;
  data: {
    title: string;
    description: string;
    icon: string;
    services: string[];
  };
}

interface ServicesProps {
  services: Service[];
  departments?: Department[];
}

const categories = [
  { id: 'cosmetic-dentistry', label: 'Cosmetic Dentistry', icon: Smile },
  { id: 'general-dentistry', label: 'General Dentistry', icon: Activity },
  { id: 'dermatology', label: 'Dermatology', icon: Sparkles },
  { id: 'orthodontics', label: 'Orthodontics', icon: Smile },
  { id: 'general-medicine', label: 'General Medicine', icon: Stethoscope },
  { id: 'laboratory', label: 'Laboratory', icon: FlaskConical },
  { id: 'physiotherapy', label: 'Physiotherapy', icon: Dumbbell },
  { id: 'pharmacy', label: 'Pharmacy', icon: Pill },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  '😁': Smile,
  '🦷': Activity,
  '✨': Sparkles,
  '🏥': Stethoscope,
  '🔬': FlaskConical,
  '💪': Dumbbell,
  '💊': Pill,
};

export default function Services({ services, departments }: ServicesProps) {
  const [activeTab, setActiveTab] = useState('cosmetic-dentistry');
  const [mounted, setMounted] = useState(false);
  const servicesByCategory = categories.map((category) => ({
    ...category,
    services: services.filter((s) => s.data.category === category.id),
  }));

  useEffect(() => {
    setMounted(true);
  }, []);

  const normalizePrice = (price?: string) => {
    const cleaned = price ? price.replace(/^\s*starting from\s*/i, '').trim() : '';
    return cleaned && cleaned.length > 0 ? `Starting from ${cleaned}` : 'Starting from —';
  };

  return (
    <section id="services" className="section-padding bg-gray-50">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive medical services tailored to your healthcare needs
          </p>
        </div>

        {/* Departments inline - show as quick tiles that switch the service tab */}
        {departments && departments.length > 0 && (
          <div className="w-full max-w-5xl mx-auto flex flex-wrap justify-center gap-4 mb-8">
            {departments.map((dept) => {
              const Icon = iconMap[dept.data.icon] || Stethoscope;
              return (
                <button
                  key={dept.id}
                  onClick={() => setActiveTab(dept.slug)}
                  className={cn(
                    'w-[180px] sm:w-[200px] md:w-[210px] lg:w-[220px]',
                    'group p-4 bg-white border-2 border-gray-200 rounded-xl',
                    'hover:border-primary hover:shadow-lg transition-all',
                    'flex flex-col items-center text-center'
                  )}
                >
                  <div className="mb-2 text-primary group-hover:scale-110 transition-transform">
                    <Icon className="w-10 h-10" />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors text-sm md:text-base">
                    {dept.data.title}
                  </h3>
                </button>
              );
            })}
          </div>
        )}

        <Tabs.Root
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          {/* Tab triggers removed: department tiles above act as primary controls */}

          {/* Tab Content */}
          {servicesByCategory.map((category) => (
            <Tabs.Content
              key={category.id}
              value={category.id}
              className="focus:outline-none"
            >
              <AnimatePresence mode="wait">
                {category.id === activeTab && (
                  <motion.div
                    key={category.id}
                    initial={mounted ? { opacity: 0, y: 12 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="w-full flex justify-center"
                  >
                    {category.services.length > 0 ? (
                      <div className="grid w-full max-w-5xl mx-auto grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 justify-items-center">
                        {category.services.map((service, idx) => (
                          <motion.div
                            key={service.id}
                            initial={mounted ? { opacity: 0, y: 10 } : false}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: idx * 0.05, ease: 'easeOut' }}
                            className="w-full h-full"
                          >
                            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200 border border-gray-100">
                              <div className="flex items-start justify-between mb-3">
                                <h3 className="text-xl font-bold text-gray-900">
                                  {service.data.title}
                                </h3>
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                                  {normalizePrice(service.data.price)}
                                </span>
                              </div>
                              <p className="text-gray-600 mb-4">
                                {service.data.description}
                              </p>
                              {service.data.services?.length ? (
                                <ul className="text-sm text-gray-700 space-y-2">
                                  {service.data.services.map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary/70" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <div className="text-sm text-gray-500">
                                  Fast and reliable service with professional care.
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (() => {
                      const Icon = category.icon;
                      return (
                        <div className="bg-white p-12 rounded-xl text-center max-w-3xl mx-auto">
                          <div className="text-primary mb-4 flex justify-center">
                            <Icon className="w-16 h-16" />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {category.label} Services
                          </h3>
                          <p className="text-gray-600">
                            Coming soon! We're expanding our {category.label.toLowerCase()} services.
                          </p>
                          <a
                            href="#contact"
                            className="inline-flex items-center mt-6 text-primary hover:text-primary-600 font-medium"
                          >
                            Contact us for more information
                            <ChevronRight className="w-5 h-5 ml-2" />
                          </a>
                        </div>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </section>
  );
}
