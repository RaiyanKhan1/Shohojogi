import React from 'react';

export default function SkillsPanel({ skills }) {
  return (
    <section id="skills" aria-labelledby="skills-heading">
      <div className="fp-section-head">  
        <h2 id="skills-heading" className="fp-heading">Skills</h2>
      </div>
      <div className="fp-skills-grid">
        {skills.map((skill) => {  
          return (
            <div className=" fp-skill-card">
              
                <div className="fp-skill-name">{skill.name}</div>
              
            </div>
          );
        })}
      </div>
    </section>
  );
}
