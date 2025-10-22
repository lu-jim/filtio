// vite.config.ts
import tailwindcss from "file:///home/luarch/filtio/node_modules/@tailwindcss/vite/dist/index.mjs";
import { defineConfig } from "file:///home/luarch/filtio/node_modules/vite/dist/node/index.js";
import react from "file:///home/luarch/filtio/node_modules/@vitejs/plugin-react/dist/index.js";
import RubyPlugin from "file:///home/luarch/filtio/node_modules/vite-plugin-ruby/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    tailwindcss(),
    RubyPlugin(),
    react()
  ],
  resolve: {
    alias: {
      "@": "/app/frontend"
    }
  },
  server: {
    host: "192.168.10.10",
    // replace with the IP address of the Homestead machine
    hmr: {
      host: "192.168.10.10"
      // replace with the IP address of the Homestead machine
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9sdWFyY2gvZmlsdGlvXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9sdWFyY2gvZmlsdGlvL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2x1YXJjaC9maWx0aW8vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSAnQHRhaWx3aW5kY3NzL3ZpdGUnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IFJ1YnlQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tcnVieSdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHRhaWx3aW5kY3NzKCksXG4gICAgUnVieVBsdWdpbigpLFxuICAgIHJlYWN0KClcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6ICcvYXBwL2Zyb250ZW5kJ1xuICAgIH1cbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogJzE5Mi4xNjguMTAuMTAnLCAvLyByZXBsYWNlIHdpdGggdGhlIElQIGFkZHJlc3Mgb2YgdGhlIEhvbWVzdGVhZCBtYWNoaW5lXG4gICAgaG1yOiB7XG4gICAgICAgIGhvc3Q6ICcxOTIuMTY4LjEwLjEwJywgLy8gcmVwbGFjZSB3aXRoIHRoZSBJUCBhZGRyZXNzIG9mIHRoZSBIb21lc3RlYWQgbWFjaGluZVxuICAgIH1cbn0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyTyxPQUFPLGlCQUFpQjtBQUNuUSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsT0FBTyxnQkFBZ0I7QUFFdkIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsWUFBWTtBQUFBLElBQ1osV0FBVztBQUFBLElBQ1gsTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUs7QUFBQSxJQUNQO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBO0FBQUEsSUFDTixLQUFLO0FBQUEsTUFDRCxNQUFNO0FBQUE7QUFBQSxJQUNWO0FBQUEsRUFDSjtBQUNBLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
