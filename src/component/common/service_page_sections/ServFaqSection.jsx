import React, { useState } from 'react';
import {
  Plus,
  Minus,
  Search,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  ArrowRight,
  Clock,
  Award,
  Users,
  ChevronDown,
} from 'lucide-react';

const ServFaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // FAQ Data
  const faqData = [
    {
      id: 1,
      question: 'What services do you offer?',
      answer: 'We provide comprehensive immigration services including Sponsor Licence applications, Skilled Worker Visa assistance, HR Compliance consulting, and full legal support for businesses and individuals. Our team of experts guides you through every step of the process.',
    },
    {
      id: 2,
      question: 'How long does the Sponsor Licence application take?',
      answer: 'The Sponsor Licence application typically takes 4-8 weeks for a standard application. However, with our priority service, we can expedite this process. We\'ll guide you through the entire process and help you prepare all necessary documentation to ensure a smooth application.',
    },
    {
      id: 3,
      question: 'What are the requirements for a Skilled Worker Visa?',
      answer: 'The Skilled Worker Visa requires a valid job offer from a licensed sponsor, a salary of at least £26,200 per year (or the going rate for the job), and English language proficiency. You\'ll also need to meet the points-based system requirements and have a certificate of sponsorship.',
    },
    {
      id: 4,
      question: 'How do you ensure HR compliance?',
      answer: 'Our HR compliance services include conducting right-to-work checks, maintaining accurate employee records, ensuring compliance with UK immigration laws, and providing ongoing support and audits. We help you avoid penalties and maintain a compliant workforce.',
    },
    {
      id: 5,
      question: 'What is the cost of your services?',
      answer: 'Our services are competitively priced with transparent fees. Costs vary depending on the specific service required. We offer free initial consultations to assess your needs and provide a detailed quote. Contact us for a personalized quote tailored to your requirements.',
    },
    {
      id: 6,
      question: 'Can you help with visa extensions?',
      answer: 'Yes, we provide comprehensive support for visa extensions. Our team will assess your situation, gather necessary documentation, and submit your application. We keep you informed throughout the process and ensure all deadlines are met.',
    },
    {
      id: 7,
      question: 'What are the penalties for non-compliance?',
      answer: 'Non-compliance with UK immigration laws can result in severe penalties including fines of up to £20,000 per illegal worker, revocation of your Sponsor Licence, and even imprisonment for serious offenses. Our compliance services help you avoid these risks.',
    },
    {
      id: 8,
      question: 'How do I become a licensed sponsor?',
      answer: 'To become a licensed sponsor, you need to apply to the UK Home Office. This involves demonstrating that your business is legitimate, you can meet your sponsor duties, and you have appropriate HR systems in place. We can help you prepare and submit your application.',
    },
  ];

  // Filter FAQs based on search
  const filteredFaqs = faqData.filter((faq) => {
    return faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-300/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <HelpCircle size={16} className="text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              FAQ
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text leading-tight">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-text-light leading-relaxed">
            Find answers to the most common questions about our immigration services.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
            />
          </div>
        </div>

        {/* FAQ Accordion */}
        <div>
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white/80 rounded-2xl border border-gray-200">
              <HelpCircle size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-text">No results found</h3>
              <p className="text-text-light text-sm">Try adjusting your search terms</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {filteredFaqs.map((faq, index) => {
                const isActive = activeIndex === index;
                return (
                  <div
                    key={faq.id}
                    className={`group bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isActive
                        ? 'border-primary shadow-lg shadow-primary/10'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-5 sm:px-7 py-5 sm:py-6 flex items-start justify-between gap-4 text-left"
                    >
                      <h3 className={`text-sm sm:text-base font-semibold text-text transition-colors flex-1 ${
                        isActive ? 'text-primary' : 'group-hover:text-primary'
                      }`}>
                        {faq.question}
                      </h3>
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all mt-0.5 ${
                        isActive 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary'
                      }`}>
                        {isActive ? (
                          <Minus size={18} className="sm:w-[20px] sm:h-[20px]" />
                        ) : (
                          <Plus size={18} className="sm:w-[20px] sm:h-[20px]" />
                        )}
                      </div>
                    </button>

                    {/* Answer */}
                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      } overflow-hidden`}
                    >
                      <div className="px-5 sm:px-7 pb-5 sm:pb-6">
                        <div className="h-px bg-gray-200 mb-4" />
                        <p className="text-sm sm:text-base text-text-light leading-relaxed pr-4">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

       
      </div>
    </section>
  );
};

export default ServFaqSection;