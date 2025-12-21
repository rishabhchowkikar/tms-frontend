'use client'

import React, { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, LogIn, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

// new imports
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from "@/store/store"
import { login } from "@/store/authSlice"
import { useRouter } from 'next/navigation'

const LoginPage = () => {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    // const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    // hooks
    const dispatch = useDispatch<AppDispatch>();
    const { error, isLoading } = useSelector((state: RootState) => state.auth)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Basic validation
        if (!formData.email || !formData.password) {
            toast.error('Missing fields', {
                description: 'Please enter both identifier and password',
            })
            return
        }


        try {
            await dispatch(
                login({
                    identifier: formData.email.trim(),  // This matches your backend "identifier"
                    password: formData.password,
                })
            ).unwrap()  // This throws if login fails

            // Success!
            toast.success('Login successful!', {
                description: 'Welcome back! Redirecting to dashboard...',
                duration: 3000,
            })

            // Redirect to dashboard
            router.push('/dashboard')  // Change to your actual dashboard route
        } catch (err) {
            // Error is already set in Redux state via rejected case
            toast.error('Login failed', {
                description: error || 'Invalid credentials. Please try again.',
                duration: 5000,
            })
        }
    }

    const handleForgotPassword = () => {
        if (!formData.email) {
            toast.error('Email required', {
                description: 'Please enter your email address first',
                duration: 3000,
            })
            return
        }

        toast.success('Password reset link sent', {
            description: `Check your inbox at ${formData.email}`,
            duration: 4000,
        })
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-background p-4 dark">
                <div className="w-full max-w-md space-y-8">
                    {/* Header Section */}
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                            <LogIn className="w-7 h-7 text-primary" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Welcome Back
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            Sign in to continue to your account
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="card bg-card border border-border shadow-lg rounded-xl">
                        <div className="card-body p-8 space-y-6">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Email/Adminname Input */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-foreground"
                                    >
                                        Email/AdminName
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <Mail className="w-4 h-4 text-muted-foreground" />
                                        </div>
                                        <Input
                                            id="email"
                                            type="text"
                                            name="email"
                                            placeholder="Email/AdminName"
                                            className="pl-10 h-11 text-gray-300"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-foreground"
                                    >
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <Lock className="w-4 h-4 text-muted-foreground" />
                                        </div>
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Enter your password"
                                            className="pl-10 pr-10 h-11 text-gray-200"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                            onClick={togglePasswordVisibility}
                                            disabled={isLoading}
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between pt-2">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                            disabled={isLoading}
                                        />
                                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                            Remember me
                                        </span>
                                    </label>
                                    <Button
                                        type="button"
                                        variant="link"
                                        size="sm"
                                        onClick={handleForgotPassword}
                                        disabled={isLoading}
                                        className="text-sm h-auto p-0 font-medium"
                                    >
                                        Forgot password?
                                    </Button>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full h-11 gap-2"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            Sign in
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage