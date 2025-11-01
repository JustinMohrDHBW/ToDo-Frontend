import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: './openapi/open-api-spec.yaml',
  output: {
    format: 'prettier',
    path: './src/api'
  }
});