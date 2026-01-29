import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useRef } from 'react';

export default function ProductsEdit({ auth, product, categories }) {
    const fileInputRef = useRef(null);
    const { data, setData, post, processing, errors } = useForm({
        name: product.name || '',
        category_id: product.category_id || '',
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || '',
        image: null,
        is_active: product.is_active ? true : false,
        is_featured: product.is_featured ? true : false,
    });

    const [imagePreview, setImagePreview] = useState(product.image ? '/storage/' + product.image : null);

    return (
        <div className="min-h-screen bg-[#fafafa] font-sans pb-20">
            <Head title="Edit Product - Admin" />

            <nav className="fixed top-6 left-0 right-0 mx-auto w-max z-50">
                <div className="bg-white/90 backdrop-blur-xl border border-white/20 shadow-sm rounded-full px-2 py-2 flex items-center gap-1">
                    <Link href={route('admin.dashboard')} className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white font-black text-xs">FR.</Link>
                    <div className="hidden md:flex items-center px-4 gap-1">
                        <Link href={route('admin.products.index')} className="px-5 py-2 rounded-full text-sm font-bold text-gray-500 hover:text-[#1a1a1a] hover:bg-gray-50 transition-all">Back to Products</Link>
                    </div>
                </div>
            </nav>

            <div className="pt-32 px-4 max-w-3xl mx-auto">
                <div className="mb-10 animate-fade-in-up">
                    <h1 className="text-4xl font-black text-[#1a1a1a]">Edit Product</h1>
                    <p className="text-gray-500">Update details for <span className="font-bold text-[#1a1a1a]">{product.name}</span></p>
                </div>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    data._method = 'put';
                    post(route('admin.products.update', product.id));
                }}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 animate-fade-in-up md:p-10 space-y-8"
                >
                    {/* Basic Info */}
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group">
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 transition-colors group-focus-within:text-[#1a1a1a]">Product Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#1a1a1a] focus:ring-0 font-bold text-[#1a1a1a] transition-all placeholder:text-gray-300 py-3"
                                    placeholder="e.g. Air Jordan 1"
                                />
                                {errors.name && <div className="text-red-500 text-xs mt-1 font-bold">{errors.name}</div>}
                            </div>
                            <div className="group">
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 transition-colors group-focus-within:text-[#1a1a1a]">Category</label>
                                <div className="relative">
                                    <select
                                        value={data.category_id}
                                        onChange={e => setData('category_id', e.target.value)}
                                        className="w-full rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#1a1a1a] focus:ring-0 font-bold text-[#1a1a1a] transition-all appearance-none py-3"
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                                {errors.category_id && <div className="text-red-500 text-xs mt-1 font-bold">{errors.category_id}</div>}
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 transition-colors group-focus-within:text-[#1a1a1a]">Description</label>
                            <textarea
                                rows="4"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className="w-full rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#1a1a1a] focus:ring-0 font-medium text-[#1a1a1a] text-sm transition-all py-3 resize-none"
                                placeholder="Product details..."
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group">
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 transition-colors group-focus-within:text-[#1a1a1a]">Price (₹)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.price}
                                        onChange={e => setData('price', e.target.value)}
                                        className="w-full rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#1a1a1a] focus:ring-0 font-bold text-[#1a1a1a] pl-8 transition-all py-3"
                                    />
                                </div>
                            </div>
                            <div className="group">
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 transition-colors group-focus-within:text-[#1a1a1a]">Stock</label>
                                <input
                                    type="number"
                                    value={data.stock}
                                    onChange={e => setData('stock', e.target.value)}
                                    className="w-full rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#1a1a1a] focus:ring-0 font-bold text-[#1a1a1a] transition-all py-3"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Image Upload - Styled */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Product Image</label>
                        <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-6 items-start">
                            {/* Preview */}
                            <div className="w-24 h-24 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 overflow-hidden flex items-center justify-center shrink-0 relative">
                                {imagePreview ? (
                                    <img src={imagePreview} className="w-full h-full object-cover" />
                                ) : (
                                    <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                )}

                                {/* Reset Button - Only show if new image selected */}
                                {data.image && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setData('image', null);
                                            setImagePreview(product.image ? '/storage/' + product.image : null);
                                            if (fileInputRef.current) fileInputRef.current.value = '';
                                        }}
                                        className="absolute top-1 right-1 bg-white/80 backdrop-blur-sm text-red-500 rounded-full p-1 shadow-sm hover:bg-white transition-all transform hover:scale-110"
                                        title="Remove selected image"
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                )}
                            </div>

                            {/* Custom File Input */}
                            <div className="w-full">
                                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-white hover:border-[#1a1a1a] transition-all group">
                                    <div className="flex flex-col items-center justify-center pt-3 pb-4">
                                        <svg className="w-6 h-6 mb-2 text-gray-400 group-hover:text-[#1a1a1a] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                        <p className="mb-1 text-xs text-gray-500 font-medium group-hover:text-gray-900"><span className="font-bold">Click to upload</span> or drag and drop</p>
                                        <p className="text-[10px] text-gray-400">SVG, PNG, JPG or WEBP</p>
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        className="hidden"
                                        onChange={e => {
                                            if (e.target.files && e.target.files[0]) {
                                                setData('image', e.target.files[0]);
                                                setImagePreview(URL.createObjectURL(e.target.files[0]));
                                            }
                                        }}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Toggles (Custom Checkboxes) */}
                    <div className="flex flex-row items-center gap-10 border-t border-gray-100 pt-8">
                        {/* Active Status Checkbox */}
                        <div
                            className="flex items-center gap-3 cursor-pointer group select-none"
                            onClick={() => setData('is_active', !data.is_active)}
                        >
                            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${data.is_active ? 'bg-[#1a1a1a] border-[#1a1a1a]' : 'border-gray-300 bg-white group-hover:border-[#1a1a1a]'}`}>
                                <svg
                                    className={`w-3.5 h-3.5 text-white transform transition-all duration-200 ${data.is_active ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-sm font-bold text-[#1a1a1a]">Active Status</span>
                        </div>

                        {/* Featured Product Checkbox */}
                        <div
                            className="flex items-center gap-3 cursor-pointer group select-none"
                            onClick={() => setData('is_featured', !data.is_featured)}
                        >
                            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${data.is_featured ? 'bg-[#1a1a1a] border-[#1a1a1a]' : 'border-gray-300 bg-white group-hover:border-[#1a1a1a]'}`}>
                                <svg
                                    className={`w-3.5 h-3.5 text-white transform transition-all duration-200 ${data.is_featured ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-sm font-bold text-[#1a1a1a]">Featured Product</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-50">
                        <Link href={route('admin.products.index')} className="px-6 py-3 rounded-full border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all">Cancel</Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-8 py-3 rounded-full bg-[#1a1a1a] text-white text-sm font-bold hover:bg-accent hover:text-[#1a1a1a] transition-all shadow-lg hover:shadow-accent/30 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Saving Changes...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
