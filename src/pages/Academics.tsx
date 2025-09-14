import { useState } from 'react';
import { BookOpen, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Calendar, GraduationCap } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import ProgressBar from '@/components/ProgressBar';
import { academicRecords } from '@/utils/mockData';

export default function Academics() {
  const [selectedSemester, setSelectedSemester] = useState('Fall 2024');
  
  const semesters = ['Fall 2024', 'Spring 2024', 'Fall 2023'];
  const filteredRecords = academicRecords.filter(record => record.semester === selectedSemester);
  
  const totalCredits = filteredRecords.reduce((sum, record) => sum + record.credits, 0);
  const weightedGPA = filteredRecords.reduce((sum, record) => sum + (record.percentage * record.credits), 0) / (totalCredits * 100) * 4.0;
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-5 h-5 text-success" />;
      case 'good': return <TrendingUp className="w-5 h-5 text-secondary" />;
      case 'average': return <TrendingDown className="w-5 h-5 text-warning" />;
      case 'needs_improvement': return <AlertTriangle className="w-5 h-5 text-danger" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'border-l-success bg-success/5';
      case 'good': return 'border-l-secondary bg-secondary/5';
      case 'average': return 'border-l-warning bg-warning/5';
      case 'needs_improvement': return 'border-l-danger bg-danger/5';
      default: return 'border-l-muted';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Academic Performance
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Track your academic progress and identify areas for improvement
          </p>
        </div>
        <div className="mt-4 lg:mt-0">
          <select 
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-4 py-2 bg-glass-background border border-glass-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {semesters.map(semester => (
              <option key={semester} value={semester}>{semester}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Academic Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Current GPA</h3>
              <p className="text-2xl font-bold">{weightedGPA.toFixed(2)}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Out of 4.0 scale</p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-secondary">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Credits</h3>
              <p className="text-2xl font-bold">{totalCredits}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">This semester</p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-success">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Attendance</h3>
              <p className="text-2xl font-bold">94%</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Above requirement</p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-warning">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Assignments</h3>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Due this week</p>
        </GlassCard>
      </div>

      {/* Subject Performance */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold">Subject Performance</h2>
          </div>
          <span className="text-sm text-muted-foreground">{selectedSemester}</span>
        </div>

        <div className="space-y-4">
          {filteredRecords.map((record, index) => (
            <div key={index} className={`p-6 rounded-lg border-l-4 ${getStatusColor(record.status)} transition-all hover:shadow-glass`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(record.status)}
                    <h3 className="text-lg font-semibold">{record.subject}</h3>
                    <span className="px-3 py-1 bg-glass-background rounded-full text-sm font-medium">
                      {record.credits} Credits
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Grade</p>
                      <p className="text-2xl font-bold">{record.grade}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Percentage</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold">{record.percentage}%</span>
                      </div>
                    </div>
                    <div className="flex items-end">
                      <ProgressBar 
                        value={record.percentage} 
                        variant={
                          record.status === 'excellent' ? 'success' :
                          record.status === 'good' ? 'primary' :
                          record.status === 'average' ? 'warning' : 'danger'
                        }
                        showLabel={false}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Improvement Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-warning">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold">Areas for Improvement</h2>
          </div>
          <div className="space-y-4">
            {filteredRecords
              .filter(record => record.status === 'needs_improvement' || record.status === 'average')
              .map((record, index) => (
                <div key={index} className="p-4 bg-glass-background/30 rounded-lg border border-glass-border">
                  <h3 className="font-semibold text-warning">{record.subject}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Current: {record.percentage}% - Consider additional study sessions or tutoring
                  </p>
                  <div className="flex items-center space-x-2 mt-3">
                    <button className="px-3 py-1 bg-gradient-primary text-white text-sm rounded-lg hover:shadow-glow transition-all">
                      Book Tutoring
                    </button>
                    <button className="px-3 py-1 bg-glass-background text-sm rounded-lg hover:bg-glass-highlight transition-colors">
                      Study Resources
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-success">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold">Strengths</h2>
          </div>
          <div className="space-y-4">
            {filteredRecords
              .filter(record => record.status === 'excellent' || record.status === 'good')
              .map((record, index) => (
                <div key={index} className="p-4 bg-glass-background/30 rounded-lg border border-glass-border">
                  <h3 className="font-semibold text-success">{record.subject}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Excellent performance at {record.percentage}% - Keep up the great work!
                  </p>
                  <div className="flex items-center space-x-2 mt-3">
                    <button className="px-3 py-1 bg-gradient-success text-white text-sm rounded-lg hover:shadow-glow transition-all">
                      Peer Tutor
                    </button>
                    <button className="px-3 py-1 bg-glass-background text-sm rounded-lg hover:bg-glass-highlight transition-colors">
                      Advanced Topics
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}