from personas.empleado import Empleado

class ServicioNomina:
    @staticmethod
    def pagar_a_todos(empleados: list[Empleado]):
        print("--- PROCESANDO PAGOS ---")
        for emp in empleados:
            salario = emp.calcular_salario()
            print(f"Pagando a {emp.nombre} ({emp.mostrar_rol()}): ${salario}")