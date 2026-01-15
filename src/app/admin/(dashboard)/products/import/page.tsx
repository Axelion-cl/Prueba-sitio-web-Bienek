'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadCloud, FileSpreadsheet, X, Check, AlertCircle, ChevronLeft, Download } from 'lucide-react';
import Link from 'next/link';

export default function ImportProductsPage() {
    const router = useRouter();
    const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Upload, 2: Preview, 3: Success
    const [file, setFile] = useState<File | null>(null);
    const [zipFile, setZipFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false); // This state is no longer used with the new UI, but keeping it for now as per instruction to not make unrelated edits unless explicitly removed.
    const [isUploading, setIsUploading] = useState(false);

    // The original handleDragOver, handleDragLeave, handleDrop, and handleFileSelect are no longer used
    // by the new Step 1 UI structure, which uses separate input elements for each file type.
    // Removing them as they are not referenced in the new JSX.

    // Helper for file handling
    const handleMainFile = (f: File) => {
        if (f.name.endsWith('.csv') || f.name.endsWith('.xlsx')) setFile(f);
        else alert('Formato debe ser .csv o .xlsx');
    };

    const handleZipFile = (f: File) => {
        if (f.name.endsWith('.zip')) setZipFile(f);
        else alert('Formato debe ser .zip');
    };

    const processFile = () => {
        setIsUploading(true);
        // Simulate processing delay
        setTimeout(() => {
            setIsUploading(false);
            setStep(2);
        }, 1500);
    };

    const confirmImport = () => {
        setIsUploading(true);
        // Simulate API call
        setTimeout(() => {
            setIsUploading(false);
            setStep(3);
            setTimeout(() => {
                router.push('/admin/products');
            }, 2000);
        }, 1500);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/products"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ChevronLeft className="w-6 h-6 text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Carga Masiva de Productos</h1>
                    <p className="text-gray-500 text-sm">Sube tu inventario (Excel) y tus imágenes (ZIP).</p>
                </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between px-10 py-4 bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
                <StepIndicator number={1} title="Subir Archivos" active={step >= 1} current={step === 1} />
                <div className={`h-1 flex-1 mx-4 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`} />
                <StepIndicator number={2} title="Validar Datos" active={step >= 2} current={step === 2} />
                <div className={`h-1 flex-1 mx-4 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`} />
                <StepIndicator number={3} title="Finalizar" active={step >= 3} current={step === 3} />
            </div>

            {/* Step 1: Upload */}
            {step === 1 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
                    {/* Excel Dropzone */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">1. Archivo de Datos (Excel/CSV)</h3>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors relative">
                            {file ? (
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <FileSpreadsheet className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium text-gray-900">{file.name}</p>
                                        <button onClick={() => setFile(null)} className="text-xs text-red-500 hover:underline">Quitar</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-500">Arrastra tu Excel aquí</p>
                                    <input
                                        type="file"
                                        accept=".csv,.xlsx"
                                        onChange={(e) => e.target.files && handleMainFile(e.target.files[0])}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </>
                            )}
                        </div>
                    </div>

                    {/* ZIP Dropzone */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">2. Imágenes (ZIP) <span className="text-gray-400 font-normal">- Opcional</span></h3>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors relative">
                            {zipFile ? (
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                        <div className="font-bold text-yellow-700 text-xs">ZIP</div>
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium text-gray-900">{zipFile.name}</p>
                                        <button onClick={() => setZipFile(null)} className="text-xs text-red-500 hover:underline">Quitar</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-500">Arrastra tu ZIP de imágenes aquí</p>
                                    <input
                                        type="file"
                                        accept=".zip"
                                        onChange={(e) => e.target.files && handleZipFile(e.target.files[0])}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-end pt-4 border-t border-gray-100">
                        {file && (
                            <button
                                onClick={processFile}
                                disabled={isUploading}
                                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                            >
                                {isUploading ? 'Procesando...' : 'Siguiente'} <ChevronLeft className="w-4 h-4 rotate-180" />
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Step 2: Preview */}
            {step === 2 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
                    <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                        <Check className="w-5 h-5 flex-shrink-0" />
                        <p>Se han detectado <strong>5 nuevos productos</strong> listos para importar.</p>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3 font-semibold text-gray-700">Nombre</th>
                                    <th className="px-4 py-3 font-semibold text-gray-700">SKU</th>
                                    <th className="px-4 py-3 font-semibold text-gray-700">Marca</th>
                                    <th className="px-4 py-3 font-semibold text-gray-700">Precio</th>
                                    <th className="px-4 py-3 font-semibold text-gray-700">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <tr key={i}>
                                        <td className="px-4 py-3">Nuevo Producto Importado {i}</td>
                                        <td className="px-4 py-3 font-mono text-gray-500">SKU-IMP-{i}00</td>
                                        <td className="px-4 py-3">3M</td>
                                        <td className="px-4 py-3">$10.000</td>
                                        <td className="px-4 py-3"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">Válido</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            onClick={() => setStep(1)}
                            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
                        >
                            Atrás
                        </button>
                        <button
                            onClick={confirmImport}
                            disabled={isUploading}
                            className="bg-primary text-black px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center gap-2"
                        >
                            {isUploading ? 'Importando...' : 'Confirmar Importación'}
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Importación Exitosa!</h2>
                    <p className="text-gray-500 mb-8">Se han agregado 5 productos correctamente a tu catálogo.</p>
                </div>
            )}
        </div>
    );
}

function StepIndicator({ number, title, active, current }: any) {
    return (
        <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${active ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                {active && !current ? <Check className="w-4 h-4" /> : number}
            </div>
            <span className={`font-medium text-sm ${current ? 'text-black' : 'text-gray-500'}`}>
                {title}
            </span>
        </div>
    );
}
