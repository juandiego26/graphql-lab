
module.exports = `
  """Esto es un curso del sistema"""
  type Curso {
    id: ID!
    titulo: String!
    """Esta es la description"""
    descripcion: String!
    profesor: Profesor
    rating: Float @deprecated(reason: "No creemos más en los puntajes")
    comentarios: [Comentario]
  }

  type Comentario {
    id: ID!
    nombre: String!
    cuerpo: String!
  }

  input NuevoCurso {
    titulo: String!
    descripcion: String!
    rating: Float
  }

  input CursoEditable {
    titulo: String
    descripcion: String
    rating: Float
  }
`