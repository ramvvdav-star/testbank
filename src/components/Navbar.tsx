import React, { useState, useEffect } from 'react';
import { useExam } from '../context/ExamContext';
import {
  BookOpen,
  ShieldCheck,
  GraduationCap,
  Award,
  LayoutDashboard,
  Zap,
  Bookmark,
  Search,
  Moon,
  Sun,
  Wifi,
  WifiOff,
  LogOut,
  Users,
  Menu,
  X,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    authProfile,
    isAuthenticated,
    logout,
    theme,
    toggleTheme,
    setIsCommandPaletteOpen,
    isOnline,
    bookmarks,
    mistakeQuestions,
  } = useExam();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on route change or screen resize
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentView]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hide standard navigation during active full-screen CBT examination or Login screens
  if (
    currentView === 'cbt-exam' ||
    currentView === 'login' ||
    currentView === 'first-login-reset' ||
    !isAuthenticated ||
    !authProfile
  ) {
    return null;
  }

  const role = authProfile.role;
  const studentCourse =
    authProfile.courseType ||
    (authProfile.examCategory === 'NEET'
      ? 'NEET'
      : authProfile.examCategory === 'JEE_ADVANCED'
      ? 'JEE_ADVANCED'
      : 'JEE');
  const coursePrefix = studentCourse === 'NEET' ? 'NEET' : 'JEE';

  const navigateTo = (view: any) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 dark:bg-slate-950 text-white shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <div
          onClick={() => {
            if (role === 'ADMIN') navigateTo('admin-dashboard');
            else if (role === 'TEACHER') navigateTo('teacher-dashboard');
            else navigateTo('student-dashboard');
          }}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 shrink"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-inner shadow-indigo-400/30 group-hover:bg-indigo-500 transition-colors shrink-0">
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-black tracking-tight text-base sm:text-lg text-white truncate">
                NTA-PULSE
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
                {role === 'STUDENT' ? `${studentCourse}` : 'CBT 2026'}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 hidden md:block truncate">
              {role === 'STUDENT'
                ? studentCourse === 'NEET'
                  ? 'National Eligibility cum Entrance Test (NEET UG) Portal'
                  : 'Joint Entrance Examination (JEE) Candidate Portal'
                : 'National Competitive Examination Portal'}
            </p>
          </div>
        </div>

        {/* Center Desktop Navigation Links — Strictly Scoped by Authenticated Role & Enrolled Course */}
        <nav className="hidden lg:flex items-center gap-1">
          {role === 'STUDENT' && (
            <>
              <button
                onClick={() => navigateTo('student-dashboard')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  currentView === 'student-dashboard'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
                <span>{coursePrefix} Dashboard</span>
              </button>

              <button
                onClick={() => navigateTo('tests')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  currentView === 'tests' || currentView === 'test-details'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>{coursePrefix} Mock Tests</span>
              </button>

              <button
                onClick={() => navigateTo('practice-engine')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  currentView === 'practice-engine'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>{coursePrefix} Practice</span>
              </button>

              <button
                onClick={() => navigateTo('bookmarks-mistakes')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  currentView === 'bookmarks-mistakes'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 text-rose-400" />
                <span>Saved &amp; Mistakes</span>
                {bookmarks.length + mistakeQuestions.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-rose-500/20 text-rose-300">
                    {bookmarks.length + mistakeQuestions.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => navigateTo('result')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  currentView === 'result'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-sky-400" />
                <span>{coursePrefix} Results</span>
              </button>
            </>
          )}

          {role === 'TEACHER' && (
            <>
              <button
                onClick={() => navigateTo('teacher-dashboard')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  currentView === 'teacher-dashboard'
                    ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-700/50'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>Faculty Dashboard ({authProfile.courseType || 'JEE'})</span>
              </button>

              <button
                onClick={() => navigateTo('tests')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  currentView === 'tests' || currentView === 'test-details'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>Course Mock Library</span>
              </button>
            </>
          )}

          {role === 'ADMIN' && (
            <>
              <button
                onClick={() => navigateTo('admin-dashboard')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  currentView.startsWith('admin')
                    ? 'bg-purple-950/90 text-purple-300 border border-purple-700/50'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>Admin Control Center</span>
              </button>

              <button
                onClick={() => navigateTo('teacher-dashboard')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  currentView === 'teacher-dashboard'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>Faculty View</span>
              </button>

              <button
                onClick={() => navigateTo('tests')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  currentView === 'tests' || currentView === 'test-details'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>Test Library</span>
              </button>
            </>
          )}
        </nav>

        {/* Right Controls: Search, Theme, User Badge, Logout & Mobile Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-2 rounded-lg bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 transition-colors cursor-pointer min-h-[40px] min-w-[40px] justify-center"
            title="Quick Command Search (Ctrl+K)"
            aria-label="Search"
          >
            <Search className="w-4 h-4 text-indigo-400" />
            <span className="hidden md:inline text-[11px]">Search...</span>
            <kbd className="hidden lg:inline px-1.5 py-0.2 text-[10px] font-mono bg-slate-900 text-slate-400 rounded border border-slate-700">
              ⌘K
            </kbd>
          </button>

          <div
            className={`hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold border ${
              isOnline
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/50'
                : 'bg-rose-950/80 text-rose-300 border-rose-700 animate-pulse'
            }`}
          >
            {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            <span>{isOnline ? 'SYNCED' : 'OFFLINE'}</span>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 sm:p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
          </button>

          {/* Desktop User Info & Logout */}
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800">
            <div
              className={`px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold border flex items-center gap-1 max-w-[140px] md:max-w-[200px] truncate ${
                role === 'ADMIN'
                  ? 'bg-purple-950/80 border-purple-700 text-purple-300'
                  : role === 'TEACHER'
                  ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300'
                  : 'bg-indigo-950/80 border-indigo-700 text-indigo-300'
              }`}
            >
              <span className="truncate">{role}</span>
              {role === 'STUDENT' && (
                <span className="text-emerald-300 truncate">
                  · {studentCourse}
                </span>
              )}
            </div>

            <button
              onClick={logout}
              className="p-2 sm:px-2.5 sm:py-1.5 rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/70 transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold min-h-[40px]"
              title="Sign Out"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center ml-1"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900/98 border-t border-slate-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
          {/* Mobile User Profile Banner */}
          <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    role === 'ADMIN'
                      ? 'bg-purple-950 border border-purple-700 text-purple-300'
                      : role === 'TEACHER'
                      ? 'bg-emerald-950 border border-emerald-700 text-emerald-300'
                      : 'bg-indigo-950 border border-indigo-700 text-indigo-300'
                  }`}
                >
                  {role} · {studentCourse}
                </span>
                {authProfile.studentId && (
                  <span className="text-[10px] font-mono text-slate-400">
                    ID: {authProfile.studentId}
                  </span>
                )}
              </div>
              <div className="text-xs font-bold text-white mt-1 truncate">
                {authProfile.fullName}
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                logout();
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 min-h-[40px]"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="space-y-1 pt-1">
            {role === 'STUDENT' && (
              <>
                <button
                  onClick={() => navigateTo('student-dashboard')}
                  className={`w-full px-3.5 py-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-between cursor-pointer min-h-[44px] ${
                    currentView === 'student-dashboard'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800/60 text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                    <span>{coursePrefix} Dashboard</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Home</span>
                </button>

                <button
                  onClick={() => navigateTo('tests')}
                  className={`w-full px-3.5 py-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-between cursor-pointer min-h-[44px] ${
                    currentView === 'tests' || currentView === 'test-details'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800/60 text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-indigo-400" />
                    <span>{coursePrefix} Mock Tests</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Papers</span>
                </button>

                <button
                  onClick={() => navigateTo('practice-engine')}
                  className={`w-full px-3.5 py-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-between cursor-pointer min-h-[44px] ${
                    currentView === 'practice-engine'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800/60 text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>{coursePrefix} Practice Drills</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Adaptive</span>
                </button>

                <button
                  onClick={() => navigateTo('bookmarks-mistakes')}
                  className={`w-full px-3.5 py-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-between cursor-pointer min-h-[44px] ${
                    currentView === 'bookmarks-mistakes'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800/60 text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Bookmark className="w-4 h-4 text-rose-400" />
                    <span>Saved Bookmarks &amp; Mistakes</span>
                  </span>
                  {bookmarks.length + mistakeQuestions.length > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-rose-500/30 text-rose-200 font-bold">
                      {bookmarks.length + mistakeQuestions.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => navigateTo('result')}
                  className={`w-full px-3.5 py-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-between cursor-pointer min-h-[44px] ${
                    currentView === 'result'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800/60 text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-sky-400" />
                    <span>{coursePrefix} Test Results &amp; Analytics</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Scorecards</span>
                </button>
              </>
            )}

            {role === 'TEACHER' && (
              <>
                <button
                  onClick={() => navigateTo('teacher-dashboard')}
                  className={`w-full px-3.5 py-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-between cursor-pointer min-h-[44px] ${
                    currentView === 'teacher-dashboard'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800/60 text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>Faculty Dashboard ({authProfile.courseType || 'JEE'})</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Portal</span>
                </button>

                <button
                  onClick={() => navigateTo('tests')}
                  className={`w-full px-3.5 py-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-between cursor-pointer min-h-[44px] ${
                    currentView === 'tests' || currentView === 'test-details'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800/60 text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-indigo-400" />
                    <span>Course Mock Papers Library</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Repository</span>
                </button>
              </>
            )}

            {role === 'ADMIN' && (
              <>
                <button
                  onClick={() => navigateTo('admin-dashboard')}
                  className={`w-full px-3.5 py-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-between cursor-pointer min-h-[44px] ${
                    currentView.startsWith('admin')
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-800/60 text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-purple-400" />
                    <span>Admin Control Center</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">RBAC</span>
                </button>

                <button
                  onClick={() => navigateTo('teacher-dashboard')}
                  className={`w-full px-3.5 py-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-between cursor-pointer min-h-[44px] ${
                    currentView === 'teacher-dashboard'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800/60 text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>Faculty View</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Batches</span>
                </button>

                <button
                  onClick={() => navigateTo('tests')}
                  className={`w-full px-3.5 py-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-between cursor-pointer min-h-[44px] ${
                    currentView === 'tests' || currentView === 'test-details'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800/60 text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-indigo-400" />
                    <span>Master Test Library</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Tests</span>
                </button>
              </>
            )}
          </div>

          {/* Quick Info & Network status in mobile drawer */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 font-mono">
              {isOnline ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-emerald-300">Live Auto-Sync Active</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
                  <span className="text-rose-300">Offline Cache Active</span>
                </>
              )}
            </span>
            <span className="font-mono text-slate-500">NTA CBT v2026.4</span>
          </div>
        </div>
      )}
    </header>
  );
};
