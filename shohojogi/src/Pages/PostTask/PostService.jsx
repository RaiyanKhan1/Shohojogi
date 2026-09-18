import { useState } from "react";
import {
  Plus,
  X,
  Check,
  ImagePlus,
  IdCard,
  ShieldCheck,
  MapPinCheck,
  GraduationCap,
} from "lucide-react";
import "./PostService.css";

const DOC_OPTIONS = [
  { id: "nid", label: "NID", icon: IdCard },
  { id: "police", label: "Police verification", icon: ShieldCheck },
  { id: "location", label: "Location proof", icon: MapPinCheck },
  { id: "education", label: "Education or CV", icon: GraduationCap },
];

function PostService() {
  const [service, setService] = useState("");
  const [fee, setFee] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([""]);
  const [cover, setCover] = useState(null);
  const [docs, setDocs] = useState({});

  const pickCover = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (cover) URL.revokeObjectURL(cover.url);

    setCover({ name: file.name, url: URL.createObjectURL(file), file });
  };

  const clearCover = () => {
    if (cover) URL.revokeObjectURL(cover.url);

    setCover(null);
  };

  const pickDoc = (id, event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setDocs((current) => {
      if (current[id]) URL.revokeObjectURL(current[id].url);

      return { ...current, [id]: { name: file.name, url: URL.createObjectURL(file), file } };
    });
  };

  const clearDoc = (id) => {
    setDocs((current) => {
      if (current[id]) URL.revokeObjectURL(current[id].url);

      const next = { ...current };
      delete next[id];

      return next;
    });
  };

  const addSkill = () => {
    setSkills((items) => [...items, ""]);
  };

  const updateSkill = (index, value) => {
    setSkills((items) => items.map((item, i) => (i === index ? value : item)));
  };

  const removeSkill = (index) => {
    setSkills((items) => (items.length === 1 ? [""] : items.filter((_, i) => i !== index)));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const request = {
      image: cover?.file ?? null,
      service,
      fee,
      description,
      documents: Object.fromEntries(
        Object.entries(docs).map(([id, doc]) => [id, doc.file])
      ),
      skills: skills.map((skill) => skill.trim()).filter(Boolean),
    };

    console.log("Service request to post:", request);
  };

  return (
    <main className="ps-page">
      <header className="ps-hero">
        <h1 className="ps-hero__title">
          Offer a
          <span className="ps-marker">
            service
            <svg viewBox="0 0 220 24" preserveAspectRatio="none" aria-hidden="true">
              <path d="M4 15C58 7 126 5 216 10" />
            </svg>
          </span>
        </h1>
      </header>

      <form className="ps-sheet" onSubmit={handleSubmit}>
        <div className="ps-field">
          <span className="ps-label">Image</span>

          <div className="ps-cover">
            <div className="ps-cover__frame">
              {cover ? (
                <a
                  className="ps-cover__zone has-file"
                  href={cover.url}
                  target="_blank"
                  rel="noreferrer"
                  title="Open image"
                >
                  <img className="ps-cover__preview" src={cover.url} alt={cover.name} />
                </a>
              ) : (
                <label className="ps-cover__zone">
                  <input type="file" accept="image/*" onChange={pickCover} />
                  <ImagePlus size={24} />
                </label>
              )}

              {cover && (
                <button
                  className="ps-cover__remove"
                  type="button"
                  onClick={clearCover}
                  aria-label="Remove image"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="ps-cover__side">
              {cover ? (
                <a
                  className="ps-cover__name"
                  href={cover.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {cover.name}
                </a>
              ) : (
                <strong>Upload a photo</strong>
              )}
            </div>
          </div>
        </div>

        <label className="ps-field">
          <span className="ps-label">Service to provide</span>
          <input
            type="text"
            name="service"
            value={service}
            onChange={(event) => setService(event.target.value)}
            placeholder="e.g. Home cleaning and grocery runs"
            required
          />
        </label>

        <div className="ps-field">
          <span className="ps-label">Tags</span>
          <p className="ps-hint">Upload a photo of each document you can verify.</p>

          <div className="ps-docs">
            {DOC_OPTIONS.map(({ id, label, icon: Icon }) => {
              const doc = docs[id];

              const inside = (
                <>
                  <span className="ps-doc__icon">
                    {doc ? (
                      <img src={doc.url} alt={`${label} upload`} />
                    ) : (
                      <Icon size={18} />
                    )}
                  </span>

                  <span className="ps-doc__text">
                    <strong>{label}</strong>
                    <small>{doc ? doc.name : "Add photo"}</small>
                  </span>

                  <span className="ps-doc__mark">
                    <Check size={13} strokeWidth={3} />
                  </span>
                </>
              );

              return (
                <div className={doc ? "ps-doc is-uploaded" : "ps-doc"} key={id}>
                  {doc ? (
                    <a
                      className="ps-doc__zone"
                      href={doc.url}
                      target="_blank"
                      rel="noreferrer"
                      title={`Open ${label}`}
                    >
                      {inside}
                    </a>
                  ) : (
                    <label className="ps-doc__zone">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => pickDoc(id, event)}
                      />
                      {inside}
                    </label>
                  )}

                  {doc && (
                    <button
                      className="ps-doc__remove"
                      type="button"
                      onClick={() => clearDoc(id)}
                      aria-label={`Remove ${label}`}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <label className="ps-field">
          <span className="ps-label">Fee</span>
          <div className="ps-prefixed">
            <span className="ps-prefix">৳</span>
            <input
              type="number"
              name="fee"
              min="0"
              value={fee}
              onChange={(event) => setFee(event.target.value)}
              placeholder="500"
              required
            />
          </div>
        </label>

        <label className="ps-field">
          <span className="ps-label">Description</span>
          <textarea
            name="description"
            rows={6}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Tell clients what you do, how you work and when you are free."
            required
          />
        </label>

        <div className="ps-field">
          <span className="ps-label">Skills</span>

          {skills.map((skill, index) => (
            <div className="ps-repeat" key={`skill-${index}`}>
              <input
                type="text"
                value={skill}
                onChange={(event) => updateSkill(index, event.target.value)}
                placeholder="e.g. Deep cleaning"
              />

              {skills.length > 1 && (
                <button
                  className="ps-remove"
                  type="button"
                  onClick={() => removeSkill(index)}
                  aria-label="Remove skill"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}

          <button className="ps-add" type="button" onClick={addSkill}>
            <Plus size={16} />
            Add another skill
          </button>
        </div>

        <button className="ps-submit" type="submit">
          Send request
        </button>
      </form>
    </main>
  );
}

export default PostService;
