import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                JobTracker
                            </Link>
                        </div>
                        <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                            <Link
                                href="/applications"
                                className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                            >
                                Applications
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Link
                            href="/applications/new"
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
                        >
                            + Add New
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
