const express = require('express');
const app = express();

const mysql = require('mysql');
const bodyParser = require('body-parser'); /*nos permite leer el thml*/

const PORT = 3030;

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Agregar este middleware para x-www-form-urlencoded

con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "t_usuarios"
});

// Ruta para insertar datos
app.post('/t_usuarios', (req, res) => {
    const { name, address } = req.body; // Se espera que name y address sean parte del cuerpo de la solicitud.
    if (!name || !address) {
        return res.status(400).send('Faltan campos requeridos: name o address');
    }
    
    const sql2 = "INSERT INTO t_usuarios (id, nombre, cedula, contacto, servicio, fecha, hora, correo) VALUES (?, ?)";
    con.query(sql2, [name, address], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al insertar los datos');
        }
        res.send("Inserción satisfactoria, ID: " + result.insertId);
    });
});

// Ruta para listar datos
app.get('/t_usuarios', (req, res) => {
    const sql3 = "SELECT * FROM t_usuarios";
    con.query(sql3, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Ruta para modificar datos
app.put('/t_usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { name, address } = req.body;
    const sql4 = "UPDATE t_usuarios SET nombre = ?, direccion = ? WHERE id = ?";
    con.query(sql4, [name, address, id], (err, result) => {
        if (err) throw err;
        res.send("Datos modificados");
    });
});

// Ruta para eliminar datos
app.delete('/t_usuarios/:id', (req, res) => {
    const { id } = req.params;
    const sql5 = "DELETE FROM t_usuarios WHERE id = ?";
    con.query(sql5, [id], (err, result) => {
        if (err) throw err;
        res.send("Registro eliminado");
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

