import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import StudentDashboard from '@/pages/dashboards/StudentDashboard';
import FacultyDashboard from '@/pages/dashboards/FacultyDashboard';
import AdminDashboard from '@/pages/dashboards/AdminDashboard';
import GovernmentDashboard from '@/pages/dashboards/GovernmentDashboard';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function RoleBasedLayout() {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!profile) {
    return <Navigate to="/auth" replace />;
  }

  switch (profile.role) {
    case 'student':
      return <StudentDashboard />;
    case 'faculty':
      return <FacultyDashboard />;
    case 'administrator':
      return <AdminDashboard />;
    case 'government':
      return <GovernmentDashboard />;
    default:
      return <Navigate to="/auth" replace />;
  }
}