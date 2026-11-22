export const RESOURCES = {
    users: {
      label: "Users",
      singular: "User",
      description: "Accounts with access to the portfolio workspace.",
      endpoint: "/api/users",
      titleField: "firstname",
      fields: [
        { name: "firstname", label: "First name", required: true },
        { name: "lastname", label: "Last name", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "password", label: "Password", type: "password", required: true },
      ],
      columns: ["firstname", "lastname", "email"],
    },
    projects: {
      label: "Projects",
      singular: "Project",
      description: "Case studies featured on your public projects page.",
      endpoint: "/api/projects",
      titleField: "title",
      fields: [
        { name: "title", label: "Title", required: true },
        { name: "description", label: "Description", multiline: true, required: true },
        { name: "image", label: "Image", type: "file" },
        { name: "completion", label: "Completion date", type: "date" },
      ],
      columns: ["title", "image", "completion"],
    },
    services: {
      label: "Services",
      singular: "Service",
      description: "The capabilities presented to potential clients.",
      endpoint: "/api/services",
      titleField: "title",
      fields: [
        { name: "title", label: "Title", required: true },
        { name: "description", label: "Description", multiline: true, required: true },
      ],
      columns: ["title", "description"],
    },
    references: {
      label: "References",
      singular: "Reference",
      description: "Testimonials from colleagues and collaborators.",
      endpoint: "/api/references",
      titleField: "name",
      fields: [
        { name: "name", label: "Name", required: true },
        { name: "position", label: "Position" },
        { name: "company", label: "Company" },
        { name: "testimonial", label: "Testimonial", multiline: true, required: true },
      ],
      columns: ["name", "position", "company"],
    },
  };

export const ADMIN_SECTION_ORDER = ["projects", "services", "references", "users"];

function toDateInputValue(value) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

export function getInitialValues(config, item = {}) {
    return Object.fromEntries(
      config.fields.map(({ name, type }) => {
        const value = item[name] ?? "";
        return [name, type === "date" ? toDateInputValue(value) : value];
      })
    );
  }
