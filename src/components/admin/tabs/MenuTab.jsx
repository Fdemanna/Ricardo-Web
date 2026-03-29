import { useState, Fragment, useMemo } from 'react';
import ImageWithFallback from '../../ui/ImageWithFallback';
import { useFirebaseCollection } from '../../../hooks/useFirebaseCollection';
import MenuItemForm from '../MenuItemForm';
import MenuCategoryManager from '../MenuCategoryManager';

export default function MenuTab() {
    const { data: menuItems, loading: menuLoading, addItem: addMenuItem, updateItem: updateMenuItem, deleteItem: deleteMenuItem } = useFirebaseCollection('menu_items');
    const { data: rawCategories } = useFirebaseCollection('menu_categories', null);
    const [showMenuForm, setShowMenuForm] = useState(false);
    const [editingMenuItem, setEditingMenuItem] = useState(null);
    const [dragItem, setDragItem] = useState({ categoryName: null, index: null });
    const [dragOverItem, setDragOverItem] = useState({ categoryName: null, index: null });

    // Memoized grouping and sorting logic
    const { sortedGroups, groupedMenuItems } = useMemo(() => {
        // Build category config map for ordering (mirrors MenuPage logic)
        const catConfigMap = rawCategories.reduce((acc, c) => {
            acc[(c.name || '').trim().toLowerCase()] = c;
            return acc;
        }, {});

        // Group menu items by category
        const grouped = menuItems.reduce((acc, item) => {
            const cat = item.category || 'Sin categoría';
            const safeCat = Object.keys(acc).find(k => k.toLowerCase() === cat.toLowerCase()) || cat;
            if (!acc[safeCat]) acc[safeCat] = [];
            acc[safeCat].push(item);
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

        return { sortedGroups: sorted, groupedMenuItems: grouped };
    }, [menuItems, rawCategories]);

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

        if (categoryName && draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
            const itemsInCat = [...groupedMenuItems[categoryName]];
            const dragged = itemsInCat[draggedIndex];
            
            itemsInCat.splice(draggedIndex, 1);
            itemsInCat.splice(dragOverIndex, 0, dragged);

            try {
                const results = await Promise.all(
                    itemsInCat.map((item, i) => updateMenuItem(item.id, { order: i }))
                );
                if (results.some(r => !r.success)) {
                    alert("Error al guardar el nuevo orden de los productos. Recarga la página.");
                }
            } catch (error) {
                alert("Error de conexión al reordenar.");
            }
        }
        setDragItem({ categoryName: null, index: null });
        setDragOverItem({ categoryName: null, index: null });
    };

    const handleEditMenu = (item) => {
        setEditingMenuItem(item);
        setShowMenuForm(true);
    };

    const handleDeleteMenu = async (id) => {
        if (window.confirm("¿Seguro que quieres eliminar este producto de la carta?")) {
            await deleteMenuItem(id);
        }
    };

    const handleToggleMenuAvailability = async (item) => {
        await updateMenuItem(item.id, { isAvailable: !item.isAvailable });
    };

    const handleSubmitMenuForm = async (itemData) => {
        let result = editingMenuItem ? await updateMenuItem(editingMenuItem.id, itemData) : await addMenuItem(itemData);
        if (!result?.success) {
            alert("❌ Error al guardar en Firebase.");
            return;
        }
        setShowMenuForm(false);
        setEditingMenuItem(null);
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-chocolate font-serif mb-1">Gestión de Carta</h2>
                    <p className="text-chocolate/60">Actualiza los productos de cafetería, postres y bebidas.</p>
                </div>
                <button onClick={() => { setEditingMenuItem(null); setShowMenuForm(true); }} className="btn-primary py-3 px-6 rounded-custom font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transition">
                    <span className="material-symbols-outlined text-sm">add</span>
                    Añadir a la Carta
                </button>
            </div>

            {menuLoading ? (
                <div className="flex justify-center p-20"><div className="w-12 h-12 border-4 border-chocolate/20 border-t-chocolate rounded-full animate-spin"></div></div>
            ) : menuItems.length === 0 ? (
                <div className="bg-white rounded-custom p-16 text-center border border-chocolate/5 shadow-sm">
                    <span className="material-symbols-outlined text-6xl text-chocolate/20 mb-4 block">receipt_long</span>
                    <h3 className="text-xl font-bold text-chocolate mb-2">La Carta está vacía</h3>
                    <p className="text-chocolate/60">Añade tu primer café, gofre o producto para empezar.</p>
                </div>
            ) : (
                <div className="bg-white rounded-custom shadow-sm border border-chocolate/5 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-chocolate/5 bg-gray-50/50 text-chocolate/60 text-xs uppercase tracking-wider">
                                <th className="p-5 font-bold">Producto</th>
                                <th className="p-5 font-bold">Precio</th>
                                <th className="p-5 font-bold">Estado</th>
                                <th className="p-5 font-bold text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedGroups.map(([categoryName, items]) => (
                                <Fragment key={categoryName}>
                                    {/* Category group header row */}
                                    <tr key={`header-${categoryName}`} className="bg-cream/70 border-y border-chocolate/10">
                                        <td colSpan={4} className="px-5 py-2.5">
                                            <div className="flex items-center gap-3">
                                                <span className="material-symbols-outlined text-chocolate/40 text-base">label</span>
                                                <span className="font-serif font-bold text-chocolate/80 text-sm capitalize tracking-wide">{categoryName}</span>
                                                <span className="ml-auto text-[10px] font-bold uppercase text-chocolate/40 bg-chocolate/5 rounded-full px-2 py-0.5">
                                                    {items.length} {items.length === 1 ? 'producto' : 'productos'}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* Items in this category */}
                                    {items.map((item, index) => {
                                        const isDraggingThis = dragItem.categoryName === categoryName && dragItem.index === index;
                                        const isDragOverThis = dragOverItem.categoryName === categoryName && dragOverItem.index === index && !isDraggingThis;

                                        return (
                                        <tr 
                                            key={item.id} 
                                            draggable
                                            onDragStart={() => handleDragStart(categoryName, index)}
                                            onDragEnter={() => handleDragEnter(categoryName, index)}
                                            onDragEnd={handleDragEnd}
                                            onDragOver={(e) => e.preventDefault()}
                                            className={`border-b group transition-colors cursor-move
                                                ${isDraggingThis ? 'opacity-40 bg-white border-chocolate/50' : ''}
                                                ${isDragOverThis ? 'border-chocolate border-dashed bg-chocolate/5' : 'border-chocolate/5 hover:bg-gray-50/50'}
                                            `}
                                        >
                                            <td className="p-5">
                                                <div className="flex items-center gap-4">
                                                    <span className="material-symbols-outlined text-chocolate/20 group-hover:text-chocolate/40 transition-colors">
                                                        drag_indicator
                                                    </span>
                                                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-chocolate/10 bg-cream/50 relative flex items-center justify-center">
                                                        <ImageWithFallback 
                                                            src={item.img} 
                                                            alt={item.title} 
                                                            className="w-full h-full object-cover"
                                                            fallbackIcon="restaurant"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-chocolate text-base line-clamp-1">{item.title}</p>
                                                        <p className="text-xs text-chocolate/60 line-clamp-1 max-w-xs">{item.desc}</p>
                                                        {item.tags?.length > 0 && (
                                                            <div className="flex flex-wrap gap-1 mt-1">
                                                                {item.tags.map(tag => (
                                                                    <span key={tag} className="text-[9px] uppercase tracking-wider bg-glacier px-1.5 py-0.5 rounded-full text-chocolate font-bold">{tag}</span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5 whitespace-nowrap">
                                                <span className="font-bold text-chocolate">
                                                    {!isNaN(parseFloat(item.price)) ? parseFloat(item.price).toFixed(2).replace('.', ',') : item.price} €
                                                </span>
                                            </td>
                                            <td className="p-5 whitespace-nowrap">
                                                <button 
                                                    onClick={() => handleToggleMenuAvailability(item)}
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${item.isAvailable ? 'bg-glacier' : 'bg-gray-300'}`}
                                                >
                                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${item.isAvailable ? 'translate-x-6' : 'translate-x-1'}`} />
                                                </button>
                                                <span className={`ml-3 text-xs font-bold uppercase ${item.isAvailable ? 'text-green-600' : 'text-red-500'}`}>
                                                    {item.isAvailable ? 'Disponible' : 'Agotado'}
                                                </span>
                                            </td>
                                            <td className="p-5 text-right whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => handleEditMenu(item)} className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors" title="Editar">
                                                        <span className="material-symbols-outlined text-sm">edit</span>
                                                    </button>
                                                    <button onClick={() => handleDeleteMenu(item.id)} className="w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors tooltip" title="Eliminar">
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
            <MenuCategoryManager />

            {showMenuForm && (
                <MenuItemForm 
                    key={editingMenuItem?.id || 'new'}
                    initialData={editingMenuItem} 
                    categories={rawCategories}
                    onSubmit={handleSubmitMenuForm} 
                    onCancel={() => { setShowMenuForm(false); setEditingMenuItem(null); }} 
                />
            )}
        </div>
    );
}
