import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'ec7i89',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  "component": {
    "devServer": {
      "framework": "next",
      "bundler": "webpack"
    }
  }
})