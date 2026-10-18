CREATE DATABASE IF NOT EXISTS hotel_db;

USE hotel_db;

INSERT INTO
    nosotros_miembroequipo (nombre, apellido, foto, githubUrl)
VALUES
    (
        'Mariano Iván',
        'Battista',
        '/sobre-nosotros/Battista_Mariano_foto.png',
        'https://github.com/Mariano-Battista'
    ),
    (
        'Pablo Emiliano',
        'Gatica',
        '/sobre-nosotros/Gatica_Pablo_foto.png',
        'https://github.com/gatica489-dotcom'
    ),
    (
        'Javier Alexis',
        'Gonzalez',
        '/sobre-nosotros/Gonzalez_Javier_foto.png',
        'https://github.com/Javier4286'
    ),
    (
        'Agustina',
        'Molina',
        '/sobre-nosotros/Molina_Agustina_foto.png',
        'https://github.com/AgusMolina'
    ),
    (
        'Christian',
        'Murua Ayosa',
        '/sobre-nosotros/Murua_Ayosa_Christian_foto.png',
        'https://github.com/cristianmurua18'
    ),
    (
        'Marysol',
        'Ranieri',
        '/sobre-nosotros/Ranieri_Marysol_foto.png',
        'https://github.com/Marysol-web'
    );


-- ROLES DEL SISTEMA DE GESTION HOTELERA

-- ID 1: Administrador
-- ID 2: Usuario estándar

INSERT INTO usuarios_rol (id, nombre)
VALUES
    (1, 'Administrador'),
    (2, 'Estándar')
ON DUPLICATE KEY UPDATE
    nombre = VALUES(nombre);

-- Usuario ADMIN

INSERT INTO
	usuarios_usuario (dni, nombre, apellido, correo, telefono, contrasena, id_rol_id)
VALUES
	(
		'12312312',
        'Carlos',
        'Perez',
        'admin@mail.com',
        '3510000000',
        '12312312',
        1
    );