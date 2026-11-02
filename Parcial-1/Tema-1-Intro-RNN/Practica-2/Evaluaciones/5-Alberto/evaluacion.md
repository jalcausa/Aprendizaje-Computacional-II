# Evaluación de la práctica — Alberto

## Aspecto 1 — Configuraciones distintas estudiadas

**Calificación: Sí (2 configuraciones experimentales; 3 si se cuenta el modelo base).**

El modelo base adaptado (Dense 128 + sigmoide, 5 épocas) se evalúa solo con `evaluate` y obtiene un 98,47 % en test. A continuación se entrenan dos experimentos: Exp1, con Dense 256 y 20 épocas, y Exp2, con 256 → Dropout 0,2 → 128 → Dropout 0,2 y 20 épocas. Todos usan Adam y lote 32.

## Aspecto 2 — Configuración con la mejor clasificación

**Calificación: Sí.**

Se señala el experimento 2 (con Dropout) como mejor modelo, con un 98,94 % en test y 106 errores. La conclusión no resume su configuración completa, y el comentario de la celda de guardado habla de «Experimento 1: 512 neuronas», que no corresponde a ningún experimento realizado.

## Aspecto 3 — Almacenamiento del mejor modelo

**Calificación: Sí.**

Se guarda `model_exp2`, se recarga desde disco y se comprueba que la exactitud en test coincide (98,94 %). El nombre `mejor_modelo_mnist.keras`, heredado de la práctica 1, es poco descriptivo para este problema.

## Aspecto 4 — Estudio, posibles mejoras y criterio de selección

**Calificación: 4/10.**

La semilla se fija antes de cada modelo, la función de evaluación calcula accuracy, errores, matrices de entrenamiento y test y tiempo, y la carga del modelo guardado se verifica.

Puntos a mejorar:
- Hay muy pocas pruebas y cada una cambia varias cosas: Exp1 modifica neuronas y épocas respecto a la base, y Exp2 añade a la vez una capa y Dropout.
- La base no se evalúa con la misma función y no hay tabla ni gráfico comparativos.
- Exp1 muestra un sobreajuste marcado (19 errores en entrenamiento frente a 113 en test) que no se comenta. La diferencia con Exp2 es de solo 7 imágenes (113 frente a 106).
- La afirmación de que es «casi imposible conseguir un mejor resultado» no está respaldada: no se prueban validación, parada temprana ni otras variantes.
- El análisis de matrices de confusión (9 confundido con 4 y 7, 8 con 3 y 5…) procede de la práctica de 10 clases. Las matrices aquí son 2×2 Par/Impar y no permiten ver esas confusiones; además, algunas de ellas, como 9↔7, ni siquiera serían errores de paridad.
- Se selecciona por test y se entrenan 20 épocas sin ninguna partición de validación.

## Retroalimentación global

Las métricas, el guardado y la verificación del modelo son correctos, pero el estudio comparativo es escaso y parte de la conclusión no corresponde a este problema. Para mejorarlo: incluir la base en la comparación con las mismas métricas, cambiar un factor cada vez, añadir una tabla resumen, usar validación (o parada temprana) para elegir la configuración y adaptar el análisis de errores a la clasificación par/impar.
