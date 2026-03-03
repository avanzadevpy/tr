import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Mail, Phone, ExternalLink, History } from 'lucide-react';

const CandidateCard = ({ id, candidato }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: id,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md cursor-grab active:cursor-grabbing transition-all-custom"
        >
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-slate-800">{candidato.candidato_nombre}</h4>
                <div className="bg-slate-100 p-1 px-2 rounded text-[10px] font-semibold text-slate-500 uppercase">
                    {candidato.vacante_titulo}
                </div>
            </div>

            <div className="space-y-1 text-sm text-slate-500 mb-4">
                <div className="flex items-center gap-2">
                    <Mail size={14} /> <span>{candidato.candidato_email}</span>
                </div>
                {candidato.telefono && (
                    <div className="flex items-center gap-2">
                        <Phone size={14} /> <span>{candidato.telefono}</span>
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center border-t pt-3 mt-3">
                <a
                    href={candidato.cv_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-primary hover:underline"
                    onClick={(e) => e.stopPropagation()}
                >
                    Ver CV <ExternalLink size={12} />
                </a>
                <button
                    className="p-1 px-2 text-xs flex items-center gap-1 hover:bg-slate-50 rounded text-slate-400"
                    onClick={(e) => {
                        e.stopPropagation();
                        alert("Funcionalidad de Bitácora para: " + candidato.candidato_nombre);
                    }}
                >
                    <History size={12} /> Bitácora
                </button>
            </div>
        </div>
    );
};

export default CandidateCard;
