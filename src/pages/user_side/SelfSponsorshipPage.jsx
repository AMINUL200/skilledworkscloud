import React from "react";
import SPBannerSection from "../../component/selfSponsorship/SPBannerSection";
import SelfSponsorshipStepsSection from "../../component/selfSponsorship/SelfSponsorshipStepsSection";
import SPSuitabilitySection from "../../component/selfSponsorship/SPSuitabilitySection";
import SPBenefitsSection from "../../component/selfSponsorship/SPBenefitsSection";
import SPJourneySection from "../../component/selfSponsorship/SPJourneySection";
import SPCTASection from "../../component/selfSponsorship/SPCTASection";
import SPFaqSection from "../../component/selfSponsorship/SPFaqSection";


const SelfSponsorshipPage = () => {
  return (
    <div className="overflow-hidden">
      {/* ================= BANNER SECTION ================= */}

      <SPBannerSection />
      {/* ================= STEPS SECTION ================= */}

      <SelfSponsorshipStepsSection />
      {/* ================= SUITABILITY SECTION ================= */}

      <SPSuitabilitySection />

      {/* =============== BENEFITS SECTION ============== */}
      <SPBenefitsSection />

      {/* ================= JOURNEY SECTION ================= */}
      <SPJourneySection />

      {/* ================= CTA SECTION ================= */}
      <SPCTASection />

      {/* ================= FAQ SECTION ================= */}
      <SPFaqSection />

    </div>
  );
};

export default SelfSponsorshipPage;