import React from 'react';
import Editor from '@monaco-editor/react';

// Define SCL Language for Monaco
const sclDefinition = {
    keywords: [
        'IF', 'THEN', 'ELSE', 'ELSIF', 'END_IF',
        'CASE', 'OF', 'END_CASE',
        'FOR', 'TO', 'BY', 'DO', 'END_FOR',
        'WHILE', 'END_WHILE',
        'REPEAT', 'UNTIL', 'END_REPEAT',
        'CONTINUE', 'EXIT', 'RETURN',
        'VAR', 'VAR_INPUT', 'VAR_OUTPUT', 'VAR_IN_OUT', 'VAR_TEMP', 'VAR_STAT', 'END_VAR',
        'TYPE', 'STRUCT', 'END_STRUCT', 'END_TYPE',
        'FUNCTION_BLOCK', 'FUNCTION', 'DATA_BLOCK', 'ORGANIZATION_BLOCK', 'END_FUNCTION_BLOCK', 'END_FUNCTION', 'END_DATA_BLOCK', 'END_ORGANIZATION_BLOCK',
        'AND', 'OR', 'XOR', 'NOT', 'MOD',
        'TRUE', 'FALSE', 'NULL'
    ],
    operators: [
        '=', '<>', '<', '>', '<=', '>=', ':=', '+', '-', '*', '/', '**', '=>'
    ],
    tokenizer: {
        root: [
            [/[a-zA-Z_][\w]*/, {
                cases: {
                    '@keywords': 'keyword',
                    '@default': 'identifier'
                }
            }],
            { include: '@whitespace' },
            [/[{}()\[\]]/, '@brackets'],
            [/[<>!=]=?/, 'operator'],
            [/:=/, 'operator'],
            [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
            [/\d+/, 'number'],
            [/[;,.]/, 'delimiter'],
            [/"([^"\\]|\\.)*"/, 'string'],
            [/'([^'\\]|\\.)*'/, 'string'],
        ],
        whitespace: [
            [/[ \t\r\n]+/, 'white'],
            [/\/\*/, 'comment', '@comment'],
            [/\/\/.*$/, 'comment'],
            [/\(\*.*?\*\)/, 'comment'],
        ],
        comment: [
            [/[^\/*]+/, 'comment'],
            [/\/\*/, 'comment', '@push'],
            ["\\*/", 'comment', '@pop'],
            [/[\/*]/, 'comment']
        ],
    },
};

interface SCLEditorProps {
    value: string;
    onChange: (value: string | undefined) => void;
    height?: string;
}

const SCLEditor: React.FC<SCLEditorProps> = ({ value, onChange, height = "600px" }) => {
    const handleEditorWillMount = (monaco: any) => {
        // Register SCL if not already registered
        if (!monaco.languages.getLanguages().some((lang: any) => lang.id === 'scl')) {
            monaco.languages.register({ id: 'scl' });
            monaco.languages.setMonarchTokensProvider('scl', sclDefinition);

            monaco.languages.setLanguageConfiguration('scl', {
                comments: {
                    lineComment: '//',
                    blockComment: ['/*', '*/'],
                },
                brackets: [
                    ['(', ')'],
                    ['[', ']'],
                    ['{', '}'],
                ],
                autoClosingPairs: [
                    { open: '{', close: '}' },
                    { open: '[', close: ']' },
                    { open: '(', close: ')' },
                    { open: '"', close: '"' },
                    { open: "'", close: "'" },
                ],
            });
        }
    };

    return (
        <div className="border border-gray-800 rounded-lg overflow-hidden shadow-2xl">
            <Editor
                height={height}
                defaultLanguage="scl"
                theme="vs-dark"
                value={value}
                onChange={onChange}
                beforeMount={handleEditorWillMount}
                options={{
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', monospace",
                    minimap: { enabled: true },
                    scrollBeyondLastLine: false,
                    lineNumbers: 'on',
                    roundedSelection: true,
                    padding: { top: 20 },
                    automaticLayout: true,
                }}
            />
        </div>
    );
};

export default SCLEditor;
