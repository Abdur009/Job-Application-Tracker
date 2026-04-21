"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditApplicationPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        company: "",
        role: "",
        dateApplied: "",
        status: "",
        source: "",
        notes: "",
    });

    useEffect(() => {
        async function fetchApp() {
            try {
                const res = await fetch(`/api/applications/${id}`);
                if (!res.ok) throw new Error("Failed to load application data");
                const data = await res.json();

                setFormData({
                    company: data.company || "",
                    role: data.role || "",
                    dateApplied: new Date(data.dateApplied).toISOString().split("T")[0],
                    status: data.status || "Applied",
                    source: data.source || "",
                    notes: data.notes || "",
                });
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchApp();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError("");

        try {
            const res = await fetch(`/api/applications/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to update application.");

            router.push("/applications");
            router.refresh();
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this application? This action cannot be undone.")) return;

        setSaving(true);
        try {
            const res = await fetch(`/api/applications/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete application.");
            router.push("/applications");
            router.refresh();
        } catch (err: any) {
            setError(err.message);
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Edit Application</h1>
                <button
                    onClick={handleDelete}
                    className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors"
                >
                    Delete Application
                </button>
            </div>

            {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100 text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Company Name *</label>
                    <input required type="text" name="company" value={formData.company} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Role / Position *</label>
                    <input required type="text" name="role" value={formData.role} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Date Applied *</label>
                        <input required type="date" name="dateApplied" value={formData.dateApplied} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow bg-white">
                            <option value="Applied">Applied</option>
                            <option value="Interview Scheduled">Interview Scheduled</option>
                            <option value="Offer Received">Offer Received</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Withdrawn">Withdrawn</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Source</label>
                    <input type="text" name="source" value={formData.source} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                    <textarea name="notes" rows={4} value={formData.notes} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow" />
                </div>

                <div className="flex justify-end space-x-4 pt-4 border-t border-slate-100">
                    <Link href="/applications" className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors focus:ring-2 focus:ring-slate-200 outline-none">
                        Cancel
                    </Link>
                    <button type="submit" disabled={saving} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 disabled:opacity-70 transition-all hover:-translate-y-0.5 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 outline-none">
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}
