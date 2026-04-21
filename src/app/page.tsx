import Link from "next/link";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const applications = await prisma.application.findMany({ include: { status: true } });

  const total = applications.length;
  const applied = applications.filter(a => a.status?.label === 'Applied').length;
  const interviewing = applications.filter(a => a.status?.label === 'Interview Scheduled').length;
  const offers = applications.filter(a => a.status?.label === 'Offer Received').length;
  const rejected = applications.filter(a => a.status?.label === 'Rejected').length;
  const withdrawn = applications.filter(a => a.status?.label === 'Withdrawn').length;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
        <Link href="/applications/new" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-all hover:-translate-y-0.5 outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          + Add Application
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-sm font-medium text-slate-500 mb-1">Total Applications</h2>
          <p className="text-3xl font-bold text-slate-900">{total}</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100">
          <h2 className="text-sm font-medium text-blue-800 mb-1">Applied</h2>
          <p className="text-3xl font-bold text-blue-900">{applied}</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-xl shadow-sm border border-purple-100">
          <h2 className="text-sm font-medium text-purple-800 mb-1">Interview Scheduled</h2>
          <p className="text-3xl font-bold text-purple-900">{interviewing}</p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl shadow-sm border border-green-100">
          <h2 className="text-sm font-medium text-green-800 mb-1">Offer Received</h2>
          <p className="text-3xl font-bold text-green-900">{offers}</p>
        </div>
        <div className="bg-red-50 p-6 rounded-xl shadow-sm border border-red-100">
          <h2 className="text-sm font-medium text-red-800 mb-1">Rejected</h2>
          <p className="text-3xl font-bold text-red-900">{rejected}</p>
        </div>
        <div className="bg-slate-100 p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-sm font-medium text-slate-600 mb-1">Withdrawn</h2>
          <p className="text-3xl font-bold text-slate-900">{withdrawn}</p>
        </div>
      </div>
    </div>
  );
}
