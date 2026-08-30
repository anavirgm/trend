from personas.estudiante import Estudiante
from personas.empleado import Empleado, Gerente, Director
from servicios.nomina import ServicioNomina

ana = Estudiante("Ana", "E-01", "Sistemas")
carlos = Empleado("Carlos", "EMP-01", 1000)
marta = Gerente("Marta", "GER-01", 2000, 500)       # Cobra 2500
roberto = Director("Roberto", "DIR-01", 3000, 2000) # Cobra 3000 + (2000 * 0.15) = 3300

# Lista de quienes cobran sueldo
lista_empleados = [carlos, marta, roberto]

# Ejecutar el servicio
ServicioNomina.pagar_a_todos(lista_empleados)