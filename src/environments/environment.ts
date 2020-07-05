// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  HOST: 'https://covid-03-beta.herokuapp.com',
  mapbox: 'pk.eyJ1IjoieGF2aW5vb2IiLCJhIjoiY2s0Mzh4bXZuMDN1NzNpcnJndXVzOXV2MiJ9.IQ7TZdyB6OnCy-8m7mqVhQ',
  API: 'http://localhost:8080',
  TOKEN_AUTH_USERNAME: 'mitomediapp',
  TOKEN_AUTH_PASSWORD: 'mito89codex',
  TOKEN_NAME: 'access_token'
};
