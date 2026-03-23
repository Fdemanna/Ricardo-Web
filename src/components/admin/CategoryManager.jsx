import { useState } from 'react';
import { useFirebaseCollection } from '../../hooks/useFirebaseCollection';

export default function CategoryManager() {
    const { data: categories, loading, addItem: addCategory, updateItem: updateCategory, deleteItem: deleteCategory } = useFirebaseCollection('categories', 'name', 'asc');
    const [newCat, setNewCat] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState('');

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newCat.trim()) return;
        const res = await addCategory(newCat.trim());
        if (res.success) setNewCat('');
        else alert("Error al guardar categoría. Revisa reglas de Firebase.");
    };

    const handleEditSave = async (id) => {
        if (!editValue.trim()) return;
        const res = await updateCategory(id, editValue.trim());
        if (res.success) setEditingId(null);
        else alert("Error al actualizar categoría.");
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Seguro que quieres borrar esta categoría del sistema? Ten en cuenta que si algún sabor la usaba, tendrás que actualizarlo o no se agrupará bien en la página pública.")) {
            await deleteCategory(id);
        }
    };

    if (loading) return <div className="p-10 text-center"><div className="w-8 h-8 border-4 border-chocolate/20 border-t-chocolate rounded-full animate-spin mx-auto"></div></div>;

    return (
        <div className="bg-white rounded-custom p-8 border border-chocolate/5 shadow-sm mt-12 mb-12">
            <div className="mb-6 border-b border-chocolate/10 pb-4">
                <h2 className="text-2xl font-serif font-bold text-chocolate mb-1">Gestor de Categorías</h2>
                <p className="text-sm text-chocolate/70">Añade o edita las categorías predefinidas que aparecerán al crear nuevos sabores para evitar errores tipográficos.</p>
            </div>

            <form onSubmit={handleAdd} className="flex gap-4 mb-8">
                <input 
                    type="text" 
                    value={newCat} 
                    onChange={e => setNewCat(e.target.value)} 
                    placeholder="Nueva categoría (ej: opciones veganas, sin azúcar...)" 
                    className="flex-1 rounded-md border-chocolate/20 text-sm py-2 px-3"
                />
                <button type="submit" className="btn-primary px-6 py-2 rounded-md font-bold text-sm shadow-sm hover:shadow-md transition-shadow">Añadir</button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {categories.length === 0 ? (
                    <p className="text-sm text-chocolate/50 italic col-span-full bg-cream/50 p-4 rounded-md text-center">Todavía no hay categorías establecidas.</p>
                ) : (
                    categories.map(cat => (
                        <div key={cat.id} className="bg-[#FFFBF2] p-3 rounded-md border border-chocolate/10 flex justify-between items-center group shadow-sm hover:border-chocolate/30 transition-colors">
                            {editingId === cat.id ? (
                                <input 
                                    autoFocus
                                    type="text" 
                                    value={editValue} 
                                    onChange={e => setEditValue(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleEditSave(cat.id)}
                                    className="w-full text-sm border-chocolate/30 rounded-md py-1 px-2 shadow-inner mr-2"
                                />
                            ) : (
                                <span className="font-bold text-chocolate/90 text-sm capitalize">{cat.name}</span>
                            )}
                            
                            <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                {editingId === cat.id ? (
                                    <button onClick={() => handleEditSave(cat.id)} className="w-7 h-7 flex items-center justify-center text-green-600 bg-green-50 hover:bg-green-100 rounded-md transition-colors tooltip" title="Guardar cambios">
                                        <span className="material-symbols-outlined text-sm">check</span>
                                    </button>
                                ) : (
                                    <>
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
