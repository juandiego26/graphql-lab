const { gql } = require('apollo-server-express')
const Curso = require('./models/Curso')
const Profesor = require('./models/Profesor')

const typeDefs = gql`
  """Esto es un curso del sistema"""
  type Curso {
    id: ID!
    titulo: String!
    """Esta es la description"""
    description: String!
    profesor: Profesor
    rating: Float @deprecated(reason: "No creemos más en los puntajes")
    comentarios: [Comentario]
  }

  type Profesor {
    id: ID!
    nombre: String!
    nacionalidad: String!
    genero: Genero
    cursos: [Curso]
  }

  enum Genero {
    MASCULINO
    FEMENINO
  }

  type Comentario {
    id: ID!
    nombre: String!
    cuerpo: String!
  }
  # root type Query donde definimos nuestros endpoints o el routing
  type Query {
    cursos: [Curso]
    profesores: [Profesor]
    curso(id: Int): Curso
    profesor(id: Int): Profesor
  }
`
// los resolvers es como el controlador en el MVC
const resolvers = {
  Query: {
    cursos: () => Curso.query().eager('[profesor, comentarios]'),
    profesores: () => Profesor.query().eager('cursos'),
    curso: (rootValue, args) => Curso.query().eager('[profesor, comentarios]').findById(args.id),
    profesor: (rootValue, args) => Profesor.query().eager('cursos').findById(args.id)
  }
}

module.exports = { typeDefs, resolvers }
