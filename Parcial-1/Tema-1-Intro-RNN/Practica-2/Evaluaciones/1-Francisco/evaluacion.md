# Evaluación de la práctica — Francisco

## Aspecto 1 — Configuraciones distintas estudiadas

**Calificación: Sí (3 configuraciones distintas).**

Se comparan un MLP (Dense 128-64 con Dropout 0,2), una CNN simple (1 `Conv2D` + Dense 64 + Dropout 0,3) y una CNN avanzada (2 `Conv2D` + Dense 128-64 + Dropout 0,4/0,3), todas con salida sigmoide, Adam, lote 64, hasta 10 épocas y parada temprana. No se incluye como referencia el modelo de la práctica 1 adaptado a salida binaria (Dense 128 + sigmoide), por lo que no se mide qué aporta cada cambio respecto al punto de partida.

## Aspecto 2 — Configuración con la mejor clasificación

**Calificación: Sí.**

Se selecciona de forma programática `Alt 3 (CNN Avanzada + Dropout)`, la de mayor accuracy de test (99,25 %, 75 errores), y se describe su arquitectura completa. Usa Adam y lote 64, y la parada temprana detiene el entrenamiento tras 6 épocas.

## Aspecto 3 — Almacenamiento del mejor modelo

**Calificación: Sí.**

`mejor_modelo` se recupera del diccionario de modelos entrenados mediante el índice de la mejor configuración y se guarda en `mejor_modelo_par_impar.keras`; la salida de la celda confirma el guardado. No se recarga el fichero para verificarlo, y el `.keras` no forma parte de la entrega.

## Aspecto 4 — Estudio, posibles mejoras y criterio de selección

**Calificación: 6/10.**

El código está bien organizado: una función crea los modelos y una tabla recoge épocas reales, tiempo, accuracy de entrenamiento y test, pérdida y errores. Se usan validación y parada temprana con restauración de pesos, se muestran las matrices de confusión de entrenamiento y test y el informe de clasificación del ganador, y se razona bien por qué las convoluciones ayudan.

Puntos a mejorar:
- El enunciado propone partir del modelo de la práctica 1 y añadir capas Dense/Dropout. Pasar a CNN es legítimo, pero hay que compararlo con esa línea base.
- Cada alternativa cambia varias cosas a la vez (tipo de capa, número de capas densas, tasa de Dropout). Por eso no se puede atribuir la buena generalización al «Dropout más agresivo» como hace la conclusión.
- Se elige por el máximo de accuracy en test aunque ya existe una partición de validación. Habría que seleccionar por `val_loss`/`val_accuracy` y reservar el test para la evaluación final.
- La ventaja sobre la CNN simple es de 10 imágenes (75 frente a 85) con una sola semilla. Además, la CNN avanzada cuesta unas 5,6 veces más que el MLP (247,7 s frente a 44,4 s) por 59 errores menos, y ese compromiso no se discute. Tampoco se comenta que la CNN simple tarda más que la avanzada solo porque entrena 10 épocas frente a 6.
- Solo se muestran las matrices de confusión del modelo ganador.

## Retroalimentación global

Trabajo claro y bien estructurado, con validación, parada temprana, una tabla comparativa y el guardado correcto del modelo. Para reforzarlo: añadir el modelo base de la práctica 1 como referencia, cambiar un único factor en cada experimento, seleccionar la configuración con validación y discutir el coste computacional frente a la mejora obtenida.
