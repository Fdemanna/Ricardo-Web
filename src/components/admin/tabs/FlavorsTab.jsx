import { useState } from 'react';
import { useFirebaseCollection } from '../../../hooks/useFirebaseCollection';
import FlavorForm from '../FlavorForm';
import FlavorCategoryManager from '../FlavorCategoryManager';

export default function FlavorsTab() {
    const { data: flavors, loading: flavorsLoading, addItem: addFlavor, updateItem: updateFlavor, deleteItem: deleteFlavor } = useFirebaseCollection('flavors');
    const [showFlavorForm, setShowFlavorForm] = useState(false);
    const [editingFlavor, setEditingFlavor] = useState(null);

    const handleEditFlavor = (flavor) => {
        setEditingFlavor(flavor);
        setShowFlavorForm(true);
    };

    const handleDeleteFlavor = async (id) => {
        if (window.confirm("¿Seguro que quieres eliminar este sabor?")) {
            await deleteFlavor(id);
        }
    };

    const handleToggleFlavorAvailability = async (flavor) => {
        await updateFlavor(flavor.id, { isAvailable: !flavor.isAvailable });
    };

    const handleSubmitFlavorForm = async (flavorData) => {
        let result = editingFlavor ? await updateFlavor(editingFlavor.id, flavorData) : await addFlavor(flavorData);
        if (!result?.success) {
            alert("❌ Error al guardar en Firebase.");
            return;
        }
        setShowFlavorForm(false);
        setEditingFlavor(null);
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-chocolate font-serif mb-1">Gestión de Sabores</h2>
                    <p className="text-chocolate/60">Actualiza el inventario de helados en tiempo real.</p>
                </div>
                <button onClick={() => { setEditingFlavor(null); setShowFlavorForm(true); }} className="btn-primary py-3 px-6 rounded-custom font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transition">
                    <span className="material-symbols-outlined text-sm">add</span>
                    Añadir Nuevo Sabor
                </button>
            </div>

            {flavorsLoading ? (
                <div className="flex justify-center p-20"><div className="w-12 h-12 border-4 border-chocolate/20 border-t-chocolate rounded-full animate-spin"></div></div>
            ) : flavors.length === 0 ? (
                <div className="bg-white rounded-custom p-16 text-center border border-chocolate/5 shadow-sm">
                    <span className="material-symbols-outlined text-6xl text-chocolate/20 mb-4 block">inventory_2</span>
                    <h3 className="text-xl font-bold text-chocolate mb-2">No hay sabores todavía</h3>
                    <p className="text-chocolate/60">Haz clic en Añadir Nuevo para empezar a rellenar la vitrina.</p>
                </div>
            ) : (
                <div className="bg-white rounded-custom shadow-sm border border-chocolate/5 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-chocolate/5 bg-gray-50/50 text-chocolate/60 text-xs uppercase tracking-wider">
                                <th className="p-5 font-bold">Sabor & Descripción</th>
                                <th className="p-5 font-bold">Categoría</th>
                                <th className="p-5 font-bold">Estado</th>
                                <th className="p-5 font-bold text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-chocolate/5">
                            {flavors.map(flavor => (
                                <tr key={flavor.id} className="hover:bg-gray-50/50 transition-colors content-visibility-row">
                                    <td className="p-5">
                                        <div className="flex items-center gap-4">
                                            {/* QA: Lazy Load Implementation for Admin Table */}
                                            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-chocolate/10 bg-cream/50 relative flex items-center justify-center">
                                                {flavor.img ? (
                                                    <img src={flavor.img} loading="lazy" alt={flavor.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="material-symbols-outlined text-chocolate/30 text-xl">icecream</span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-chocolate text-base line-clamp-1">{flavor.title}</p>
                                                <p className="text-xs text-chocolate/60 line-clamp-1 max-w-xs">{flavor.desc}</p>
                                                {flavor.tags?.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {flavor.tags.map(tag => (
                                                            <span key={tag} className="text-[9px] uppercase tracking-wider bg-glacier px-1.5 py-0.5 rounded-full text-chocolate font-bold">{tag}</span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        <span className="bg-cream px-3 py-1 rounded-full text-xs font-bold text-chocolate border border-chocolate/10 capitalize whitespace-nowrap">
                                            {flavor.category.replace(/([A-Z])/g, ' $1').trim()}
                                        </span>
                                    </td>
                                    <td className="p-5 whitespace-nowrap">
                                        <button 
                                            onClick={() => handleToggleFlavorAvailability(flavor)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${flavor.isAvailable ? 'bg-glacier' : 'bg-gray-300'}`}
                                        >
                                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${flavor.isAvailable ? 'translate-x-6' : 'translate-x-1'}`} />
                                        </button>
                                        <span className={`ml-3 text-xs font-bold uppercase ${flavor.isAvailable ? 'text-green-600' : 'text-red-500'}`}>
                                            {flavor.isAvailable ? 'Disponible' : 'Agotado'}
                                        </span>
                                    </td>
                                    <td className="p-5 text-right whitespace-nowrap">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => handleEditFlavor(flavor)} className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors tooltip" title="Editar">
                                                <span className="material-symbols-outlined text-sm">edit</span>
                                            </button>
                                            <button onClick={() => handleDeleteFlavor(flavor.id)} className="w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors tooltip" title="Eliminar">
                                                <span className="material-symbols-outlined text-sm">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <FlavorCategoryManager />

            {showFlavorForm && (
                <FlavorForm 
                    key={editingFlavor?.id || 'new'}
                    initialData={editingFlavor} 
                    onSubmit={handleSubmitFlavorForm} 
                    onCancel={() => { setShowFlavorForm(false); setEditingFlavor(null); }} 
                />
            )}
        </div>
    );
}
