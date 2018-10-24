const casual = require('casual')

const mocks = {
  Curso: () => {
    return {
      id: casual.uuid,
      titulo: casual.sentence,
      description: casual.sentences(2)
    }
  },
  Profesor: () => {
    return {
      nombre: casual.name,
      nacionalidad: casual.country
    }
  }
}

module.exports = mocks