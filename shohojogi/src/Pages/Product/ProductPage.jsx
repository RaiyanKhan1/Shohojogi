import React from 'react';
import './ProductPage.css';


import ProfileHero from '../../Components/Product/ProfileHero.jsx';


import defaultProfileData from '../../Data/profileData.js';

export default function ProductPage({ data = defaultProfileData }) {
  const { identity, credibility, hire, about, skills, portfolio, history, reviews } = data;

  return (
    <div className="fp-page">
      

      <ProfileHero identity={identity} credibility={credibility} />
      
    </div>
  );
}
