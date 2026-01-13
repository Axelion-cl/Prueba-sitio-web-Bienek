"use client";

import { useState, useRef } from "react";
import { Upload, X, FileText } from "lucide-react";

interface FileUploadProps {
    onFileSelect: (file: File | null) => void;
    error?: string;
}

export function FileUpload({ onFileSelect, error }: FileUploadProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            validateAndSetFile(files[0]);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    const validateAndSetFile = (file: File) => {
        // Validate type (PDF or Word)
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(file.type)) {
            alert("Solo se permiten archivos PDF o Word.");
            return;
        }

        // Validate size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("El archivo no debe superar los 5MB.");
            return;
        }

        setSelectedFile(file);
        onFileSelect(file);
    };

    const removeFile = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent clicking the container when clicking delete
        setSelectedFile(null);
        onFileSelect(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="w-full">
            <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 group
                    ${error ? 'border-red-300 bg-red-50' :
                        isDragging ? 'border-[#ecec00] bg-[#ffffec]' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                    }
                `}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInput}
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                />

                {!selectedFile ? (
                    <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="p-3 bg-gray-100 rounded-full group-hover:scale-110 transition-transform">
                            <Upload className="w-6 h-6 text-gray-500" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-gray-900 font-medium">Haga clic o arrastre su archivo aquí</p>
                            <p className="text-sm text-gray-500">Soporta PDF, DOC, DOCX (Max 5MB)</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-between bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col min-w-0 text-left">
                                <span className="font-medium text-gray-900 truncate pr-4">{selectedFile.name}</span>
                                <span className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                            </div>
                        </div>
                        <button
                            onClick={removeFile}
                            className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
}
