import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  Save, Plus, Trash2, Cpu, Download, Code2, Zap, Search, Layout, HelpCircle, ArrowRight, FileText
} from 'lucide-react';
import SCLEditor from './components/SCLEditor';
import LogicTranslator from './components/LogicTranslator';
import LandingPage from './components/LandingPage';
import { SCL_TEMPLATES } from './templates';

const API_BASE = 'http://localhost:3001/api';

interface Program {
  id: string;
  title: string;
  type: 'FB' | 'FC' | 'DB' | 'OB';
  content: string;
  description: string;
  updatedAt: string;
}

function App() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [currentProgram, setCurrentProgram] = useState<Partial<Program>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [view, setView] = useState<'landing' | 'dashboard' | 'editor' | 'help'>('landing');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => { fetchPrograms(); }, []);

  const fetchPrograms = async () => {
    try {
      const res = await axios.get(`${API_BASE}/programs`);
      setPrograms(res.data);
    } catch (err) { console.error(err); }
  };

  const handleSave = async () => {
    if (!currentProgram.title) return alert('⚠️ Error: El bloque debe tener un nombre.');
    setIsSaving(true);
    try {
      if (selectedId) {
        await axios.put(`${API_BASE}/programs/${selectedId}`, currentProgram);
      } else {
        const res = await axios.post(`${API_BASE}/programs`, currentProgram);
        setSelectedId(res.data.id);
      }
      await fetchPrograms();
    } catch (err) { console.error(err); }
    finally { setIsSaving(false); }
  };

  const createNew = () => {
    setSelectedId(null);
    setCurrentProgram({
      title: 'Nuevo_Bloque',
      type: 'FB',
      content: 'FUNCTION_BLOCK "Nuevo_Bloque"\nVERSION : 0.1\n\nBEGIN\nEND_FUNCTION_BLOCK',
    });
    setView('editor');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith('.scl')) {
      return alert('⚠️ ERROR: Solo archivos .scl externos de TIA Portal.');
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      let type: any = 'FB';
      if (content.includes('FUNCTION_BLOCK')) type = 'FB';
      else if (content.includes('FUNCTION')) type = 'FC';
      else if (content.includes('DATA_BLOCK')) type = 'DB';

      try {
        const res = await axios.post(`${API_BASE}/programs`, {
          title: file.name.replace('.scl', ''),
          type,
          content,
          description: 'Importado de TIA Portal'
        });
        await fetchPrograms();
        setSelectedId(res.data.id);
        setCurrentProgram(res.data);
        setView('editor');
      } catch (err) { console.error(err); }
    };
    reader.readAsText(file);
  };

  const filteredPrograms = useMemo(() =>
    programs.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [programs, searchQuery]
  );

  const validateSCL = (code: string) => {
    const errors = [];
    if (!code.includes('BEGIN') && code.includes('FUNCTION_BLOCK')) errors.push('Falta bloque BEGIN');
    if (code.includes('IF') && !code.includes('END_IF')) errors.push('IF sin cerrar (END_IF)');
    if (code.includes('CASE') && !code.includes('END_CASE')) errors.push('CASE sin cerrar (END_CASE)');
    if (code.includes('FOR') && !code.includes('END_FOR')) errors.push('FOR sin cerrar (END_FOR)');

    // Check for missing semicolons on assignment lines
    const lines = code.split('\n');
    lines.forEach((line, i) => {
      const trimmed = line.trim();
      if (trimmed.includes(':=') && !trimmed.endsWith(';') && !trimmed.endsWith('DO') && !trimmed.endsWith('THEN')) {
        errors.push(`Línea ${i + 1}: Falta ";" al final`);
      }
    });

    return errors;
  };

  const validationErrors = useMemo(() => validateSCL(currentProgram.content || ''), [currentProgram.content]);

  if (view === 'landing') {
    return <LandingPage onEnter={() => setView('dashboard')} />;
  }

  return (
    <div className="app-layout">
      {/* 1. TOP NAVBAR */}
      <header className="navbar">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white">
            <Cpu size={18} />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xs tracking-widest text-white uppercase leading-none">Siemens Logic Bridge</span>
            <span className="text-xs text-cyan font-bold mt-1 tracking-widest uppercase">SCL Environment 1.0</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-black-40 rounded-full border border-white-5 text-xs font-bold text-gray-500">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan"></div>
            STATUS: PLC_SYNCHRONIZED
          </div>
        </div>
      </header>

      {/* 2. SIDEBAR NAVIGATION */}
      <aside className="sidebar-nav">
        <div className="px-6 mb-6">
          <button onClick={createNew} className="action-btn btn-solid w-full justify-center py-3">
            <Plus size={16} /> NUEVO BLOQUE
          </button>
        </div>

        <nav className="flex-1">
          <div onClick={() => setView('dashboard')} className={`nav-item ${view === 'dashboard' ? 'active' : ''}`}>
            <Layout size={18} /> Panel General
          </div>
          <div onClick={() => setView('editor')} className={`nav-item ${view === 'editor' ? 'active' : ''}`}>
            <Code2 size={18} /> Editor y Traductor
          </div>
          <div onClick={() => setView('help')} className={`nav-item ${view === 'help' ? 'active' : ''}`}>
            <HelpCircle size={18} /> Guía Paso a Paso
          </div>
        </nav>

        <div className="px-6 pt-6 border-t border-white-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-black text-gray-600 uppercase tracking-widest">Librería Local</p>
            <span className="text-xs bg-white-5 px-2 py-1 rounded text-gray-500">{programs.length}</span>
          </div>
          <div className="relative mb-3">
            <Search className="absolute left-2 top-2 text-gray-700" size={12} />
            <input
              type="text"
              placeholder="Filtrar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black-20 border border-white-5 rounded py-2 pl-7 pr-2 text-xs outline-none focus:border-cyan text-white"
            />
          </div>
          <div className="space-y-1 max-h-60 overflow-y-auto">
            {filteredPrograms.length === 0 ? (
              <p className="text-xs text-gray-700 italic text-center py-4">Sin bloques</p>
            ) : (
              filteredPrograms.map(p => (
                <div
                  key={p.id}
                  onClick={() => { setSelectedId(p.id); setCurrentProgram(p); setView('editor'); }}
                  className={`flex items-center justify-between p-2 rounded text-xs cursor-pointer group transition-all ${selectedId === p.id ? 'bg-white-5 text-white' : 'text-gray-500 hover:bg-white-5'}`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <FileText size={14} className={p.type === 'FB' ? 'text-cyan' : 'text-primary'} />
                    <span className="truncate font-bold">{p.title}</span>
                  </div>
                  <Trash2
                    size={13}
                    className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all"
                    onClick={(e) => { e.stopPropagation(); if (confirm('¿Borrar?')) axios.delete(`${API_BASE}/programs/${p.id}`).then(fetchPrograms); }}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </aside>

      {/* 3. WORKSPACE AREA */}
      <main className="workspace grid-helper">

        {/* DASHBOARD VIEW */}
        {view === 'dashboard' && (
          <div className="p-10 max-w-4xl mx-auto">
            <div className="mb-10">
              <h1 className="text-4xl font-black mb-3 tracking-tight">Gestión de Ingeniería Siemens</h1>
              <p className="text-gray-500 text-sm max-w-2xl">Entorno profesional para la traducción de lógica KOP a SCL y la preparación de bloques para TIA Portal.</p>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-10">
              <div className="card-panel p-6 flex flex-col items-center">
                <span className="text-xs text-gray-500 uppercase font-black mb-1">Total Bloques</span>
                <span className="text-3xl font-black text-cyan">{programs.length}</span>
              </div>
              <div className="card-panel p-6 flex flex-col items-center col-span-2">
                <span className="text-xs text-gray-500 uppercase font-black mb-1">Última Modificación</span>
                <span className="text-sm font-bold text-white uppercase truncate w-full text-center">
                  {programs[0]?.title || 'Sin actividad'}
                </span>
                <span className="text-[10px] text-gray-600 font-bold uppercase mt-1">
                  {programs[0] ? new Date(programs[0].updatedAt).toLocaleString() : '-'}
                </span>
              </div>
            </div>

            <div className="flex gap-8">
              <div className="flex-1 card-panel flex flex-col justify-center items-center text-center p-12">
                <div className="w-16 h-16 bg-white-5 rounded-2xl flex items-center justify-center text-primary mb-6">
                  <Code2 size={32} />
                </div>
                <h3 className="text-xl font-black mb-2 uppercase tracking-tight">Editor SCL Activo</h3>
                <p className="text-gray-500 text-sm mb-8 px-4">Crea lógica estructurada desde cero o usa el traductor.</p>
                <button onClick={() => setView('editor')} className="action-btn btn-solid px-8 py-3">Ir al Workspace <ArrowRight size={16} /></button>
              </div>

              <div className="flex-1 card-panel flex flex-col justify-between p-8 border-dashed">
                <div>
                  <h3 className="text-xs font-black text-gray-600 uppercase tracking-widest mb-6">Acciones Rápidas</h3>
                  <div className="flex flex-col gap-4">
                    <label className="flex items-center gap-4 p-5 bg-black-30 rounded-2xl border border-white-5 cursor-pointer hover:bg-black-40 transition-all">
                      <div className="w-10 h-10 rounded-xl bg-white-5 flex items-center justify-center text-cyan">
                        <Download className="rotate-180" size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Importar Bloque</p>
                        <p className="text-xs text-gray-500">Subir archivo .scl</p>
                      </div>
                      <input type="file" accept=".scl" onChange={handleImport} className="hidden" />
                    </label>

                    <div onClick={createNew} className="flex items-center gap-4 p-5 bg-black-30 rounded-2xl border border-white-5 cursor-pointer hover:bg-black-40 transition-all">
                      <div className="w-10 h-10 rounded-xl bg-white-5 flex items-center justify-center text-primary">
                        <Plus size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Nuevo Bloque</p>
                        <p className="text-xs text-gray-500">Empezar desde cero</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EDITOR VIEW */}
        {view === 'editor' && (
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between px-8 py-4 border-b border-white-5">
              <div className="flex items-center gap-6">
                <input
                  type="text"
                  value={currentProgram.title || ''}
                  onChange={(e) => setCurrentProgram({ ...currentProgram, title: e.target.value })}
                  placeholder="Nombre_Bloque"
                  className="bg-transparent text-2xl font-black text-white outline-none border-b border-white-5 focus:border-primary w-72 transition-all"
                />
                <select
                  value={currentProgram.type}
                  onChange={(e) => setCurrentProgram({ ...currentProgram, type: e.target.value as any })}
                  className="bg-black-40 border border-white-5 rounded px-3 py-1 text-xs font-black text-gray-500 focus:outline-none"
                >
                  <option value="FB">FB</option>
                  <option value="FC">FC</option>
                  <option value="DB">DB</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                <select
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val) setCurrentProgram({ ...currentProgram, content: (SCL_TEMPLATES as any)[val] });
                  }}
                  className="bg-black-20 border border-white-5 rounded px-4 py-2 text-xs font-black text-gray-700 uppercase tracking-widest outline-none"
                >
                  <option value="">Plantillas</option>
                  <option value="FB_MOTOR">Motor</option>
                  <option value="FC_SCALING">Escalado</option>
                </select>

                <button onClick={handleSave} disabled={isSaving} className="action-btn btn-solid h-10 px-6">
                  <Save size={16} /> {isSaving ? 'Guardando...' : 'GUARDAR'}
                </button>
                <button onClick={() => {
                  const blob = new Blob([currentProgram.content || ''], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a'); a.href = url; a.download = `${currentProgram.title || 'export'}.scl`; a.click();
                }} className="action-btn btn-outline h-10 px-6">
                  <Download size={16} /> EXPORTAR
                </button>
              </div>
            </div>

            <div className="flex-1 flex gap-6 p-6 overflow-hidden">
              <div className="flex-1 bg-[#0a0c10] rounded-2xl overflow-hidden border border-white-5 relative">
                <SCLEditor
                  value={currentProgram.content || ''}
                  onChange={(val) => setCurrentProgram({ ...currentProgram, content: val || '' })}
                  height="100%"
                />
                <div className="absolute top-4 right-4 text-xs font-black bg-cyan text-black px-2 py-1 rounded">EDITOR ACTIVO</div>
              </div>

              <div className="w-80 flex flex-col gap-6">
                <LogicTranslator onTranslate={(code) => setCurrentProgram({ ...currentProgram, content: (currentProgram.content || '') + '\n' + code })} />

                <div className="card-panel bg-black-20 border-white-5 p-4">
                  <h4 className="text-xs font-black text-white uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Zap size={14} className={validationErrors.length > 0 ? 'text-orange-500' : 'text-green-500'} />
                    Validación
                  </h4>
                  {validationErrors.length > 0 ? (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {validationErrors.map((err, i) => (
                        <p key={i} className="text-[10px] text-orange-400 font-bold bg-orange-500/10 p-2 rounded border border-orange-500/20">
                          {err}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] text-green-500 font-bold bg-green-500/10 p-2 rounded border border-green-500/20 uppercase tracking-tighter">
                      ✓ Sintaxis correcta
                    </p>
                  )}
                </div>

                <div className="flex-1 card-panel bg-black-20 flex flex-col items-center justify-center text-center p-6 border-dashed">
                  <Zap className="text-cyan mb-4" size={24} />
                  <h4 className="text-white font-bold mb-2 text-sm uppercase">Traductor SCL</h4>
                  <p className="text-xs text-gray-500 leading-tight">Cruce de lógica instantáneo para bloques Siemens.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HELP VIEW */}
        {view === 'help' && (
          <div className="p-10 max-w-4xl mx-auto">
            <h1 className="text-5xl font-black mb-8 text-center">Guía de Uso</h1>
            <div className="flex flex-col gap-6">
              <div className="card-panel border-l-4 border-primary">
                <h3 className="font-bold text-white mb-2">Importar Archivos</h3>
                <p className="text-sm text-gray-500">Debes generar una "Fuente externa" en TIA Portal (.scl) para poder subirla aquí.</p>
              </div>
              <div className="card-panel border-l-4 border-cyan">
                <h3 className="font-bold text-white mb-2">Traductor de Lógica</h3>
                <p className="text-sm text-gray-500">Usa el panel del editor para pasar lógica de contactos a SCL escribiendo: Logica = Salida.</p>
              </div>
              <button onClick={() => setView('dashboard')} className="action-btn btn-solid w-full justify-center py-4">VOLVER AL PANEL</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
