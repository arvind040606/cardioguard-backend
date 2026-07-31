import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Loader2, ArrowLeft, CheckCircle, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const { showNotification } = useNotification();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    const result = await requestPasswordReset(email);
    setLoading(false);

    if (result.success) {
      setSubmitted(true);
      setMessage(result.message);
    } else {
      showNotification(result.message, 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#090d16] px-4 py-12 relative">
      <Link to="/login" className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white transition">
        <ArrowLeft className="h-4 w-4" />
        Back to Login
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex rounded-2xl bg-blue-600 p-3 text-white shadow-lg mb-4">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight dark:text-white">Recover Password</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">We will send a secure reset link to your email</p>
        </div>

        <div className="rounded-[28px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Registered Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3.5 outline-none focus:border-blue-500 transition text-sm dark:text-white"
                  placeholder="your.email@hospital.org"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex justify-center items-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 px-4 py-3.5 text-sm font-semibold text-white transition disabled:opacity-50"
              >
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : 'Send Reset Link'}
              </button>
            </form>
          ) : (
            <div className="space-y-6 text-center">
              <div className="inline-flex rounded-full bg-emerald-50 dark:bg-emerald-950/20 p-3 text-emerald-500">
                <CheckCircle className="h-10 w-10" />
              </div>
              <div>
                <h3 className="font-bold text-lg dark:text-white">Check Your Email</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2">{message}</p>
              </div>
              <Link to="/login" className="w-full inline-flex justify-center rounded-2xl bg-blue-600 hover:bg-blue-700 px-4 py-3.5 text-sm font-semibold text-white transition">
                Return to Sign In
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const { resetPassword } = useAuth();
  const { showNotification } = useNotification();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showNotification('Passwords do not match.', 'error');
      return;
    }
    if (password.length < 8) {
      showNotification('Password must be at least 8 characters.', 'error');
      return;
    }

    setLoading(true);
    const result = await resetPassword(token, password);
    setLoading(false);

    if (result.success) {
      setSuccess(true);
    } else {
      showNotification(result.message, 'error');
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#090d16] px-4">
        <div className="text-center space-y-4">
          <p className="text-sm text-slate-500">Invalid or missing reset token.</p>
          <Link to="/forgot-password" className="text-blue-600 font-semibold text-sm hover:underline">Request a new reset link</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#090d16] px-4 py-12 relative">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex rounded-2xl bg-blue-600 p-3 text-white shadow-lg mb-4">
            <Lock className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight dark:text-white">Set New Password</h2>
        </div>

        <div className="rounded-[28px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl">
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">New Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3.5 outline-none focus:border-blue-500 transition text-sm dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Confirm Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3.5 outline-none focus:border-blue-500 transition text-sm dark:text-white"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex justify-center items-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 px-4 py-3.5 text-sm font-semibold text-white transition disabled:opacity-50"
              >
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Resetting...</> : 'Reset Password'}
              </button>
            </form>
          ) : (
            <div className="space-y-6 text-center">
              <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto" />
              <p className="text-sm text-slate-500">Your password has been reset successfully.</p>
              <Link to="/login" className="w-full inline-flex justify-center rounded-2xl bg-blue-600 hover:bg-blue-700 px-4 py-3.5 text-sm font-semibold text-white transition">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
