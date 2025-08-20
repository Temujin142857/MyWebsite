import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	define: {
		"process.env": process.env,
	},
	plugins: [vue(), tailwindcss()],
	server:{
		allowedHosts: ["tomionagano.ca"]
	}
});
