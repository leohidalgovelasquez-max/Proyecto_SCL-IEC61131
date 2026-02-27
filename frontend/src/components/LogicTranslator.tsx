import React, { useState } from 'react';
import { Wand2, ArrowRight, Info } from 'lucide-react';

interface LogicTranslatorProps {
    onTranslate: (sclCode: string) => void;
}

const LogicTranslator: React.FC<LogicTranslatorProps> = ({ onTranslate }) => {
    const [input, setInput] = useState('');

    const [error, setError] = useState<string | null>(null);

    const handleTranslate = () => {
        setError(null);
        if (!input.includes('=')) {
            return setError('Formato inválido: Te falta el signo "=" para asignar la salida.');
        }

        const lines = input.split('\n');
        let generatedScl = '';

        lines.forEach(line => {
            const trimmedLine = line.trim();
            if (!trimmedLine) return;

            if (trimmedLine.toLowerCase().startsWith('network')) {
                generatedScl += `// ${trimmedLine.toUpperCase()}\n`;
            } else if (trimmedLine.includes('=')) {
                const parts = trimmedLine.split('=');
                const output = parts[1].trim();
                const logic = parts[0].trim();

                // Advanced Regex Tokenizer
                // Identifies: Operators (AND, OR, NOT), Parentheses ( ), or Variables (words)
                const tokens = logic.match(/AND|OR|NOT|\(|\)|[a-zA-Z_]\w*/gi) || [];

                const processedLogic = tokens.map(token => {
                    const t = token.toUpperCase();
                    if (['AND', 'OR', 'NOT', '(', ')'].includes(t)) return t;
                    // Add # to variables if not already present
                    return token.startsWith('#') ? token : `#${token}`;
                }).join(' ')
                    .replace(/\( /g, '(')
                    .replace(/ \)/g, ')');

                const formattedOutput = output.startsWith('#') ? output : `#${output}`;
                generatedScl += `${formattedOutput} := ${processedLogic};\n`;
            }
        });

        if (generatedScl) {
            onTranslate(generatedScl);
            setInput('');
        } else {
            setError('No se pudo generar código válido. Revisa el formato.');
        }
    };

    return (
        <div className="bg-card border border-white-5 rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
                <Wand2 className="text-cyan" size={20} />
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Traductor KOP → SCL</h3>
            </div>

            <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Describe tus segmentos de TIA Portal. El asistente los convertirá al estándar SCL de Siemens automáticamente.
            </p>

            <textarea
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(null); }}
                placeholder="Ejemplo:&#10;Network 1&#10;(Start OR Auto) AND NOT Paro = Motor_Run"
                className={`w-full h-32 bg-black-40 border ${error ? 'border-red-500' : 'border-white-5'} rounded-xl p-4 text-xs font-mono text-gray-300 focus:border-primary outline-none transition-all placeholder:text-gray-700`}
            />

            {error && (
                <div className="flex items-center gap-2 bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-[10px] text-red-500 font-bold uppercase tracking-tighter">
                    <Info size={12} />
                    {error}
                </div>
            )}

            {!error && (
                <div className="flex items-center gap-2 bg-black-20 p-3 rounded-lg border border-white-5 text-xs text-cyan">
                    <Info size={14} />
                    <p>Usa operadores (AND, OR, NOT).</p>
                </div>
            )}

            <button
                onClick={handleTranslate}
                className="w-full flex items-center justify-center gap-2 btn-solid py-3 rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg font-black text-xs uppercase"
            >
                Traducir a SCL
                <ArrowRight size={16} />
            </button>
        </div>
    );
};

export default LogicTranslator;
