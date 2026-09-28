import { Component } from "react";
import { Link } from "react-router-dom";

/**
 * Catches render errors so a single page failure does not blank the whole app.
 * Required for assignment QA: keep the site functional when issues occur.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: "",
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error?.message || "An unexpected error occurred.",
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Portfolio render error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: "" });
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="page-hero error-fallback">
          <p className="section-label">Something went wrong</p>
          <h1 className="section-title">We hit an unexpected issue</h1>
          <p className="page-hero-lead">
            The rest of the site should still work. You can return home or try
            this view again.
          </p>
          <p className="form-error" role="alert">
            {this.state.errorMessage}
          </p>
          <div className="btn-group">
            <Link className="btn btn-primary" to="/" onClick={this.handleReset}>
              Back to Home
            </Link>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={this.handleReset}
            >
              Try again
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
