'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import apiClient from '@/services/apiClient';
import authClient from '@/services/authClient';

type EmailFormData = {
  email: string;
};

type OtpFormData = {
  otp: string;
};

export default function VerifyOtpPage() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [emailSent, setEmailSent] = useState(false);
  const [storedEmail, setStoredEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const emailForm = useForm<EmailFormData>();
  const otpForm = useForm<OtpFormData>();

  // Check authentication on mount
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('JWT');
      if (!token) return;

      try {
        await authClient.post('/auth/jwt/verify/', { token });
        router.push('/');
      } catch (err) {
        localStorage.removeItem('JWT');
      }
    };

    verifyToken();
    setStoredEmail(localStorage.getItem('email'));
  }, [router]);

  const handleSendCode = async (data: EmailFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await apiClient.post('/login-otp/', {
        email: data.email
      });

      if (response.status === 201) {
        localStorage.setItem('email', data.email);
        setEmailSent(true);
        setStoredEmail(data.email);
        alert('Verification code sent to your email');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to send verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (data: OtpFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await apiClient.post('/verify-otp/', {
        email: storedEmail,
        otp: data.otp
      });

      if (response.data.access) {
        localStorage.setItem('JWT', response.data.access);
        alert('Login successful!');
        router.push('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="banner-area organic-breadcrumb">
      <div className="container">
        <div className="breadcrumb-banner flex flex-wrap items-center justify-end">
          <div className="col-first">
            <h1 className="text-danger">Verify Code</h1>
            <nav className="d-flex align-items-center">
              <Link className="text-danger" href="/">
                Home<span className="lnr lnr-arrow-right"></span>
              </Link>
              <Link className="text-danger" href="/login">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <section className="login_box_area section_gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="login_box_img relative">
                <Image
                  src="/img/login.jpg"
                  alt="Login"
                  className="img-fluid"
                  width={600}
                  height={400}
                  priority
                />
                <div className="hover absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
                  <h4>New to our website?</h4>
                  <p>There are advances being made in science and technology everyday...</p>
                  <Link className="primary-btn mt-4" href="/register">
                    Create an Account
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="login_form_inner p-8">
                <h3 className="mb-6 text-2xl font-bold">Verification</h3>
                {error && (
                  <div className="mb-4 rounded bg-red-100 p-2 text-red-600">
                    {error}
                  </div>
                )}

                {!emailSent ? (
                  <form onSubmit={emailForm.handleSubmit(handleSendCode)} className="space-y-4">
                    <div>
                      <input
                        {...emailForm.register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        placeholder="Email"
                        className="w-full rounded border p-2"
                      />
                      {emailForm.formState.errors.email && (
                        <p className="text-red-500">
                          {emailForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="primary-btn w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
                    >
                      {isLoading ? 'Sending...' : 'Send Code'}
                    </button>
                  </form>
                ) : (
                  <>
                    <form onSubmit={otpForm.handleSubmit(handleVerifyOtp)} className="space-y-4">
                      <div>
                        <input
                          {...otpForm.register('otp', {
                            required: 'Verification code is required'
                          })}
                          placeholder="Verification Code"
                          className="w-full rounded border p-2"
                        />
                        {otpForm.formState.errors.otp && (
                          <p className="text-red-500">
                            {otpForm.formState.errors.otp.message}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="primary-btn w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
                      >
                        {isLoading ? 'Verifying...' : 'Verify Code'}
                      </button>
                    </form>
                    <p className="mt-4 text-center">
                      Code sent to: {storedEmail}
                    </p>
                  </>
                )}

                <div className="mt-4 text-center">
                  <Link href="/login" className="text-blue-600 hover:text-blue-800">
                    Login With Password
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
