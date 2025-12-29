"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-100">
            <div className="container mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">I</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900">IncidentFlow</span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                    <a href="#" className="hover:text-primary transition-colors">Product</a>
                    <a href="#" className="hover:text-primary transition-colors">Solutions</a>
                    <a href="#" className="hover:text-primary transition-colors">Pricing</a>
                    <Link href="/docs" className="hover:text-primary transition-colors">Documentation</Link>
                </div>

                <div className="flex items-center gap-4">
                    <SignedOut>
                        <Link
                            href="/sign-in"
                            className="hidden sm:block text-sm font-semibold text-gray-700 hover:text-primary transition-colors"
                        >
                            Log in
                        </Link>
                        <Link
                            href="/sign-up"
                            className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-opacity-90 transition-all"
                        >
                            Get Started
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <Link
                            href="/dashboard"
                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                        >
                            Dashboard
                        </Link>
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10"
                                }
                            }}
                        />
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
}
