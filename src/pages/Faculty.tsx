import { useState } from 'react';
import { Users, CheckCircle, X, Clock, FileText, Download, Eye, Filter } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { facultySubmissions, getStoredData, setStoredData } from '@/utils/mockData';

export default function Faculty() {
  const [submissions, setSubmissions] = useState(() => 
    getStoredData('facultySubmissions', facultySubmissions)
  );
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const statusOptions = [
    { id: 'all', label: 'All Submissions' },
    { id: 'pending', label: 'Pending Review' },
    { id: 'approved', label: 'Approved' },
    { id: 'rejected', label: 'Rejected' }
  ];

  const typeOptions = [
    { id: 'all', label: 'All Types' },
    { id: 'certificate', label: 'Certificates' },
    { id: 'project', label: 'Projects' },
    { id: 'achievement', label: 'Achievements' }
  ];

  const handleStatusChange = (submissionId: string, newStatus: 'approved' | 'rejected') => {
    const updatedSubmissions = submissions.map(submission =>
      submission.id === submissionId
        ? { ...submission, status: newStatus }
        : submission
    );
    setSubmissions(updatedSubmissions);
    setStoredData('facultySubmissions', updatedSubmissions);
  };

  const filteredSubmissions = submissions.filter(submission => {
    if (selectedStatus !== 'all' && submission.status !== selectedStatus) return false;
    if (selectedType !== 'all' && submission.type !== selectedType) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-warning bg-warning/20';
      case 'approved': return 'text-success bg-success/20';
      case 'rejected': return 'text-danger bg-danger/20';
      default: return 'text-muted-foreground bg-glass-background';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'certificate': return '🏆';
      case 'project': return '💻';
      case 'achievement': return '🌟';
      default: return '📄';
    }
  };

  const pendingCount = submissions.filter(s => s.status === 'pending').length;
  const approvedCount = submissions.filter(s => s.status === 'approved').length;
  const rejectedCount = submissions.filter(s => s.status === 'rejected').length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Faculty Panel
        </h1>
        <p className="text-xl text-muted-foreground mt-2">
          Review and verify student submissions for blockchain certification
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-warning">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Pending</h3>
              <p className="text-2xl font-bold">{pendingCount}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Awaiting review</p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-success">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Approved</h3>
              <p className="text-2xl font-bold">{approvedCount}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">This month</p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-danger">
              <X className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Rejected</h3>
              <p className="text-2xl font-bold">{rejectedCount}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">This month</p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Total</h3>
              <p className="text-2xl font-bold">{submissions.length}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">All submissions</p>
        </GlassCard>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Status:</span>
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1 bg-glass-background border border-glass-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {statusOptions.map(option => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Type:</span>
          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-1 bg-glass-background border border-glass-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {typeOptions.map(option => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Submissions Queue */}
      <GlassCard className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold">Submission Queue</h2>
          <span className="text-sm text-muted-foreground">
            ({filteredSubmissions.length} items)
          </span>
        </div>

        <div className="space-y-4">
          {filteredSubmissions.map((submission) => (
            <div key={submission.id} className="p-6 bg-glass-background/30 rounded-lg border border-glass-border hover:border-glass-highlight transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{getTypeIcon(submission.type)}</span>
                    <div>
                      <h3 className="text-lg font-semibold">{submission.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        by <span className="font-medium">{submission.studentName}</span> • {submission.studentId}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                      {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                    </span>
                  </div>

                  <p className="text-muted-foreground mb-4">{submission.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">
                      Submitted: {new Date(submission.date).toLocaleDateString()}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Documents:</span>
                      {submission.documents.map((doc, index) => (
                        <button key={index} className="px-2 py-1 bg-glass-background hover:bg-glass-highlight rounded text-xs transition-colors flex items-center space-x-1">
                          <Download className="w-3 h-3" />
                          <span>{doc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {submission.status === 'pending' && (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleStatusChange(submission.id, 'approved')}
                        className="px-4 py-2 bg-gradient-success text-white rounded-lg hover:shadow-glow transition-all flex items-center space-x-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleStatusChange(submission.id, 'rejected')}
                        className="px-4 py-2 bg-gradient-danger text-white rounded-lg hover:shadow-glow transition-all flex items-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                      <button className="px-4 py-2 bg-glass-background hover:bg-glass-highlight rounded-lg transition-colors flex items-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>Preview</span>
                      </button>
                    </div>
                  )}

                  {submission.status === 'approved' && (
                    <div className="flex items-center space-x-2 text-success">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Approved and added to blockchain</span>
                    </div>
                  )}

                  {submission.status === 'rejected' && (
                    <div className="flex items-center space-x-2 text-danger">
                      <X className="w-4 h-4" />
                      <span className="text-sm font-medium">Submission rejected</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSubmissions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-glass-background rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No submissions found</h3>
            <p className="text-muted-foreground">
              No submissions match your current filter criteria.
            </p>
          </div>
        )}
      </GlassCard>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6 text-center">
          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold mb-2">Bulk Actions</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Process multiple submissions at once
          </p>
          <button className="px-4 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-glow transition-all">
            Select Multiple
          </button>
        </GlassCard>

        <GlassCard className="p-6 text-center">
          <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold mb-2">Export Report</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Generate submission activity report
          </p>
          <button className="px-4 py-2 bg-gradient-secondary text-white rounded-lg hover:shadow-glow transition-all">
            Export PDF
          </button>
        </GlassCard>

        <GlassCard className="p-6 text-center">
          <div className="w-12 h-12 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold mb-2">Verification Settings</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Configure approval workflows
          </p>
          <button className="px-4 py-2 bg-gradient-success text-white rounded-lg hover:shadow-glow transition-all">
            Settings
          </button>
        </GlassCard>
      </div>
    </div>
  );
}