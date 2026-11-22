import { useState } from "react";
import { Link } from "react-router-dom";

function readImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function isDataUrl(value) {
  return typeof value === "string" && value.startsWith("data:");
}

function ResourceForm({ config, cancelTo, initialValues, isSaving, onSubmit, title }) {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");

  async function handleChange(event) {
    const { name, value, files } = event.target;
    setError("");

    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > 5 * 1024 * 1024) {
        setError("Choose an image smaller than 5 MB.");
        return;
      }

      try {
        const dataUrl = await readImageFile(file);
        setValues((previous) => ({ ...previous, [name]: dataUrl }));
      } catch {
        setError("Could not read that image. Try another file.");
      }
      return;
    }

    setValues((previous) => ({ ...previous, [name]: value }));
  }

  function handleRemoveImage(name, event) {
    event.preventDefault();
    setValues((previous) => ({ ...previous, [name]: "" }));
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    const didSave = await onSubmit(values);
    if (!didSave) setError("Could not save. Check the details and try again.");
  }

  return (
    <div className="admin-form-layout">
      <form className="admin-panel admin-form" onSubmit={handleSubmit}>
        <div className="admin-panel-head">
          <div>
            <h2 className="admin-panel-title">{title}</h2>
            <p className="admin-panel-subtitle">
              Fields marked with * are required.
            </p>
          </div>
        </div>

        <div className="admin-form-grid">
          {config.fields.map((field) => {
            const value = values[field.name] ?? "";
            const isFile = field.type === "file";

            return (
              <label
                className={
                  field.multiline || isFile ? "admin-field is-wide" : "admin-field"
                }
                htmlFor={field.name}
                key={field.name}
              >
                <span className="admin-field-label">
                  {field.label}
                  {field.required ? <em aria-hidden="true"> *</em> : null}
                </span>

                {isFile ? (
                  <span className="admin-image-field">
                    <span className="admin-image-preview">
                      {value ? (
                        <img src={value} alt="Selected image preview" />
                      ) : (
                        <span>No image selected</span>
                      )}
                    </span>
                    <input
                      className="admin-file-input"
                      id={field.name}
                      name={field.name}
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                    />
                    <span className="admin-image-tools">
                      <button
                        className="admin-button admin-button-quiet"
                        type="button"
                        onClick={(event) => handleRemoveImage(field.name, event)}
                      >
                        Remove image
                      </button>
                      <input
                        className="admin-input admin-image-url"
                        type="text"
                        name={field.name}
                        value={isDataUrl(value) ? "" : value}
                        onChange={handleChange}
                        placeholder="Or paste an image URL"
                        aria-label="Image URL"
                      />
                    </span>
                  </span>
                ) : field.multiline ? (
                  <textarea
                    className="admin-input"
                    id={field.name}
                    name={field.name}
                    rows="5"
                    placeholder={`Enter ${field.label.toLowerCase()}…`}
                    value={value}
                    onChange={handleChange}
                    required={field.required}
                  />
                ) : (
                  <input
                    className="admin-input"
                    id={field.name}
                    name={field.name}
                    type={field.type ?? "text"}
                    placeholder={
                      field.type === "date"
                        ? undefined
                        : `Enter ${field.label.toLowerCase()}…`
                    }
                    value={value}
                    onChange={handleChange}
                    required={field.required}
                  />
                )}
              </label>
            );
          })}
        </div>

        {error ? (
          <div className="admin-banner" role="alert">
            <span>{error}</span>
          </div>
        ) : null}

        <div className="admin-form-footer">
          <span className="admin-form-status">
            {isSaving ? "Saving changes…" : "Changes save through the API"}
          </span>
          <div className="admin-form-actions">
            <Link className="admin-button admin-button-quiet" to={cancelTo}>
              Cancel
            </Link>
            <button
              className="admin-button admin-button-primary"
              type="submit"
              disabled={isSaving}
            >
              {isSaving ? "Saving…" : `Save ${config.singular.toLowerCase()}`}
            </button>
          </div>
        </div>
      </form>

      <aside className="admin-panel admin-form-aside">
        <p className="admin-eyebrow">Good to know</p>
        <h3>How saving works</h3>
        <ol className="admin-note-list">
          <li>
            <span>01</span>
            <p>Your entries are checked in the browser first.</p>
          </li>
          <li>
            <span>02</span>
            <p>The form sends a request to the backend API.</p>
          </li>
          <li>
            <span>03</span>
            <p>The API stores the record in MongoDB.</p>
          </li>
        </ol>
        <div className="admin-aside-callout">
          <strong>Live data</strong>
          <p>Public portfolio pages read from these same collections.</p>
        </div>
      </aside>
    </div>
  );
}

export default ResourceForm;
