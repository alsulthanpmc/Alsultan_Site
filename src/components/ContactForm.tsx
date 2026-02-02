import { FacebookIcon, InstagramIcon, LinkedinIcon, MessageCircle } from 'lucide-react';

interface ContactInfo {
  name: string;
  phone: string;
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
    icon: FacebookIcon,
  },
  {
    key: 'instagram',
    label: 'Instagram',
    icon: InstagramIcon,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: LinkedinIcon,
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

export default function ContactForm({ contactInfo }: ContactFormProps) {
  const whatsappHref = `https://wa.me/${contactInfo.whatsapp.replace(/\s/g, '')}`;

  const availableSocials = socials.filter(({ key }) => contactInfo.social?.[key]);

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
      </div>
    </section>
  );
}
