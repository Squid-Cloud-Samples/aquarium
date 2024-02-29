import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// });

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.SQUID_APP_ID': JSON.stringify(env.SQUID_APP_ID),
      'process.env.SQUID_DEVELOPER_ID': JSON.stringify(env.SQUID_DEVELOPER_ID),
      'process.env.SQUID_REGION': JSON.stringify(env.SQUID_REGION),
      'process.env.AUTH0_DOMAIN': JSON.stringify(env.AUTH0_DOMAIN),
      'process.env.AUTH0_CLIENT_ID': JSON.stringify(env.AUTH0_CLIENT_ID),
      'process.env.AUDIENCE': JSON.stringify(env.AUDIENCE),

      // If you want to exposes all env variables, which is not recommended
      // 'process.env': env
      plugins: [react()],
    },
  };
});
