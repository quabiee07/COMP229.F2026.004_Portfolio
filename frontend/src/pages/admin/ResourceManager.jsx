import { Link, useNavigate, useParams } from "react-router-dom";
import ResourceForm from "../../components/admin/ResourceForm";
import ResourceList from "../../components/admin/ResourceList";
import { getInitialValues, RESOURCES } from "../../constants/adminResources";
import { useResource } from "../../hooks/useResource";

function AdminSkeleton() {
  return (
    <div className="admin-skeleton" role="status" aria-label="Loading records">
      {[0, 1, 2, 3].map((line) => (
        <span className="admin-skeleton-line" key={line} aria-hidden="true" />
      ))}
    </div>
  );
}

function ResourceManager({ mode = "list" }) {
  const { resource, id } = useParams();
  const navigate = useNavigate();
  const config = RESOURCES[resource];
  const { items, loading, busy, error, saveRecord, deleteRecord } =
    useResource(resource);

  if (!config) {
    return (
      <>
        <header className="admin-page-head">
          <div>
            <p className="admin-eyebrow">404</p>
            <h1 className="admin-page-title">Unknown section</h1>
            <p className="admin-page-lead">
              That admin section is not part of this workspace.
            </p>
          </div>
          <Link className="admin-button admin-button-quiet" to="/admin">
            Back to overview
          </Link>
        </header>
      </>
    );
  }

  const basePath = `/admin/${resource}`;
  const editingItem =
    mode === "edit" ? items.find((item) => item.id === id) : undefined;

  const heading =
    mode === "new"
      ? `New ${config.singular.toLowerCase()}`
      : mode === "edit"
        ? `Edit ${config.singular.toLowerCase()}`
        : config.label;

  const lead =
    mode === "list"
      ? config.description
      : mode === "new"
        ? `Add a new ${config.singular.toLowerCase()} to your portfolio content.`
        : `Update the details for this ${config.singular.toLowerCase()} record.`;

  async function handleSubmit(values) {
    const didSave = await saveRecord(editingItem?.id, values);
    if (didSave) navigate(basePath);
    return didSave;
  }

  return (
    <>
      <header className="admin-page-head">
        <div>
          <p className="admin-eyebrow">
            {mode === "list" ? "Collection" : "Editor"}
          </p>
          <h1 className="admin-page-title">{heading}</h1>
          <p className="admin-page-lead">{lead}</p>
        </div>

        {mode === "list" ? (
          <Link className="admin-button admin-button-primary" to={`${basePath}/new`}>
            Add {config.singular.toLowerCase()}
          </Link>
        ) : (
          <Link className="admin-button admin-button-quiet" to={basePath}>
            ← Back to {config.label.toLowerCase()}
          </Link>
        )}
      </header>

      {error ? (
        <div className="admin-banner" role="alert">
          <span>Something went wrong. {error}</span>
        </div>
      ) : null}

      {mode === "list" ? (
        loading ? (
          <div className="admin-panel">
            <AdminSkeleton />
          </div>
        ) : (
          <ResourceList
            config={config}
            resourceKey={resource}
            items={items}
            isDeleting={busy}
            onDelete={deleteRecord}
          />
        )
      ) : null}

      {mode === "new" ? (
        <ResourceForm
          key="new"
          config={config}
          cancelTo={basePath}
          initialValues={getInitialValues(config)}
          isSaving={busy}
          onSubmit={handleSubmit}
          title={`New ${config.singular.toLowerCase()} details`}
        />
      ) : null}

      {mode === "edit" ? (
        loading ? (
          <div className="admin-panel">
            <AdminSkeleton />
          </div>
        ) : editingItem ? (
          <ResourceForm
            key={id}
            config={config}
            cancelTo={basePath}
            initialValues={getInitialValues(config, editingItem)}
            isSaving={busy}
            onSubmit={handleSubmit}
            title={`Edit ${config.singular.toLowerCase()} details`}
          />
        ) : (
          <div className="admin-panel admin-empty">
            <span className="admin-empty-mark" aria-hidden="true">
              !
            </span>
            <h3>Record not found</h3>
            <p>It may have been removed since you opened this page.</p>
            <Link className="admin-button admin-button-quiet" to={basePath}>
              Back to {config.label.toLowerCase()}
            </Link>
          </div>
        )
      ) : null}
    </>
  );
}

export default ResourceManager;
