import React from "react";

const ButtonSample = () => {
  return (
    <div className="pt-30">
      {/* <!-- Primary Button --> */}
      <button class="btn btn-primary">Get Started</button>

      {/* <!-- With Icon --> */}
      <button class="btn btn-primary btn-icon">
        <svg>...</svg>
        Learn More
      </button>

      {/* <!-- Navy Button --> */}
      <button class="btn btn-navy">Explore Features</button>

      {/* <!-- Glass Morphism --> */}
      <button class="btn btn-glass">Sign In</button>
      {/* 
    <!-- Outline Button --> */}
      <button class="btn btn-outline">View Demo</button>

      {/* <!-- Ghost Button --> */}
      <button class="btn btn-ghost">Learn More →</button>

      {/* <!-- Success Button --> */}
      <button class="btn btn-success">Complete Purchase</button>

      {/* <!-- Danger Button --> */}
      <button class="btn btn-danger">Delete Item</button>

      {/* <!-- Warning Button --> */}
      <button class="btn btn-warning">Update Settings</button>

      {/* <!-- Size Variants --> */}
      <button class="btn btn-primary btn-sm">Small</button>
      <button class="btn btn-primary">Default</button>
      <button class="btn btn-primary btn-lg">Large</button>

      {/* <!-- Full Width --> */}
      <button class="btn btn-primary btn-block">Full Width Button</button>

      {/* <!-- Button Group --> */}
      <div class="btn-group">
        <button class="btn btn-primary">Save</button>
        <button class="btn btn-outline">Cancel</button>
        <button class="btn btn-ghost">Discard</button>
      </div>
    </div>
  );
};

export default ButtonSample;
