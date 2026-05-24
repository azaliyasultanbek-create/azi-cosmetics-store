import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  );
}