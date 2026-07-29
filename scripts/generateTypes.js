import { compile } from 'json-schema-to-typescript'
import fs from 'node:fs'

const schemaUrl = 'https://fewsdocs.deltares.nl/webservices/wms/schemas/wms'

const options = {
  bannerComment: '/* tslint:disable */',
  style: {
    singleQuote: true,
    semi: false,
  },
}

const wmsSchemas = [
  {
    url: `${schemaUrl}/pi_wms_get_capabilities.json`,
    output: 'src/response/getCapabilitiesResponse.ts',
  },
  {
    url: `${schemaUrl}/pi_wms_legend.json`,
    output: 'src/response/getLegendGraphicResponse.ts',
  },
]

const generateTypes = async (schemas) => {
  for (const schema of schemas) {
    try {
      const response = await fetch(schema.url)
      const data = await response.json()
      const ts = await compile(data, schema.output, options)
      fs.writeFileSync(schema.output, ts)
    } catch (error) {
      console.error(`Error processing file ${schema.url}: ${error}`)
    }
  }
}

const type = process.argv[2]

const run = async () => {
  if (type === 'wms') {
    await generateTypes(wmsSchemas)
  } else {
    console.error('Invalid argument. Use "wms".')
  }
}

await run()
