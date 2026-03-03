import React, { useState } from 'react'
import CandidateForm from './components/CandidateForm'
import KanbanBoard from './components/KanbanBoard'
import Dashboard from './components/Dashboard'
import { LayoutDashboard, UserPlus, Zap, PieChart } from 'lucide-react'

function App() {
    const [view, setView] = useState('kanban'); // 'kanban' or 'form'

    return (
        <div className="min-h-screen">
            {/* Header / Navigation */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/6155e61f9a5b713379ce6ebd/e6605929-0819-4203-b359-9061d614e02d/favicon.png"
                            alt="Mini-ATS Logo"
                            className="size-10 object-contain"
                        />
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                            Okara-<span className="text-primary">ATS</span>
                        </h1>
                    </div>

                    <nav className="flex gap-2">
                        <button
                            onClick={() => setView('dashboard')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${view === 'dashboard'
                                ? 'bg-blue-50 text-primary shadow-sm'
                                : 'text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            <PieChart size={18} />
                            Dashboard
                        </button>
                        <button
                            onClick={() => setView('kanban')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${view === 'kanban'
                                ? 'bg-blue-50 text-primary shadow-sm'
                                : 'text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            <LayoutDashboard size={18} />
                            Tablero
                        </button>
                        <button
                            onClick={() => setView('form')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${view === 'form'
                                ? 'bg-blue-50 text-primary shadow-sm'
                                : 'text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            <UserPlus size={18} />
                            Portal
                        </button>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto">
                <div className="py-8">
                    {view === 'dashboard' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Dashboard />
                        </div>
                    )}
                    {view === 'kanban' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <KanbanBoard />
                        </div>
                    )}
                    {view === 'form' && (
                        <div className="animate-in fade-in zoom-in-95 duration-500">
                            <CandidateForm />
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-20 py-10 border-t border-slate-200 text-center text-slate-400 text-sm">
                <p>&copy; 2026 Okara ATS | JJ. Código funcional y escalable.</p>
            </footer>
        </div>
    )
}

export default App
