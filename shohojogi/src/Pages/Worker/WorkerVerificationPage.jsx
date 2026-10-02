import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  CheckCircle2,
  FileText,
  Home,
  IdCard,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";

const MAX_FILE_SIZE_MB = 2;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const IMAGES = IMAGE_TYPES.join(",");
const API_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

const DOCUMENTS = [
  {
    key: "nidFront",
    group: "nid",
    title: "NID (Front side)",
    description: "A clear photo or scan of the front of your National ID card.",
    accept: IMAGES,
    icon: IdCard,
  },
  {
    key: "nidBack",
    group: "nid",
    title: "NID (Back side)",
    description: "A clear photo or scan of the back of your National ID card.",
    accept: IMAGES,
    icon: IdCard,
  },
  {
    key: "cv",
    group: "cv",
    title: "CV / Resume",
    description:
      "A clear photo of your latest CV with work experience and skills.",
    accept: IMAGES,
    icon: FileText,
  },
  {
    key: "policeClearance",
    group: "police",
    title: "Police Verification",
    description: "Police clearance certificate issued by Bangladesh Police.",
    accept: IMAGES,
    icon: ShieldCheck,
  },
  {
    key: "utilityBill",
    group: "address",
    title: "Proof of Address (House Bill)",
    description:
      "A recent electricity, gas or water bill (within the last 3 months) showing your address.",
    accept: IMAGES,
    icon: Home,
  },
];

function getStoredUser() {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export default function WorkerVerificationPage() {
  const navigate = useNavigate();
  const [user] = useState(getStoredUser);
  const [files, setFiles] = useState({});
  const [errors, setErrors] = useState({});
  const [address, setAddress] = useState("");
  const [agreed, setAgreed] = useState(false);
  const isWorker = user?.role === "worker";
  const [verification, setVerification] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(isWorker && !!API_URL);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (!isWorker || !API_URL) return;

    const fetchStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/worker/verification`, {
          credentials: "include",
        });
        const data = await response.json().catch(() => ({}));
        if (response.ok) setVerification(data.verification);
      } catch {
        // Show the form if the status can't be loaded; submit will report errors.
      } finally {
        setLoadingStatus(false);
      }
    };

    fetchStatus();
  }, [isWorker]);

  const uploadedCount = DOCUMENTS.filter((doc) => files[doc.key]).length;
  const progress = Math.round((uploadedCount / DOCUMENTS.length) * 100);
  const canSubmit =
    uploadedCount === DOCUMENTS.length && address.trim() && agreed;

  const handleFile = (docKey, file) => {
    if (!file) return;

    if (!IMAGE_TYPES.includes(file.type)) {
      setErrors((current) => ({
        ...current,
        [docKey]: "Only JPG, PNG or WebP images are allowed.",
      }));
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setErrors((current) => ({
        ...current,
        [docKey]: `File is larger than ${MAX_FILE_SIZE_MB}MB.`,
      }));
      return;
    }

    setErrors((current) => ({ ...current, [docKey]: "" }));
    setFiles((current) => ({ ...current, [docKey]: file }));
  };

  const removeFile = (docKey) => {
    setFiles((current) => {
      const next = { ...current };
      delete next[docKey];
      return next;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit || submitting) return;

    if (!API_URL) {
      setSubmitError("API URL is not configured.");
      return;
    }

    const formData = new FormData();
    formData.append("address", address.trim());
    DOCUMENTS.forEach((doc) => formData.append(doc.key, files[doc.key]));

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(`${API_URL}/worker/verification`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Unable to submit your documents.");
      }

      setVerification(data.verification);
    } catch (err) {
      setSubmitError(err.message || "Unable to connect to the server.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isWorker) {
    return (
      <main className="mx-auto max-w-xl px-4 pt-32 pb-20 text-center">
        <ShieldCheck className="mx-auto mb-4 text-green-600" size={48} />
        <h1 className="text-2xl font-bold text-gray-800">
          Worker verification
        </h1>
        <p className="mt-2 text-gray-600">
          Only workers can apply for verification. Please sign in with a worker
          account.
        </p>
        <button
          onClick={() => navigate(user ? "/" : "/join")}
          className="mt-6 rounded-xl bg-green-600 px-5 py-2.5 font-medium text-white hover:bg-green-700 transition"
        >
          {user ? "Go to homepage" : "Sign in"}
        </button>
      </main>
    );
  }

  if (loadingStatus) {
    return (
      <main className="mx-auto max-w-xl px-4 pt-32 pb-20 text-center text-gray-600">
        Loading verification status...
      </main>
    );
  }

  if (verification) {
    const { status, rejectionReason } = verification;

    return (
      <main className="mx-auto max-w-xl px-4 pt-32 pb-20 text-center">
        {status === "rejected" ? (
          <X className="mx-auto mb-4 text-red-600" size={56} />
        ) : status === "approved" ? (
          <BadgeCheck className="mx-auto mb-4 text-green-600" size={56} />
        ) : (
          <CheckCircle2 className="mx-auto mb-4 text-green-600" size={56} />
        )}
        <h1 className="text-2xl font-bold text-gray-800">
          {status === "approved"
            ? "You are verified"
            : status === "rejected"
              ? "Verification rejected"
              : "Documents submitted"}
        </h1>
        <p className="mt-2 text-gray-600">
          {status === "approved"
            ? `Congratulations, ${user.name}. Your profile now shows a verified badge.`
            : status === "rejected"
              ? `Sorry, ${user.name}. Your documents were not approved. Please contact support.`
              : `Thanks, ${user.name}. Our team will review your documents and you will get a verified badge once approved. This usually takes 2–3 working days.`}
        </p>
        {status === "rejected" && rejectionReason && (
          <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-700">
            Reason: {rejectionReason}
          </p>
        )}
        <button
          onClick={() => navigate("/")}
          className="mt-6 rounded-xl bg-green-600 px-5 py-2.5 font-medium text-white hover:bg-green-700 transition"
        >
          Back to homepage
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 pt-24 pb-10 sm:px-6">
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <BadgeCheck className="text-green-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Get verified</h1>
        </div>
        <p className="mt-2 text-gray-600">
          Verified workers get a badge on their profile and are trusted more by
          clients. Upload the documents below to apply.
        </p>

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4">
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-medium text-gray-700">
              {uploadedCount} of {DOCUMENTS.length} documents uploaded
            </span>
            <span className="text-gray-500">{progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-green-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {DOCUMENTS.map((doc) => (
            <DocumentUpload
              key={doc.key}
              doc={doc}
              file={files[doc.key]}
              error={errors[doc.key]}
              onSelect={(file) => handleFile(doc.key, file)}
              onRemove={() => removeFile(doc.key)}
            />
          ))}
        </div>

        <section className="rounded-2xl border border-gray-200 bg-white p-5">
          <label
            htmlFor="address"
            className="block font-semibold text-gray-800"
          >
            Present address
          </label>
          <p className="mb-3 text-sm text-gray-500">
            Must match the address on your house bill.
          </p>
          <textarea
            id="address"
            rows={3}
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="House, Road, Area, City"
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-800 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
          />
        </section>

        <label className="flex items-start gap-3 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
            className="mt-0.5 h-4 w-4 accent-green-600"
          />
          <span>
            I confirm that the documents I uploaded are genuine and belong to
            me. I understand that false documents will lead to my account being
            suspended.
          </span>
        </label>

        {submitError && (
          <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={!canSubmit || submitting}
          className="w-full rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {submitting ? "Uploading documents..." : "Submit for verification"}
        </button>
      </form>
    </main>
  );
}

function DocumentUpload({ doc, file, error, onSelect, onRemove }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const Icon = doc.icon;

  useEffect(() => {
    if (!file || !file.type.startsWith("image/")) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    onSelect(event.dataTransfer.files?.[0]);
  };

  return (
    <section className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5">
      <div className="mb-3 flex items-start gap-3">
        <div className="rounded-xl bg-green-50 p-2 text-green-600">
          <Icon size={20} />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-gray-800">{doc.title}</h2>
          <p className="text-sm text-gray-500">{doc.description}</p>
        </div>
        {file && <CheckCircle2 className="text-green-600" size={20} />}
      </div>

      {file ? (
        <div className="mt-auto flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-3">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt={doc.title}
              className="h-12 w-12 rounded-lg object-cover"
            />
          ) : (
            <FileText className="text-green-700" size={28} />
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-800">
              {file.name}
            </p>
            <p className="text-xs text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${doc.title}`}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-white hover:text-red-600 transition"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`mt-auto flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed p-5 text-sm transition ${
            dragging
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-green-400 hover:bg-gray-50"
          }`}
        >
          <Upload className="text-gray-400" size={22} />
          <span className="font-medium text-gray-700">
            Click to upload or drag & drop
          </span>
          <span className="text-xs text-gray-500">
            JPG, PNG or WebP · Max {MAX_FILE_SIZE_MB}MB
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={doc.accept}
        className="hidden"
        onChange={(event) => {
          onSelect(event.target.files?.[0]);
          event.target.value = "";
        }}
      />

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </section>
  );
}
