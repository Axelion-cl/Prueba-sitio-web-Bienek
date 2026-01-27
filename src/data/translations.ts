// Translations for the Bienek website
// Organized by section for easy maintenance

export type Language = 'es' | 'en';

export const translations = {
    es: {
        // Header - Utility Bar
        header: {
            idioma: 'Idioma',
            empresa: 'Empresa',
            bolsaTrabajo: 'Bolsa de Trabajo',
            cobertura: 'Cobertura:',
            coberturaValue: 'RM - X Región.',
            horario: 'Horario de atención:',
            horarioValue: '8:00 a 18:00 hrs',
            // Main Menu
            inicio: 'Inicio',
            soluciones: 'Soluciones',
            promociones: 'Promociones',
            blogTecnico: 'Blog Técnico',
            accesoClientes: 'Acceso Clientes',
            contactenos: 'CONTACTENOS',
            salir: 'Salir',
            // Search
            buscar: 'Encuentra lo que estás buscando...',
            lideresDistribucion: 'Líderes en Distribución de productos de Higiene',
        },
        // Footer
        footer: {
            casaMatriz: 'Casa Matriz',
            contacto: 'Contacto',
            informacionUtil: 'Información útil',
            blog: 'Blog',
            soluciones: 'Soluciones',
            trabajaConNosotros: 'Trabaja Con Nosotros',
            derechos: '© 2024 Bienek. Todos los derechos reservados.',
        },
        // Login Page
        login: {
            titulo: 'Acceso Clientes',
            subtitulo: 'Accede a tu cuenta de Bienek',
            correo: 'Correo Electrónico',
            contrasena: 'Contraseña',
            olvidasteContrasena: '¿Olvidaste tu contraseña?',
            iniciarSesion: 'Iniciar Sesión',
            credencialesPrueba: 'Credenciales de prueba:',
        },
        // Mi Cuenta
        miCuenta: {
            titulo: 'Mi Cuenta:',
            bienvenido: 'Bienvenido de nuevo,',
            misProductos: 'Mis Productos de interés',
            misOrdenes: 'Mis Ordenes',
            miPerfil: 'Mi Perfil',
            carritoVacio: 'Tu carrito está vacío',
            agregaProductos: 'Agrega productos para verlos aquí',
            revisaProductos: 'Revisa los productos que has agregado a tu carrito.',
            revisaOrdenes: 'Revisa el estado de tus solicitudes de cotización',
            noTienesPedidos: 'No tienes pedidos',
            tusPedidosApareceran: 'Tus pedidos aparecerán aquí',
            orden: 'Orden:',
            fecha: 'Fecha:',
            informacionPersonal: 'Información Personal',
            actualizaInfo: 'Actualiza la información donde quieres que te contactemos.',
            nombre: 'Nombre:',
            correoElectronico: 'Correo Electrónico:',
            empresaLabel: 'Empresa:',
            telefono: 'Teléfono:',
            editarInfo: 'Editar información de contacto',
            guardarCambios: 'Guardar cambios',
            cancelar: 'Cancelar',
            cambiarContrasena: 'Cambiar Contraseña',
            cambiarMiContrasena: 'Cambiar mi contraseña',
            contrasenaActual: 'Contraseña actual:',
            nuevaContrasena: 'Nueva contraseña:',
            confirmarContrasena: 'Confirmar nueva contraseña:',
            actualizarContrasena: 'Actualizar contraseña',
        },
        // Products
        productos: {
            agregar: 'Agregar',
            agregado: 'Agregado',
            masInfo: 'Mas Info',
            marca: 'MARCA:',
        },
        // Home
        home: {
            marcasDestacadas: 'Marcas Destacadas',
            nuestrasSoluciones: 'Nuestras Soluciones',
            clickCotizar: 'Click para cotizar',
            consultarPor: 'Consultar por',
            values: {
                consultoria: {
                    title: 'Consultoría Especializada',
                    description: 'Enfoque en diagnóstico profesional para su empresa.',
                },
                logistica: {
                    title: 'Cobertura Logística',
                    description: 'Distribución eficiente desde la RM hasta la X Región.',
                },
                higiene: {
                    title: 'Soluciones de Higiene',
                    description: 'Representación de marcas líderes en el mercado.',
                },
            },
        },
        // Sectors (Solutions)
        sectores: {
            accesorios: {
                title: 'Equipamiento Accesorios',
                description: 'Herramientas manuales de alto rendimiento.',
            },
            maquinaria: {
                title: 'Equipamientos de Maquinaria',
                description: 'Tecnología para grandes superficies.',
            },
            educacion: {
                title: 'Soluciones Especializadas sector Educación',
                description: 'Ambientes seguros para el aprendizaje.',
            },
            horeca: {
                title: 'Soluciones Especializadas sector HORECA',
                description: 'Impecabilidad para Hoteles, Restaurantes y Catering.',
            },
            industrial: {
                title: 'Soluciones Especializadas sector Industrial y Almacenaje',
                description: 'Limpieza profunda para entornos exigentes.',
            },
            institucional: {
                title: 'Soluciones Especializadas sector Institucional',
                description: 'Limpieza para oficinas y edificios públicos.',
            },
            salud: {
                title: 'Soluciones Especializadas sector Salud',
                description: 'Higiene crítica para clínicas y hospitales.',
            },
            veterinario: {
                title: 'Soluciones Especializadas sector Veterinario',
                description: 'Desinfección segura para clínicas veterinarias.',
            },
            higiene: {
                title: 'Soluciones Generales de Higiene',
                description: 'Productos esenciales para la limpieza diaria.',
            },
            adultoMayor: {
                title: 'Soluciones para Centros Adulto Mayor',
                description: 'Cuidado delicado para espacios residenciales.',
            },
            embarcaciones: {
                title: 'Soluciones para Embarcaciones',
                description: 'Limpieza especializada marítima.',
            },
            aguas: {
                title: 'Tratamiento de Aguas',
                description: 'Soluciones químicas para calidad del agua.',
            },
        },
        // Company
        empresa: {
            titulo: 'Sobre Nosotros',
            trayectoria: {
                titulo: 'Comprometidos con la excelencia en soluciones de higiene profesional.',
                descripcion: 'Somos una empresa chilena con más de 40 años de experiencia en el suministro y asesoría en higiene profesional. Nuestro propósito es garantizar la continuidad operativa de nuestros clientes a través de productos de primera línea, asesoría experta y un servicio logístico confiable.',
            },
            vision: {
                titulo: 'Nuestra Visión',
                desc1: 'Ser Empresa Líder en distribución de productos de Higiene profesional, comprometidos con una evolución constante en la excelencia del servicio.',
                desc2: 'Es enfocarnos en proveer servicios en tiempo y forma, capacitando a nuestros consumidores finales en los productos más eficaces del mercado.',
                desc3: 'Persistir en nuestro objetivo de brindar a nuestros valiosos clientes, verdaderas: "Soluciones Integrales de Limpieza" cumpliendo expectativas de manera de ser soporte y contribución al éxito de sus operaciones.',
            },
            mision: {
                titulo: 'Nuestra Misión',
                desc1: 'Brindar soluciones integrales de limpieza, profesionalizando los servicios logísticos con excelencia y posicionándonos como partners confiables de nuestros clientes.',
                desc2: 'Proveer productos especializados que contribuyan activamente en mejorar Operaciones en multisegmentos, teniendo una mirada eficiente y sustentable, construyendo así, un relevante valor en toda la cadena del Supply chain para nuestros Clientes como para la Sociedad.',
            },
        },
        // Contact Page
        contactoPage: {
            titulo: 'Contáctenos',
            subtitulo: 'Estamos aquí para ayudarle.',
            infoContacto: 'Información de Contacto',
            direccion: 'Dirección',
            telefono: 'Teléfono',
            ventas: 'Ventas',
            horarios: 'Horarios de Atención',
            dias: 'Lunes a Viernes',
            horas: '8:00 - 18:00 hrs',
        },
        // Careers Page
        trabajaPage: {
            titulo: 'Trabaja con Nosotros',
            subtitulo: 'Únete a un equipo líder en soluciones de higiene industrial y desarrolla tu carrera junto a los mejores profesionales.',
            porQue: '¿Por qué unirse a Bienek?',
            descripcion: 'Buscamos personas apasionadas, comprometidas con la excelencia y con ganas de innovar en el sector de la distribución B2B. Ofrecemos un entorno de trabajo dinámico y oportunidades de crecimiento real.',
            beneficiosTitulo: 'Nuestros Beneficios',
            beneficios: [
                'Ambiente laboral colaborativo',
                'Oportunidades de capacitación continua',
                'Crecimiento profesional'
            ]
        },
        // Forms
        forms: {
            general: {
                nombre: 'Nombre Completo',
                email: 'Correo Electrónico',
                telefono: 'Teléfono (opcional)',
                empresa: 'Empresa',
                mensaje: 'Mensaje',
                enviar: 'Enviar Mensaje',
                enviando: 'Enviando...',
                adjuntar: 'Adjuntar CV (PDF, Doc, Docx)',
                seleccionarArchivo: 'Seleccionar archivo',
                archivoSeleccionado: 'Archivo seleccionado:',
                exito: '¡Gracias! Tu mensaje ha sido enviado correctamente.',
                error: 'Hubo un error al enviar tu mensaje. Intenta nuevamente.',
                camposObligatorios: 'Por favor completa los campos obligatorios.',
            },
            contacto: {
                titulo: 'Contáctanos',
                subtitulo: 'Puede contar con nosotros. Rellene los campos con su información y nos pondremos en contacto con usted. Si lo desea, puede adjuntar un listado de sus soluciones de interés.',
                info: 'Información de Contacto',
                direccion: 'Dirección',
                direccionValue: 'Av. Ejemplo 123, Santiago',
                telefono: 'Teléfono',
                email: 'Email',
            },
            trabajo: {
                titulo: 'Trabaja con Nosotros',
                subtitulo: 'Únete a nuestro equipo. Completa el formulario y adjunta tu CV.',
            },
        },
    },
    en: {
        // Header - Utility Bar
        header: {
            idioma: 'Language',
            empresa: 'Company',
            bolsaTrabajo: 'Job Board',
            cobertura: 'Coverage:',
            coberturaValue: 'RM - X Region.',
            horario: 'Business Hours:',
            horarioValue: '8:00 AM to 6:00 PM',
            // Main Menu
            inicio: 'Home',
            soluciones: 'Solutions',
            promociones: 'Promotions',
            blogTecnico: 'Technical Blog',
            accesoClientes: 'Client Access',
            contactenos: 'CONTACT US',
            salir: 'Logout',
            // Search
            buscar: 'Find what you are looking for...',
            lideresDistribucion: 'Leaders in Hygiene Product Distribution',
        },
        // Footer
        footer: {
            casaMatriz: 'Headquarters',
            contacto: 'Contact',
            informacionUtil: 'Useful Information',
            blog: 'Blog',
            soluciones: 'Solutions',
            trabajaConNosotros: 'Work With Us',
            derechos: '© 2024 Bienek. All rights reserved.',
        },
        // Login Page
        login: {
            titulo: 'Client Access',
            subtitulo: 'Access your Bienek account',
            correo: 'Email Address',
            contrasena: 'Password',
            olvidasteContrasena: 'Forgot your password?',
            iniciarSesion: 'Log In',
            credencialesPrueba: 'Test credentials:',
        },
        // Mi Cuenta
        miCuenta: {
            titulo: 'My Account:',
            bienvenido: 'Welcome back,',
            misProductos: 'My Products of interest',
            misOrdenes: 'My Orders',
            miPerfil: 'My Profile',
            carritoVacio: 'Your cart is empty',
            agregaProductos: 'Add products to see them here',
            revisaProductos: 'Review the products you have added to your cart.',
            revisaOrdenes: 'Check the status of your quote requests',
            noTienesPedidos: 'You have no orders',
            tusPedidosApareceran: 'Your orders will appear here',
            orden: 'Order:',
            fecha: 'Date:',
            informacionPersonal: 'Personal Information',
            actualizaInfo: 'Update the information where you want us to contact you.',
            nombre: 'Name:',
            correoElectronico: 'Email:',
            empresaLabel: 'Company:',
            telefono: 'Phone:',
            editarInfo: 'Edit contact information',
            guardarCambios: 'Save changes',
            cancelar: 'Cancel',
            cambiarContrasena: 'Change Password',
            cambiarMiContrasena: 'Change my password',
            contrasenaActual: 'Current Password:',
            nuevaContrasena: 'New Password:',
            confirmarContrasena: 'Confirm New Password:',
            actualizarContrasena: 'Update Password',
        },
        // Products
        productos: {
            agregar: 'Add',
            agregado: 'Added',
            masInfo: 'More Info',
            marca: 'BRAND:',
        },
        // Home
        home: {
            marcasDestacadas: 'Featured Brands',
            nuestrasSoluciones: 'Our Solutions',
            clickCotizar: 'Click to quote',
            consultarPor: 'Ask about',
            values: {
                consultoria: {
                    title: 'Specialized Consulting',
                    description: 'Focus on professional diagnosis for your company.',
                },
                logistica: {
                    title: 'Logistics Coverage',
                    description: 'Efficient distribution from RM to X Region.',
                },
                higiene: {
                    title: 'Hygiene Solutions',
                    description: 'Representation of market-leading brands.',
                },
            },
        },
        // Sectors (Solutions)
        sectores: {
            accesorios: {
                title: 'Equipment and Accessories',
                description: 'High-performance manual tools.',
            },
            maquinaria: {
                title: 'Machinery Equipment',
                description: 'Technology for large surfaces.',
            },
            educacion: {
                title: 'Education Sector',
                description: 'Safe environments for learning.',
            },
            horeca: {
                title: 'HORECA Channel',
                description: 'Impeccability for Hotels, Restaurants, and Catering.',
            },
            industrial: {
                title: 'Industrial and Storage',
                description: 'Deep cleaning for demanding environments.',
            },
            institucional: {
                title: 'Institutional Sector',
                description: 'Cleaning for offices and public buildings.',
            },
            salud: {
                title: 'Health Area',
                description: 'Critical hygiene for clinics and hospitals.',
            },
            veterinario: {
                title: 'Veterinary Sector',
                description: 'Safe disinfection for veterinary clinics.',
            },
            higiene: {
                title: 'General Hygiene Solutions',
                description: 'Essential products for daily cleaning.',
            },
            adultoMayor: {
                title: 'Senior Centers',
                description: 'Delicate care for residential spaces.',
            },
            embarcaciones: {
                title: 'Vessels',
                description: 'Specialized maritime cleaning.',
            },
            aguas: {
                title: 'Water Treatment',
                description: 'Chemical solutions for water quality.',
            },
        },
        // Company
        empresa: {
            titulo: 'About Us',
            trayectoria: {
                titulo: 'Committed to excellence in professional hygiene solutions.',
                descripcion: 'We are a Chilean company with over 40 years of experience in supply and advice on professional hygiene. Our purpose is to guarantee the operational continuity of our customers through top-line products, expert advice, and reliable logistics service.',
            },
            vision: {
                titulo: 'Our Vision',
                desc1: 'To be a Leading Company in the distribution of professional Hygiene products, committed to constant evolution in service excellence.',
                desc2: 'Focusing on providing services in a timely and proper manner, training our end consumers on the most effective products in the market.',
                desc3: 'Persisting in our goal of providing our valuable customers with true "Comprehensive Cleaning Solutions", meeting expectations to support and contribute to the success of their operations.',
            },
            mision: {
                titulo: 'Our Mission',
                desc1: 'To provide comprehensive cleaning solutions, professionalizing logistics services with excellence and positioning ourselves as reliable partners for our customers.',
                desc2: 'To provide specialized products that actively contribute to improving Operations in multi-segments, having an efficient and sustainable perspective, thus building relevant value throughout the Supply chain for our Customers as well as for Society.',
            },
        },
        // Contact Page
        contactoPage: {
            titulo: 'Contact Us',
            subtitulo: 'We are here to help you.',
            infoContacto: 'Contact Information',
            direccion: 'Address',
            telefono: 'Phone',
            ventas: 'Sales',
            horarios: 'Opening Hours',
            dias: 'Monday to Friday',
            horas: '8:00 AM - 6:00 PM',
        },
        // Careers Page
        trabajaPage: {
            titulo: 'Work With Us',
            subtitulo: 'Join a leading team in industrial hygiene solutions and develop your career alongside the best professionals.',
            porQue: 'Why join Bienek?',
            descripcion: 'We are looking for passionate people, committed to excellence and eager to innovate in the B2B distribution sector. We offer a dynamic work environment and real growth opportunities.',
            beneficiosTitulo: 'Our Benefits',
            beneficios: [
                'Collaborative work environment',
                'Continuous training opportunities',
                'Professional growth'
            ]
        },
        // Forms
        forms: {
            general: {
                nombre: 'Full Name',
                email: 'Email',
                telefono: 'Phone (optional)',
                empresa: 'Company',
                mensaje: 'Message',
                enviar: 'Send Message',
                enviando: 'Sending...',
                adjuntar: 'Attach CV (PDF, Doc, Docx)',
                seleccionarArchivo: 'Select file',
                archivoSeleccionado: 'File selected:',
                exito: 'Thank you! Your message has been sent successfully.',
                error: 'There was an error sending your message. Please try again.',
                camposObligatorios: 'Please fill in required fields.',
            },
            contacto: {
                titulo: 'Contact Us',
                subtitulo: 'You can count on us. Please fill in the fields with your information and we will get in touch with you. If you wish, you may attach a list of your solutions of interest.',
                info: 'Contact Information',
                direccion: 'Address',
                direccionValue: 'Av. Example 123, Santiago',
                telefono: 'Phone',
                email: 'Email',
            },
            trabajo: {
                titulo: 'Work With Us',
                subtitulo: 'Join our team. Complete the form and attach your CV.',
            },
        },
    },
};

export type TranslationKeys = typeof translations.es;
