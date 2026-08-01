import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Lock, Loader2, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export function LoginPage() {
  const { login, error, clearError } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    clearError();
    const email = data.email.trim();
    const success = await login(email, data.password, data.rememberMe);
    setLoading(false);
    
    if (success) {
      showNotification("Welcome back to CardioGuard Clinical Predictive Analytics", "success");
      navigate('/dashboard');
    } else {
      showNotification("Invalid credentials, please try again", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#090d16] px-4 py-12 relative overflow-hidden select-none">
      
      {/* Back to Home Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 h-72 w-72 bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 bg-cyan-500/10 dark:bg-cyan-600/5 rounded-full blur-3xl -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex rounded-2xl bg-blue-600 p-3 text-white shadow-lg shadow-blue-500/20 mb-4 animate-float">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight dark:text-white">User Login</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Access your CardioGuard health dashboard</p>
        </div>

        <div className="rounded-[28px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl">
          
          {error && (
            <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50/50 dark:bg-rose-950/20 dark:border-rose-900 p-4 text-sm text-rose-700 dark:text-rose-400 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
            
            {/* Email Input */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Mail className="h-5 w-5" />
                </span>
                <input
                  type="email"
                  required
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address format'
                    }
                  })}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-10 pr-4 py-3.5 outline-none focus:border-blue-500 transition text-sm dark:text-white"
                  placeholder="john.doe@example.com"
                />
              </div>
              {errors.email && (
                <span className="text-xs text-rose-500 font-semibold mt-1 block">{errors.email.message}</span>
              )}
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Password</label>
                <Link to="/forgot-password" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Lock className="h-5 w-5" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  {...register('password', { required: 'Password is required' })}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-10 pr-10 py-3.5 outline-none focus:border-blue-500 transition text-sm dark:text-white"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <label className="relative flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('rememberMe')}
                  className="rounded-lg border-slate-300 dark:border-slate-800 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Remember session for 7 days</span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex justify-center items-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 px-4 py-3.5 text-sm font-semibold text-white transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs">
            <span className="text-slate-400">New user? </span>
            <Link to="/register" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">Register account</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
