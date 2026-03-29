import { useState } from 'react';
import { useFirebaseCollection } from '../../hooks/useFirebaseCollection';

export default function MenuCategoryManager() {
    const { data: rawCategories, loading, addItem: addCategory, updateItem: updateCategory, deleteItem: deleteCategory } = useFirebaseCollection('menu_categories', null);
    
    // Sort locally to avoid Firebase dropping documents that lack the 'order' field
    const categories = [...rawCategories].sort((a, b) => {
        const orderA = a.order !== undefined ? a.order : 999;
        const orderB = b.order !== undefined ? b.order : 999;
        if (orderA === orderB) return (a.name || '').localeCompare(b.name || '');
        return orderA - orderB;
    });
    const [newCat, setNewCat] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [dragOverIndex, setDragOverIndex] = useState(null);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newCat.trim()) return;
        const res = await addCategory({
            name: newCat.trim(),
            isVisible: true,
            order: categories.length
        });
        if (res.success) setNewCat('');
        else alert("Error al guardar categoría en el menú. Revisa reglas de Firebase.");
    };

    const handleEditSave = async (id) => {
        if (!editValue.trim()) return;
        const res = await updateCategory(id, { name: editValue.trim() });
        if (res.success) setEditingId(null);
        else alert("Error al actualizar categoría del menú.");
    };

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDragEnter = (index) => {
        setDragOverIndex(index);
    };

    const handleDragEnd = async () => {
        if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
            const newCategories = [...categories];
            const draggedItem = newCategories[draggedIndex];
            
            newCategories.splice(draggedIndex, 1);
            newCategories.splice(dragOverIndex, 0, draggedItem);

            try {
                const results = await Promise.all(
                    newCategories.map((cat, i) => updateCategory(cat.id, { order: i }))
                );
                const failed = results.some(r => !r.success);
                if (failed) alert("Error al guardar el nuevo orden. Recarga e inténtalo de nuevo.");
            } catch {
                alert("Error inesperado al reordenar. Revisa tu conexión.");
            }
        }
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleToggleVisibility = async (cat) => {
        const newValue = cat.isVisible !== false ? false : true;
        const res = await updateCategory(cat.id, { isVisible: newValue });
        if (!res.success) alert("Error al cambiar la visibilidad de la categoría. Revisa las reglas de Firebase.");
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Seguro que quieres borrar esta categoría del sistema? Ten en cuenta que si algún producto de la carta la usaba, tendrás que actualizarlo o no se agrupará bien en la página pública.")) {
            await deleteCategory(id);
        }
    };

    if (loading) return <div className="p-10 text-center"><div className="w-8 h-8 border-4 border-chocolate/20 border-t-chocolate rounded-full animate-spin mx-auto"></div></div>;

    return (
        <div className="bg-white rounded-custom p-8 border border-chocolate/5 shadow-sm mt-12 mb-12">
            <div className="mb-6 border-b border-chocolate/10 pb-4">
                <h2 className="text-2xl font-serif font-bold text-chocolate mb-1">Gestor de Categorías - Carta</h2>
                <p className="text-sm text-chocolate/70">Añade o edita las categorías predefinidas que aparecerán al crear nuevos productos del menú (Ej. Cafetería, Gofres, Bebidas).</p>
            </div>

            <form onSubmit={handleAdd} className="flex gap-4 mb-8">
                <input 
                    type="text" 
                    value={newCat} 
                    onChange={e => setNewCat(e.target.value)} 
                    placeholder="Nueva categoría (ej: Cafés especiales…)" 
                    className="flex-1 rounded-md border-chocolate/20 text-sm py-2 px-3 focus:ring-chocolate focus:border-chocolate"
                />
                <button type="submit" className="btn-primary px-6 py-2 rounded-md font-bold text-sm shadow-sm hover:shadow-md transition-shadow">Añadir</button>
            </form>

            <div className="flex flex-col gap-2">
                {categories.length === 0 ? (
                    <p className="text-sm text-chocolate/50 italic bg-cream/50 p-4 rounded-md text-center">Todavía no hay categorías establecidas para el menú.</p>
                ) : (
                    categories.map((cat, index) => (
                        <div 
                            key={cat.id} 
                            draggable={editingId !== cat.id}
                            onDragStart={() => handleDragStart(index)}
                            onDragEnter={() => handleDragEnter(index)}
                            onDragEnd={handleDragEnd}
                            onDragOver={(e) => e.preventDefault()}
                            className={`p-3 rounded-md border flex justify-between items-center group shadow-sm transition-all cursor-move
                                ${draggedIndex === index ? 'opacity-40 scale-[0.99] border-chocolate/50 bg-white' : ''}
                                ${dragOverIndex === index && draggedIndex !== index ? 'border-chocolate border-dashed bg-chocolate/5' : ''}
                                ${cat.isVisible === false && draggedIndex !== index ? 'bg-gray-50 border-gray-200 opacity-60' : 
                                 (draggedIndex === null && dragOverIndex === null ? 'bg-[#FFFBF2] border-chocolate/10 hover:border-chocolate/30' : '')}
                            `}
                        >
                            {editingId === cat.id ? (
                                <input 
                                    type="text" 
                                    value={editValue} 
                                    onChange={e => setEditValue(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleEditSave(cat.id)}
                                    className="w-full text-sm border-chocolate/30 focus:ring-chocolate focus:border-chocolate rounded-md py-1 px-2 shadow-inner mr-2"
                                />
                            ) : (
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined flex items-center justify-center text-chocolate/20 group-hover:text-chocolate/40 transition-colors">
                                        drag_indicator
                                    </span>
                                    <span className={`font-bold text-sm capitalize ${cat.isVisible === false ? 'text-chocolate/60 line-through' : 'text-chocolate/90'}`}>{cat.name}</span>
                                </div>
                            )}
                            
                            <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                {editingId === cat.id ? (
                                    <button onClick={() => handleEditSave(cat.id)} className="w-7 h-7 flex items-center justify-center text-green-600 bg-green-50 hover:bg-green-100 rounded-md transition-colors tooltip" title="Guardar cambios">
                                        <span className="material-symbols-outlined text-sm">check</span>
                                    </button>
                                ) : (
                                    <>
                                        <button onClick={() => handleToggleVisibility(cat)} className={`w-7 h-7 flex items-center justify-center rounded-md transition-colors tooltip ${cat.isVisible !== false ? 'text-chocolate hover:bg-chocolate/10' : 'text-chocolate/40 bg-chocolate/10 hover:bg-chocolate/20'}`} title={cat.isVisible !== false ? "Ocultar en la carta" : "Mostrar en la carta"}>
                                            <span className="material-symbols-outlined text-sm">{cat.isVisible !== false ? 'visibility' : 'visibility_off'}</span>
                                        </button>
                                        <button onClick={() => { setEditingId(cat.id); setEditValue(cat.name); }} className="w-7 h-7 flex items-center justify-center text-blue-600 hover:bg-blue-100 rounded-md transition-colors tooltip" title="Editar">
                                            <span className="material-symbols-outlined text-sm">edit</span>
                                        </button>
                                        <button onClick={() => handleDelete(cat.id)} className="w-7 h-7 flex items-center justify-center text-red-600 hover:bg-red-100 rounded-md transition-colors tooltip" title="Eliminar">
                                            <span className="material-symbols-outlined text-sm">delete</span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
