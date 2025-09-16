import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Users, GraduationCap, BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';

interface CollegeStats {
  totalStudents: number;
  totalFaculty: number;
  totalAttendanceRecords: number;
  averageAttendance: number;
}

interface Student {
  id: string;
  student_id: string;
  department: string;
  semester: number;
  profiles: {
    full_name: string;
    email: string;
  };
}

interface AttendanceAnalytics {
  studentId: string;
  studentName: string;
  studentNumber: string;
  department: string;
  totalClasses: number;
  presentCount: number;
  attendancePercentage: number;
}

export default function AdminDashboard() {
  const { profile } = useAuth();
  const [stats, setStats] = useState<CollegeStats>({
    totalStudents: 0,
    totalFaculty: 0,
    totalAttendanceRecords: 0,
    averageAttendance: 0,
  });
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceAnalytics, setAttendanceAnalytics] = useState<AttendanceAnalytics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) {
      fetchCollegeData();
    }
  }, [profile]);

  const fetchCollegeData = async () => {
    try {
      // Fetch students
      const { data: studentsData } = await supabase
        .from('students')
        .select(`
          id,
          student_id,
          department,
          semester,
          profiles!inner (
            full_name,
            email
          )
        `)
        .eq('college_id', profile?.college_id)
        .order('student_id');

      if (studentsData) {
        setStudents(studentsData as any);
      }

      // Fetch faculty count
      const { count: facultyCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .eq('role', 'faculty')
        .eq('college_id', profile?.college_id);

      // Fetch attendance records
      const { data: attendanceData, count: attendanceCount } = await supabase
        .from('attendance')
        .select('*', { count: 'exact' })
        .eq('college_id', profile?.college_id);

      // Calculate attendance analytics
      const analytics: AttendanceAnalytics[] = [];
      
      if (studentsData && attendanceData) {
        for (const student of studentsData) {
          const studentAttendance = attendanceData.filter(a => a.student_id === student.id);
          const totalClasses = studentAttendance.length;
          const presentCount = studentAttendance.filter(a => a.status === 'present').length;
          const attendancePercentage = totalClasses > 0 ? Math.round((presentCount / totalClasses) * 100) : 0;

          analytics.push({
            studentId: student.id,
            studentName: (student.profiles as any)?.full_name || 'Unknown',
            studentNumber: student.student_id,
            department: student.department,
            totalClasses,
            presentCount,
            attendancePercentage,
          });
        }
      }

      setAttendanceAnalytics(analytics);

      // Calculate overall stats
      const totalAttendanceRecords = attendanceCount || 0;
      const averageAttendance = analytics.length > 0 
        ? Math.round(analytics.reduce((sum, a) => sum + a.attendancePercentage, 0) / analytics.length)
        : 0;

      setStats({
        totalStudents: studentsData?.length || 0,
        totalFaculty: facultyCount || 0,
        totalAttendanceRecords,
        averageAttendance,
      });
    } catch (error) {
      console.error('Error fetching college data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 85) return 'text-success';
    if (percentage >= 75) return 'text-warning';
    return 'text-danger';
  };

  const getPerformanceBadge = (percentage: number) => {
    if (percentage >= 85) return <Badge className="bg-success text-success-foreground">Excellent</Badge>;
    if (percentage >= 75) return <Badge className="bg-warning text-warning-foreground">Good</Badge>;
    return <Badge className="bg-danger text-danger-foreground">Needs Attention</Badge>;
  };

  const atRiskStudents = attendanceAnalytics.filter(a => a.attendancePercentage < 75);
  const topPerformers = attendanceAnalytics.filter(a => a.attendancePercentage >= 85);

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
          <Shield className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Welcome, {profile?.full_name}!</h1>
          <p className="text-muted-foreground">Administrator Dashboard - College Analytics & Management</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-morphism">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Enrolled students
            </p>
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faculty Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalFaculty}</div>
            <p className="text-xs text-muted-foreground">
              Teaching staff
            </p>
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Records</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAttendanceRecords}</div>
            <p className="text-xs text-muted-foreground">
              Total records
            </p>
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
            <TrendingUp className={`h-4 w-4 ${getPerformanceColor(stats.averageAttendance)}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getPerformanceColor(stats.averageAttendance)}`}>
              {stats.averageAttendance}%
            </div>
            <p className="text-xs text-muted-foreground">
              College-wide average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">All Students</TabsTrigger>
          <TabsTrigger value="alerts">At-Risk Students</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Students with excellent attendance (≥85%)</CardDescription>
              </CardHeader>
              <CardContent>
                {topPerformers.length > 0 ? (
                  <div className="space-y-3">
                    {topPerformers.slice(0, 5).map((student) => (
                      <div key={student.studentId} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{student.studentName}</div>
                          <div className="text-sm text-muted-foreground">
                            {student.studentNumber} • {student.department}
                          </div>
                        </div>
                        <div className="text-success font-bold">{student.attendancePercentage}%</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">No top performers yet</p>
                )}
              </CardContent>
            </Card>

            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-danger" />
                  Attention Required
                </CardTitle>
                <CardDescription>Students with low attendance (&lt;75%)</CardDescription>
              </CardHeader>
              <CardContent>
                {atRiskStudents.length > 0 ? (
                  <div className="space-y-3">
                    {atRiskStudents.slice(0, 5).map((student) => (
                      <div key={student.studentId} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{student.studentName}</div>
                          <div className="text-sm text-muted-foreground">
                            {student.studentNumber} • {student.department}
                          </div>
                        </div>
                        <div className="text-danger font-bold">{student.attendancePercentage}%</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">No students at risk</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle>All Students Performance</CardTitle>
              <CardDescription>Complete attendance analytics for all students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceAnalytics.map((student) => (
                  <div
                    key={student.studentId}
                    className="flex items-center justify-between p-4 rounded-lg border border-glass-border bg-glass-background/50 hover:bg-glass-highlight/20 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="font-medium">{student.studentName}</div>
                      <div className="text-sm text-muted-foreground">
                        {student.studentNumber} • {student.department}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {student.presentCount} of {student.totalClasses} classes attended
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`text-lg font-bold ${getPerformanceColor(student.attendancePercentage)}`}>
                        {student.attendancePercentage}%
                      </div>
                      {getPerformanceBadge(student.attendancePercentage)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-danger" />
                Students Requiring Attention
              </CardTitle>
              <CardDescription>
                Students with attendance below 75% - Immediate action recommended
              </CardDescription>
            </CardHeader>
            <CardContent>
              {atRiskStudents.length > 0 ? (
                <div className="space-y-4">
                  {atRiskStudents.map((student) => (
                    <div
                      key={student.studentId}
                      className="flex items-center justify-between p-4 rounded-lg border border-danger/20 bg-danger/5 hover:bg-danger/10 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="font-medium">{student.studentName}</div>
                        <div className="text-sm text-muted-foreground">
                          {student.studentNumber} • {student.department}
                        </div>
                        <div className="text-xs text-danger">
                          Only {student.presentCount} of {student.totalClasses} classes attended
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-bold text-danger">
                          {student.attendancePercentage}%
                        </div>
                        <Badge className="bg-danger text-danger-foreground">Critical</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No students currently at risk</p>
                  <p className="text-sm">All students are maintaining good attendance</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle>College Performance Summary</CardTitle>
              <CardDescription>
                Comprehensive analytics and insights for institutional reporting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-semibold">Attendance Distribution</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Excellent (≥85%)</span>
                      <span className="font-medium text-success">{topPerformers.length} students</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Good (75-84%)</span>
                      <span className="font-medium text-warning">
                        {attendanceAnalytics.filter(a => a.attendancePercentage >= 75 && a.attendancePercentage < 85).length} students
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Needs Attention (&lt;75%)</span>
                      <span className="font-medium text-danger">{atRiskStudents.length} students</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Key Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">College Average</span>
                      <span className={`font-medium ${getPerformanceColor(stats.averageAttendance)}`}>
                        {stats.averageAttendance}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Records</span>
                      <span className="font-medium">{stats.totalAttendanceRecords}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Students Tracked</span>
                      <span className="font-medium">{stats.totalStudents}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}