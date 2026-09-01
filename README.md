# Laboratorio SOLID con TypeScript

Una pequeña tienda procesa pedidos, calcula descuentos y costos de entrega,
realiza el cobro, guarda el pedido y envía una confirmación. El programa funciona,
pero su diseño tiene problemas intencionales relacionados con los cinco principios
SOLID.

## Requisitos

- Node.js 20 o superior
- npm

## Cómo ejecutarlo

```bash
npm install
npm start
npm test
```

Durante la refactorización, también conviene ejecutar:

```bash
npm run typecheck
npm run test:watch
```

## Misión

Refactoriza el código aplicando **S.O.L.I.D.** sin cambiar el comportamiento del
sistema. Las pruebas actuales son una red de seguridad: deben permanecer verdes.

No es obligatorio resolver los principios en orden. Haz cambios pequeños y crea
un commit por cada principio aplicado.

## Pistas de exploración

Busca evidencia de estos problemas antes de escribir código:

1. Una clase tiene demasiados motivos para cambiar.
2. Agregar una categoría de cliente obliga a editar lógica existente.
3. Una subclase no puede cumplir las expectativas de su clase base.
4. Una implementación es obligada a ofrecer operaciones que no soporta.
5. La lógica principal construye directamente sus dependencias técnicas.

## Criterios de aceptación

- Todas las pruebas originales continúan pasando.
- `npm run typecheck` no reporta errores.
- Cada clase o módulo tiene una responsabilidad clara.
- Se puede agregar un nuevo descuento sin modificar el calculador principal.
- Ningún subtipo lanza errores solamente porque no puede cumplir el contrato base.
- Las interfaces no obligan a implementar métodos innecesarios.
- Las dependencias externas pueden sustituirse por dobles de prueba.
- Se agregan pruebas para las nuevas abstracciones creadas.

## Restricciones sugeridas

- No cambies los importes ni las reglas actuales.
- No agregues frameworks, base de datos real ni servidor web.
- Evita crear abstracciones que el ejercicio no necesita.

## Estructura inicial

```text
src/
  domain/          Tipos del negocio
  infrastructure/ Detalles de correo y persistencia
  payments/        Procesadores de pago
  services/        Caso de uso principal
  shipping/        Entrega y retiro
tests/             Pruebas de caracterización
```

## Preguntas para la entrega

1. ¿Qué evidencia mostraba la violación de cada principio?
2. ¿Qué cambio hiciste para corregirla?
3. ¿Qué nueva extensión resulta más fácil después de la refactorización?
4. ¿Qué abstracción decidiste no crear y por qué?

> Nota: los comentarios `Falla intencional` facilitan una primera edición del
> laboratorio. El docente puede eliminarlos para aumentar la dificultad.
