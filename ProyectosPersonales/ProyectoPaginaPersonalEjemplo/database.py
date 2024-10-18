import sqlite3

# Crear/Conectar a la base de datos
conn = sqlite3.connect('contactos.db')
c = conn.cursor()

# Crear tabla para almacenar los datos de contacto
c.execute('''
CREATE TABLE IF NOT EXISTS contactos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    apellidos TEXT NOT NULL,
    email TEXT NOT NULL,
    telefono TEXT NOT NULL,
    mensaje TEXT NOT NULL
)
''')

# Función para insertar datos en la base de datos
def insertar_contacto(nombre, apellidos, email, telefono, mensaje):
    with conn:
        c.execute("INSERT INTO contactos (nombre, apellidos, email, telefono, mensaje) VALUES (?, ?, ?, ?, ?)",
                  (nombre, apellidos, email, telefono, mensaje))

# Función para obtener todos los contactos
def obtener_contactos():
    c.execute("SELECT * FROM contactos")
    return c.fetchall()

# Ejemplo de cómo insertar datos (este código sería reemplazado con datos del formulario)
insertar_contacto("Juan", "Pérez", "juan@example.com", "123456789", "Me interesa tu trabajo.")

# Cerrar la conexión
conn.commit()
conn.close()
