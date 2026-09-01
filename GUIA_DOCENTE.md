# Guía breve para el docente

Este archivo contiene las claves del ejercicio. Si el repositorio será entregado
directamente al alumnado, puede mantenerse en una rama separada o eliminarse.

## Mapa de fallas intencionales

| Principio | Evidencia inicial | Refactorización esperada |
| --- | --- | --- |
| SRP | `OrderService` valida, calcula, cobra, persiste, notifica e imprime | Extraer colaboradores con responsabilidades concretas |
| OCP | El descuento usa una cadena `if/else` por tipo de cliente | Crear estrategias o políticas de descuento extensibles |
| LSP | `PickupService` hereda de `ShippingService` y lanza al programar | Modelar entrega y retiro con contratos válidos, composición o capacidades distintas |
| ISP | `PaymentProcessor` exige reembolso y reporte a efectivo | Separar pago, reembolso e informes en interfaces pequeñas |
| DIP | `OrderService` instancia base de datos, correo y envío | Inyectar abstracciones desde el punto de composición |

## Secuencia sugerida

Una sesión de 90 a 120 minutos puede dividirse así:

1. Ejecutar y leer el sistema: 10 minutos.
2. Identificar fallas en parejas: 15 minutos.
3. Refactorizar SRP y OCP: 25 minutos.
4. Refactorizar LSP e ISP: 20 minutos.
5. Aplicar DIP y crear dobles de prueba: 20 minutos.
6. Puesta en común: 10 minutos.

## Extensiones opcionales

- Agregar clientes `student` sin editar el calculador de descuentos.
- Agregar transferencia bancaria con pago y reembolso, pero sin informes.
- Probar que el caso de uso invoca persistencia y notificación usando fakes.
- Quitar los comentarios `Falla intencional` para una versión más desafiante.

## Evaluación sugerida (10 puntos)

- Identificación razonada de las cinco fallas: 2 puntos.
- Conservación del comportamiento y pruebas verdes: 2 puntos.
- Aplicación correcta de los cinco principios: 5 puntos.
- Claridad de nombres, commits y explicación final: 1 punto.

No evalúe por cantidad de interfaces. Una solución pequeña, comprensible y fácil
de extender es preferible a una jerarquía innecesaria.
