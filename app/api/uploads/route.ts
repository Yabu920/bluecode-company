import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import Busboy from 'busboy'

export const runtime = 'nodejs'

const uploadDir = path.join(process.cwd(), 'public', 'uploads')
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

export async function POST(req: Request) {
  // Busboy-based multipart parsing to work in Node runtime route
  return new Promise((resolve) => {
    const r = req as any
    const headers = r.headers || {}
    const busboy = new Busboy({ headers })
    const files: string[] = []

    busboy.on('file', (_fieldname: any, file: any, filename: string) => {
      const safeName = Date.now() + '-' + filename.replace(/\s+/g, '-')
      const saveTo = path.join(uploadDir, safeName)
      const writeStream = fs.createWriteStream(saveTo)
      file.pipe(writeStream)
      file.on('end', () => files.push(`/uploads/${safeName}`))
    })

    busboy.on('finish', () => {
      resolve(NextResponse.json({ files }))
    })

    // convert body to stream
    const body = r.body
    if (body && typeof body.pipe === 'function') {
      body.pipe(busboy)
    } else {
      // Node's Request body might be a ReadableStream
      const reader = body.getReader()
      const decoder = new TextDecoder('utf-8')
      const chunks: Uint8Array[] = []
      ;(async () => {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          chunks.push(value)
        }
        const buffer = Buffer.concat(chunks.map((c) => Buffer.from(c)))
        busboy.end(buffer)
      })()
    }
  })
}
