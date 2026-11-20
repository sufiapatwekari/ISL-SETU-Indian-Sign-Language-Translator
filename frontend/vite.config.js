
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CERT_DIR = path.resolve(__dirname, '../certs')

export default defineConfig(({ command }) => {
  const keyPath = path.join(CERT_DIR, '10.39.242.125+2-key.pem')
  const certPath = path.join(CERT_DIR, '10.39.242.125+2.pem')

  const hasCertificates =
    fs.existsSync(keyPath) && fs.existsSync(certPath)

  return {
    plugins: [react()],
    server: {
      host: true,
      ...(command === 'serve' && hasCertificates
        ? {
            https: {
              key: fs.readFileSync(keyPath),
              cert: fs.readFileSync(certPath),
            },
          }
        : {}),
    },
  }
})
