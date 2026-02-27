import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, ArrowRight, ArrowLeft, Zap, Shield, Globe, Layers, Code2, Monitor, Database } from 'lucide-react';

interface LandingPageProps {
    onEnter: () => void;
}

const slides = [
    {
        id: 1,
        title: "SIEMENS LOGIC BRIDGE",
        subtitle: "La Nueva Era de la Automatización",
        description: "Una plataforma de ingeniería diseñada para unificar el mundo de la lógica industrial con las tecnologías web más avanzadas.",
        image: "./siemens_logic_bridge_hero_1772215955669.png",
        color: "cyan",
        icon: <Cpu size={48} />
    },
    {
        id: 2,
        title: "TRANSFORMACIÓN KOP → SCL",
        subtitle: "Traducción Inteligente",
        description: "Convierte segmentos de lógica de contactos (Ladder) en código SCL optimizado para TIA Portal en milisegundos.",
        image: "./infografica_traductor_scl_1772216833429.png",
        color: "primary",
        icon: <Zap size={48} />
    },
    {
        id: 3,
        title: "ARQUITECTURA ROBUSTA",
        subtitle: "Stack de Ingeniería Moderna",
        description: "Basado en React y Node.js, con persistencia en SQLite. Un puente digital confiable para sistemas S7-1200 y S7-1500.",
        image: "./infografica_arquitectura_bridge_1772216847612.png",
        color: "white",
        icon: <Layers size={48} />
    },
    {
        id: 4,
        title: "WORKSPACE INDUSTRIAL",
        subtitle: "Entorno Premium",
        description: "Editor basado en Monaco Engine con validadores sintácticos integrados. Preparado para exportación directa a fuentes externas (.scl).",
        image: "./infografica_entorno_ingenieria_1772216864177.png",
        color: "cyan",
        icon: <Monitor size={48} />
    }
];

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        if (currentSlide === slides.length - 1) {
            onEnter();
        } else {
            setCurrentSlide(s => s + 1);
        }
    };

    const prevSlide = () => {
        setCurrentSlide(s => Math.max(0, s - 1));
    };

    return (
        <div className="landing-presentation bg-dark text-white h-screen w-screen overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 right-0 border-r border-t border-white-10 w-64 h-64 -translate-y-1/2 translate-x-1/2 rounded-full"></div>
                <div className="absolute bottom-0 left-0 border-l border-b border-white-10 w-96 h-96 translate-y-1/2 -translate-x-1/2 rounded-full"></div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                    className="h-full w-full flex flex-col lg:flex-row"
                >
                    {/* CONTENT AREA */}
                    <div className="flex-1 flex flex-col justify-center p-12 lg:p-24 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="flex items-center gap-4 mb-8 text-cyan">
                                {slides[currentSlide].icon}
                                <div className="h-px w-24 bg-white-10"></div>
                                <span className="font-black text-xs uppercase tracking-[0.4em]">Slide 0{currentSlide + 1}</span>
                            </div>

                            <h3 className="text-cyan font-black text-sm uppercase tracking-widest mb-4">
                                {slides[currentSlide].subtitle}
                            </h3>
                            <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter">
                                {slides[currentSlide].title}
                            </h1>
                            <p className="text-gray-400 text-lg lg:text-xl max-w-lg mb-12 leading-relaxed">
                                {slides[currentSlide].description}
                            </p>

                            <div className="flex items-center gap-6">
                                <button
                                    onClick={nextSlide}
                                    className="px-10 py-5 bg-cyan text-black font-black uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-2xl shadow-cyan/30"
                                >
                                    {currentSlide === slides.length - 1 ? "LANZAR WORKSPACE" : "CONOCER MÁS"}
                                    <ArrowRight size={20} />
                                </button>

                                {currentSlide > 0 && (
                                    <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-white-10 flex items-center justify-center hover:bg-white-5 transition-all">
                                        <ArrowLeft size={20} />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* VISUAL AREA */}
                    <div className="flex-1 h-[50vh] lg:h-full bg-black-10 relative overflow-hidden flex items-center justify-center">
                        <motion.div
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="relative z-10 w-[80%] h-[70%] rounded-3xl overflow-hidden border border-white-10 shadow-[0_0_100px_rgba(0,0,0,0.5)]"
                        >
                            <img src={slides[currentSlide].image} className="w-full h-full object-cover" alt="Slide Visual" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-dark/40 to-transparent"></div>
                        </motion.div>

                        {/* Decorative grid */}
                        <div className="absolute inset-0 grid-helper opacity-10"></div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Progress indicators at bottom */}
            <div className="absolute bottom-12 left-12 lg:left-24 flex items-center gap-4">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1 transition-all duration-300 rounded-full ${i === currentSlide ? 'w-12 bg-cyan' : 'w-4 bg-white-10'}`}
                    />
                ))}
            </div>

            <div className="absolute bottom-12 right-12 lg:right-24 text-[10px] items-center text-gray-700 font-bold uppercase tracking-widest hidden lg:flex gap-8">
                <span>© 2026 Siemens Logic Bridge</span>
                <div className="w-1 h-1 bg-white-10 rounded-full"></div>
                <span>Leo Hidalgo Velasquez</span>
            </div>
        </div>
    );
};

export default LandingPage;
