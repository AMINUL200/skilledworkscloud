import React from 'react'
import { ArrowRight, Phone, Calendar, Shield, CheckCircle, Sparkles, MessageCircle } from 'lucide-react'

const ServCTASection = () => {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-muted to-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-dark via-primary to-primary-light shadow-2xl">
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          
          <div className="relative p-8 sm:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Left Content */}
              <div className="text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-semibold tracking-wide">
                    Limited Time Offer
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                  Ready to Get Started?
                </h2>
                
                <p className="text-base text-blue-100 mb-6 leading-relaxed">
                  Book your consultation today and get expert guidance on your immigration journey. 
                  Our team is here to help you achieve your goals.
                </p>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-sm text-white">Expert Guidance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-success" />
                    <span className="text-sm text-white">IAA Regulated</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-success" />
                    <span className="text-sm text-white">24/7 Support</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <button className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <Calendar className="w-4 h-4" />
                    Free Consultation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-white/30 text-white font-semibold transition-all duration-300 hover:bg-white/10 hover:border-white/50">
                    <Phone className="w-4 h-4" />
                    Call Us Now
                  </button>
                </div>
              </div>

              {/* Right Content - Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
                  <div className="text-3xl font-bold text-white">1000+</div>
                  <div className="text-xs text-blue-100 mt-1">Happy Clients</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
                  <div className="text-3xl font-bold text-white">98%</div>
                  <div className="text-xs text-blue-100 mt-1">Success Rate</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="text-xs text-blue-100 mt-1">Expert Team</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
                  <div className="text-3xl font-bold text-white">24/7</div>
                  <div className="text-xs text-blue-100 mt-1">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServCTASection