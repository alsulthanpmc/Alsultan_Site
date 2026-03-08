import { useEffect, useRef, useState } from 'react';
import { Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';

interface ContactInfo {
  name: string;
  phone: string;
  landline?: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
  mapUrl: string;
  social?: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    snapchat?: string;
    linkedin?: string;
  };
}

interface ContactFormProps {
  contactInfo: ContactInfo;
}

const socials: { key: keyof NonNullable<ContactInfo['social']>; label: string; icon: React.ComponentType<{ className?: string }> | null }[] = [
  {
    key: 'facebook',
    label: 'Facebook',
    icon: Facebook,
  },
  {
    key: 'instagram',
    label: 'Instagram',
    icon: Instagram,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: Linkedin,
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    icon: null,
  },
  {
    key: 'snapchat',
    label: 'Snapchat',
    icon: null,
  },
];

const insurancePartners = [
  { name: 'AKTI', file: 'AKTI.jpg' },
  { name: 'Al Koot', file: 'Alkoot.jpg' },
  { name: 'Al Sharq', file: 'Al sharq.jpg' },
  { name: 'Arabia', file: 'Arabia.jpg' },
  { name: 'Doha Insurance', file: 'Doha Insurance.jpg' },
  { name: 'General Takaful', file: 'General takaful.jpg' },
  { name: 'GlobeMed', file: 'Globe Med.jpg' },
  { name: 'Islamic Insurance', file: 'Islamic insurance.jpg' },
  { name: 'Libano', file: 'Libano.jpg' },
  { name: 'Qatar General', file: 'Qatar general.jpg' },
  { name: 'QLM', file: 'QLM.jpg' },
  { name: 'Seib', file: 'Seib.jpg' },
  { name: 'Seib 2', file: 'Seib2.jpg' },
  { name: 'Shamel', file: 'Shamel.jpg' },
];

export default function ContactForm({ contactInfo }: ContactFormProps) {
  const whatsappHref = `https://wa.me/${contactInfo.whatsapp.replace(/\s/g, '')}`;

  const availableSocials = socials.filter(({ key }) => contactInfo.social?.[key]);
  const insurancePartnersLoop = [...insurancePartners, ...insurancePartners];
  const carouselTrackRef = useRef<HTMLDivElement | null>(null);
  const [activePartnerIndex, setActivePartnerIndex] = useState(0);
  const [stepSize, setStepSize] = useState(0);
  const [disableTransition, setDisableTransition] = useState(false);

  useEffect(() => {
    const calculateStepSize = () => {
      const track = carouselTrackRef.current;
      const firstItem = track?.firstElementChild as HTMLDivElement | null;
      if (!track || !firstItem) return;

      const itemWidth = firstItem.getBoundingClientRect().width;
      const computedStyles = getComputedStyle(track);
      const gap = Number.parseFloat(computedStyles.gap || '0');
      setStepSize(itemWidth + gap);
    };

    calculateStepSize();
    window.addEventListener('resize', calculateStepSize);
    return () => window.removeEventListener('resize', calculateStepSize);
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActivePartnerIndex((prev) => prev + 1);
    }, 2000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (activePartnerIndex !== insurancePartners.length) return;

    const timeoutId = window.setTimeout(() => {
      setDisableTransition(true);
      setActivePartnerIndex(0);

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setDisableTransition(false));
      });
    }, 700);

    return () => window.clearTimeout(timeoutId);
  }, [activePartnerIndex]);

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Have questions? We're here to help. Contact us or book an appointment today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center">
          {/* Primary CTA */}
          <div className="bg-gradient-to-r from-primary to-primary-700 text-white rounded-2xl p-10 shadow-xl">
            <div className="text-sm uppercase tracking-[0.2em] text-white/80 mb-3">Instant Support</div>
            <h3 className="text-3xl font-bold leading-tight mb-4">Chat with us on WhatsApp</h3>
            <p className="text-white/90 text-lg mb-8">Get quick answers, book appointments, or ask for directions directly.</p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-white text-primary font-semibold px-5 sm:px-7 py-3 sm:py-4 rounded-xl shadow-lg hover:-translate-y-0.5 hover:shadow-2xl active:scale-95 transition-transform duration-200 w-full sm:w-auto touch-manipulation"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-sm sm:text-base">Message on WhatsApp</span>
            </a>
          </div>

          {/* Social & quick links */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg border border-gray-100">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Other ways to reach us</h3>
            <div className="space-y-3 sm:space-y-4 text-gray-700">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-lg flex-shrink-0">📍</span>
                <div>
                  <div className="text-xs sm:text-sm text-gray-500">Visit us</div>
                  <div className="font-medium text-sm sm:text-base">{contactInfo.address}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-lg flex-shrink-0">📞</span>
                <div>
                  <div className="text-xs sm:text-sm text-gray-500">Call us</div>
                  <a href={`tel:${contactInfo.phone}`} className="font-medium text-sm sm:text-base text-primary hover:text-primary-600 transition-colors touch-manipulation">
                    {contactInfo.phone}
                  </a>
                  {contactInfo.landline && (
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500">Landline</div>
                      <a href={`tel:${contactInfo.landline}`} className="font-medium text-sm sm:text-base text-primary hover:text-primary-600 transition-colors touch-manipulation">
                        {contactInfo.landline}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-lg flex-shrink-0">⏰</span>
                <div>
                  <div className="text-xs sm:text-sm text-gray-500">Working hours</div>
                  <div className="font-medium text-sm sm:text-base">{contactInfo.hours}</div>
                </div>
              </div>
            </div>

            {availableSocials.length > 0 && (
              <div className="mt-6 sm:mt-8">
                <div className="text-xs sm:text-sm text-gray-500 mb-3">Social media</div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {availableSocials.map(({ key, label, icon: Icon }) => (
                    <a
                      key={key}
                      href={contactInfo.social?.[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full border border-gray-200 text-gray-700 hover:text-primary hover:border-primary/40 hover:bg-primary/5 active:scale-95 transition-all touch-manipulation"
                    >
                      {Icon ? (
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : key === 'tiktok' ? (
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                        </svg>
                      ) : key === 'snapchat' ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.065,2a5.526,5.526,0,0,1,3.132.892A5.854,5.854,0,0,1,17.326,5.4a5.821,5.821,0,0,1,.351,2.33q0,.612-.117,2.487a.809.809,0,0,0,.365.091,1.93,1.93,0,0,0,.664-.176,1.93,1.93,0,0,1,.664-.176,1.3,1.3,0,0,1,.729.234.7.7,0,0,1,.351.6.839.839,0,0,1-.41.7,2.732,2.732,0,0,1-.9.41,3.192,3.192,0,0,0-.9.378.728.728,0,0,0-.41.618,1.575,1.575,0,0,0,.156.56,6.9,6.9,0,0,0,1.334,1.8,5.824,5.824,0,0,0,1.881,1.227,1.064,1.064,0,0,1,.534.436.977.977,0,0,1,.117.507,1.408,1.408,0,0,1-.807,1.111,3.947,3.947,0,0,1-1.7.436,5.2,5.2,0,0,1-1.852-.456q-.613-.267-1.3-.553a6.068,6.068,0,0,0-1.416-.287,1.816,1.816,0,0,0-.807.117,1.445,1.445,0,0,0-.456.312,5.3,5.3,0,0,1-1.01.755,2.872,2.872,0,0,1-1.147.261,2.914,2.914,0,0,1-1.147-.261,5.366,5.366,0,0,1-1.01-.755,1.446,1.446,0,0,0-.456-.312,1.816,1.816,0,0,0-.807-.117,6.068,6.068,0,0,0-1.416.287q-.69.286-1.3.553a5.2,5.2,0,0,1-1.852.456,3.947,3.947,0,0,1-1.7-.436A1.408,1.408,0,0,1,2,19.412a.977.977,0,0,1,.117-.507,1.064,1.064,0,0,1,.534-.436,5.824,5.824,0,0,0,1.881-1.227,6.9,6.9,0,0,0,1.334-1.8,1.575,1.575,0,0,0,.156-.56.728.728,0,0,0-.41-.618,3.192,3.192,0,0,0-.9-.378,2.732,2.732,0,0,1-.9-.41.839.839,0,0,1-.41-.7.7.7,0,0,1,.351-.6,1.3,1.3,0,0,1,.729-.234,1.93,1.93,0,0,1,.664.176,1.93,1.93,0,0,0,.664.176.809.809,0,0,0,.365-.091q-.117-1.875-.117-2.487A5.821,5.821,0,0,1,6.41,5.4,5.854,5.854,0,0,1,8.539,2.892,5.526,5.526,0,0,1,11.671,2Z"/>
                        </svg>
                      ) : null}
                      <span className="text-xs sm:text-sm font-medium">{label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-12 relative overflow-hidden bg-gradient-to-br from-white via-white to-primary/[0.04] rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg border border-gray-100">
          <div className="text-center mb-5 sm:mb-7">
            <div className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium px-3 py-1 mb-3">
              Trusted Network
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-primary">Our Insurance Partners</h3>
            <p className="text-sm sm:text-base text-gray-600 mt-2">We collaborate with trusted insurance providers for smoother care access.</p>
          </div>

          <div className="relative overflow-hidden">
            <div
              ref={carouselTrackRef}
              className={`flex w-max items-center gap-3 sm:gap-4 ${disableTransition ? '' : 'transition-transform duration-700 ease-in-out'}`}
              style={{ transform: `translateX(-${activePartnerIndex * stepSize}px)` }}
            >
              {insurancePartnersLoop.map((partner, index) => (
              <div
                key={`${partner.file}-${index}`}
                className="group relative overflow-hidden bg-gradient-to-br from-gray-100 via-white to-primary/[0.08] border border-primary/20 rounded-xl sm:rounded-2xl p-0 w-[112px] h-[112px] sm:w-[132px] sm:h-[132px] flex-shrink-0 flex items-center justify-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
                <img
                  src={`/Insurance_partners/${encodeURIComponent(partner.file)}`}
                  alt={`${partner.name} logo`}
                  loading="lazy"
                  className="h-full w-full object-contain scale-100 contrast-125 saturate-125 brightness-95 drop-shadow-[0_8px_14px_rgba(15,23,42,0.18)] group-hover:contrast-150 group-hover:saturate-150 group-hover:scale-105 transition-all duration-300 ease-out"
                />
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
