import { useState } from "react";
import {
  Plus,
  X,
  Check,
  ShieldCheck,
  IdCard,
  FileText,
  MapPinCheck,
} from "lucide-react";
import "./PostTask.css";

const TAG_OPTIONS = [
  { id: "police", label: "Police verification required", icon: ShieldCheck },
  { id: "nid", label: "NID required", icon: IdCard },
  { id: "cv", label: "CV required", icon: FileText },
  { id: "location", label: "Location verified", icon: MapPinCheck },
];

function PostTask() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [details, setDetails] = useState("");
  const [tags, setTags] = useState([]);
  const [requirements, setRequirements] = useState([""]);

  const toggleTag = (id) => {
    setTags((selected) =>
      selected.includes(id)
        ? selected.filter((tag) => tag !== id)
        : [...selected, id]
    );
  };

  const addRequirement = () => {
    setRequirements((items) => [...items, ""]);
  };

  const updateRequirement = (index, value) => {
    setRequirements((items) => items.map((item, i) => (i === index ? value : item)));
  };

  const removeRequirement = (index) => {
    setRequirements((items) =>
      items.length === 1 ? [""] : items.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const task = {
      title,
      location,
      budget,
      deadline,
      details,
      tags: TAG_OPTIONS.filter((option) => tags.includes(option.id)).map(
        (option) => option.label
      ),
      requirements: requirements.map((item) => item.trim()).filter(Boolean),
    };

    console.log("Task to post:", task);
  };

  return (
    <main className="pt-page">
      <header className="pt-hero">
        <h1 className="pt-hero__title">
          Post a
          <span className="pt-marker">
            task
            <svg viewBox="0 0 220 24" preserveAspectRatio="none" aria-hidden="true">
              <path d="M4 15C58 7 126 5 216 10" />
            </svg>
          </span>
        </h1>
      </header>

      <form className="pt-sheet" onSubmit={handleSubmit}>
        <label className="pt-field">
          <span className="pt-label">Task name</span>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Grocery shopping"
            required
          />
        </label>

        <label className="pt-field">
          <span className="pt-label">Location</span>
          <input
            type="text"
            name="location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="e.g. Uttara, Dhaka"
            required
          />
        </label>

        <div className="pt-row">
          <label className="pt-field">
            <span className="pt-label">Budget</span>
            <div className="pt-prefixed">
              <span className="pt-prefix">৳</span>
              <input
                type="number"
                name="budget"
                min="0"
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                placeholder="550"
                required
              />
            </div>
          </label>

          <label className="pt-field">
            <span className="pt-label">Deadline</span>
            <input
              type="date"
              name="deadline"
              value={deadline}
              onChange={(event) => setDeadline(event.target.value)}
              required
            />
          </label>
        </div>

        <fieldset className="pt-field pt-fieldset">
          <legend className="pt-label">Tags</legend>
          <p className="pt-hint">What a helper must have before applying.</p>

          <div className="pt-tags">
            {TAG_OPTIONS.map(({ id, label, icon: Icon }) => {
              const checked = tags.includes(id);

              return (
                <label className={checked ? "pt-tag is-checked" : "pt-tag"} key={id}>
                  <input
                    type="checkbox"
                    name="tags"
                    value={id}
                    checked={checked}
                    onChange={() => toggleTag(id)}
                  />

                  <span className="pt-tag__icon">
                    <Icon size={18} />
                  </span>

                  <span className="pt-tag__label">{label}</span>

                  <span className="pt-tag__mark">
                    <Check size={13} strokeWidth={3} />
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="pt-field">
          <span className="pt-label">Requirements</span>
          <p className="pt-hint">Anything else the helper should be able to do.</p>

          {requirements.map((requirement, index) => (
            <div className="pt-repeat" key={`requirement-${index}`}>
              <input
                type="text"
                value={requirement}
                onChange={(event) => updateRequirement(index, event.target.value)}
                placeholder="e.g. Available this weekend"
              />

              {requirements.length > 1 && (
                <button
                  className="pt-remove"
                  type="button"
                  onClick={() => removeRequirement(index)}
                  aria-label="Remove requirement"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}

          <button className="pt-add" type="button" onClick={addRequirement}>
            <Plus size={16} />
            Add another requirement
          </button>
        </div>

        <label className="pt-field">
          <span className="pt-label">Details</span>
          <textarea
            name="details"
            rows={6}
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            placeholder="Describe the task, what you expect and anything a helper should know."
            required
          />
        </label>

        <button className="pt-submit" type="submit">
          Post this task
        </button>
      </form>
    </main>
  );
}

export default PostTask;
