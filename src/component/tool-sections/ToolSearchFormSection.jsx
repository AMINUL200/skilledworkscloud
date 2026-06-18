import React, { useState } from "react";
import {
  Search,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Clock3,
  Database,
  ArrowRight,
} from "lucide-react";

const ToolSearchFormSection = () => {
  const [search, setSearch] = useState("");

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-primary-light
              text-primary
              font-semibold
            "
          >
            <Search size={18} />
            Smart Search Tool
          </div>

          <h2
            className="
              mt-6
              text-4xl
              lg:text-5xl
              font-black
              text-text
            "
          >
            Search Sponsor
            <span className="block text-primary">
              Licence Records
            </span>
          </h2>

          <p
            className="
              mt-6
              text-lg
              text-text-light
              leading-relaxed
            "
          >
            Instantly verify sponsor licence information,
            company records and immigration compliance
            details using our intelligent search system.
          </p>
        </div>

        {/* Main Search Card */}
        <div
          className="
            mt-16
            bg-white
            rounded-[36px]
            border
            border-border
            shadow-card
            overflow-hidden
          "
        >
          <div className="grid lg:grid-cols-5">
            {/* Left */}
            <div
              className="
                lg:col-span-3
                p-8
                lg:p-12
              "
            >
              <h3
                className="
                  text-3xl
                  font-black
                  text-text
                "
              >
                Company Lookup
              </h3>

              <p
                className="
                  mt-3
                  text-text-light
                  leading-relaxed
                "
              >
                Enter sponsor licence number,
                company name or organisation details.
              </p>

              {/* Search Input */}
              <div className="mt-10">
                <label
                  className="
                    block
                    mb-3
                    font-semibold
                    text-text
                  "
                >
                  Search Query
                </label>

                <div className="relative">
                  <Search
                    size={20}
                    className="
                      absolute
                      left-5
                      top-1/2
                      -translate-y-1/2
                      text-text-light
                    "
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Enter company name..."
                    className="
                      w-full
                      h-16
                      pl-14
                      pr-5
                      rounded-2xl
                      border
                      border-border
                      bg-surface
                      outline-none
                      focus:border-primary
                      transition-all
                    "
                  />
                </div>
              </div>

              {/* Search Filters */}
              <div className="grid md:grid-cols-2 gap-5 mt-6">
                <div>
                  <label
                    className="
                      block
                      mb-3
                      font-semibold
                    "
                  >
                    Search Type
                  </label>

                  <select
                    className="
                      w-full
                      h-14
                      px-4
                      rounded-2xl
                      border
                      border-border
                      outline-none
                      focus:border-primary
                    "
                  >
                    <option>
                      Company Name
                    </option>
                    <option>
                      Licence Number
                    </option>
                    <option>
                      Registration Number
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    className="
                      block
                      mb-3
                      font-semibold
                    "
                  >
                    Country
                  </label>

                  <select
                    className="
                      w-full
                      h-14
                      px-4
                      rounded-2xl
                      border
                      border-border
                      outline-none
                      focus:border-primary
                    "
                  >
                    <option>United Kingdom</option>
                    <option>India</option>
                    <option>Bangladesh</option>
                  </select>
                </div>
              </div>

              {/* Button */}
              <button
                className="
                  btn
                  btn-primary
                  mt-8
                "
              >
                Search Records
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Right Info Panel */}
            <div
              className="
                lg:col-span-2
                bg-gradient-to-br
                from-primary
                via-primary-dark
                to-primary
                text-white
                p-8
                lg:p-10
              "
            >
              <h3
                className="
                  text-2xl
                  font-black
                "
              >
                Why Use This Tool?
              </h3>

              <div className="space-y-6 mt-8">
                <div className="flex gap-4">
                  <ShieldCheck size={22} />

                  <div>
                    <h4 className="font-semibold">
                      Verified Data
                    </h4>

                    <p className="text-white/80 mt-1">
                      Access trusted sponsor
                      licence records.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Clock3 size={22} />

                  <div>
                    <h4 className="font-semibold">
                      Real Time Results
                    </h4>

                    <p className="text-white/80 mt-1">
                      Search and verify records
                      instantly.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Database size={22} />

                  <div>
                    <h4 className="font-semibold">
                      Large Database
                    </h4>

                    <p className="text-white/80 mt-1">
                      Thousands of employer and
                      sponsor records available.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div
                className="
                  mt-10
                  pt-8
                  border-t
                  border-white/20
                  grid
                  grid-cols-2
                  gap-6
                "
              >
                <div>
                  <h4
                    className="
                      text-3xl
                      font-black
                    "
                  >
                    50K+
                  </h4>

                  <p className="text-white/80">
                    Searches
                  </p>
                </div>

                <div>
                  <h4
                    className="
                      text-3xl
                      font-black
                    "
                  >
                    99%
                  </h4>

                  <p className="text-white/80">
                    Accuracy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Features */}
        <div
          className="
            mt-12
            grid
            md:grid-cols-3
            gap-6
          "
        >
          {[
            {
              icon: Building2,
              title: "Company Verification",
              desc: "Validate organisation records instantly.",
            },
            {
              icon: ShieldCheck,
              title: "Trusted Results",
              desc: "Reliable immigration and licence data.",
            },
            {
              icon: CheckCircle2,
              title: "Free Search",
              desc: "Access information without any cost.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-3xl
                border
                border-border
                shadow-card
                p-7
              "
            >
              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-primary-light
                  flex
                  items-center
                  justify-center
                "
              >
                <item.icon
                  size={24}
                  className="text-primary"
                />
              </div>

              <h3
                className="
                  mt-5
                  text-xl
                  font-bold
                  text-text
                "
              >
                {item.title}
              </h3>

              <p
                className="
                  mt-3
                  text-text-light
                  leading-relaxed
                "
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolSearchFormSection;