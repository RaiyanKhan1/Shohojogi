import React from 'react';

export default function AboutSection({ about }) {
  return (
    <section>
      <div className="fp-section-head">
        
        <h2 id="about-heading" className="fp-heading">About</h2>
      </div>

      <div className="fp-about-bio">
        {about.bio}
      </div>

     
    </section>
  );
}
