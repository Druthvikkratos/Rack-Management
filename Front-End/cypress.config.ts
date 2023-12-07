import { defineConfig } from 'cypress'
import { Client } from 'pg'

export default defineConfig({
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  fixturesFolder: 'cypress/fixtures',

  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      on("task", {
        async connectDB(query) {
          const client = new Client({
            user: 'postgres',
            host: '192.168.0.123',
            database: 'rackmanagement',
            password: 'postgres',
            port: 5432,
          })
          await client.connect()
           const res = await client.query(query)
           await client.end()
           return res.rows;
        }
      })
      return require('./cypress/plugins/index.ts')(on, config)

    },
    baseUrl: 'http://localhost:4200',
    testIsolation: false,
    experimentalRunAllSpecs: true,
    defaultCommandTimeout: 12_000

  },
})
