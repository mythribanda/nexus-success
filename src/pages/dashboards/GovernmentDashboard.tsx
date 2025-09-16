import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, BarChart3, TrendingUp, Users, GraduationCap, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';

interface CollegeData {
  id: string;
  name: string;
  code: string;
  location: string;
  studentCount: number;
  facultyCount: number;
  attendanceRecords: number;
  averageAttendance: number;
}

interface SystemStats {
  totalColleges: number;
  totalStudents: number;
  totalFaculty: number;
  totalAttendanceRecords: number;
  systemWideAttendance: number;
}

export default function GovernmentDashboard() {
  const { profile } = useAuth();
  const [colleges, setColleges] = useState<CollegeData[]>([]);
  const [systemStats, setSystemStats] = useState<SystemStats>({
    totalColleges: 0,
    totalStudents: 0,
    totalFaculty: 0,
    totalAttendanceRecords: 0,
    systemWideAttendance: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) {
      fetchSystemData();
    }
  }, [profile]);

  const fetchSystemData = async () => {
    try {
      // Fetch all colleges
      const { data: collegesData } = await supabase
        .from('colleges')
        .select('*')
        .order('name');

      if (!collegesData) return;

      const collegeAnalytics: CollegeData[] = [];
      let totalStudents = 0;
      let totalFaculty = 0;
      let totalAttendanceRecords = 0;
      let totalAttendanceSum = 0;
      let totalStudentsWithAttendance = 0;

      for (const college of collegesData) {
        // Get student count for this college
        const { count: studentCount } = await supabase
          .from('students')
          .select('*', { count: 'exact' })
          .eq('college_id', college.id);

        // Get faculty count for this college
        const { count: facultyCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact' })
          .eq('role', 'faculty')
          .eq('college_id', college.id);

        // Get attendance records for this college
        const { data: attendanceData, count: attendanceCount } = await supabase
          .from('attendance')
          .select('*', { count: 'exact' })
          .eq('college_id', college.id);

        // Calculate attendance percentage for this college
        let collegeAttendance = 0;
        if (attendanceData && studentCount && studentCount > 0) {
          // Group by student and calculate individual attendance
          const studentAttendanceMap = new Map();
          
          attendanceData.forEach(record => {
            if (!studentAttendanceMap.has(record.student_id)) {
              studentAttendanceMap.set(record.student_id, { present: 0, total: 0 });
            }
            const studentData = studentAttendanceMap.get(record.student_id);
            studentData.total += 1;
            if (record.status === 'present') {
              studentData.present += 1;
            }
          });

          // Calculate average attendance for this college
          let collegeSum = 0;
          let studentsCount = 0;
          
          studentAttendanceMap.forEach((data) => {
            if (data.total > 0) {
              collegeSum += (data.present / data.total) * 100;
              studentsCount += 1;
            }
          });

          collegeAttendance = studentsCount > 0 ? Math.round(collegeSum / studentsCount) : 0;
          totalAttendanceSum += collegeSum;
          totalStudentsWithAttendance += studentsCount;
        }

        collegeAnalytics.push({
          id: college.id,
          name: college.name,
          code: college.code,
          location: college.location,
          studentCount: studentCount || 0,
          facultyCount: facultyCount || 0,
          attendanceRecords: attendanceCount || 0,
          averageAttendance: collegeAttendance,
        });

        totalStudents += studentCount || 0;
        totalFaculty += facultyCount || 0;
        totalAttendanceRecords += attendanceCount || 0;
      }

      const systemWideAttendance = totalStudentsWithAttendance > 0 
        ? Math.round(totalAttendanceSum / totalStudentsWithAttendance)
        : 0;

      setColleges(collegeAnalytics);
      setSystemStats({
        totalColleges: collegesData.length,
        totalStudents,
        totalFaculty,
        totalAttendanceRecords,
        systemWideAttendance,
      });
    } catch (error) {
      console.error('Error fetching system data:', error);
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
    if (percentage >= 60) return <Badge className="bg-warning text-warning-foreground">Average</Badge>;
    return <Badge className="bg-danger text-danger-foreground">Critical</Badge>;
  };

  const topPerformingColleges = colleges
    .filter(c => c.averageAttendance > 0)
    .sort((a, b) => b.averageAttendance - a.averageAttendance)
    .slice(0, 5);

  const underperformingColleges = colleges
    .filter(c => c.averageAttendance > 0 && c.averageAttendance < 75)
    .sort((a, b) => a.averageAttendance - b.averageAttendance);

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
          <Building className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Welcome, {profile?.full_name}!</h1>
          <p className="text-muted-foreground">Government Dashboard - System-wide Education Analytics</p>
        </div>
      </div>

      {/* System Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="glass-morphism">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Colleges</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalColleges}</div>
            <p className="text-xs text-muted-foreground">
              Institutions monitored
            </p>
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalStudents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all colleges
            </p>
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalFaculty}</div>
            <p className="text-xs text-muted-foreground">
              Teaching professionals
            </p>
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Records</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalAttendanceRecords.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              System-wide records
            </p>
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Average</CardTitle>
            <TrendingUp className={`h-4 w-4 ${getPerformanceColor(systemStats.systemWideAttendance)}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getPerformanceColor(systemStats.systemWideAttendance)}`}>
              {systemStats.systemWideAttendance}%
            </div>
            <p className="text-xs text-muted-foreground">
              Overall attendance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="colleges">All Colleges</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle>Top Performing Colleges</CardTitle>
                <CardDescription>Institutions with highest attendance rates</CardDescription>
              </CardHeader>
              <CardContent>
                {topPerformingColleges.length > 0 ? (
                  <div className="space-y-3">
                    {topPerformingColleges.map((college) => (
                      <div key={college.id} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{college.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {college.code} • {college.location}
                          </div>
                        </div>
                        <div className="text-success font-bold">{college.averageAttendance}%</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">No data available</p>
                )}
              </CardContent>
            </Card>

            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-danger" />
                  Colleges Needing Support
                </CardTitle>
                <CardDescription>Institutions with attendance below 75%</CardDescription>
              </CardHeader>
              <CardContent>
                {underperformingColleges.length > 0 ? (
                  <div className="space-y-3">
                    {underperformingColleges.slice(0, 5).map((college) => (
                      <div key={college.id} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{college.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {college.code} • {college.location}
                          </div>
                        </div>
                        <div className="text-danger font-bold">{college.averageAttendance}%</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">All colleges performing well</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="colleges" className="space-y-4">
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle>All Colleges Performance</CardTitle>
              <CardDescription>Comprehensive view of all institutions in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {colleges.map((college) => (
                  <div
                    key={college.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-glass-border bg-glass-background/50 hover:bg-glass-highlight/20 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="font-medium">{college.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {college.code} • {college.location}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {college.studentCount} students • {college.facultyCount} faculty • {college.attendanceRecords} records
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`text-lg font-bold ${getPerformanceColor(college.averageAttendance)}`}>
                        {college.averageAttendance}%
                      </div>
                      {getPerformanceBadge(college.averageAttendance)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="text-success">Excellent (≥85%)</CardTitle>
                <CardDescription>High-performing institutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">
                  {colleges.filter(c => c.averageAttendance >= 85).length}
                </div>
                <p className="text-xs text-muted-foreground">colleges</p>
              </CardContent>
            </Card>

            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="text-warning">Good (75-84%)</CardTitle>
                <CardDescription>Satisfactory performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">
                  {colleges.filter(c => c.averageAttendance >= 75 && c.averageAttendance < 85).length}
                </div>
                <p className="text-xs text-muted-foreground">colleges</p>
              </CardContent>
            </Card>

            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="text-danger">Needs Support (&lt;75%)</CardTitle>
                <CardDescription>Requires intervention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-danger">
                  {colleges.filter(c => c.averageAttendance > 0 && c.averageAttendance < 75).length}
                </div>
                <p className="text-xs text-muted-foreground">colleges</p>
              </CardContent>
            </Card>
          </div>

          {underperformingColleges.length > 0 && (
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-danger" />
                  Priority Interventions Required
                </CardTitle>
                <CardDescription>
                  Colleges requiring immediate government support and intervention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {underperformingColleges.map((college) => (
                    <div
                      key={college.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-danger/20 bg-danger/5 hover:bg-danger/10 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="font-medium">{college.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {college.code} • {college.location}
                        </div>
                        <div className="text-xs text-danger">
                          {college.studentCount} students affected • {college.attendanceRecords} records
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-bold text-danger">
                          {college.averageAttendance}%
                        </div>
                        <Badge className="bg-danger text-danger-foreground">Critical</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle>Compliance & Reporting Summary</CardTitle>
              <CardDescription>
                System-wide compliance metrics for regulatory reporting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-semibold">System Performance Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Overall System Average</span>
                      <span className={`font-medium ${getPerformanceColor(systemStats.systemWideAttendance)}`}>
                        {systemStats.systemWideAttendance}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Colleges Above 85%</span>
                      <span className="font-medium text-success">
                        {Math.round((colleges.filter(c => c.averageAttendance >= 85).length / colleges.length) * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Colleges Below 75%</span>
                      <span className="font-medium text-danger">
                        {Math.round((colleges.filter(c => c.averageAttendance > 0 && c.averageAttendance < 75).length / colleges.length) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Coverage Statistics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Institutions</span>
                      <span className="font-medium">{systemStats.totalColleges}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Students Tracked</span>
                      <span className="font-medium">{systemStats.totalStudents.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Data Points Collected</span>
                      <span className="font-medium">{systemStats.totalAttendanceRecords.toLocaleString()}</span>
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