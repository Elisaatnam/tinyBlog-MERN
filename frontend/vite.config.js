import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 9899,
		proxy: {
			"/api": { target: "http://localhost:9898", changeOrigin: true },
		},
	},
});
