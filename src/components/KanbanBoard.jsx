import React, { useState, useEffect } from 'react';
import { DndContext, closestCorners, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core';
import { getTablero, actualizarEstado } from '../services/api';
import CandidateCard from './CandidateCard';
import { LayoutGrid, RefreshCw, CheckCircle2, UserCircle, MessageSquare, Handshake, XCircle } from 'lucide-react';

const COLUMNS = [
    { id: 'nuevo', title: 'Nuevo', icon: <UserCircle className="text-blue-500" /> },
    { id: 'entrevista_tecnica', title: 'Entrevista', icon: <MessageSquare className="text-purple-500" /> },
    { id: 'oferta', title: 'Oferta', icon: <Handshake className="text-orange-500" /> },
    { id: 'contratado', title: 'Contratado', icon: <CheckCircle2 className="text-green-500" /> },
    { id: 'rechazado', title: 'Rechazado', icon: <XCircle className="text-red-500" /> }
];

const KanbanBoard = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [activeId, setActiveId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const tablero = await getTablero();
            setData(tablero);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (!over) {
            setActiveId(null);
            return;
        }

        const sourceId = active.id;
        const targetColumnId = over.id;

        // Buscar a qué columna pertenece el ID activo
        let sourceColumnId = null;
        let candidate = null;

        Object.keys(data).forEach(colId => {
            const found = data[colId].find(c => c.id === sourceId);
            if (found) {
                sourceColumnId = colId;
                candidate = found;
            }
        });

        if (sourceColumnId && sourceColumnId !== targetColumnId) {
            // Actualización optimista en la UI
            const newData = { ...data };
            newData[sourceColumnId] = newData[sourceColumnId].filter(c => c.id !== sourceId);
            newData[targetColumnId] = [...(newData[targetColumnId] || []), { ...candidate, estado: targetColumnId }];
            setData(newData);

            try {
                await actualizarEstado(sourceId, targetColumnId);
            } catch (error) {
                console.error("Error al actualizar estado en el servidor", error);
                fetchData(); // Revertir si hay error
            }
        }

        setActiveId(null);
    };

    if (loading) return (
        <div className="flex items-center justify-center p-20">
            <RefreshCw className="animate-spin text-primary size-10" />
        </div>
    );

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
                        <LayoutGrid className="text-primary" />
                        Tablero de Selección
                    </h2>
                    <p className="text-slate-500">Mueve a los candidatos a través de las diferentes etapas del proceso.</p>
                </div>
                <button
                    onClick={fetchData}
                    className="p-2 bg-white rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50"
                >
                    <RefreshCw size={20} className="text-slate-600" />
                </button>
            </div>

            <DndContext
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="flex gap-6 overflow-x-auto pb-10 min-h-[70vh]">
                    {COLUMNS.map((col) => (
                        <div
                            key={col.id}
                            id={col.id}
                            className="kanban-column"
                        >
                            <div className="flex items-center justify-between mb-4 px-2">
                                <div className="flex items-center gap-2 font-bold text-slate-700">
                                    {col.icon}
                                    {col.title}
                                </div>
                                <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs">
                                    {(data[col.id] || []).length}
                                </span>
                            </div>

                            <DroppableZone id={col.id}>
                                <div className="space-y-4">
                                    {(data[col.id] || []).map((candidate) => (
                                        <CandidateCard
                                            key={candidate.id}
                                            id={candidate.id}
                                            candidato={candidate}
                                        />
                                    ))}
                                </div>
                            </DroppableZone>
                        </div>
                    ))}
                </div>
            </DndContext>
        </div>
    );
};

const DroppableZone = ({ id, children }) => {
    const { setNodeRef, isOver } = useDraggable({ id }); // We are using useDraggable as a simple way to get refs if needed, but for columns we just need ID
    // Actually for DnD-Kit Droppable, we need useDroppable
    return (
        <div ref={setNodeRef} className={`flex-1 rounded-lg transition-colors ${
            // In dnd-kit core, we use useDroppable for zones
            ''
            }`}>
            {children}
        </div>
    );
};

// Fixed DroppableZone to use correct hook
import { useDroppable } from '@dnd-kit/core';

const DroppableColumn = ({ id, children }) => {
    const { setNodeRef, isOver } = useDroppable({ id });
    return (
        <div
            ref={setNodeRef}
            className={`flex-1 rounded-lg transition-colors ${isOver ? 'bg-slate-200/50 outline-2 outline-dashed outline-primary/30' : ''}`}
        >
            {children}
            {(children.props.children.length === 0) && (
                <div className="h-20 flex items-center justify-center text-slate-400 text-xs italic">
                    Sin candidatos
                </div>
            )}
        </div>
    );
};

// Re-writing the main component with the fixed sub-component inline for clarity
const KanbanBoardRefined = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [activeId, setActiveId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const tablero = await getTablero();
            setData(tablero);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (!over) {
            setActiveId(null);
            return;
        }

        const sourceId = active.id;
        const targetColumnId = over.id;

        let sourceColumnId = null;
        let candidate = null;

        Object.keys(data).forEach(colId => {
            const found = data[colId].find(c => c.id === sourceId);
            if (found) {
                sourceColumnId = colId;
                candidate = found;
            }
        });

        if (sourceColumnId && sourceColumnId !== targetColumnId) {
            const newData = { ...data };
            newData[sourceColumnId] = newData[sourceColumnId].filter(c => c.id !== sourceId);
            newData[targetColumnId] = [...(newData[targetColumnId] || []), { ...candidate, estado: targetColumnId }];
            setData(newData);

            try {
                await actualizarEstado(sourceId, targetColumnId);
            } catch (error) {
                console.error("Error al actualizar estado", error);
                fetchData();
            }
        }

        setActiveId(null);
    };

    if (loading) return (
        <div className="flex items-center justify-center p-20">
            <RefreshCw className="animate-spin text-primary size-10" />
        </div>
    );

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
                        <LayoutGrid className="text-primary" />
                        Tablero de Selección
                    </h2>
                </div>
                <button onClick={fetchData} className="p-2 bg-white rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50">
                    <RefreshCw size={20} className="text-slate-600" />
                </button>
            </div>

            <DndContext
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="flex gap-6 overflow-x-auto pb-10 min-h-[70vh]">
                    {COLUMNS.map((col) => (
                        <div key={col.id} className="kanban-column">
                            <div className="flex items-center justify-between mb-4 px-2">
                                <div className="flex items-center gap-2 font-bold text-slate-700">
                                    {col.icon}
                                    {col.title}
                                </div>
                                <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs">
                                    {(data[col.id] || []).length}
                                </span>
                            </div>

                            <DroppableColumn id={col.id}>
                                <div className="space-y-4 min-h-[100px]">
                                    {(data[col.id] || []).map((candidate) => (
                                        <CandidateCard
                                            key={candidate.id}
                                            id={candidate.id}
                                            candidato={candidate}
                                        />
                                    ))}
                                </div>
                            </DroppableColumn>
                        </div>
                    ))}
                </div>
            </DndContext>
        </div>
    );
};

export default KanbanBoardRefined;
