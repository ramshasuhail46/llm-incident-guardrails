"use client";

import { useUser } from "@clerk/nextjs";

export default function UserProfile() {
    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!isSignedIn) {
        return <div>Please sign in</div>;
    }

    return (
        <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-bold mb-2">User Profile</h2>
            <div className="space-y-2">
                <p>
                    <strong>Name:</strong> {user.fullName}
                </p>
                <p>
                    <strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}
                </p>
                <p>
                    <strong>User ID:</strong> {user.id}
                </p>
                {user.imageUrl && (
                    <img
                        src={user.imageUrl}
                        alt={user.fullName || "User"}
                        className="w-16 h-16 rounded-full"
                    />
                )}
            </div>
        </div>
    );
}
