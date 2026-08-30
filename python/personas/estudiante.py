from personas.persona import Persona

class Estudiante(Persona):
    def __init__(self, nombre: str, identificacion: str, carrera: str):
        super().__init__(nombre, identificacion)
        self.carrera = carrera

    def mostrar_rol(self) -> str:
        return f"Estudiante de {self.carrera}"