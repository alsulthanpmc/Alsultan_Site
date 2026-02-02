import * as Tabs from '@radix-ui/react-tabs';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Smile, Sparkles, Stethoscope, FlaskConical, Dumbbell, ChevronRight, Activity } from 'lucide-react';
import { cn } from '@/utils/cn';

interface Service {
  id: string;
  slug: string;
  data: {
    title: string;
    category: 'cosmetic-dentistry' | 'general-dentistry' | 'dermatology' | 'orthodontics' | 'general-medicine' | 'laboratory' | 'physiotherapy';
    description: string;
    price?: string;
    services?: string[];
  };
}

interface ServicesProps {
  services: Service[];
}

const categories = [
  { id: 'cosmetic-dentistry', label: 'Cosmetic Dentistry', icon: Smile },
  { id: 'general-dentistry', label: 'General Dentistry', icon: Activity },
  { id: 'dermatology', label: 'Dermatology', icon: Sparkles },
  { id: 'orthodontics', label: 'Orthodontics', icon: Smile },
  { id: 'general-medicine', label: 'General Medicine', icon: Stethoscope },
  { id: 'laboratory', label: 'Laboratory', icon: FlaskConical },
  { id: 'physiotherapy', label: 'Physiotherapy', icon: Dumbbell },
];

export default function Services({ services }: ServicesProps) {
  const [activeTab, setActiveTab] = useState('cosmetic-dentistry');
  const servicesByCategory = categories.map((category) => ({
    ...category,
    services: services.filter((s) => s.data.category === category.id),
  }));

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

        <Tabs.Root
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          {/* Tab List */}
          <Tabs.List className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8 w-full max-w-5xl mx-auto justify-items-stretch">
            {servicesByCategory.map((category) => {
              const Icon = category.icon;
              return (
                <Tabs.Trigger
                  key={category.id}
                  value={category.id}
                  className={cn(
                    'w-full px-5 py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-200 border border-transparent text-center justify-center',
                    'data-[state=inactive]:bg-white/80 data-[state=inactive]:text-gray-700 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm',
                    'data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105',
                    'flex items-center gap-2'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{category.label}</span>
                </Tabs.Trigger>
              );
            })}
          </Tabs.List>

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
                    initial={{ opacity: 0, y: 12 }}
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
                            initial={{ opacity: 0, y: 10 }}
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
