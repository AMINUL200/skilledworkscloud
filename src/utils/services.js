const fullServiceSections = [
  { type: "hero", order: 1 },
  { type: "stats", order: 2 },
  { type: "about", order: 3 },
  { type: "features", order: 4 },
  { type: "benefits", order: 5 },
  { type: "services", order: 6 },
  {
    type: "why_choose",
    order: 7,
  },
  {
    type: "req_doc",
    order: 8,
  },
  // { type: "gallery", order: 7 },
  // { type: "team", order: 8 },
  { type: "process", order: 9 },
  { type: "timeline", order: 10 },
  // { type: "technologies", order: 11 },
  { type: "pricing", order: 12 },
  // { type: "portfolio", order: 13 },
  { type: "case-study", order: 14 },
  { type: "testimonials", order: 15 },
  { type: "faq", order: 16 },
  { type: "cta", order: 17 },
  { type: "contact", order: 18 },
];
const defaultVisaSections = [
  { type: "hero", order: 1 },
  { type: "stats", order: 2 },
  { type: "about", order: 3 },
  { type: "benefits", order: 4 },
  { type: "services", order: 5 },
  { type: "process", order: 6 },
  { type: "timeline", order: 7 },
  { type: "faq", order: 8 },
  { type: "cta", order: 9 },
  { type: "contact", order: 10 },
];

const defaultBusinessSections = [
  { type: "hero", order: 1 },
  { type: "stats", order: 2 },
  { type: "about", order: 3 },
  { type: "features", order: 4 },
  { type: "services", order: 5 },
  { type: "process", order: 6 },
  { type: "testimonials", order: 7 },
  { type: "faq", order: 8 },
  { type: "cta", order: 9 },
  { type: "contact", order: 10 },
];

const defaultSponsorSections = [
  { type: "hero", order: 1 },
  { type: "stats", order: 2 },
  { type: "about", order: 3 },
  { type: "services", order: 4 },
  { type: "process", order: 5 },
  { type: "case-study", order: 6 },
  { type: "testimonials", order: 7 },
  { type: "faq", order: 8 },
  { type: "cta", order: 9 },
  { type: "contact", order: 10 },
];

const defaultComplianceSections = [
  { type: "hero", order: 1 },
  { type: "about", order: 2 },
  //   { type: "services", order: 3 },
  //   { type: "process", order: 4 },
  //   { type: "faq", order: 5 },
  //   { type: "cta", order: 6 },
  //   { type: "contact", order: 7 },
];
export const services = [
  {
    slug: "student-visa",
    title: "Student Visa",

    sections: [
      { type: "hero", order: 1 },
      { type: "stats", order: 2 },
      { type: "about", order: 3 },
      { type: "benefits", order: 4 },
      { type: "services", order: 5 },
      { type: "process", order: 6 },
      { type: "timeline", order: 7 },
      { type: "faq", order: 8 },
      { type: "cta", order: 9 },
      { type: "contact", order: 10 },
    ],
  },

  {
    slug: "spouse-visa",
    title: "Spouse Visa",

    sections: [
      { type: "hero", order: 1 },
      { type: "about", order: 2 },
      { type: "services", order: 3 },
      { type: "process", order: 4 },
      { type: "testimonials", order: 5 },
      { type: "faq", order: 6 },
      { type: "contact", order: 7 },
    ],
  },

  {
    slug: "skilled-worker-visa",
    title: "Skilled Worker Visa",

    sections: [
      { type: "hero", order: 1 },
      { type: "stats", order: 2 },
      { type: "about", order: 3 },
      { type: "benefits", order: 4 },
      { type: "services", order: 5 },
      { type: "process", order: 6 },
      { type: "timeline", order: 7 },
      { type: "faq", order: 8 },
      { type: "cta", order: 9 },
      { type: "contact", order: 10 },
    ],
  },

  {
    slug: "health-care-visa",
    title: "Health Care Visa",
    sections: defaultVisaSections,
  },

  {
    slug: "minister-of-religion-visa",
    title: "Minister of Religion Visa",
    sections: defaultVisaSections,
  },

  {
    slug: "religious-worker-visa",
    title: "Religious Worker Visa",
    sections: defaultVisaSections,
  },

  {
    slug: "creative-worker-visa",
    title: "Creative Worker Visa",
    sections: defaultVisaSections,
  },

  {
    slug: "charity-worker-visa",
    title: "Charity Worker Visa",
    sections: defaultVisaSections,
  },

  {
    slug: "dependent-visa",
    title: "Dependent Visa",
    sections: defaultVisaSections,
  },

  {
    slug: "unmarried-partner-visa",
    title: "Unmarried Partner Visa",
    sections: defaultVisaSections,
  },

  {
    slug: "graduate-trainee-visa",
    title: "Graduate Trainee Visa",
    sections: defaultVisaSections,
  },

  {
    slug: "uk-expansion-worker-visa",
    title: "UK Expansion Worker Visa",
    sections: defaultVisaSections,
  },

  {
    slug: "specialist-worker-visa",
    title: "Specialist Worker Visa",
    sections: defaultVisaSections,
  },

  {
    slug: "tourist-visa",
    title: "Tourist Visa",
    sections: defaultVisaSections,
  },

  {
    slug: "business-visit",
    title: "Business Visit",
    sections: defaultVisaSections,
  },

  {
    slug: "uk-fiance-visa",
    title: "UK Fiancé Visa",
    sections: defaultVisaSections,
  },

  {
    slug: "child-student-visa",
    title: "Child Student Visa",
    sections: defaultVisaSections,
  },

  {
    slug: "graduate-visa",
    title: "Graduate Visa",
    sections: defaultVisaSections,
  },

  {
    slug: "self-sponsorship",
    title: "Self Sponsorship",
    sections: defaultBusinessSections,
  },

  {
    slug: "innovator-founder-visa",
    title: "Innovator Founder Visa",
    sections: defaultBusinessSections,
  },

  {
    slug: "turkish-businessperson-visa",
    title: "Turkish Businessperson Visa",
    sections: defaultBusinessSections,
  },

  {
    slug: "scale-up-visa",
    title: "Scale Up Visa",
    sections: defaultBusinessSections,
  },

  {
    slug: "scale-up-sponsor-licence",
    title: "Scale Up Sponsor Licence",
    sections: defaultBusinessSections,
  },

  {
    slug: "scale-up-business",
    title: "Scale Up Business",
    sections: defaultBusinessSections,
  },

  {
    slug: "civil-penalty",
    title: "Civil Penalty",
    sections: defaultComplianceSections,
  },

  {
    slug: "ho-compliance-visit",
    title: "HO Compliance Visit",
    sections: defaultComplianceSections,
  },

  {
    slug: "right-to-work-check",
    title: "Right To Work Check",
    sections: defaultComplianceSections,
  },

  {
    slug: "sponsor-licence-renewal",
    title: "Sponsor Licence Renewal",
    sections: defaultSponsorSections,
  },

  {
    slug: "sponsor-licence-suspension",
    title: "Sponsor Licence Suspension",
    sections: defaultSponsorSections,
  },

  {
    slug: "sponsor-licence-application",
    title: "Sponsor Licence Application",
    sections: defaultSponsorSections,
  },
  {
    slug: "web-development",
    title: "Web Development",
    sections: fullServiceSections,
  },
];
