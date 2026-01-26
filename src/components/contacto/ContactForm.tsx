"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Send, Upload, X, FileSpreadsheet, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { isValidEmail, getEmailValidationError, suggestEmailCorrection } from "@/utils/validation";

// ... imports

// Helper to send email via PHP Bridge
const sendEmail = async (formData: FormData) => {
    const PHP_BRIDGE_URL = process.env.NEXT_PUBLIC_PHP_BRIDGE_URL;
    if (!PHP_BRIDGE_URL) {
        console.warn("PHP_BRIDGE_URL variable not set");
        return false;
    }

    try {
        const response = await fetch(PHP_BRIDGE_URL, {
            method: "POST",
            body: formData, // Browser automatically sets Content-Type: multipart/form-data
        });
        return response.ok;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};

import { TurnstileWidget } from "@/components/ui/TurnstileWidget";

export function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
    });
    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Validate email on blur or change
        if (name === 'email') {
            if (value.trim()) {
                const error = getEmailValidationError(value);
                setEmailError(error);

                if (error) {
                    const suggestion = suggestEmailCorrection(value);
                    setEmailSuggestion(suggestion);
                } else {
                    setEmailSuggestion(null);
                }
            } else {
                setEmailError(null);
                setEmailSuggestion(null);
            }
        }
    };

    const applySuggestion = () => {
        if (emailSuggestion) {
            setFormData(prev => ({ ...prev, email: emailSuggestion }));
            setEmailError(null);
            setEmailSuggestion(null);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileError(null);
        const selectedFile = e.target.files?.[0];

        if (!selectedFile) {
            setFile(null);
            return;
        }

        const ACCEPTED_FILE_TYPES = [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
            "application/vnd.ms-excel", // .xls
            "text/csv", // .csv
        ];
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

        // Validate file type
        if (!ACCEPTED_FILE_TYPES.includes(selectedFile.type)) {
            setFileError("Formato no válido. Solo se aceptan archivos .xlsx, .xls o .csv");
            setFile(null);
            return;
        }

        // Validate file size
        if (selectedFile.size > MAX_FILE_SIZE) {
            setFileError("El archivo excede el tamaño máximo de 5MB");
            setFile(null);
            return;
        }

        setFile(selectedFile);
    };

    const removeFile = () => {
        setFile(null);
        setFileError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!turnstileToken) {
            alert("Por favor verifica que no eres un robot.");
            return;
        }

        // Validate email before submitting
        if (!isValidEmail(formData.email)) {
            const error = getEmailValidationError(formData.email);
            setEmailError(error);
            alert(error || "Por favor ingresa un correo electrónico válido");
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            // 1. Save to Supabase (omit logic for brevity in replace, assume mapped correctly if I don't touch distinct blocks)
            // ... (keeping existing Supabase logic implicit if I don't replace it, but I must replace the whole handleSubmit if I want to inject logic safely)
            // Wait, I should replace just the start of handleSubmit to inject the check? No, best to replace the whole function to be safe.

            const { error: dbError } = await supabase.from('leads').insert({
                name: formData.name,
                email: formData.email,
                company: formData.company,
                phone: formData.phone,
                message: formData.message,
                status: 'new',
                date: new Date().toISOString().split('T')[0],
            });

            if (dbError) {
                console.error("Error saving lead to Supabase:", dbError);
            }

            // 2. Send Email via PHP Bridge
            const submitData = new FormData();
            submitData.append("name", formData.name);
            submitData.append("email", formData.email);
            submitData.append("company", formData.company);
            submitData.append("phone", formData.phone);
            submitData.append("message", formData.message);
            submitData.append("type", "contact");
            submitData.append("cf-turnstile-response", turnstileToken); // Add token

            if (file) {
                submitData.append("attachment", file);
            }

            const emailSuccess = await sendEmail(submitData);

            if (emailSuccess || !dbError) {
                setSubmitStatus("success");
                setFormData({ name: "", email: "", company: "", phone: "", message: "" });
                removeFile();
                setTurnstileToken(null); // Reset token? (Ideally widget resets, but standard practice)
            } else {
                setSubmitStatus("error");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-50 rounded-2xl p-8 lg:p-10 shadow-sm border border-gray-100">
            {/* ... (keep header and status messages) */}
            <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Información de Contacto</h3>
                <p className="text-gray-500 text-sm">Completa el formulario y nos comunicaremos contigo a la brevedad</p>
            </div>

            {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                    <strong>¡Mensaje enviado!</strong> Nos pondremos en contacto contigo pronto.
                </div>
            )}

            {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    <strong>Error al enviar.</strong> Por favor intenta nuevamente.
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* ... (keep inputs) */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Nombre Completo <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nombre y Apellido"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Correo Electrónico <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="ejemplo@dominio.cl"
                            className={`w-full px-4 py-3 rounded-lg border ${emailError ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
                                } focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400`}
                            required
                        />
                        {emailError && (
                            <p className="text-xs text-red-600 flex items-start gap-1">
                                <span>⚠️</span>
                                <span>{emailError}</span>
                            </p>
                        )}
                        {emailSuggestion && (
                            <button
                                type="button"
                                onClick={applySuggestion}
                                className="text-xs text-blue-600 hover:text-blue-700 underline"
                            >
                                ¿Quisiste decir <strong>{emailSuggestion}</strong>?
                            </button>
                        )}
                    </div>

                    {/* Company */}
                    <div className="space-y-2">
                        <label htmlFor="company" className="text-sm font-medium text-gray-700">
                            Empresa <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Nombre de tu empresa"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                            Número de teléfono <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+56 9 1234 5678"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                            required
                        />
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">
                        Mensaje <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Cuéntanos cómo podemos ayudarte..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400 resize-none"
                        required
                    />
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Listado de Compra <span className="text-gray-400 font-normal">(Opcional)</span>
                    </label>

                    {!file ? (
                        <div
                            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer bg-white"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".xlsx,.xls,.csv"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600">
                                <span className="text-primary font-medium">Haz clic para subir</span> o arrastra tu archivo
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                Excel o CSV (máx. 5MB)
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <FileSpreadsheet className="w-8 h-8 text-green-600 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                                <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                            </div>
                            <button
                                type="button"
                                onClick={removeFile}
                                className="p-1.5 rounded-full hover:bg-green-100 transition-colors"
                            >
                                <X className="w-5 h-5 text-green-700" />
                            </button>
                        </div>
                    )}

                    {fileError && (
                        <p className="text-sm text-red-600">{fileError}</p>
                    )}
                </div>

                <TurnstileWidget onVerify={setTurnstileToken} />

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-black text-lg py-6 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Enviando...
                        </>
                    ) : (
                        <>
                            Enviar mensaje
                            <Send className="w-5 h-5" />
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
}
