import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { readFileSync, existsSync } from 'fs'

// 🏢 Enterprise Workspace Resolution Plugin
// Handles ALL workspace imports without aliases
function enterpriseWorkspaceResolver(): Plugin {
  return {
    name: 'enterprise-workspace-resolver',
    enforce: 'pre', // Run before other resolvers
    resolveId(id: string) {
      console.log(`🔍 Resolving: ${id}`)

      // Handle all @layera/ workspace packages
      if (id.startsWith('@layera/')) {
        const parts = id.split('/')
        const packageName = parts[1] // e.g., 'tokens', 'buttons', etc.
        const subpath = parts.slice(2).join('/') || '' // e.g., 'css', 'src/index', etc.

        const packageDir = resolve(__dirname, `../../packages/${packageName}`)
        const packageJsonPath = resolve(packageDir, 'package.json')

        console.log(`🏢 Processing: ${id} -> package: ${packageName}, subpath: "${subpath}"`)

        if (!existsSync(packageJsonPath)) {
          console.warn(`❌ Package not found: ${id}`)
          return null
        }

        try {
          // 🏢 ENTERPRISE PRIORITY: Always src for development
          if (subpath === '' || subpath === 'index') {
            const srcPath = resolve(packageDir, 'src/index.ts')
            if (existsSync(srcPath)) {
              console.log(`✅ Enterprise SRC resolved: ${id} -> ${srcPath}`)
              return srcPath
            }
          }

          // Handle CSS exports specifically
          if (subpath === 'css') {
            const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
            const exportPath = packageJson.exports?.['./css']
            if (exportPath) {
              const resolvedPath = resolve(packageDir, exportPath.replace('./', ''))
              console.log(`✅ Enterprise CSS resolved: ${id} -> ${resolvedPath}`)
              return resolvedPath
            }
          }

        } catch (error) {
          console.warn(`❌ Error resolving workspace package ${id}:`, error)
        }
      }

      return null
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), enterpriseWorkspaceResolver()],
  assetsInclude: ['**/*.json'],
  define: {
    'process.env': {},
    global: 'globalThis',
  },
  server: {
    port: 3004,
    host: true,
  },
  resolve: {
    alias: {
      // 🏢 ENTERPRISE: Μόνο local app alias, όλα τα workspace packages μέσω plugin
      '@': resolve(__dirname, './src'),
    },
  },
})