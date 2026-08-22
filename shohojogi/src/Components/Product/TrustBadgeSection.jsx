import React from 'react';
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "../../components/ui/progress"

export default function TrustBadgeSection({ about }) {
  return (
    <section className="fp-trust-container">
    <div className="fp-trust-row">
       
        
      <div className="fp-trust-tags">
        {about.safetytags.map((tag) => (
          <span className="fp-tag" key={tag}>
            {tag}
          </span>
        ))}
     </div>   
    </div>

    <div className="fp-div-trust-progrssbar ">
      <Progress value={95} className="fp-trust-progrssbar">
                <ProgressLabel>Trust Meter</ProgressLabel>
                <ProgressValue />
       </Progress>
    </div>
    
     
     
    </section>
  );
}
