import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function formatLabel(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, " $1");
}

function truncate(value, maxLength) {
  return value.length > maxLength ? `${value.slice(0, maxLength - 1)}…` : value;
}

function ResourceList({ config, resourceKey, items, isDeleting, onDelete }) {
  const [query, setQuery] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);

  const filteredItems = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return items;

    return items.filter((item) =>
      config.columns.some((column) =>
        String(item[column] ?? "").toLowerCase().includes(term)
      )
    );
  }, [items, query, config.columns]);

  function confirmDelete() {
    if (!pendingDelete) return;
    onDelete(pendingDelete.id);
    setPendingDelete(null);
  }

  const hasQuery = query.trim().length > 0;

  return (
    <section className="admin-panel">
      <div className="admin-panel-head">
        <div>
          <h2 className="admin-panel-title">{config.label}</h2>
          <p className="admin-panel-subtitle">
            {items.length} {items.length === 1 ? "record" : "records"} in this collection
          </p>
        </div>

        <label className="admin-search">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${config.label.toLowerCase()}…`}
            aria-label={`Search ${config.label}`}
          />
        </label>
      </div>

      {filteredItems.length === 0 ? (
        <div className="admin-empty">
          <span className="admin-empty-mark" aria-hidden="true">
            {hasQuery ? "?" : "+"}
          </span>
          <h3>
            {hasQuery
              ? "No matching records"
              : `No ${config.label.toLowerCase()} yet`}
          </h3>
          <p>
            {hasQuery
              ? "Try a different search term."
              : "Add your first record to get started."}
          </p>
          {!hasQuery ? (
            <Link
              className="admin-button admin-button-quiet"
              to={`/admin/${resourceKey}/new`}
            >
              Add {config.singular.toLowerCase()}
            </Link>
          ) : null}
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                {config.columns.map((column) => (
                  <th scope="col" key={column}>
                    {formatLabel(column)}
                  </th>
                ))}
                <th scope="col" className="admin-actions-col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  {config.columns.map((column) => {
                    const rawValue = String(item[column] ?? "—");
                    const displayValue =
                      column === "image" && rawValue.startsWith("data:")
                        ? "Image uploaded"
                        : rawValue;

                    return (
                      <td
                        key={column}
                        className={
                          column === config.titleField
                            ? "admin-row-title"
                            : "admin-row-muted"
                        }
                      >
                        {truncate(
                          displayValue,
                          column === config.titleField ? 60 : 90
                        )}
                      </td>
                    );
                  })}
                  <td className="admin-actions">
                    <Link
                      className="admin-icon-button"
                      to={`/admin/${resourceKey}/${item.id}/edit`}
                    >
                      Edit
                    </Link>
                    <button
                      className="admin-icon-button is-danger"
                      type="button"
                      disabled={isDeleting}
                      onClick={() => setPendingDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pendingDelete ? (
        <div
          className="admin-dialog-backdrop"
          role="presentation"
          onClick={() => setPendingDelete(null)}
        >
          <div
            className="admin-dialog"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="admin-delete-title"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="admin-eyebrow">Confirm deletion</p>
            <h3 id="admin-delete-title">
              Delete this {config.singular.toLowerCase()}?
            </h3>
            <p>
              “{String(pendingDelete[config.titleField] ?? "Untitled")}” will be
              permanently removed from the database.
            </p>
            <div className="admin-dialog-actions">
              <button
                className="admin-button admin-button-quiet"
                type="button"
                onClick={() => setPendingDelete(null)}
              >
                Cancel
              </button>
              <button
                className="admin-button admin-button-danger"
                type="button"
                disabled={isDeleting}
                onClick={confirmDelete}
              >
                {isDeleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default ResourceList;
