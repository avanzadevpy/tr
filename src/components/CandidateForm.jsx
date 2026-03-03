import React, { useState, useEffect } from 'react';
import { postular, getVacantes } from '../services/api';
import { Send, User, Mail, Phone, Link as LinkIcon, Briefcase } from 'lucide-react';

const CandidateForm = () => {
    const [vacantes, setVacantes] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        cv_url: '',
        vacante_id: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchVacantes();
    }, []);

    const fetchVacantes = async () => {
        try {
            const data = await getVacantes();
            setVacantes(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            await postular(formData);
            setStatus({ type: 'success', message: '¡Postulación enviada con éxito! Mucha suerte.' });
            setFormData({ nombre: '', email: '', telefono: '', cv_url: '', vacante_id: '' });
        } catch (error) {
            if (error.status === 409) {
                setStatus({ type: 'error', message: 'Ya estás participando en este proceso.' });
            } else {
                setStatus({ type: 'error', message: 'Hubo un error al procesar tu solicitud. Intenta más tarde.' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-8 glass rounded-2xl my-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Briefcase className="text-primary" />
                Únete a nosotros
            </h2>
            <p className="text-slate-600 mb-8">Completa el formulario para postularte a una de nuestras vacantes abiertas.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                    <User className="absolute left-3 top-3 text-slate-400 size-5" />
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre completo"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="relative">
                    <Mail className="absolute left-3 top-3 text-slate-400 size-5" />
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                        <Phone className="absolute left-3 top-3 text-slate-400 size-5" />
                        <input
                            type="text"
                            name="telefono"
                            placeholder="Teléfono"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            value={formData.telefono}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="relative">
                        <LinkIcon className="absolute left-3 top-3 text-slate-400 size-5" />
                        <input
                            type="url"
                            name="cv_url"
                            placeholder="Link a tu CV (PDF/Drive)"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            value={formData.cv_url}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="relative">
                    <Briefcase className="absolute left-3 top-3 text-slate-400 size-5" />
                    <select
                        name="vacante_id"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none bg-white"
                        value={formData.vacante_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona una vacante</option>
                        {vacantes.map(v => (
                            <option key={v.id} value={v.id}>{v.titulo}</option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all-custom shadow-lg disabled:opacity-50"
                >
                    {loading ? "Enviando..." : (
                        <>
                            Postularme <Send className="size-5" />
                        </>
                    )}
                </button>

                {status.message && (
                    <div className={`p-4 rounded-xl text-center font-medium ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                        {status.message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default CandidateForm;
