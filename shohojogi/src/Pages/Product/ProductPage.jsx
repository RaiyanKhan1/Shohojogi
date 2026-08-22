import React from 'react';
import './ProductPage.css';


import ProfileHero from '../../Components/Product/ProfileHero.jsx';
import StatsStrip from '../../Components/Product/StatsStrip.jsx';
import AboutSection from '../../Components/Product/AboutSection.jsx';
import TrustBadgeSection from '../../Components/Product/TrustBadgeSection.jsx';
import HireCard from '../../Components/Product/HireCard.jsx';
import SkillsPanel from '../../Components/Product/SkillsPanel.jsx';


import defaultProfileData from '../../Data/profileData.js';

export default function ProductPage({ data = defaultProfileData }) {
  const { identity, credibility, hire, about, skills, portfolio, history, reviews } = data;

  return (
    <div className="fp-page">
      

      <ProfileHero identity={identity} credibility={credibility} />
      <StatsStrip credibility={credibility} />

          
              
                
          
          
      
       
      <div className="fp-container">
        <div className="fp-layout-grid">
          <main className="fp-main-col">
             <TrustBadgeSection about={about} />
          <AboutSection about={about} />
           <SkillsPanel skills={skills} />
              
          </main>

          <aside className="fp-side-col">
            <HireCard hire={hire} />
          </aside>
        </div>
      </div>
      
    </div>
  );
}
