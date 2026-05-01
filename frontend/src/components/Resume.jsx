import { resumeSnapshot } from '../data/resume'
import { profile } from '../data/profile'

const Resume = ({ profile: profileProp }) => {
  return (
    <section className="section" id="resume">
      <div className="section-title reveal">
        <div>
          <h2>Resume snapshot</h2>
          <p>Download the full resume or scan a quick overview below.</p>
        </div>
        <a className="btn ghost" href={profileProp.resumeUrl} download>Download resume</a>
      </div>
      <div className="resume-grid">
        {resumeSnapshot.map((card) => (
          <div key={card.id} className="resume-card reveal">
            <h4>{card.title}</h4>
            <ul>
              {card.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
            </div>
        </section>
    )
}

export default Resume
