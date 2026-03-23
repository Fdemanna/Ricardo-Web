import { useState, useEffect } from 'react';
import { useFirebaseCollection } from '../../hooks/useFirebaseCollection';
import { AVAILABLE_TAGS } from '../../constants/allergens';

export default function FlavorForm({ initialData = null, onSubmit, onCancel }) {
    const { data: categories, loading: catLoading } = useFirebaseCollection('categories', 'name', 'asc');
    
    const [formData, setFormData] = useState(() => ({
        title: initialData?.title || '',
        desc: initialData?.desc || '',
        category: initialData?.category || '',
        img: initialData?.img || '',
        tags: initialData?.tags || []
    }));

    const [forceCustomCategory, setForceCustomCategory] = useState(false);

    const isCustomCategory = forceCustomCategory || 
        (!catLoading && formData.category && categories.length > 0 && !categories.some(c => c.name.toLowerCase() === formData.category.toLowerCase()));
    
    const effectiveCategory = formData.category || (!catLoading && categories.length > 0 ? categories[0].name.toLowerCase() : '');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'categorySelect') {
            if (value === 'nueva') {
                setForceCustomCategory(true);
                setFormData(prev => ({ ...prev, category: '' }));
            } else {
                setForceCustomCategory(false);
                setFormData(prev => ({ ...prev, category: value }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleTagToggle = (tag) => {
        setFormData(prev => {
            const currentTags = prev.tags || [];
            const hasTag = currentTags.includes(tag);
            return {
                ...prev,
                tags: hasTag ? currentTags.filter(t => t !== tag) : [...currentTags, tag]
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            category: effectiveCategory.trim()
        });
    };

    return (
        <div className="fixed inset-0 bg-chocolate/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-cream p-8 rounded-custom w-full max-w-lg shadow-2xl relative">
                <button 
                    onClick={onCancel} 
                    className="absolute top-4 right-4 text-chocolate/50 hover:text-chocolate transition-colors"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
                <h2 className="text-3xl font-serif font-bold text-chocolate mb-6">
                    {initialData ? 'Editar Sabor' : 'Nuevo Sabor'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-chocolate/80">Nombre</label>
                        <input 
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full rounded-custom border-chocolate/20 bg-white py-3 px-4 focus:ring-chocolate focus:border-chocolate"
                            placeholder="Ej. Chocolate Belga"
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-chocolate/80">Descripción</label>
                        <textarea 
                            name="desc"
                            value={formData.desc}
                            onChange={handleChange}
                            rows="3"
                            className="w-full rounded-custom border-chocolate/20 bg-white py-3 px-4 focus:ring-chocolate focus:border-chocolate resize-none"
                            placeholder="Ej. Cacao puro 70% sin igual..."
                        ></textarea>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-chocolate/80">Alérgenos y Dietas (Opcional)</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {AVAILABLE_TAGS.map(tag => {
                                const isSelected = (formData.tags || []).includes(tag);
                                return (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => handleTagToggle(tag)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors border ${
                                            isSelected 
                                            ? 'bg-chocolate text-cream border-transparent' 
                                            : 'bg-white text-chocolate/60 border-chocolate/20 hover:border-chocolate/40'
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-chocolate/80">Categoría</label>
                        {!isCustomCategory ? (
                            <select 
                                name="categorySelect"
                                value={effectiveCategory} 
                                onChange={handleChange}
                                disabled={catLoading}
                                className="w-full rounded-custom border-chocolate/20 bg-white py-3 px-4 focus:ring-chocolate focus:border-chocolate capitalize"
                            >
                                {catLoading ? (
                                    <option value="">Cargando categorías...</option>
                                ) : categories.length === 0 ? (
                                    <option value="">No hay categorías en el sistema</option>
                                ) : (
                                    categories.map(cat => (
                                        <option key={cat.id} value={cat.name} className="capitalize">{cat.name}</option>
                                    ))
                                )}
                                <option value="nueva" className="font-bold text-glacier bg-cream/50">+ Crear nueva categoría rápida (solo para este sabor)...</option>
                            </select>
                        ) : (
                            <div className="flex gap-3">
                                <input 
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full flex-1 rounded-custom border-chocolate/20 bg-white py-3 px-4 focus:ring-chocolate focus:border-chocolate"
                                    placeholder="Escribe la categoría manual..."
                                    autoFocus
                                />
                                <button type="button" onClick={() => { setForceCustomCategory(false); setFormData(prev => ({ ...prev, category: '' })) }} className="px-5 font-bold text-chocolate bg-gray-200 hover:bg-gray-300 rounded-custom transition-colors">Volver</button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-chocolate/80">Link Imagen (URL)</label>
                        <input 
                            name="img"
                            type="url"
                            value={formData.img}
                            onChange={handleChange}
                            required
                            className="w-full rounded-custom border-chocolate/20 bg-white py-3 px-4 focus:ring-chocolate focus:border-chocolate"
                            placeholder="https://..."
                        />
                        {formData.img && (
                            <img src={formData.img} alt="Vista previa" className="mt-2 h-20 w-20 object-cover rounded-md border border-chocolate/10 shadow-sm" />
                        )}
                    </div>

                    <div className="pt-4 flex gap-4">
                        <button type="button" onClick={onCancel} className="flex-1 btn-secondary py-3 font-bold rounded-custom">Cancelar</button>
                        <button type="submit" className="flex-1 btn-primary py-3 font-bold rounded-custom">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
