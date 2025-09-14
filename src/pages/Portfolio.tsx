import { useState } from 'react';
import { Award, Shield, Eye, EyeOff, Download, Share2, ExternalLink, CheckCircle, Clock } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { skills, activities } from '@/utils/mockData';

export default function Portfolio() {
  const [recruiterView, setRecruiterView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'projects', label: 'Projects' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'skills', label: 'Skills' }
  ];

  const portfolioItems = [
    {
      id: 1,
      type: 'certificate',
      title: 'React Developer Certification',
      issuer: 'Meta',
      date: '2024-08-15',
      verified: true,
      blockchainHash: '0x1a2b3c4d5e6f7890',
      description: 'Advanced React development certification covering hooks, context, and performance optimization.',
      skills: ['React', 'JavaScript', 'Web Development'],
      recruiterVisible: true
    },
    {
      id: 2,
      type: 'project',
      title: 'E-commerce Platform',
      issuer: 'Personal Project',
      date: '2024-09-20',
      verified: true,
      blockchainHash: '0x2b3c4d5e6f789012',
      description: 'Full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.',
      skills: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      recruiterVisible: true,
      github: 'https://github.com/alexsmith/ecommerce-platform',
      demo: 'https://ecommerce-demo.alexsmith.dev'
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Hackathon Winner - 2nd Place',
      issuer: 'University Tech Fest',
      date: '2024-08-20',
      verified: true,
      blockchainHash: '0x3c4d5e6f78901234',
      description: 'Won 2nd place in 48-hour hackathon with innovative fintech solution for student loan management.',
      skills: ['Innovation', 'Teamwork', 'Fintech'],
      recruiterVisible: true
    },
    {
      id: 4,
      type: 'certificate',
      title: 'Python Programming Certificate',
      issuer: 'Python Institute',
      date: '2024-07-10',
      verified: false,
      description: 'Comprehensive Python programming course covering data structures, OOP, and web frameworks.',
      skills: ['Python', 'Django', 'Data Analysis'],
      recruiterVisible: false
    },
    {
      id: 5,
      type: 'project',
      title: 'Machine Learning Model',
      issuer: 'Academic Project',
      date: '2024-10-05',
      verified: true,
      blockchainHash: '0x4d5e6f7890123456',
      description: 'Predictive model for student performance using Python and scikit-learn. Achieved 94% accuracy.',
      skills: ['Python', 'Machine Learning', 'Data Science'],
      recruiterVisible: true,
      github: 'https://github.com/alexsmith/ml-student-performance'
    }
  ];

  const filteredItems = portfolioItems.filter(item => {
    if (selectedCategory !== 'all' && !item.type.includes(selectedCategory.slice(0, -1))) return false;
    if (recruiterView && !item.recruiterVisible) return false;
    return true;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'certificate': return <Award className="w-5 h-5" />;
      case 'project': return <ExternalLink className="w-5 h-5" />;
      case 'achievement': return <Shield className="w-5 h-5" />;
      default: return <Award className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'certificate': return 'bg-gradient-primary';
      case 'project': return 'bg-gradient-secondary';
      case 'achievement': return 'bg-gradient-success';
      default: return 'bg-gradient-primary';
    }
  };

  const verifiedCount = portfolioItems.filter(item => item.verified).length;
  const totalPoints = activities.filter(a => a.status === 'completed').reduce((sum, a) => sum + a.points, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Portfolio Dashboard
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Blockchain-verified achievements and skills showcase
          </p>
        </div>
        <div className="mt-4 lg:mt-0 flex items-center space-x-4">
          <button
            onClick={() => setRecruiterView(!recruiterView)}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
              recruiterView
                ? 'bg-gradient-success text-white shadow-glow'
                : 'bg-glass-background hover:bg-glass-highlight'
            }`}
          >
            {recruiterView ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span className="text-sm font-medium">
              {recruiterView ? 'Recruiter View' : 'Full View'}
            </span>
          </button>
          <button className="px-4 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-glow transition-all flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
          <button className="px-4 py-2 bg-gradient-secondary text-white rounded-lg hover:shadow-glow transition-all flex items-center space-x-2">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Total Items</h3>
              <p className="text-2xl font-bold">{portfolioItems.length}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Portfolio entries</p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-success">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Verified</h3>
              <p className="text-2xl font-bold">{verifiedCount}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Blockchain certified</p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-warning">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Achievement Points</h3>
              <p className="text-2xl font-bold">{totalPoints}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Total earned</p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-secondary">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Profile Views</h3>
              <p className="text-2xl font-bold">1.2k</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">This month</p>
        </GlassCard>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === category.id
                ? 'bg-gradient-primary text-white shadow-glow'
                : 'bg-glass-background hover:bg-glass-highlight'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Portfolio Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <GlassCard key={item.id} className="p-6 hover:shadow-elevated">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                  {getTypeIcon(item.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.issuer}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {item.verified && (
                  <div className="flex items-center space-x-1 px-2 py-1 bg-success/20 text-success rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    <span className="text-xs font-medium">Verified</span>
                  </div>
                )}
                {recruiterView && (
                  <div className="flex items-center space-x-1 px-2 py-1 bg-primary/20 text-primary rounded-full">
                    <Eye className="w-3 h-3" />
                    <span className="text-xs font-medium">Public</span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-muted-foreground mb-4">{item.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {item.skills.map((skill) => (
                <span key={skill} className="px-2 py-1 bg-glass-background text-xs rounded-full border border-glass-border">
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <span>{new Date(item.date).toLocaleDateString()}</span>
              {item.verified && item.blockchainHash && (
                <span className="font-mono text-xs">Hash: {item.blockchainHash.slice(0, 10)}...</span>
              )}
            </div>

            {(item.github || item.demo) && (
              <div className="flex space-x-2">
                {item.github && (
                  <button className="px-3 py-1 bg-glass-background hover:bg-glass-highlight rounded-lg text-sm transition-colors flex items-center space-x-1">
                    <ExternalLink className="w-3 h-3" />
                    <span>GitHub</span>
                  </button>
                )}
                {item.demo && (
                  <button className="px-3 py-1 bg-gradient-primary text-white rounded-lg text-sm hover:shadow-glow transition-all flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>Live Demo</span>
                  </button>
                )}
              </div>
            )}
          </GlassCard>
        ))}
      </div>

      {/* Blockchain Verification Notice */}
      <GlassCard className="p-6 bg-gradient-primary/10 border-primary/20">
        <div className="flex items-center space-x-3">
          <Shield className="w-6 h-6 text-primary" />
          <div>
            <h3 className="font-semibold text-primary">Blockchain Verification</h3>
            <p className="text-sm text-muted-foreground mt-1">
              All verified items are secured on the blockchain with immutable proof of authenticity. 
              Recruiters can verify the legitimacy of any certified achievement.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}