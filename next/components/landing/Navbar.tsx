"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    const isProductPage = pathname === '/product';

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isProductPage
            ? "bg-[#0A0A0A]/80 border-white/10 backdrop-blur-md"
            : "glass border-gray-100"
            }`}>
            <div className="container mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">I</span>
                    </div>
                    <span className={`text-xl font-bold tracking-tight transition-colors ${isProductPage ? "text-white" : "text-gray-900"
                        }`}>
                        IncidentFlow
                    </span>
                </Link>

                <div className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors ${isProductPage ? "text-gray-300" : "text-gray-600"
                    }`}>
                    <Link href="/product" className="hover:text-primary transition-colors">Product</Link>
                    <a href="#" className="hover:text-primary transition-colors">Solutions</a>
                    <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
                    <Link href="/docs" className="hover:text-primary transition-colors">Documentation</Link>
                </div>

                <div className="flex items-center gap-4">
                    <SignedOut>
                        <Link
                            href="/sign-in"
                            className={`hidden sm:block text-sm font-semibold hover:text-primary transition-colors ${isProductPage ? "text-gray-300" : "text-gray-700"
                                }`}
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
                            className={`font-medium transition-colors ${isProductPage ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                                }`}
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
