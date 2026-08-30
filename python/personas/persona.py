from abc import ABC, abstractmethod

class Persona(ABC):
    def __init__(self, nombre: str, identificacion: str):
        self.nombre = nombre
        self.identificacion = identificacion

        @abstractmethod
        def mostrar_rol(self) -> str:
            #Obliga a las clases hijas a responder qué rol tienen
            pass