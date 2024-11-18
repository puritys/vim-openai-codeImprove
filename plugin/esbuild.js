import esbuild from 'esbuild'
import {glob} from "glob"

async function start() {
  console.log("start")
  let files = await glob("*.ts", { ignore: 'node_modules/**' });

  console.log(files)
  esbuild.build({
      entryPoints: files,
      outdir: "dist",
      bundle: true,
      minify: process.env.NODE_ENV === 'production',
      sourcemap: process.env.NODE_ENV === 'development',
      mainFields: ['module', 'main'],
      platform: 'node',
      target: 'node14.17.3'
  })

}

start().catch(e => {
  console.error(e)
})
