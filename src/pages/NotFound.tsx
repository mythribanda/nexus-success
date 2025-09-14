import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <p className="mb-8 text-muted-foreground">The page you're looking for doesn't exist in the HSS Platform.</p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-gradient-primary text-white rounded-lg hover:shadow-glow transition-all inline-flex items-center space-x-2"
        >
          <span>Return to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
