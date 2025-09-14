// Mock data for the Holistic Student Success Platform

export interface Student {
  id: string;
  name: string;
  email: string;
  program: string;
  year: number;
  avatar: string;
}

export interface AcademicRecord {
  subject: string;
  grade: string;
  percentage: number;
  credits: number;
  semester: string;
  status: 'excellent' | 'good' | 'average' | 'needs_improvement';
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'leadership' | 'creative';
  level: number;
  verified: boolean;
  certificates: Certificate[];
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  verified: boolean;
  blockchainHash?: string;
}

export interface Activity {
  id: string;
  name: string;
  type: 'workshop' | 'competition' | 'project' | 'internship' | 'volunteer';
  status: 'completed' | 'in_progress' | 'available';
  date: string;
  description: string;
  points: number;
}

export interface CareerRecommendation {
  id: string;
  title: string;
  type: 'course' | 'skill' | 'project' | 'certification';
  priority: 'high' | 'medium' | 'low';
  description: string;
  estimatedTime: string;
  points: number;
}

export interface FacultySubmission {
  id: string;
  studentName: string;
  studentId: string;
  type: 'certificate' | 'project' | 'achievement';
  title: string;
  description: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  documents: string[];
}

// Mock data
export const currentStudent: Student = {
  id: 'student_001',
  name: 'Alex Smith',
  email: 'alex.smith@university.edu',
  program: 'Computer Science',
  year: 3,
  avatar: 'AS'
};

export const academicRecords: AcademicRecord[] = [
  { subject: 'Data Structures', grade: 'A', percentage: 92, credits: 4, semester: 'Fall 2024', status: 'excellent' },
  { subject: 'Machine Learning', grade: 'A-', percentage: 88, credits: 3, semester: 'Fall 2024', status: 'excellent' },
  { subject: 'Database Systems', grade: 'B+', percentage: 85, credits: 3, semester: 'Fall 2024', status: 'good' },
  { subject: 'Web Development', grade: 'A', percentage: 94, credits: 3, semester: 'Spring 2024', status: 'excellent' },
  { subject: 'Software Engineering', grade: 'B', percentage: 78, credits: 4, semester: 'Spring 2024', status: 'average' },
  { subject: 'Computer Networks', grade: 'C+', percentage: 72, credits: 3, semester: 'Spring 2024', status: 'needs_improvement' },
];

export const skills: Skill[] = [
  {
    id: 'skill_001',
    name: 'React Development',
    category: 'technical',
    level: 85,
    verified: true,
    certificates: [
      { id: 'cert_001', name: 'React Developer Certification', issuer: 'Meta', date: '2024-08-15', verified: true, blockchainHash: '0x1a2b3c4d5e6f' }
    ]
  },
  {
    id: 'skill_002',
    name: 'Python Programming',
    category: 'technical',
    level: 92,
    verified: true,
    certificates: [
      { id: 'cert_002', name: 'Python Professional Certificate', issuer: 'Python Institute', date: '2024-07-20', verified: true }
    ]
  },
  {
    id: 'skill_003',
    name: 'Leadership',
    category: 'leadership',
    level: 75,
    verified: false,
    certificates: []
  },
  {
    id: 'skill_004',
    name: 'Machine Learning',
    category: 'technical',
    level: 88,
    verified: true,
    certificates: [
      { id: 'cert_003', name: 'ML Specialization', issuer: 'Stanford Online', date: '2024-09-10', verified: true }
    ]
  }
];

export const activities: Activity[] = [
  {
    id: 'activity_001',
    name: 'AI/ML Workshop Series',
    type: 'workshop',
    status: 'completed',
    date: '2024-09-15',
    description: 'Comprehensive workshop series covering machine learning fundamentals and applications.',
    points: 150
  },
  {
    id: 'activity_002',
    name: 'Hackathon 2024',
    type: 'competition',
    status: 'completed',
    date: '2024-08-20',
    description: 'Won 2nd place in university-wide hackathon with innovative fintech solution.',
    points: 200
  },
  {
    id: 'activity_003',
    name: 'Open Source Contribution',
    type: 'project',
    status: 'in_progress',
    date: '2024-10-01',
    description: 'Contributing to React ecosystem open source projects.',
    points: 100
  },
  {
    id: 'activity_004',
    name: 'Unity Game Development',
    type: 'workshop',
    status: 'available',
    date: '2024-12-15',
    description: 'Learn game development with Unity engine and C# programming.',
    points: 120
  }
];

export const careerRecommendations: CareerRecommendation[] = [
  {
    id: 'rec_001',
    title: 'Cloud Computing Certification',
    type: 'certification',
    priority: 'high',
    description: 'AWS Cloud Practitioner certification to boost your cloud computing skills.',
    estimatedTime: '6-8 weeks',
    points: 180
  },
  {
    id: 'rec_002',
    title: 'Full-Stack Project',
    type: 'project',
    priority: 'high',
    description: 'Build a complete web application showcasing your front-end and back-end skills.',
    estimatedTime: '4-6 weeks',
    points: 160
  },
  {
    id: 'rec_003',
    title: 'Peer Tutoring Program',
    type: 'skill',
    priority: 'medium',
    description: 'Improve your communication and leadership skills by tutoring junior students.',
    estimatedTime: '2-3 hours/week',
    points: 100
  },
  {
    id: 'rec_004',
    title: 'DevOps Fundamentals',
    type: 'course',
    priority: 'medium',
    description: 'Learn Docker, Kubernetes, and CI/CD pipelines for modern software deployment.',
    estimatedTime: '8-10 weeks',
    points: 140
  }
];

export const facultySubmissions: FacultySubmission[] = [
  {
    id: 'sub_001',
    studentName: 'Alex Smith',
    studentId: 'student_001',
    type: 'certificate',
    title: 'AWS Cloud Practitioner Certification',
    description: 'Successfully completed AWS Cloud Practitioner certification with score of 890/1000.',
    date: '2024-11-20',
    status: 'pending',
    documents: ['aws_certificate.pdf', 'score_report.pdf']
  },
  {
    id: 'sub_002',
    studentName: 'Jordan Lee',
    studentId: 'student_002',
    type: 'project',
    title: 'E-commerce Web Application',
    description: 'Full-stack e-commerce application built with React, Node.js, and MongoDB.',
    date: '2024-11-18',
    status: 'pending',
    documents: ['project_demo.mp4', 'source_code.zip', 'documentation.pdf']
  },
  {
    id: 'sub_003',
    studentName: 'Sam Wilson',
    studentId: 'student_003',
    type: 'achievement',
    title: 'Hackathon Winner',
    description: 'First place winner at National AI Hackathon 2024.',
    date: '2024-11-15',
    status: 'approved',
    documents: ['winner_certificate.pdf', 'project_presentation.pptx']
  }
];

// Analytics data
export const getProgressData = () => ({
  academics: 84.5,
  skills: 78.2,
  extracurricular: 92.0,
  overall: 84.9
});

export const getLeaderboard = () => [
  { rank: 1, name: 'Sarah Chen', points: 2450, program: 'Computer Science' },
  { rank: 2, name: 'Alex Smith', points: 2280, program: 'Computer Science' },
  { rank: 3, name: 'Michael Rodriguez', points: 2150, program: 'Software Engineering' },
  { rank: 4, name: 'Emma Thompson', points: 2020, program: 'Data Science' },
  { rank: 5, name: 'David Kim', points: 1980, program: 'Computer Science' }
];

// Local storage helpers
export const getStoredData = (key: string, defaultValue: any) => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const setStoredData = (key: string, value: any) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to store data:', error);
  }
};