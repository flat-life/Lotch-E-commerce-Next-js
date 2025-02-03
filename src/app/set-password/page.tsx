'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import authClient from '@/services/authClient';

type FormData = {
  current_password: string;
  new_password: string;
};

export default function SetPasswordPage() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  // Verify token on mount
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('JWT');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        await authClient.post('/auth/jwt/verify/', { token });
      } catch (err) {
        localStorage.removeItem('JWT');
        router.push('/login');
      }
    };

    verifyToken();
  }, [router]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await authClient.post('/auth/users/set_password/', {
        current_password: data.current_password,
        new_password: data.new_password
      });

      if (response.status === 204) {
        alert('Password changed successfully!');
        router.push('/profile');
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Password change failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="banner-area organic-breadcrumb">
      <div className="container">
        <div className="breadcrumb-banner flex flex-wrap items-center justify-end">
          <div className="col-first">
            <h1 className="text-danger">Set New Password</h1>
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
                <h3 className="mb-6 text-2xl font-bold">Set New Password</h3>
                {error && (
                  <div className="mb-4 rounded bg-red-100 p-2 text-red-600">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <input
                      type="password"
                      {...register('current_password', {
                        required: 'Current password is required'
                      })}
                      placeholder="Current Password"
                      className="w-full rounded border p-2"
                    />
                    {errors.current_password && (
                      <p className="text-red-500">{errors.current_password.message}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="password"
                      {...register('new_password', {
                        required: 'New password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters'
                        }
                      })}
                      placeholder="New Password"
                      className="w-full rounded border p-2"
                    />
                    {errors.new_password && (
                      <p className="text-red-500">{errors.new_password.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="primary-btn w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {isLoading ? 'Updating...' : 'Set Password'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
