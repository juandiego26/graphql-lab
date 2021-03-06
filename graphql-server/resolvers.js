const Curso = require('./models/Curso')
const Profesor = require('./models/Profesor')

// los resolvers es como el controlador en el MVC
const resolvers = {
  Query: {
    cursos: () => Curso.query().eager('[profesor, comentarios]'),
    profesores: () => Profesor.query().eager('cursos'),
    curso: (rootValue, args) => Curso.query().eager('[profesor, comentarios]').findById(args.id),
    profesor: (rootValue, args) => Profesor.query().eager('cursos').findById(args.id),
    buscar: (_, args) => {
      return [
        Profesor.query().findById(11),
        Curso.query().findById(11)
      ]
    }
  },

  ResultadoBusqueda: {
    // __resolveType: (obj) => {
    // //  console.log(obj)
    // if (obj.nombre) return 'Profesor'
    // return 'Curso'
    // }
    __resolveType: obj => obj.nombre ? 'Profesor' : 'Curso'
  },

  Mutation: {
    profesorAdd: async (_, args) => {
      //console.log(args)
      const profesorAdded = await Profesor.query().insert(args.profesor)
      return profesorAdded
    },

    profesorEdit: async (_, args) => {
      const profesorEdited = await Profesor.query().patchAndFetchById(args.profesorId, args.profesor)
      return profesorEdited
    },

    // profesorDelete: (_, args) => {
    //   return Profesor.query().findById(args.profesorId).then((profesor) => {
    //     return Profesor.query().deleteById(args.profesorId).then(() => profesor)
    //   })
    // }

    /** Con Async Await**** */
    profesorDelete: async (_, args) => {
      const profesorDeleted = await Profesor.query().findById(args.profesorId)
      const deletedRows = await Profesor.query().deleteById(args.profesorId)
      if (deletedRows > 0) return profesorDeleted
      throw new Error(`El profesor con id: ${args.profesorId} no se pudo eliminar`)
    },

    cursoAdd: async (_, args) => {
      //console.log(args)
      const cursoAdded = await Curso.query().insert(args.curso)
      return cursoAdded
    },

    cursoEdit: async (_, args) => {
      const cursoEdited = await Curso.query().patchAndFetchById(args.cursoId, args.curso)
      return cursoEdited
    },

    cursoDelete: async (_, args) => {
      const cursoDeleted = await Curso.query().findById(args.cursoId)
      await Curso.query().deleteById(args.cursoId)
      return cursoDeleted
    }
  }
}

module.exports = resolvers
