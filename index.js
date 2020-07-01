const server = require('./src/server')
const db = require('./src/lib/db')

async function main () {
  await db.connect()
  console.log('DB connected successfully')
  // arrancar el servidor
  server.listen().then(({ url }) => {
    console.log(`Servidor listo en la URL ${url}`)
  })
}

main()
  .then(() => {
    console.log('All already')
  })
  .catch(err => console.error('Error: ', err))

// Concept of Graphql

// Query
/*
    En un CRUD un query ns permite LEER los registros
    es la forma de extraer la información existente desde la BD o Rest API

    Equivale a un Select de SQL o un GET de una Rest API

    En el query Declaras que campos o Datos vas a requerir para tu consulta
    y tambien soporta parámetros (input)

    El Query en Graphql es universal, por lo tanto es igual en Angular, node, recta o si
    la BD es NoSQL o SQL

    query {
        obtenerProductos{
            id
            nombre
            precio
            stock
        }
    }
*/

// Mutations
/*
    Mutattion se utiliza para la otras 3 acciones del CRUD (actualiar, eliminar y crear registros)

    Similares a un PUT/PATCH, DELETE o POST de una Rest API o un DELETe, UPdATE de SQL

    Igual que ek query son independientes del lenguaje, asi que son iguales si tu backend es
    node, php, o python o si tu BD es dql o NosQL

    muation eliminarProducto($id: ID) {
        eliminarProduct(id:$id)
    }
    {
        "data": {
            "eliminarProduct": "Se eliminó correctamente"
        }
    }
*/

// Schema

/**
Es lo que describe tus tipos de eobjeto, querirs y datos de tu aplicacion.
Query es el unico que es obligatorio en tu schema

El schema en Graphql utilixa un typoing en el que defines si un campo será
de tipo String, int boolan u otro tipo de dato

El schema y el Resolver están muy relacionados, el schema define la forma de los fatos mientrad que el
resolver se encarga de la comunicacion con el lenguaje del servidor y la BD

 -- Esta estructura debe ser similar a la de tu BD

type Client {
    id: ID
    name: String
    lastName: String
    company: String
    emails: [Email]
    age: Int
}

type Email {
    email: String
}

*/

// Resolver

/**
Son funciones que son Responsables de retornar los valores que existen en tu Schema

Queries y mutations por si solos no hacen mucho, requieren de un backend (resolver)
para realizar las operaciones en la BD

Los nombres de los resolvers deben ser iguales a la definidos en el Schema

obtenerClientes: async () => {
    const clients = await Client.find()
    return clients
}

 */
