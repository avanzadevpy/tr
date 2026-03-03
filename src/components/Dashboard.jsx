import React, { useState, useEffect } from 'react';
import { getDashboard } from '../services/api';
import { Users, Clock, TrendingUp, UserCheck, UserX, MessageCircle, Mail } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const data = await getDashboard();
            setStats(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center p-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    const stages = [
        { label: 'Nuevo', key: 'nuevo', icon: <Mail className="text-blue-500" />, color: 'bg-blue-50' },
        { label: 'Entrevista', key: 'entrevista_tecnica', icon: <MessageCircle className="text-purple-500" />, color: 'bg-purple-50' },
        { label: 'Oferta', key: 'oferta', icon: <TrendingUp className="text-orange-500" />, color: 'bg-orange-50' },
        { label: 'Contratado', key: 'contratado', icon: <UserCheck className="text-green-500" />, color: 'bg-green-50' },
        { label: 'Rechazado', key: 'rechazado', icon: <UserX className="text-red-500" />, color: 'bg-red-50' },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
            <header>
                <h2 className="text-3xl font-bold text-slate-800">Panel de Control General</h2>
                <p className="text-slate-500">Métricas clave y rendimiento del proceso de selección.</p>
            </header>

            {/* Top Summaries */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass p-6 rounded-3xl flex items-center gap-5">
                    <div className="bg-primary/10 p-4 rounded-2xl">
                        <Users className="text-primary size-8" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-500">Total Postulaciones</p>
                        <h4 className="text-3xl font-black text-slate-800">{stats?.total || 0}</h4>
                    </div>
                </div>

                <div className="glass p-6 rounded-3xl flex items-center gap-5">
                    <div className="bg-green-100 p-4 rounded-2xl">
                        <UserCheck className="text-green-600 size-8" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-500">Contratados</p>
                        <h4 className="text-3xl font-black text-slate-800">{stats?.counts['contratado'] || 0}</h4>
                    </div>
                </div>

                <div className="glass p-6 rounded-3xl flex items-center gap-5">
                    <div className="bg-slate-100 p-4 rounded-2xl">
                        <Clock className="text-slate-600 size-8" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-500">Eficiencia Promedio</p>
                        <h4 className="text-2xl font-black text-slate-800">
                            {Math.round(Object.values(stats?.avg_times || {}).reduce((a, b) => a + b, 0))} hrs
                        </h4>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Candidates per Stage */}
                <div className="glass p-8 rounded-3xl">
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <TrendingUp size={20} className="text-primary" />
                        Candidatos por Etapa
                    </h3>
                    <div className="space-y-4">
                        {stages.map(stage => {
                            const count = stats?.counts[stage.key] || 0;
                            const percentage = stats?.total > 0 ? (count / stats.total) * 100 : 0;
                            return (
                                <div key={stage.key} className="space-y-2">
                                    <div className="flex justify-between text-sm font-semibold">
                                        <span className="text-slate-600 flex items-center gap-2">
                                            {stage.icon} {stage.label}
                                        </span>
                                        <span className="text-slate-800">{count}</span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-1000 ease-out ${stage.key === 'rechazado' ? 'bg-red-400' : 'bg-primary'}`}
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Average Time per Stage */}
                <div className="glass p-8 rounded-3xl">
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Clock size={20} className="text-primary" />
                        Tiempo Promedio en Etapa (Horas)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {stages.filter(s => stats?.avg_times[s.key] !== undefined).map(stage => (
                            <div key={stage.key} className={`${stage.color} p-5 rounded-2xl border border-white/50`}>
                                <div className="flex items-center gap-3 mb-2">
                                    {stage.icon}
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stage.label}</span>
                                </div>
                                <h4 className="text-2xl font-black text-slate-800">
                                    {stats?.avg_times[stage.key] || 0} <span className="text-sm font-normal text-slate-500">hrs</span>
                                </h4>
                            </div>
                        ))}
                    </div>
                    <p className="mt-6 text-xs text-slate-400 italic">
                        * El tiempo se calcula desde que el candidato ingresa a la etapa hasta que es movido a la siguiente.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
