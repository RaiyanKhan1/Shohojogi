import { useRef, useState } from "react";
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

// Mirrors the server's multer config: JPEG/PNG/WebP, one file, 2 MB.
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const imageInputRef = useRef(null);

  const clearImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);

    setImage(null);
    setImagePreview("");

    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    setError("");

    if (!file) {
      clearImage();
      return;
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("Only JPEG, PNG and WebP images are allowed.");
      clearImage();
      return;
    }

    if (file.size > MAX_IMAGE_BYTES) {
      setError("That image is larger than 2 MB. Pick a smaller one.");
      clearImage();
      return;
    }

    if (imagePreview) URL.revokeObjectURL(imagePreview);

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const apiBase = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

    if (!apiBase) {
      setError("API URL is not configured.");
      return;
    }

    const body = new FormData();
    body.append("taskName", title);
    body.append("location", location);
    body.append("deadline", deadline);
    body.append("budget", budget);
    body.append("details", details);

    TAG_OPTIONS.filter((option) => tags.includes(option.id)).forEach((option) =>
      body.append("tags", option.label)
    );

    requirements
      .map((item) => item.trim())
      .filter(Boolean)
      .forEach((item) => body.append("requirements", item));

    if (image) body.append("taskImage", image);

    setLoading(true);

    try {
      const response = await fetch(`${apiBase}/client/tasks`, {
        method: "POST",
        credentials: "include",
        body,
      });

      const responseText = await response.text();
      let data = {};

      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch {
          data = {};
        }
      }

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error("Log in as a client to post a task.");
        }

        throw new Error(
          data.error ||
            data.message ||
            `Unable to post this task (HTTP ${response.status}).`
        );
      }

      setSuccess(
        `${data.message || "Task posted successfully"} — it is ${
          data.task?.status || "pending"
        } until an admin reviews it.`
      );
      setTitle("");
      setLocation("");
      setBudget("");
      setDeadline("");
      setDetails("");
      setTags([]);
      setRequirements([""]);
      clearImage();
    } catch (err) {
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
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

        <div className="pt-field">
          <span className="pt-label">Task image</span>
          <p className="pt-hint">Optional. JPEG, PNG or WebP, up to 2 MB.</p>

          <input
            ref={imageInputRef}
            type="file"
            name="taskImage"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            className="w-full cursor-pointer rounded-lg border border-dashed border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-600 transition-colors hover:border-green-400 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-green-50 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-green-700"
          />

          {imagePreview && (
            <div className="flex items-center gap-3">
              <img
                src={imagePreview}
                alt="Selected task"
                className="h-16 w-16 shrink-0 rounded-lg object-cover"
              />

              <span className="min-w-0 flex-1 truncate text-sm text-gray-600">
                {image.name}
              </span>

              <button
                className="pt-remove"
                type="button"
                onClick={clearImage}
                aria-label="Remove image"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        {error && (
          <p className="pt-hint" role="alert" style={{ color: "#c94a4a" }}>
            {error}
          </p>
        )}

        {success && (
          <p className="pt-hint" role="status" style={{ color: "#087b2c" }}>
            {success}
          </p>
        )}

        <button className="pt-submit" type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post this task"}
        </button>
      </form>
    </main>
  );
}

export default PostTask;
