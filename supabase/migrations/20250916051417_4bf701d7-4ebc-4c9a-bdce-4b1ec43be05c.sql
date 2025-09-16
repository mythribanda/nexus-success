-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('student', 'faculty', 'administrator', 'government');

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role user_role NOT NULL,
  college_id TEXT,
  department TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create colleges table for institutional data
CREATE TABLE public.colleges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on colleges
ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;

-- Create students table for student-specific data
CREATE TABLE public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  student_id TEXT NOT NULL UNIQUE,
  college_id UUID REFERENCES public.colleges NOT NULL,
  department TEXT NOT NULL,
  semester INTEGER,
  batch_year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on students
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Create attendance table
CREATE TABLE public.attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.students NOT NULL,
  faculty_id UUID REFERENCES auth.users NOT NULL,
  college_id UUID REFERENCES public.colleges NOT NULL,
  subject TEXT NOT NULL,
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on attendance
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

-- Create security definer function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- Create security definer function to get current user college
CREATE OR REPLACE FUNCTION public.get_current_user_college()
RETURNS TEXT AS $$
  SELECT college_id FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can view all profiles in their college" ON public.profiles
  FOR SELECT USING (
    public.get_current_user_role() = 'administrator' AND 
    college_id = public.get_current_user_college()
  );

CREATE POLICY "Government can view all profiles" ON public.profiles
  FOR SELECT USING (public.get_current_user_role() = 'government');

-- RLS Policies for colleges
CREATE POLICY "Everyone can view colleges" ON public.colleges
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage colleges" ON public.colleges
  FOR ALL USING (public.get_current_user_role() IN ('administrator', 'government'));

-- RLS Policies for students
CREATE POLICY "Students can view their own data" ON public.students
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Faculty can view students in their college" ON public.students
  FOR SELECT USING (
    public.get_current_user_role() = 'faculty' AND 
    college_id::text = public.get_current_user_college()
  );

CREATE POLICY "Admins can view all students in their college" ON public.students
  FOR SELECT USING (
    public.get_current_user_role() = 'administrator' AND 
    college_id::text = public.get_current_user_college()
  );

CREATE POLICY "Government can view all students" ON public.students
  FOR SELECT USING (public.get_current_user_role() = 'government');

-- RLS Policies for attendance
CREATE POLICY "Students can view their own attendance" ON public.attendance
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.students s 
      WHERE s.id = attendance.student_id AND s.user_id = auth.uid()
    )
  );

CREATE POLICY "Faculty can manage attendance for their college" ON public.attendance
  FOR ALL USING (
    public.get_current_user_role() = 'faculty' AND 
    college_id::text = public.get_current_user_college()
  );

CREATE POLICY "Admins can view all attendance in their college" ON public.attendance
  FOR SELECT USING (
    public.get_current_user_role() = 'administrator' AND 
    college_id::text = public.get_current_user_college()
  );

CREATE POLICY "Government can view all attendance" ON public.attendance
  FOR SELECT USING (public.get_current_user_role() = 'government');

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, role, college_id)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')::user_role,
    NEW.raw_user_meta_data->>'college_id'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample colleges
INSERT INTO public.colleges (name, code, location) VALUES
  ('Government Engineering College', 'GEC001', 'Mumbai'),
  ('National Institute of Technology', 'NIT001', 'Delhi'),
  ('Indian Institute of Technology', 'IIT001', 'Bangalore');