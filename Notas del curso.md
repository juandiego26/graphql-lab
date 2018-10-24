#### Notas del curso

##### 1 - Origen de GraphQL

Para comenzar debemos entender que GraphQL es un *query language*, es decir, un lenguaje de consultas. Un lenguaje es un sistema compartido por dos partes que les permite comunicarse entre sí.

Un lenguaje de consultas como GraphQL nos permite hacer consultas y esperar una respuesta predecible. Un ejemplo de una lenguaje de consultas es SQL, el cual se enfoca en las consultas a una base de datos.

Aunque suene un poco confuso, SQL no tiene nada que ver con GraphQL, ya que el primero está pensado para trabajar con bases de datos, y GraphQL es para comunicar clientes y servidores.

GraphQL es una herramienta que se presenta como una alternativa a REST. La principal mejora que propone es la optimización, además de trasladar la información del servidor al cliente.

Una de las ventajas más importantes de GraphQL es que es agnóstico de plataforma, lo que quiere decir que se puede implementar en más de 20 lenguajes.

El principal objetivo de GraphQL es evitar las múltiples consultas al servidor.

##### 2 - GraphQL vs Rest

Rest es solo una convención, lo que quiere decir que es solo la manera en que nos ponemos de acuerdo para comunicarnos. Sin embargo, el hecho de que no hay unas reglas establecidas genera que cada uno utilice la convención de la forma que más le convenga y esto hace que no haya un orden establecido.

GraphQL por otro lado, es un lenguaje tipado y validable, por esto conocemos la forma en la que debemos enviar y recibir.

En REST el servidor expone una serie de recursos, mientras que en GraphQL el cliente es quien define qué quiere recibir. Además, REST tiene el problema del overfetching que significa que envía más información de la que se necesita. En GraphQL se envía solo lo necesario.

Al ser un lenguaje tipado, GraphQL es un lenguaje documentado por definición

###### DIFERENCIAS ENTRE REST Y GRAPHQL

**Rest**
Es solo una convención: Es una manera de comunicarse entre el servidor y cliente, cada uno tiene sus reglas.
**GraphQL**
Lenguaje tipado y validable: Le damos una forma de lo que recibe y lo que devolvemos. Ademas que le agrega seguridad

**Rest**
Servidor expone recursos: Los clientes se tienen que adecuarse a como están expuestos
**GraphQL**
El cliente define que recibe: Haciendo una consulta, de la estructura que define como respuesta

**Rest**
Hace overfetching: Envía más información que necesita
**GraphQL**
Envía lo necesario: Se tiene control total de las respuestas que se esperan del servidor

**Rest**
Multiples request por vista: Muy costoso en performance, básicamente es una aplicación en blanco que aún no ha cargado datos o tiene custom endpoints
**GraphQL**
Hace solo un request por vista: Enviados en un solo row

**Rest**
Documentación ajena al desarrollo: No hay un estándar por lo que depende mucho del desarrollador para mantenerla.
**GraphQL**
Documentado por definición: Al ser un lenguaje tipado se define un schema que ya esta documentado por definiciòn.

##### 3 - Schemas

¿Qué es el schema en GraphQL?

Es la columna vertebral de GraphQL y es la manera en la que decidimos a las entidades, cómo se relacionan entre ellas, cuáles son las entidades que están disponibles para cada cliente, en pocas palabras, es todo lo que el cliente puede pedir a través de GraphQL.

Algo que tenemos que saber es que los Schemas están compuestos de Types.

Los types o tipos de datos que pueden usarse en un schema son:

Scalars
Objects
Enums
Interfaces
Unions

##### 4 - Tipo de dato escalar

Los scalars nos van a permitir definir la mayoría de las propiedades de nuestras entidades:

Int - Números enteros
Float - Números decimales
String - Cadenas de texto
Boolean - Verdadero o Falso
ID - Identificador único

Se pueden definir Scalars personalizados, checa estos docs.
http://graphql.org/learn/schema/#scalar-types
http://dev.apollodata.com/tools/graphql-tools/scalars.html

##### 5 - Tipo de dato Object

La segunda clase de types que vamos a ver son los objects, estos son los que nos permiten definir entidades. Es uno de los más importantes para los desarrolladores.

Ejemplo:

```json
type Curso {
  id: ID! // el signo de exclamacion quiere decir que es obligatorio
  description: String
  profesor: [Profesor] // Los corchetes definen una lista, que puede haber mas de una entidad "Profesor"
  rating: Int
}
```

##### 6 - Tipo de dato Enum

El tipo Enum es un type que usamos cuando algo puede adquirir una o varias opciones, una de las cosas que podemos expresar a través de este type es:

```json
enum Genero {
  MASCULINO
	FEMENINO
}
```

##### 7 - Tipo de dato interface

La ventaja de Interface es que nosotros estamos definiendo ciertos campos requeridos y sabemos que todas las implementaciones se van a cumplir. si en un futuro 
necesitáramos que todas las implementaciones de perfil tuvieran un nuevo campo, solamente debemos agregarlo a la Interface

La interfaz (interface) permite una validacióna priori de los datos y tipos mínimos que son requeridos por el nuevo objeto / entidad que la implementa.

Lo que nos garantiza es que al momento de modificarse la interfaz, todos los eschemas que la implementen den un alerta o algo similar para ser revisados
y aplicados los cambios hechos en la interfaz.

Me parece simplemente una estrategia de consistencia de datos. Interesante. Recordemos que hablamos de datos noSQL, noRelacionales …
estructuras de datos complejas basadas en textos …

```json
// Interface
interface Perfil {
  nombre: String!
  mail: String!
}

//Implementaciones de la Interface
type PerfilFB implement Perfil {
  nombre: String!
  mail: String!
  amigos: [Usuario]
}

type PerfilTW implement Perfil {
  nombre: String!
  mail: String!
  handle: String
  seguidores: [Usuario]
}
```



##### 8 - Tipo de dato union

Esta clase de type es un poco más complejo que los demás, por eso te voy a dar un ejemplo para que puedas hacerte una idea de cómo funciona.

Imagina que estás en Facebook y quieres hacer una búsqueda en la barra de búsquedas, cuando ingresas algo de texto automáticamente comienzan a salir 
algunas opciones de personas, lugares, etc. Entonces, si tuviéramos que tirar eso en GraphQL, esto definiría que una búsqueda devuelve un lugar o un evento, 
y lo logramos a través de los union que nos deja agrupar varios tipos en uno solo.

Según este artículo publicado en Medium, y la documentación oficial de GraphQL

Wouldn’t it be great if we could say, “Hey GraphQL, if the search result is a User, then here’s the data I want — but if it’s a Movie, then send this data.”

https://medium.com/the-graphqlhub/graphql-tour-interfaces-and-unions-7dd5be35de0d

Se pudiera interpretar que, union permite definir diferentes posibles tipos (o interfaces) que se esperan como resultado para diferentes tipos objetos 
(o entidades) si alguna de ellas cumple con la condición definida para una búsqueda.

union Busqueda = Amigo | Lugar | Evento | Pagina

##### 9 - Moficadores de type

Existen dos modificadores de tipo:

Requerido: Signo de admiración al final, y significa que ese campo no puede ser null
Corchetes: Para denotar que tenemos una lista de lo que sea que está en medio.
Tenemos también la posibilidad de hacer una lista requerida de la siguiente forma:

[string!]!

String! NOT NULL
[String] LISTA
[String] ! LISTA QUE NO PUEDE SER NULL PERO QUE SIN EMBARGO SUS ELEMENTOS PUEDEN SER NULL
[String!] ! LISTA QUE NO PUEDE SER NULL NI TAMPOCO CONTENER NI UN SOLO ELEMENTO NULL

##### 10 -  Root type query

Podríamos verlos como una analogía a los endpoints que tenemos en una arquitectura .REST.

```js
type Query {
  cursos : [Curso]
  profesores: [Profesor]
  curso(id: String!): Curso
  profesor(id: String!, limite: Int): Profesor
}
```

#####  11 - Root type mutations

Graphql también nos permite hacer modificaciones, y para hacerlas, tenemos un tipo especial de endpoints que se llaman Mutation.
A través de ellos vamos a poder insertar elementos, modificar elementos, borrar elementos, etc.

Type Mutation
Permite definir Insertar, Modificar o Eliminar elementos

```
type Mutation {
	agregarCurso(
		descripcion: String,
		profesorId: String
	): Curso
}
```

##### 12 - Interfaz de GraphQL

GraphiQL es la herramienta que más vamos a utilizar para interactuar con un esquema de GraphQL.
Esta herramienta fue desarrollada por la misma gente de Facebook y nos permite hacer consultas, ver la documentación, interactuar con el esquema de GraphQL
y así entender las queries que vamos a ejecutar.

https://github.com/graphql/graphql-js

##### 13 - Variables Query

Para usar variables es necesario usar la forma completa de la query.

```js
query <nombreQuery>(<$variable>: type = <valor por defecto>) {
	...
}
```

##### 14 - Query Aliases

Uno de los motivos de usar un alias es al momento de pedir varios recursos del mismo Type con diferente ID para que la Key (En este caso curso)
no se pise o se sobre escriba (Graphql no deja que eso pase).

```js
{
  cursoMasVotado: curso(id: 1) {
    titulo
    rating
  }
  cursoMasVisto: curso(id: 2) {
    titulo
    descripcion
  }
}
```

##### 15 - Query Fragments

Los Fragments nos ayudan a abstraer duplicidad de las queries en una declaración que podemos re-utilizar. Si hay que hacer cambios lo hacemos
en un solo lugar (El Fragment) en lugar de hacer cambios a las demas queries una por una.

```js
{
  curso(id: 1) {
    ...CamposNecesarios
  }
  cursos {
    ...CamposNecesarios
  }
}

fragment CamposNecesarios onCurso {
  titulo
  descripcion
}
```

##### 16 - Query Inline Fragments

Con los inline fragments podemos pedir los campos necesarios dependiendo del tipo que devuelvan las Unions o Interfaces cuando no sabemos a qué tipo se resuelven.

##### 17 - Query Directives

Las Directivas nos permiten pedir ciertos valores de una consulta dependiendo de si una variable es true o false.

Existen 2 tipos:

**@include** incluye el campo si el argumento es true.
**@skip** omite el campo si el argumento es true. (revirtiendo la condición)
Declaramos la variable:

```json
{
  "conDescription": true
}
```


Realizamos la consulta:

```json
query Cursos($conDescription: Boolean!) {
  cursos {
    titulo
    descripcion @include(if: $conDescription)
  }
}
```

##### 18 - input types mutation

Los Input Types nos permiten pasar objetos complejos (y/o completos) en las mutaciones de manera sencilla, en lugar de pasar parametro por parametro
vamos a pasar un solo parametro, el Input Type NuevoProfesor.

Implementación del Input Type en server:

```json
input NuevoProfesor {
    nombre: String!
    genero: Genero
}
```


Consulta del lado del cliente:

```json
mutation {
  profesorAdd(profesor: {
    nombre: "Laura"
    genero: FEMENINO
    nacionalidad: "Mexico"
  }) {
    id
  }
}
```

