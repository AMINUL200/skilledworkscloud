import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BriefcaseBusiness,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PageLoader from "../../component/common/PageLoader";
import { api } from "../../utils/app";
import { getImageUrl } from "../../utils/getImageUrl";

const TeamDetailsPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState(null);

  // Fetch member details
  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/team-member/${slug}`);
        
        if (response.data.status && response.data.data) {
          setMember(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching member details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchMemberDetails();
    }
  }, [slug]);

  if (loading) {
    return <PageLoader />;
  }

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F9FF]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">Team member not found</h2>
          <button 
            onClick={() => navigate('/team')}
            className="mt-4 text-primary hover:underline"
          >
            Go back to team
          </button>
        </div>
      </div>
    );
  }

  // SEO Meta Data
  const metaTitle = `${member.name} - ${member.designation} | Skilled Works Cloud`;
  const metaDescription = member.short_desc || member.desc2 || `Meet ${member.name}, ${member.designation} at Skilled Works Cloud. Expert in immigration and work permit services.`;
  const metaImage = getImageUrl(member.web_image) || getImageUrl(member.mobile_image);
  const canonicalUrl = `${window.location.origin}/team/${member.slug}`;

  // Info items for the hero section
  const infoItems = [
    { icon: Mail, text: member.email },
    { icon: Phone, text: member.phone },
    { icon: MapPin, text: member.address },
    { icon: Calendar, text: member.experience },
  ].filter(item => item.text);

  // Buttons from API
  const buttons = [
    { name: member.button1_name, url: member.button1_url },
    { name: member.button2_name, url: member.button2_url },
    { name: member.button3_name, url: member.button3_url },
  ].filter(btn => btn.name);

  // Generate structured data for the team member (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": member.name,
    "jobTitle": member.designation,
    "email": member.email,
    "telephone": member.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": member.address
    },
    "image": metaImage,
    "description": metaDescription,
    "url": canonicalUrl,
    "worksFor": {
      "@type": "Organization",
      "name": "Skilled Works Cloud"
    }
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        {metaImage && <meta property="og:image" content={metaImage} />}
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="profile" />
        <meta property="og:profile:username" content={member.name} />
        <meta property="og:site_name" content="Skilled Works Cloud" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        {metaImage && <meta name="twitter:image" content={metaImage} />}
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content={member.name} />
        
        {/* Article Meta Tags */}
        <meta property="article:published_time" content={member.created_at} />
        <meta property="article:modified_time" content={member.updated_at} />
        
        {/* Keywords */}
        <meta name="keywords" content={`${member.name}, ${member.designation}, immigration advisor, work permit, UK visa, sponsor licence, ${member.expertise?.join(', ')}`} />
      </Helmet>

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <div className="bg-[#F5F9FF] min-h-screen">
        {/* HERO SECTION */}
        <section
          className="
            relative
            overflow-hidden
            bg-gradient-to-br
            from-[#0F172A]
            via-[#172554]
            to-[#2563EB]
            min-h-[50vh]
            flex
            items-center
            pt-20
            pb-14
          "
        >
          {/* BACKGROUND BLUR */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-400/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
            {/* BACK BUTTON */}
            <button
              onClick={() => navigate('/team')}
              className="mb-6 flex items-center gap-2 text-white/80 hover:text-white transition-all"
              aria-label="Back to team"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Team
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* LEFT CONTENT */}
              <div>
                {/* NAME */}
                <h1 className="text-2xl md:text-4xl font-bold leading-tight text-white">
                  {member.name}
                </h1>

                {/* ROLE */}
                <p className="mt-3 text-base text-blue-200">{member.designation}</p>

                {/* DESCRIPTION */}
                <p className="mt-4 text-sm leading-7 text-slate-200">
                  {member.short_desc || member.desc2}
                </p>

                {/* INFO */}
                {infoItems.length > 0 && (
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {infoItems.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md"
                        >
                          <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-300">
                            <Icon className="w-4 h-4" />
                          </div>
                          <p className="text-xs text-white truncate">{item.text}</p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* BUTTONS - Dynamic from API */}
                {buttons.length > 0 && (
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    {buttons.map((btn, index) => (
                      <button
                        key={index}
                        onClick={() => btn.url && (window.location.href = btn.url)}
                        className={`px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                          index === 0 
                            ? 'bg-white text-primary hover:scale-105' 
                            : 'border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-primary'
                        }`}
                      >
                        {btn.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT IMAGE */}
              <div className="relative flex justify-center">
                {/* BACK SHAPE */}
                <div className="absolute w-[320px] h-[360px] rounded-[40px] bg-gradient-to-br from-blue-500 to-cyan-400 rotate-6" />

                {/* IMAGE CARD */}
                <div className="relative w-full max-w-[320px] rounded-[40px] overflow-hidden border border-white/10 bg-white/10 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
                  <img
                    src={getImageUrl(member.web_image) || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1200&auto=format&fit=crop"}
                    alt={member.image_alt || member.name}
                    className="w-full h-[340px] object-cover"
                    loading="lazy"
                  />

                  {/* SOCIAL - Show email if available */}
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="py-24">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* BIO */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-[32px] p-8 lg:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
                  <h2 className="text-3xl font-bold text-slate-900">
                    About {member.name}
                  </h2>

                  {/* Render HTML content safely */}
                  <div 
                    className="mt-8 prose prose-lg max-w-none text-slate-600 leading-9"
                    dangerouslySetInnerHTML={{ __html: member.long_desc || '' }}
                  />
                </div>
              </div>

              {/* SIDEBAR */}
              <div className="space-y-8">
                {/* EXPERTISE */}
                {member.expertise && member.expertise.length > 0 && (
                  <div className="bg-white rounded-[32px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-primary">
                        <BriefcaseBusiness className="w-5 h-5" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">
                        Expertise
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {member.expertise.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50"
                        >
                          <div className="w-3 h-3 rounded-full bg-primary" />
                          <p className="text-slate-700 font-medium">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

               
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TeamDetailsPage;