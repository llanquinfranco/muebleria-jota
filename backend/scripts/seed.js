require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const productos = require("../data/productos");

const usuariosIniciales = [
    {
        username: "Admin Jota",
        email: "admin@jota.com",
        passwordPlain: "admin123",
        rol: "admin",
    },
    {
        username: "Cliente Jota",
        email: "cliente@jota.com",
        passwordPlain: "cliente123",
        rol: "cliente",
    },
];

const cargarDatos = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("No se encontró MONGODB_URI en el archivo .env");
        }

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Conectado a MongoDB Atlas");

        let creados = 0;
        let actualizados = 0;

        for (const producto of productos) {
            const { nombre, ...datos } = producto;

            const resultado = await Product.updateOne({ nombre }, { $set: datos, $setOnInsert: { nombre } }, { upsert: true, runValidators: true });

            if (resultado.upsertedCount > 0) {
                creados++;
                console.log(`Producto creado: ${nombre}`);
            } else if (resultado.modifiedCount > 0) {
                actualizados++;
                console.log(`Producto actualizado: ${nombre}`);
            } else {
                console.log(`Sin cambios: ${nombre}`);
            }
        }

        const salt = await bcrypt.genSalt(10);
        let usuariosCreados = 0;
        let usuariosActualizados = 0;

        for (const usuario of usuariosIniciales) {
            const { passwordPlain, ...datosUsuario } = usuario;
            const hashedPassword = await bcrypt.hash(passwordPlain, salt);
            const emailNormalizado = datosUsuario.email.toLowerCase();

            const resultadoUsuario = await User.updateOne(
                { email: emailNormalizado },
                {
                    $set: {
                        username: datosUsuario.username,
                        email: emailNormalizado,
                        password: hashedPassword,
                        rol: datosUsuario.rol,
                    },
                },
                { upsert: true, runValidators: true },
            );

            if (resultadoUsuario.upsertedCount > 0) {
                usuariosCreados++;
                console.log(`Usuario creado: ${emailNormalizado} (${datosUsuario.rol})`);
            } else if (resultadoUsuario.modifiedCount > 0) {
                usuariosActualizados++;
                console.log(`Usuario actualizado: ${emailNormalizado} (${datosUsuario.rol})`);
            } else {
                console.log(`Sin cambios en usuario: ${emailNormalizado}`);
            }
        }

        console.log("\nCarga finalizada");
        console.log(`Productos nuevos: ${creados}`);
        console.log(`Productos actualizados: ${actualizados}`);
        console.log(`Total productos procesados: ${productos.length}`);
        console.log(`Usuarios nuevos: ${usuariosCreados}`);
        console.log(`Usuarios actualizados: ${usuariosActualizados}`);
    } catch (error) {
        console.error("Error al cargar productos:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

cargarDatos();
