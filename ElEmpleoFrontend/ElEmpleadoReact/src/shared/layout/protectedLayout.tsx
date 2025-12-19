import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderSection from '../../landing/Components/HeaderSection';

const ProtectedLayout: React.FC = () => {

    return (
        <div
            className="min-h-screen"
            style={{
                background: `linear-gradient(135deg, #007BFF 0%, #0056b3 50%, #003d80 100%)`
            }}
        >
            {/* Header */}
            <HeaderSection />

            {/* Contenido principal */}
            <main className="pt-24 pb-8">
                <div className="container mx-auto px-6 py-6 relative min-h-screen flex items-center justify-center">
                    <div className="max-w-4x2 mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-black/40 border-t border-white/10 py-8">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-white/60">
                        © 2025 Prueba técnica.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default ProtectedLayout;
