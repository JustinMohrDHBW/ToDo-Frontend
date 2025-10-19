import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: './openapi/open-api-spec.yaml', // sign up at app.heyapi.dev
  output: {
    format: 'prettier',
    path: './src/api'
  }
});