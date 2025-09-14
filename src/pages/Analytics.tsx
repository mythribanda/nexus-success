import { useState } from 'react';
import { BarChart, LineChart, PieChart, TrendingUp, Users, Award, BookOpen, Download, Filter, Calendar } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import AnimatedCounter from '@/components/AnimatedCounter';
import ProgressBar from '@/components/ProgressBar';

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const periods = [
    { id: '1month', label: 'Last Month' },
    { id: '3months', label: 'Last 3 Months' },
    { id: '6months', label: 'Last 6 Months' },
    { id: '1year', label: 'Last Year' }
  ];

  const departments = [
    { id: 'all', label: 'All Departments' },
    { id: 'cse', label: 'Computer Science' },
    { id: 'ece', label: 'Electronics & Communication' },
    { id: 'me', label: 'Mechanical Engineering' },
    { id: 'civil', label: 'Civil Engineering' }
  ];

  const institutionStats = {
    totalStudents: 3420,
    activeStudents: 2876,
    totalCertifications: 1654,
    averageGPA: 3.42,
    participationRate: 84.1,
    verifiedAchievements: 2891
  };

  const departmentData = [
    { name: 'Computer Science', students: 890, avgGPA: 3.65, certifications: 445, participation: 92 },
    { name: 'Electronics & Comm.', students: 750, avgGPA: 3.38, certifications: 387, participation: 87 },
    { name: 'Mechanical', students: 680, avgGPA: 3.25, certifications: 298, participation: 78 },
    { name: 'Civil', students: 620, avgGPA: 3.18, certifications: 245, participation: 75 },
    { name: 'Others', students: 480, avgGPA: 3.35, certifications: 279, participation: 82 }
  ];

  const naacMetrics = [
    { criterion: 'Curricular Aspects', score: 3.8, maxScore: 4.0, improvement: '+0.3' },
    { criterion: 'Teaching & Learning', score: 3.6, maxScore: 4.0, improvement: '+0.2' },
    { criterion: 'Research & Outreach', score: 3.4, maxScore: 4.0, improvement: '+0.5' },
    { criterion: 'Infrastructure', score: 3.9, maxScore: 4.0, improvement: '+0.1' },
    { criterion: 'Student Support', score: 3.7, maxScore: 4.0, improvement: '+0.4' },
    { criterion: 'Governance & Leadership', score: 3.5, maxScore: 4.0, improvement: '+0.2' },
    { criterion: 'Institutional Values', score: 3.8, maxScore: 4.0, improvement: '+0.3' }
  ];

  const monthlyTrends = [
    { month: 'Jan', students: 2650, certifications: 123, activities: 89 },
    { month: 'Feb', students: 2720, certifications: 145, activities: 102 },
    { month: 'Mar', students: 2780, certifications: 167, activities: 118 },
    { month: 'Apr', students: 2845, certifications: 189, activities: 134 },
    { month: 'May', students: 2876, certifications: 201, activities: 156 },
    { month: 'Jun', students: 2890, certifications: 218, activities: 142 }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Institutional Analytics
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Comprehensive insights for NAAC, NIRF, and AICTE reporting
          </p>
        </div>
        <div className="mt-4 lg:mt-0 flex space-x-4">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-glass-background border border-glass-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 z-10"
          >
            {periods.map(period => (
              <option key={period.id} value={period.id} className="bg-glass-background text-foreground">
                {period.label}
              </option>
            ))}
          </select>
          <select 
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 bg-glass-background border border-glass-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 z-10"
          >
            {departments.map(dept => (
              <option key={dept.id} value={dept.id} className="bg-glass-background text-foreground">
                {dept.label}
              </option>
            ))}
          </select>
          <button className="px-4 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-glow transition-all flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Total Students</h3>
              <p className="text-2xl font-bold">
                <AnimatedCounter end={institutionStats.totalStudents} />
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-success">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">+8.5% from last year</span>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-success">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Active Students</h3>
              <p className="text-2xl font-bold">
                <AnimatedCounter end={institutionStats.activeStudents} />
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-success">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">
              <AnimatedCounter end={institutionStats.participationRate} decimals={1} suffix="%" />
              {' '}participation rate
            </span>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-secondary">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Certifications</h3>
              <p className="text-2xl font-bold">
                <AnimatedCounter end={institutionStats.totalCertifications} />
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-success">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">+15.2% this semester</span>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-warning">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Average GPA</h3>
              <p className="text-2xl font-bold">
                <AnimatedCounter end={institutionStats.averageGPA} decimals={2} />
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-success">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">+0.12 improvement</span>
          </div>
        </GlassCard>
      </div>

      {/* Department Analysis */}
      <GlassCard className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <BarChart className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold">Department-wise Performance</h2>
        </div>
        <div className="space-y-6">
          {departmentData.map((dept, index) => (
            <div key={index} className="p-4 bg-glass-background/30 rounded-lg border border-glass-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">{dept.name}</h3>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>{dept.students} students</span>
                  <span>GPA: {dept.avgGPA}</span>
                  <span>{dept.certifications} certs</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Participation Rate</span>
                    <span className="text-sm font-bold">{dept.participation}%</span>
                  </div>
                  <ProgressBar 
                    value={dept.participation} 
                    variant={dept.participation >= 85 ? 'success' : dept.participation >= 70 ? 'warning' : 'danger'}
                    showLabel={false}
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Academic Performance</span>
                    <span className="text-sm font-bold">{((dept.avgGPA / 4.0) * 100).toFixed(0)}%</span>
                  </div>
                  <ProgressBar 
                    value={(dept.avgGPA / 4.0) * 100} 
                    variant="primary"
                    showLabel={false}
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Skill Development</span>
                    <span className="text-sm font-bold">{Math.round((dept.certifications / dept.students) * 100)}%</span>
                  </div>
                  <ProgressBar 
                    value={Math.round((dept.certifications / dept.students) * 100)} 
                    variant="secondary"
                    showLabel={false}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* NAAC Criteria Analysis */}
      <GlassCard className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-lg bg-gradient-success">
            <Award className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold">NAAC Criteria Assessment</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {naacMetrics.map((metric, index) => (
            <div key={index} className="p-4 bg-glass-background/30 rounded-lg border border-glass-border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">{metric.criterion}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold">{metric.score}</span>
                  <span className="text-sm text-muted-foreground">/ {metric.maxScore}</span>
                  <span className="text-sm text-success bg-success/20 px-2 py-1 rounded-full">
                    {metric.improvement}
                  </span>
                </div>
              </div>
              <ProgressBar 
                value={(metric.score / metric.maxScore) * 100} 
                variant={metric.score >= 3.5 ? 'success' : metric.score >= 3.0 ? 'warning' : 'danger'}
                showLabel={false}
              />
              <div className="mt-2 text-sm text-muted-foreground">
                Score: {metric.score}/{metric.maxScore} • Improvement: {metric.improvement} from last assessment
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Monthly Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-secondary">
              <LineChart className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold">Monthly Trends</h2>
          </div>
          <div className="space-y-4">
            {monthlyTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-glass-background/30 rounded-lg">
                <span className="font-medium">{trend.month}</span>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="text-center">
                    <div className="text-primary font-bold">{trend.students}</div>
                    <div className="text-muted-foreground">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-success font-bold">{trend.certifications}</div>
                    <div className="text-muted-foreground">Certs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-warning font-bold">{trend.activities}</div>
                    <div className="text-muted-foreground">Activities</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-warning">
              <PieChart className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold">Quick Actions</h2>
          </div>
          <div className="space-y-4">
            <button className="w-full p-4 bg-gradient-primary text-white rounded-lg hover:shadow-glow transition-all text-left">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Generate NAAC Report</h3>
                  <p className="text-sm opacity-90">Comprehensive assessment report</p>
                </div>
                <Download className="w-5 h-5" />
              </div>
            </button>
            <button className="w-full p-4 bg-gradient-secondary text-white rounded-lg hover:shadow-glow transition-all text-left">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">NIRF Data Export</h3>
                  <p className="text-sm opacity-90">Ranking framework data</p>
                </div>
                <Download className="w-5 h-5" />
              </div>
            </button>
            <button className="w-full p-4 bg-gradient-success text-white rounded-lg hover:shadow-glow transition-all text-left">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Student Analytics</h3>
                  <p className="text-sm opacity-90">Detailed performance insights</p>
                </div>
                <TrendingUp className="w-5 h-5" />
              </div>
            </button>
            <button className="w-full p-4 bg-gradient-warning text-white rounded-lg hover:shadow-glow transition-all text-left">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Custom Report Builder</h3>
                  <p className="text-sm opacity-90">Build tailored reports</p>
                </div>
                <Filter className="w-5 h-5" />
              </div>
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}