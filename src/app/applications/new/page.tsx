"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewApplicationPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [statuses, setStatuses] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        company: "",
        role: "",
        dateApplied: new Date().toISOString().split("T")[0],
        statusId: "",
        source: "",
        notes: "",
    });

    useEffect(() => {
        fetch('/api/statuses')
            .then(res => res.json())
            .then(data => {
                setStatuses(data);
                if (data.length > 0) {
                    setFormData(prev => ({ ...prev, statusId: data[0].id }));
                }
            })
            .catch(console.error);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/applications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to create application.");

            router.push("/applications");
            router.refresh();
        } catch (err) {
            const errorObj = err as Error;
            setError(errorObj.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg shadow-slate-200/60 border border-slate-200">
            <h1 className="text-2xl font-bold text-slate-900 mb-1 tracking-tight">Add Application</h1>
            <p className="text-sm text-slate-500 mb-6">Track a new job application in your pipeline.</p>

            {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100 text-sm flex items-center gap-2">⚠️ {error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Company Name *</label>
                    <input required type="text" name="company" value={formData.company} onChange={handleChange} className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg shadow-sm hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="e.g. Google" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Role / Position *</label>
                    <input required type="text" name="role" value={formData.role} onChange={handleChange} className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg shadow-sm hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="e.g. Frontend Developer" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Date Applied *</label>
                        <input required type="date" name="dateApplied" value={formData.dateApplied} onChange={handleChange} className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg shadow-sm hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
                        <select name="statusId" value={formData.statusId} onChange={handleChange} className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg shadow-sm hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white">
                            {statuses.map(s => (
                                <option key={s.id} value={s.id}>{s.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Source</label>
                    <input type="text" name="source" value={formData.source} onChange={handleChange} className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg shadow-sm hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="e.g. LinkedIn, Indeed, Referral" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Notes</label>
                    <textarea name="notes" rows={4} value={formData.notes} onChange={handleChange} className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg shadow-sm hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none" placeholder="Any details..." />
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-slate-100">
                    <Link href="/applications" className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors focus:ring-2 focus:ring-slate-200 outline-none">
                        Cancel
                    </Link>
                    <button type="submit" disabled={loading} className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 border border-transparent rounded-lg shadow-md shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-70 disabled:hover:translate-y-0 transition-all hover:-translate-y-0.5 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 outline-none">
                        {loading ? "Saving..." : "Save Application"}
                    </button>
                </div>
            </form>
        </div>
    );
}
