"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// Connect to your actual Supabase project
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        // The real connection to Supabase!
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            setMessage(`Error: ${error.message}`);
        } else {
            setMessage('Success! Check your database.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-gray-200">
                <h1 className="text-2xl font-bold mb-2">Create an Account</h1>
                <p className="text-gray-600 mb-6">Sign up to get your 30 Free MCQs.</p>

                {message && (
                    <div className={`p-4 mb-6 rounded-lg text-sm ${message.includes('Error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
                    >
                        {loading ? "Creating account..." : "Sign Up"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
}
