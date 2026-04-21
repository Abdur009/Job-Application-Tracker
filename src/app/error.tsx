"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="bg-red-50 text-red-900 border border-red-200 rounded-xl p-8 max-w-lg mx-auto mt-12 text-center shadow-sm">
            <h2 className="text-2xl font-bold mb-4 tracking-tight">Something went wrong!</h2>
            <p className="mb-6 text-sm text-red-700">{error.message || "An unexpected error occurred while loading this page."}</p>
            <button
                onClick={() => reset()}
                className="bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition shadow-sm hover:-translate-y-0.5 outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
                Try again
            </button>
        </div>
    );
}
