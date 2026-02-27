import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, ArrowRight, Zap, Shield, Globe, Layers, Code2 } from 'lucide-react';

interface LandingPageProps {
    onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
    return (
        <div className="landing-container bg-dark text-white overflow-x-hidden min-h-screen">
            {/* 1. HERO SECTION */}
            <section className="relative h-screen flex items-center justify-center p-6 lg:p-20 overflow-hidden">
                {/* Animated Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary blur-[150px] rounded-full animate-pulse-slow"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan blur-[150px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <div className="px-3 py-1 bg-white-5 rounded-full border border-white-10 text-[10px] font-black tracking-[0.2em] text-cyan uppercase">
                                Industry 4.0 Standard
                            </div>
                        </div>
                        <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-none mb-6">
                            SIEMENS <br />
                            <span className="text-cyan">LOGIC</span> <br />
                            BRIDGE
                        </h1>
                        <p className="text-gray-400 text-lg lg:text-xl max-w-md mb-8 leading-relaxed">
                            El entorno de ingeniería definitivo para la automatización industrial. Diseña, traduce y exporta lógica SCL sincronizada con el estándar IEC 61131-3.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={onEnter}
                                className="btn-primary group flex items-center gap-3 px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-cyan/20 hover:scale-105 transition-all"
                            >
                                Acceder al Workspace
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                            </button>
                            <a
                                href="https://github.com/leohidalgovelasquez-max/Proyecto_SCL-IEC61131"
                                target="_blank"
                                rel="noreferrer"
                                className="btn-outline flex items-center gap-3 px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-white-5 transition-all border border-white-10"
                            >
                                GitHub Repo
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative z-10 rounded-2xl border border-white-5 overflow-hidden shadow-3xl">
                            <img
                                src="./siemens_logic_bridge_hero_1772215955669.png"
                                alt="Logic Bridge Concept"
                                className="w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60"></div>
                        </div>
                        {/* Decorative boxes */}
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-cyan/10 border border-cyan/20 blur-xl pointer-events-none"></div>
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 border border-primary/20 blur-xl pointer-events-none"></div>
                    </motion.div>
                </div>
            </section>

            {/* 2. FEATURES GRID */}
            <section className="py-32 px-6 bg-black-20">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-sm font-black text-cyan uppercase tracking-[0.3em] mb-4">Core Capabilities</h2>
                        <h3 className="text-4xl lg:text-5xl font-black tracking-tight">Potencia Industrial en tu Navegador</h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Zap className="text-cyan" />}
                            title="Traductor KOP-SCL"
                            description="Algoritmo de tokenización avanzada que convierte lógica de contactos a código estructurado instantáneamente."
                        />
                        <FeatureCard
                            icon={<Code2 className="text-primary" />}
                            title="Editor Monaco"
                            description="Motor VS Code integrado con soporte nativo para sintaxis SCL, resaltado de palabras clave y plantillas."
                        />
                        <FeatureCard
                            icon={<Layers className="text-white" />}
                            title="Gestión de Bloques"
                            description="Librería local integrada con SQLite para organizar tus FB, FC y DB de forma profesional."
                        />
                        <FeatureCard
                            icon={<Shield className="text-cyan" />}
                            title="Validador SCL"
                            description="Verificación de sintaxis en tiempo real para asegurar que tu código sea compatible con TIA Portal."
                        />
                        <FeatureCard
                            icon={<Globe className="text-primary" />}
                            title="Exportación Directa"
                            description="Genera archivos .scl perfectamente formateados para ser importados como fuentes externas."
                        />
                        <FeatureCard
                            icon={<Cpu className="text-white" />}
                            title="Estándar Siemens"
                            description="Alineado con el catálogo de instrucciones y la estética industrial de los sistemas S7-1200/1500."
                        />
                    </div>
                </div>
            </section>

            {/* 4. FOOTER */}
            <footer className="py-20 border-t border-white-5 text-center">
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <Cpu size={20} className="text-white" />
                    </div>
                    <span className="font-black tracking-widest uppercase text-lg">Siemens Logic Bridge</span>
                </div>
                <p className="text-gray-600 text-sm">Desarrollado para la comunidad de ingeniería de automatización.</p>
                <div className="mt-8 text-[10px] text-gray-700 font-bold uppercase tracking-widest">
                    © 2026 Leo Hidalgo Velasquez • Proyecto_SCL-IEC61131
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <motion.div
        whileHover={{ y: -10 }}
        className="bg-white-5 border border-white-5 p-8 rounded-3xl transition-all hover:bg-white-10"
    >
        <div className="w-12 h-12 bg-black-20 rounded-2xl flex items-center justify-center mb-6 border border-white-5 shadow-inner">
            {icon}
        </div>
        <h4 className="text-xl font-bold mb-3 text-white">{title}</h4>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </motion.div>
);

export default LandingPage;
