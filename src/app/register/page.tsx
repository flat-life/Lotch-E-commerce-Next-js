'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import authClient from '@/services/authClient';
import apiClient from '@/services/apiClient';

type FormData = {
  phone_number: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // Verify token on mount
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
  }, [router]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await apiClient.post('/auth/users/', {
        phone_number: data.phone_number,
        email: data.email,
        password: data.password
      });

      if (response.status === 201) {
        localStorage.setItem('email', data.email);
        alert('Your account is active now. Please login!');
        router.push('/login');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="banner-area organic-breadcrumb">
      <div className="container">
        <div className="breadcrumb-banner flex flex-wrap items-center justify-end">
          <div className="col-first">
            <h1 className="text-danger">Register</h1>
            <nav className="d-flex align-items-center">
              <Link className="text-danger" href="/">
                Home<span className="lnr lnr-arrow-right"></span>
              </Link>
              <Link className="text-danger" href="/register">
                Register
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
                />
                <div className="hover absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
                  <h4>Do you have an account?</h4>
                  <p>There are advances being made in science and technology everyday...</p>
                  <Link className="primary-btn mt-4" href="/login">
                    Login
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="login_form_inner p-8">
                <h3 className="mb-6 text-2xl font-bold">Register</h3>
                {error && (
                  <div className="mb-4 rounded bg-red-100 p-2 text-red-600">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <input
                      {...register('phone_number', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^\d{11}$/,
                          message: 'Invalid phone number format (11 digits)'
                        }
                      })}
                      placeholder="Phone Number"
                      className="w-full rounded border p-2"
                    />
                    {errors.phone_number && (
                      <p className="text-red-500">{errors.phone_number.message}</p>
                    )}
                  </div>

                  <div>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      placeholder="Email"
                      className="w-full rounded border p-2"
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="password"
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters'
                        }
                      })}
                      placeholder="Password"
                      className="w-full rounded border p-2"
                    />
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="primary-btn w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {isLoading ? 'Registering...' : 'Register'}
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
