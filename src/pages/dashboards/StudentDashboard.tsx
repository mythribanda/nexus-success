import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, GraduationCap, BookOpen, TrendingUp, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';

interface AttendanceRecord {
  id: string;
  subject: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  notes?: string;
}

interface AttendanceStats {
  totalClasses: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  attendancePercentage: number;
}

export default function StudentDashboard() {
  const { profile } = useAuth();
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [stats, setStats] = useState<AttendanceStats>({
    totalClasses: 0,
    presentCount: 0,
    absentCount: 0,
    lateCount: 0,
    attendancePercentage: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) {
      fetchAttendanceData();
    }
  }, [profile]);

  const fetchAttendanceData = async () => {
    try {
      // First get student record
      const { data: studentData } = await supabase
        .from('students')
        .select('id')
        .eq('user_id', profile?.user_id)
        .single();

      if (studentData) {
        // Fetch attendance records
        const { data: attendanceData } = await supabase
          .from('attendance')
          .select('*')
          .eq('student_id', studentData.id)
          .order('date', { ascending: false })
          .limit(50);

        if (attendanceData) {
          setAttendance(attendanceData as any);
          
          // Calculate stats
          const totalClasses = attendanceData.length;
          const presentCount = attendanceData.filter(record => record.status === 'present').length;
          const absentCount = attendanceData.filter(record => record.status === 'absent').length;
          const lateCount = attendanceData.filter(record => record.status === 'late').length;
          const attendancePercentage = totalClasses > 0 ? Math.round((presentCount / totalClasses) * 100) : 0;

          setStats({
            totalClasses,
            presentCount,
            absentCount,
            lateCount,
            attendancePercentage,
          });
        }
      }
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-success text-success-foreground">Present</Badge>;
      case 'absent':
        return <Badge className="bg-danger text-danger-foreground">Absent</Badge>;
      case 'late':
        return <Badge className="bg-warning text-warning-foreground">Late</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 bg-gradient-primary rounded-lg flex items-center justify-center">
          <GraduationCap className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Welcome, {profile?.full_name}!</h1>
          <p className="text-muted-foreground">Student Dashboard - Track your academic progress</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-morphism">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.attendancePercentage}%</div>
            <p className="text-xs text-muted-foreground">
              {stats.presentCount} of {stats.totalClasses} classes
            </p>
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClasses}</div>
            <p className="text-xs text-muted-foreground">
              Classes attended this semester
            </p>
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Days</CardTitle>
            <CalendarDays className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.presentCount}</div>
            <p className="text-xs text-muted-foreground">
              Days marked present
            </p>
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.lateCount}</div>
            <p className="text-xs text-muted-foreground">
              Times marked late
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Attendance */}
      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle>Recent Attendance Records</CardTitle>
          <CardDescription>
            Your latest attendance records across all subjects
          </CardDescription>
        </CardHeader>
        <CardContent>
          {attendance.length > 0 ? (
            <div className="space-y-4">
              {attendance.slice(0, 10).map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-glass-border bg-glass-background/50 hover:bg-glass-highlight/20 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="font-medium">{record.subject}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(record.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                    {record.notes && (
                      <div className="text-xs text-muted-foreground">{record.notes}</div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(record.status)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No attendance records found</p>
              <p className="text-sm">Your attendance will appear here once classes begin</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>
            AI-powered insights about your attendance patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.attendancePercentage >= 85 ? (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-success/10 border border-success/20">
                <TrendingUp className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <h4 className="font-medium text-success">Excellent Attendance!</h4>
                  <p className="text-sm text-success/80">
                    You're maintaining great attendance. Keep up the good work!
                  </p>
                </div>
              </div>
            ) : stats.attendancePercentage >= 75 ? (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-warning/10 border border-warning/20">
                <Clock className="h-5 w-5 text-warning mt-0.5" />
                <div>
                  <h4 className="font-medium text-warning">Good Attendance</h4>
                  <p className="text-sm text-warning/80">
                    Your attendance is good, but there's room for improvement.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-danger/10 border border-danger/20">
                <CalendarDays className="h-5 w-5 text-danger mt-0.5" />
                <div>
                  <h4 className="font-medium text-danger">Attendance Alert</h4>
                  <p className="text-sm text-danger/80">
                    Your attendance is below 75%. Please focus on regular attendance.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}