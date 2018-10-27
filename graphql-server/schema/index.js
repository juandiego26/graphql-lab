const { gql } = require('apollo-server-express')
const Profesor = require('./Profesor')
const Curso = require('./Curso')

const rootQuery = gql`
  # root type Query donde definimos nuestros endpoints o el routing
  type Query {
    cursos: [Curso]
    profesores: [Profesor]
    curso(id: Int): Curso
    profesor(id: Int): Profesor
  }
  # type Mutation donde definimos los entry points que van a modificar los datos en el servidor
  type Mutation {
    profesorAdd(profesor: NuevoProfesor): Profesor
    profesorEdit(profesorId: Int!, profesor: ProfesorEditable): Profesor
    profesorDelete(profesorId: Int!): Profesor
  }
`
const typeDefs = [rootQuery, Profesor, Curso]

module.exports = typeDefs
