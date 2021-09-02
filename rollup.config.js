import path from 'path';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import clear from 'rollup-plugin-clear';

export default [
    {
        plugins: [
            clear({
                targets: [path.resolve(process.cwd(), 'lib')],
            }),
            typescript(),
            terser({
                toplevel: true,
                compress: {
                    passes: 3,
                    pure_getters: true,
                    unsafe: true,
                },
                output: {
                    comments: false,
                },
            }),
        ],
        input: path.resolve(process.cwd(), 'src/index.tsx'),
        output: [
            {
                file: path.resolve(process.cwd(), 'lib/index.cjs'),
                format: 'cjs',
            },
            {
                file: path.resolve(process.cwd(), 'lib/index.js'),
                format: 'es',
            },
        ],
        external: ['react', 'react-dom/server', 'vira-18n'],
    },
];
