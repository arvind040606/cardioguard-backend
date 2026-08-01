import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Lock, Loader2, ArrowLeft, User, Check, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export function RegisterPage() {
  const { register: registerUser, error, clearError } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'doctor' as 'doctor' | 'patient',
    }
  });

  // Password requirements checklist
  const criteria = {
    length: passwordInput.length >= 8,
    hasUpper: /[A-Z]/.test(passwordInput),
    hasLower: /[a-z]/.test(passwordInput),
    hasNumber: /[0-9]/.test(passwordInput),
    hasSymbol: /[^A-Za-z0-9]/.test(passwordInput),
  };

  const strengthScore = Object.values(criteria).filter(Boolean).length;

  const getStrengthLabel = () => {
    if (passwordInput.length === 0) return { label: '', color: 'bg-slate-200', text: 'text-slate-400' };
    if (strengthScore <= 2) return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-500' };
    if (strengthScore <= 4) return { label: 'Moderate', color: 'bg-amber-500', text: 'text-amber-500' };
    return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-500' };
  };

  const strength = getStrengthLabel();

  const onSubmit = async (data: any) => {
    if (strengthScore < 4) {
      showNotification("Please select a stronger password", "warning");
      return;
    }
    setLoading(true);
    clearError();
    const email = data.email.trim();
    const success = await registerUser(data.name, email, data.password, data.role);
    setLoading(false);

    if (success) {
      showNotification("Registration successful! Welcome to CardioGuard Clinical Predictive Analytics.", "success");
      navigate('/dashboard');
    } else {
      showNotification("Registration failed. Please check the error details.", "error");
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

      <div className="absolute top-1/4 left-1/4 h-72 w-72 bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 bg-cyan-500/10 dark:bg-cyan-600/5 rounded-full blur-3xl -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md my-8"
      >
        <div className="text-center mb-8">
          <div className="inline-flex rounded-2xl bg-blue-600 p-3 text-white shadow-lg shadow-blue-500/20 mb-4 animate-float">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight dark:text-white">Register Account</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Join CardioGuard to access data-driven risk estimation models</p>
        </div>

        <div className="rounded-[28px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl">
          
          {error && (
            <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50/50 dark:bg-rose-950/20 dark:border-rose-900 p-4 text-sm text-rose-700 dark:text-rose-400 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
            
            {/* Full Name */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <User className="h-5 w-5" />
                </span>
                <input
                  type="text"
                  required
                  {...register('name', { required: 'Full name is required' })}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-10 pr-4 py-3.5 outline-none focus:border-blue-500 transition text-sm dark:text-white"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <span className="text-xs text-rose-500 font-semibold mt-1 block">{errors.name.message}</span>
              )}
            </div>

            {/* Email Address */}
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
                      message: 'Invalid email format'
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

            {/* Password */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Lock className="h-5 w-5" />
                </span>
                <input
                  type="password"
                  required
                  {...register('password', { 
                    required: 'Password is required',
                    onChange: (e) => setPasswordInput(e.target.value)
                  })}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-10 pr-4 py-3.5 outline-none focus:border-blue-500 transition text-sm dark:text-white"
                  placeholder="••••••••••••"
                />
              </div>
              
              {/* Password strength meter */}
              {passwordInput.length > 0 && (
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Password Strength:</span>
                    <span className={`font-bold ${strength.text}`}>{strength.label}</span>
                  </div>
                  
                  {/* Strength Bar */}
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex gap-0.5">
                    <div className={`h-full flex-1 transition-all ${strengthScore >= 1 ? strength.color : 'bg-transparent'}`} />
                    <div className={`h-full flex-1 transition-all ${strengthScore >= 3 ? strength.color : 'bg-transparent'}`} />
                    <div className={`h-full flex-1 transition-all ${strengthScore >= 5 ? strength.color : 'bg-transparent'}`} />
                  </div>

                  {/* Requirements checklist */}
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2 text-[10px] text-slate-500">
                    <div className="flex items-center gap-1.5">
                      {criteria.length ? <Check className="h-3 w-3 text-emerald-500" /> : <X className="h-3 w-3 text-slate-300" />}
                      <span>Min 8 characters</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {criteria.hasUpper ? <Check className="h-3 w-3 text-emerald-500" /> : <X className="h-3 w-3 text-slate-300" />}
                      <span>One uppercase letter</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {criteria.hasLower ? <Check className="h-3 w-3 text-emerald-500" /> : <X className="h-3 w-3 text-slate-300" />}
                      <span>One lowercase letter</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {criteria.hasNumber ? <Check className="h-3 w-3 text-emerald-500" /> : <X className="h-3 w-3 text-slate-300" />}
                      <span>One number (0-9)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {criteria.hasSymbol ? <Check className="h-3 w-3 text-emerald-500" /> : <X className="h-3 w-3 text-slate-300" />}
                      <span>One special symbol</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">I am registering as a</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 cursor-pointer hover:border-blue-500 transition has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 dark:has-[:checked]:bg-blue-900/20">
                  <input type="radio" value="doctor" {...register('role')} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded-full" />
                  <span className="text-sm font-semibold dark:text-white">Doctor</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 cursor-pointer hover:border-blue-500 transition has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 dark:has-[:checked]:bg-blue-900/20">
                  <input type="radio" value="patient" {...register('role')} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded-full" />
                  <span className="text-sm font-semibold dark:text-white">Patient</span>
                </label>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex justify-center items-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 px-4 py-3.5 text-sm font-semibold text-white transition disabled:opacity-50 cursor-pointer mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs">
            <span className="text-slate-400">Already registered? </span>
            <Link to="/login" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">Log in here</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
