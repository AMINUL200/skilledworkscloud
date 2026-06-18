import { useParams } from "react-router-dom";
import { tools } from "../../utils/tools";
import ToolHeroSection from "../../component/tool-sections/ToolHeroSection";
import ToolCalculatorSection from "../../component/tool-sections/ToolCalculatorSection";
import ToolSearchFormSection from "../../component/tool-sections/ToolSearchFormSection";
import ToolEligibilitySection from "../../component/tool-sections/ToolEligibilitySection";
import ToolJobSearchSection from "../../component/tool-sections/ToolJobSearchSection";
import ToolHowItWorksSection from "../../component/tool-sections/ToolHowItWorksSection";
import ToolFaqSection from "../../component/tool-sections/ToolFaqSection";
import ToolCTASection from "../../component/tool-sections/ToolCTASection";
import ToolLatestJobsSection from "../../component/tool-sections/ToolLatestJobsSection";


const sectionMapper = {
  hero: ToolHeroSection,

  calculator: ToolCalculatorSection,

  "search-form": ToolSearchFormSection,

  "eligibility-form": ToolEligibilitySection,

  "job-search": ToolJobSearchSection,

  "latest-jobs": ToolLatestJobsSection,

  "how-it-works": ToolHowItWorksSection,

  faq: ToolFaqSection,

  cta: ToolCTASection,
};

const ToolDetailsPage = () => {
  const { slug } = useParams();

  const tool = tools.find(
    (item) => item.slug === slug
  );

  console.log("Tool Details Page - Tool:", tool);

  if (!tool) {
    return <div>Tool Not Found</div>;
  }

  return (
    <>
      {tool.sections
        .sort((a, b) => a.order - b.order)
        .map((section) => {
          const Component =
            sectionMapper[section.type];

          if (!Component) return null;

          return (
            <Component
              key={section.type}
              tool={tool}
            />
          );
        })}
    </>
  );
};

export default ToolDetailsPage;