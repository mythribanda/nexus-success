import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, BookOpen, Calendar, Plus, Check, X, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Student {
  id: string;
  student_id: string;
  user_id: string;
  department: string;
  semester: number;
  profiles: {
    full_name: string;
    email: string;
  };
}

interface AttendanceRecord {
  id: string;
  student_id: string;
  subject: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  notes?: string;
  students: {
    student_id: string;
    profiles: {
      full_name: string;
    };
  };
}

export default function FacultyDashboard() {
  const { profile } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [attendanceData, setAttendanceData] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (profile) {
      fetchStudents();
      fetchAttendanceRecords();
    }
  }, [profile]);

  const fetchStudents = async () => {
    try {
      const { data } = await supabase
        .from('students')
        .select(`
          id,
          student_id,
          user_id,
          department,
          semester,
          profiles!inner (
            full_name,
            email
          )
        `)
        .eq('college_id', profile?.college_id)
        .order('student_id');

      if (data) {
        setStudents(data as any);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchAttendanceRecords = async () => {
    try {
      const { data } = await supabase
        .from('attendance')
        .select(`
          *,
          students!inner (
            student_id,
            profiles!inner (
              full_name
            )
          )
        `)
        .eq('faculty_id', profile?.user_id)
        .eq('college_id', profile?.college_id)
        .order('date', { ascending: false })
        .limit(50);

      if (data) {
        setAttendanceRecords(data as any);
      }
    } catch (error) {
      console.error('Error fetching attendance records:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAttendanceSubmit = async () => {
    if (!selectedSubject) {
      toast({
        title: "Error",
        description: "Please select a subject",
        variant: "destructive",
      });
      return;
    }

    try {
      const attendanceEntries = Object.entries(attendanceData).map(([studentId, status]) => ({
        student_id: studentId,
        faculty_id: profile?.user_id,
        college_id: profile?.college_id,
        subject: selectedSubject,
        date: selectedDate,
        status,
        notes: notes || null,
      }));

      const { error } = await supabase
        .from('attendance')
        .insert(attendanceEntries);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Attendance recorded for ${attendanceEntries.length} students`,
      });

      // Reset form
      setSelectedSubject('');
      setAttendanceData({});
      setNotes('');
      
      // Refresh records
      fetchAttendanceRecords();
    } catch (error) {
      console.error('Error submitting attendance:', error);
      toast({
        title: "Error",
        description: "Failed to record attendance",
        variant: "destructive",
      });
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

  const getAttendanceStats = () => {
    const total = attendanceRecords.length;
    const present = attendanceRecords.filter(r => r.status === 'present').length;
    const absent = attendanceRecords.filter(r => r.status === 'absent').length;
    const late = attendanceRecords.filter(r => r.status === 'late').length;
    
    return { total, present, absent, late };
  };

  const stats = getAttendanceStats();

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
          <Users className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Welcome, {profile?.full_name}!</h1>
          <p className="text-muted-foreground">Faculty Dashboard - Manage student attendance</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-morphism">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">
              Students in your classes
            </p>
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes Recorded</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Total attendance records
            </p>
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <Check className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.present}</div>
            <p className="text-xs text-muted-foreground">
              Students marked present
            </p>
          </CardContent>
        </Card>

        <Card className="glass-morphism">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Department</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{profile?.department || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">
              Your department
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Record Attendance */}
      <Card className="glass-morphism">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Record Attendance</CardTitle>
              <CardDescription>
                Mark attendance for your students
              </CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  New Attendance
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Record Class Attendance</DialogTitle>
                  <DialogDescription>
                    Mark attendance for all students in your class
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        placeholder="Enter subject name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Input
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add any notes for this class"
                    />
                  </div>

                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    <Label>Student Attendance</Label>
                    {students.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <div className="font-medium">{student.profiles.full_name}</div>
                          <div className="text-sm text-muted-foreground">
                            {student.student_id} • Semester {student.semester}
                          </div>
                        </div>
                        <Select
                          value={attendanceData[student.id] || ''}
                          onValueChange={(value) => setAttendanceData(prev => ({ ...prev, [student.id]: value }))}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="present">Present</SelectItem>
                            <SelectItem value="absent">Absent</SelectItem>
                            <SelectItem value="late">Late</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </div>

                <DialogFooter>
                  <Button onClick={handleAttendanceSubmit} className="bg-gradient-primary">
                    Record Attendance
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {attendanceRecords.length > 0 ? (
            <div className="space-y-4">
              {attendanceRecords.slice(0, 10).map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-glass-border bg-glass-background/50 hover:bg-glass-highlight/20 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="font-medium">{record.students.profiles.full_name}</div>
                    <div className="text-sm text-muted-foreground">
                      {record.subject} • {new Date(record.date).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Student ID: {record.students.student_id}
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
              <p className="text-sm">Start by recording attendance for your first class</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}