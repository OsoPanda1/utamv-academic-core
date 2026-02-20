
-- =====================================================
-- UTAMV ELITE MASTERCLASS - COMPLETE DATABASE SCHEMA
-- =====================================================

-- Roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'student', 'instructor');

-- User roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'student',
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  country TEXT DEFAULT 'México',
  phone TEXT,
  profession TEXT,
  linkedin_url TEXT,
  enrollment_date TIMESTAMPTZ DEFAULT now(),
  last_active TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Courses table
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  level TEXT DEFAULT 'Máster',
  category TEXT,
  hours INTEGER DEFAULT 30,
  price_mxn DECIMAL(10,2),
  price_usd DECIMAL(10,2),
  stripe_price_id TEXT,
  stripe_product_id TEXT,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  thumbnail_url TEXT,
  instructor_name TEXT,
  instructor_bio TEXT,
  instructor_avatar TEXT,
  syllabus JSONB DEFAULT '[]',
  learning_outcomes JSONB DEFAULT '[]',
  prerequisites JSONB DEFAULT '[]',
  total_lessons INTEGER DEFAULT 0,
  total_quizzes INTEGER DEFAULT 0,
  certificate_enabled BOOLEAN DEFAULT true,
  obe_framework JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Course modules
CREATE TABLE public.course_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  is_free_preview BOOLEAN DEFAULT false,
  learning_objectives JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;

-- Lessons
CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES public.course_modules(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'video', -- video, audio, text, quiz, exercise
  content TEXT,
  video_url TEXT,
  audio_url TEXT,
  duration_minutes INTEGER DEFAULT 0,
  order_index INTEGER NOT NULL,
  is_free_preview BOOLEAN DEFAULT false,
  resources JSONB DEFAULT '[]',
  transcript TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

-- Quizzes
CREATE TABLE public.quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
  module_id UUID REFERENCES public.course_modules(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  questions JSONB NOT NULL DEFAULT '[]',
  passing_score INTEGER DEFAULT 70,
  time_limit_minutes INTEGER,
  attempts_allowed INTEGER DEFAULT 3,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;

-- Enrollments
CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'active', -- active, completed, suspended
  stripe_session_id TEXT,
  stripe_payment_intent TEXT,
  amount_paid_mxn DECIMAL(10,2),
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  UNIQUE (user_id, course_id)
);
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Lesson progress
CREATE TABLE public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  completed BOOLEAN DEFAULT false,
  progress_percent INTEGER DEFAULT 0,
  watch_time_seconds INTEGER DEFAULT 0,
  last_position_seconds INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, lesson_id)
);
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

-- Quiz attempts
CREATE TABLE public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  answers JSONB DEFAULT '[]',
  score INTEGER DEFAULT 0,
  passed BOOLEAN DEFAULT false,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Certificates
CREATE TABLE public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  certificate_number TEXT UNIQUE NOT NULL,
  blockchain_hash TEXT,
  qr_code_url TEXT,
  verification_url TEXT,
  final_score DECIMAL(5,2),
  hours_completed INTEGER,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  pdf_url TEXT,
  metadata JSONB DEFAULT '{}'
);
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Global chat messages
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  room TEXT DEFAULT 'global', -- global, course_id, etc
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text', -- text, image, system
  is_pinned BOOLEAN DEFAULT false,
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- AI Chat sessions
CREATE TABLE public.ai_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_type TEXT DEFAULT 'academic', -- academic, tutor, support
  messages JSONB DEFAULT '[]',
  context TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.ai_sessions ENABLE ROW LEVEL SECURITY;

-- Instructors
CREATE TABLE public.instructors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT,
  bio TEXT,
  avatar_url TEXT,
  specialties JSONB DEFAULT '[]',
  linkedin_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.instructors ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS POLICIES
-- =====================================================

-- user_roles policies
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- profiles policies
CREATE POLICY "Profiles are publicly readable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- courses - public read
CREATE POLICY "Courses are publicly readable" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Admins can manage courses" ON public.courses FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- modules - public read
CREATE POLICY "Modules are publicly readable" ON public.course_modules FOR SELECT USING (true);
CREATE POLICY "Admins can manage modules" ON public.course_modules FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- lessons - enrolled users or free preview
CREATE POLICY "Free lessons are publicly readable" ON public.lessons FOR SELECT USING (is_free_preview = true);
CREATE POLICY "Enrolled users can view lessons" ON public.lessons FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.enrollments WHERE user_id = auth.uid() AND course_id = lessons.course_id AND status = 'active')
);
CREATE POLICY "Admins can manage lessons" ON public.lessons FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- quizzes
CREATE POLICY "Free quizzes readable" ON public.quizzes FOR SELECT USING (true);
CREATE POLICY "Admins can manage quizzes" ON public.quizzes FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- enrollments
CREATE POLICY "Users can view own enrollments" ON public.enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own enrollments" ON public.enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all enrollments" ON public.enrollments FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- lesson_progress
CREATE POLICY "Users can manage own progress" ON public.lesson_progress FOR ALL USING (auth.uid() = user_id);

-- quiz_attempts
CREATE POLICY "Users can manage own attempts" ON public.quiz_attempts FOR ALL USING (auth.uid() = user_id);

-- certificates
CREATE POLICY "Certificates are publicly verifiable" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Users can view own certificates" ON public.certificates FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can insert certificates" ON public.certificates FOR INSERT WITH CHECK (auth.uid() = user_id);

-- chat_messages
CREATE POLICY "Authenticated users can read chat" ON public.chat_messages FOR SELECT TO authenticated USING (is_deleted = false);
CREATE POLICY "Authenticated users can post" ON public.chat_messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own messages" ON public.chat_messages FOR UPDATE USING (auth.uid() = user_id);

-- ai_sessions
CREATE POLICY "Users can manage own AI sessions" ON public.ai_sessions FOR ALL USING (auth.uid() = user_id);

-- instructors - public read
CREATE POLICY "Instructors are publicly readable" ON public.instructors FOR SELECT USING (true);
CREATE POLICY "Admins can manage instructors" ON public.instructors FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1));
  
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'student');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Generate certificate number
CREATE OR REPLACE FUNCTION public.generate_certificate_number()
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE cert_num TEXT;
BEGIN
  cert_num := 'UTAMV-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(FLOOR(RANDOM() * 999999)::TEXT, 6, '0');
  RETURN cert_num;
END;
$$;
