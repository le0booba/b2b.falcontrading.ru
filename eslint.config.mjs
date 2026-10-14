import nextConfig from 'eslint-config-next';

const config = [
  ...nextConfig,
  {
    ignores: ['.next/**', '.next-dev/**', 'out/**', 'build/**', 'next-env.d.ts', 'node_modules/**'],
  },
];

export default config;

