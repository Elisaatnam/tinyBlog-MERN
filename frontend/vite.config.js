import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	return {
		plugins: [react()],
		server: {
			port: 9899,
			proxy: {
				"/api": { target: env.VITE_BACKEND_URL, changeOrigin: true },
			},
		},
	};
});
