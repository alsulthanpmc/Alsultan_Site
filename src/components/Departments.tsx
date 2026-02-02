import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Smile, Activity, Sparkles, Stethoscope, FlaskConical, Dumbbell, Check, ChevronRight, X } from 'lucide-react';
import { cn } from '@/utils/cn';

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

interface DepartmentsProps {
  departments: Department[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  '😁': Smile,
  '🦷': Activity,
  '✨': Sparkles,
  '🏥': Stethoscope,
  '🔬': FlaskConical,
  '💪': Dumbbell,
};

export default function Departments({ departments }: DepartmentsProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  
  const getIcon = (iconEmoji: string) => {
    const IconComponent = iconMap[iconEmoji] || Stethoscope;
    return IconComponent;
  };

  return (
    <section id="departments" className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-primary">Departments</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive medical services across multiple specialties
          </p>
        </div>

        <div className="w-full max-w-5xl mx-auto flex flex-wrap justify-center gap-4">
          {departments.map((dept) => {
            const Icon = getIcon(dept.data.icon);
            return (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept)}
                className={cn(
                  'w-[180px] sm:w-[200px] md:w-[210px] lg:w-[220px]',
                  'group p-6 bg-white border-2 border-gray-200 rounded-xl',
                  'hover:border-primary hover:shadow-lg transition-all',
                  'flex flex-col items-center text-center'
                )}
              >
                <div className="mb-3 text-primary group-hover:scale-110 transition-transform">
                  <Icon className="w-12 h-12" />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors text-sm md:text-base">
                  {dept.data.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Department Modal */}
        <Dialog.Root open={!!selectedDepartment} onOpenChange={() => setSelectedDepartment(null)}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in" />
            <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-[90vw] max-w-2xl max-h-[85vh] overflow-y-auto animate-fade-up">
              {selectedDepartment && (() => {
                const Icon = getIcon(selectedDepartment.data.icon);
                return (
                  <div className="p-6 md:p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center">
                        <div className="text-primary mr-4">
                          <Icon className="w-14 h-14" />
                        </div>
                        <div>
                          <Dialog.Title className="text-2xl md:text-3xl font-bold text-gray-900">
                            {selectedDepartment.data.title}
                          </Dialog.Title>
                          <Dialog.Description className="text-gray-600 mt-1">
                            {selectedDepartment.data.description}
                          </Dialog.Description>
                        </div>
                      </div>
                      <Dialog.Close className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="w-6 h-6" />
                      </Dialog.Close>
                    </div>

                    {/* Services */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-lg text-gray-900 mb-3">Our Services</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedDepartment.data.services.map((service, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Body Content */}
                    <div className="prose prose-gray max-w-none text-gray-600">
                      <p>
                        Our {selectedDepartment.data.title} department provides comprehensive care with state-of-the-art facilities and experienced medical professionals.
                      </p>
                      <p className="mt-4">
                        We are committed to delivering exceptional healthcare services that meet the highest standards of medical excellence.
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <a
                        href="#contact"
                        onClick={() => setSelectedDepartment(null)}
                        className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-600 text-white rounded-lg font-medium transition-colors w-full md:w-auto"
                      >
                        Book Appointment
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </a>
                    </div>
                  </div>
                );
              })()}
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </section>
  );
}
