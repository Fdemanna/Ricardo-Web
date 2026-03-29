import { useState, useMemo, Fragment } from 'react';
import ImageWithFallback from '../../ui/ImageWithFallback';
import { useFirebaseCollection } from '../../../hooks/useFirebaseCollection';
import FlavorForm from '../FlavorForm';
import FlavorCategoryManager from '../FlavorCategoryManager';

export default function FlavorsTab() {
    const { 
        data: flavors, 
        loading: flavorsLoading, 
        addItem: addFlavor, 
        updateItem: updateFlavor, 
        deleteItem: deleteFlavor,
        updateMultipleItems,
        error
    } = useFirebaseCollection('flavors');
    const { data: categories, loading: catLoading } = useFirebaseCollection('categories', 'name', 'asc');
    const [showFlavorForm, setShowFlavorForm] = useState(false);
    const [editingFlavor, setEditingFlavor] = useState(null);

    const [dragItem, setDragItem] = useState({ categoryName: null, index: null });
    const [dragOverItem, setDragOverItem] = useState({ categoryName: null, index: null });

    // Memoize the flavors list with grouping and sorting
    const { sortedGroups, groupedFlavors } = useMemo(() => {
        // Build category config map for ordering
        const catConfigMap = categories.reduce((acc, c) => {
            acc[(c.name || '').trim().toLowerCase()] = c;
            return acc;
        }, {});

        // Group flavors by category
        const grouped = flavors.reduce((acc, flavor) => {
            const cat = flavor.category || 'Sin categoría';
            const safeCat = Object.keys(acc).find(k => k.toLowerCase() === cat.toLowerCase()) || cat;
            if (!acc[safeCat]) acc[safeCat] = [];
            acc[safeCat].push({
                ...flavor,
                categoryDisplay: flavor.category?.replace(/([A-Z])/g, ' $1').trim() || ''
            });
            return acc;
        }, {});

        // Sort items inside each group by their custom order
        Object.keys(grouped).forEach(cat => {
            grouped[cat].sort((a, b) => {
                const orderA = a.order !== undefined ? a.order : 999;
                const orderB = b.order !== undefined ? b.order : 999;
                return orderA - orderB;
            });
        });

        // Sort the category groups themselves
        const sorted = Object.entries(grouped).sort(([nameA], [nameB]) => {
            const configA = catConfigMap[nameA.trim().toLowerCase()];
            const configB = catConfigMap[nameB.trim().toLowerCase()];
            const orderA = configA?.order !== undefined ? configA.order : 999;
            const orderB = configB?.order !== undefined ? configB.order : 999;
            if (orderA === orderB) return nameA.localeCompare(nameB);
            return orderA - orderB;
        });

        return { sortedGroups: sorted, groupedFlavors: grouped };
    }, [flavors, categories]);

    const handleDragStart = (categoryName, index) => {
        setDragItem({ categoryName, index });
    };

    const handleDragEnter = (categoryName, index) => {
        if (dragItem.categoryName === categoryName) {
            if (dragOverItem.categoryName === categoryName && dragOverItem.index === index) return;
            setDragOverItem({ categoryName, index });
        }
    };

    const handleDragEnd = async () => {
        const { categoryName, index: draggedIndex } = dragItem;
        const { index: dragOverIndex } = dragOverItem;

        if (dragOverIndex !== null && draggedIndex !== dragOverIndex) {
            const items = [...groupedFlavors[categoryName]];
            const [movedItem] = items.splice(draggedIndex, 1);
            items.splice(dragOverIndex, 0, movedItem);

            // Prepare batch updates
            const updates = items.map((item, idx) => ({
                id: item.id,
                data: { order: idx }
            }));

            try {
                const result = await updateMultipleItems(updates);
                if (!result.success) {
                    alert("❌ Error al guardar el orden de los sabores.");
                }
            } catch (err) {
                console.error("Error updating flavors order:", err);
                alert("❌ Error de conexión al reordenar.");
            }
        }

        setDragItem({ categoryName: null, index: null });
        setDragOverItem({ categoryName: null, index: null });
    };

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
            ) : error ? (
                <div className="bg-red-50 p-10 rounded-custom text-center border border-red-100 mb-8">
                    <span className="material-symbols-outlined text-4xl text-red-400 mb-3 block">error_outline</span>
                    <h3 className="text-lg font-bold text-red-800 mb-1">Error al cargar sabores</h3>
                    <p className="text-red-600/80 text-sm max-w-md mx-auto mb-4">No se pudo conectar con la base de datos de sabores. Comprueba que los índices estén activos en Firebase.</p>
                    <button onClick={() => window.location.reload()} className="text-red-800 font-bold underline text-sm hover:text-red-900 transition-colors">Reintentar</button>
                </div>
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
                            {sortedGroups.map(([catName, catItems]) => (
                                <Fragment key={catName}>
                                    <tr className="bg-cream/30">
                                        <td colSpan="4" className="px-5 py-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-black uppercase tracking-widest text-chocolate/40">{catName}</span>
                                                <div className="h-px flex-1 bg-chocolate/5"></div>
                                                <span className="text-[10px] font-bold text-chocolate/30 px-2 py-0.5 rounded-full border border-chocolate/5">{catItems.length} sabores</span>
                                            </div>
                                        </td>
                                    </tr>
                                    {catItems.map((flavor, index) => {
                                        const isDragging = dragItem.categoryName === catName && dragItem.index === index;
                                        const isDragOver = dragOverItem.categoryName === catName && dragOverItem.index === index;
                                        
                                        return (
                                             <tr 
                                                key={flavor.id} 
                                                draggable 
                                                onDragStart={() => handleDragStart(catName, index)}
                                                onDragEnter={() => handleDragEnter(catName, index)}
                                                onDragEnd={handleDragEnd}
                                                onDragOver={(e) => e.preventDefault()}
                                                className={`hover:bg-gray-50/50 transition-all cursor-move border-l-4 ${
                                                    isDragging ? 'opacity-30 border-glacier' : 
                                                    isDragOver ? 'border-glacier bg-glacier/5 scale-[1.01] shadow-sm' : 'border-transparent'
                                                }`}
                                            >
                                                <td className="p-5">
                                                    <div className="flex items-center gap-4">
                                                        <span className="material-symbols-outlined text-chocolate/20 group-hover:text-chocolate/40 transition-colors">
                                                            drag_indicator
                                                        </span>
                                                        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-chocolate/10 bg-cream/50 relative flex items-center justify-center">
                                                            <ImageWithFallback 
                                                                src={flavor.img} 
                                                                alt={flavor.title} 
                                                                className="w-full h-full object-cover"
                                                                fallbackIcon="icecream"
                                                            />
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
                                                        {flavor.categoryDisplay}
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
                                        );
                                    })}
                                </Fragment>
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
                    categories={categories}
                    onSubmit={handleSubmitFlavorForm} 
                    onCancel={() => { setShowFlavorForm(false); setEditingFlavor(null); }} 
                />
            )}
        </div>
    );
}
