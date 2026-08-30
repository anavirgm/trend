from personas.persona import Persona

class Empleado(Persona):
    def __init__(self, nombre: str, identificacion: str, salario_base: float):
        super().__init__(nombre, identificacion)
        self.salario_base = salario_base

    def mostrar_rol(self) -> str:
        return "Empleado"

    def calcular_salario(self) -> float:
        return self.salario_base

class Gerente(Empleado):
    def __init__(self, nombre: str, identificacion: str, salario_base: float, bono: float):
        super().__init__(nombre, identificacion, salario_base)
        self.bono = bono

    def mostrar_rol(self) -> str:
        return "Gerente"

    # POLIMORFISMO
    def calcular_salario(self) -> float:
        return self.salario_base + self.bono

class Director(Empleado):
    def __init__(self, nombre: str, identificacion: str, salario_base: float, acciones: float):
            super().__init__(nombre, identificacion, salario_base)
            self.acciones = acciones

    def mostrar_rol(self) -> str:
            return "Director"

    # POLIMORFISMO
    def calcular_salario(self) -> float:
        return self.salario_base + (self.acciones * 0.15)