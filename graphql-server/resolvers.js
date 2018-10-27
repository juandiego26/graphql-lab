const Curso = require('./models/Curso')
const Profesor = require('./models/Profesor')

// los resolvers es como el controlador en el MVC
const resolvers = {
  Query: {
    cursos: () => Curso.query().eager('[profesor, comentarios]'),
    profesores: () => Profesor.query().eager('cursos'),
    curso: (rootValue, args) => Curso.query().eager('[profesor, comentarios]').findById(args.id),
    profesor: (rootValue, args) => Profesor.query().eager('cursos').findById(args.id)
  },
  Mutation: {
    profesorAdd: (_, args) => {
      //console.log(args)
      return Profesor.query().insert(args.profesor)
    },
    profesorEdit: (_, args) => {
      return Profesor.query().patchAndFetchById(args.profesorId, args.profesor)
    },
    // profesorDelete: (_, args) => {
    //   return Profesor.query().findById(args.profesorId).then((profesor) => {
    //     return Profesor.query().deleteById(args.profesorId).then(() => profesor)
    //   })
    // }
    /** Con Async Await**** */
    profesorDelete: async (_, args) => {
      const profesorDeleted = await Profesor.query().findById(args.profesorId)
      await Profesor.query().deleteById(args.profesorId)
      return profesorDeleted
    }
    /** Manejando errores */
    // profesorDelete: async (_, args) => {
    //   const deletedProfessor = await Profesor.query().findById(args.profesorId)
    //   const deletedRows = await Profesor.query().deleteById(args.profesorId)
    //   if (deletedRows > 0) {
    //     return deletedProfessor
    //   } else {
    //     throw new Error(`El profesor con id: ${args.profesorId} no se pudo eliminar :(`)
    //   }
    // },
  }
}

module.exports = resolvers
