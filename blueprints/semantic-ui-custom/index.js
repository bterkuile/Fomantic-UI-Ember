/* eslint-env node */
const config = require('../../config/environment')()
const EOL = require('os').EOL

module.exports = {
  description: 'Installs user-customisable version of fomantic-ui',

  normalizeEntityName() {
  },
  afterInstall(options) {
    this.ui.writeLine('Removing semantic-ui-css')
    return this.removePackageFromProject('semantic-ui-css')
      .then(() => {
        this.ui.writeLine('Adding semantic-ui custom folder to .gitignore')
        return this.insertIntoFile('.gitignore', `
/semantic/*
!/semantic/src/site/*
!/semantic/src/theme.config
`
      )
    }).then(() => {

      this.ui.writeLine('Installing fomantic-ui')
      return this.addPackageToProject('fomantic-ui', config.SEMANTIC_UI_VERSION)

    })

  }
}
