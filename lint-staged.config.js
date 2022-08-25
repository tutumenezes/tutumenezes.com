/*
 * Quanto atualizamos p o Next 12.2, o shell-quote deixou de ser um pacote padrão do Next
 * Então, por enquanto, criamos uma função fake só para ver se ela não é mais necessária
 * Caso contrário a gente instala o shell-quote como devDependency
 */
// const escape = require('shell-quote').quote
const escape = (array) => array[0]

const isWin = process.platform === 'win32'

module.exports = {
  '**/*.{js,jsx,ts,tsx,json,md,mdx,css,html,yml,yaml,scss,sass}': (
    filenames
  ) => {
    const escapedFileNames = filenames
      .map((filename) => `"${isWin ? filename : escape([filename])}"`)
      .join(' ')
    return [
      `prettier --ignore-path='.gitignore' --write ${escapedFileNames}`,
      `git add ${escapedFileNames}`,
    ]
  },
}
