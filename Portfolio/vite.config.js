// filepath: c:\Users\Kaden\OneDrive\Desktop\Code.hehe\Portfolio\Portfolio\vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
});
