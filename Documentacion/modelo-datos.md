#este es el modelo de datos usado en el proyecto

##Taller

    {
        _id: ObjectId,
        nombre: String,
        descripcion: String,
        fecha: Date,
        horario: String,
        horarioEspecial: String,
        precio: Number,
        imagen: String,
        estado: String,
        createdAt: Date,
        updatedAt: Date
    }

##Reserva

    {
        _id: ObjectId,
        tallerId: ObjectId,
        cliente: String,
        matricula: String,
        fecha: Date,
        estado: String,
        createdAt: Date,
        updatedAt: Date
    }

##Usuario

    {
        _id: ObjectId,
        email: String,
        password: String,
        nombre: String,
        rol: String,
        createdAt: Date,
        updatedAt: Date
    }