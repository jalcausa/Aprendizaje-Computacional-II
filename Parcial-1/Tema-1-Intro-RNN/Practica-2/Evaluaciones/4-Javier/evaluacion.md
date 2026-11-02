# Evaluación de la práctica — Javier

## Aspecto 1 — Configuraciones distintas estudiadas

**Calificación: Sí (2 configuraciones distintas).**

Se compara el modelo de la práctica 1 adaptado a salida binaria (Dense 128 + sigmoide) con una versión modificada (Dense 128 → Dropout 0,2 → Dense 64 → sigmoide). Ambos usan Adam, 5 épocas y lote 32. Es el mínimo para hablar de comparación, por lo que el estudio queda muy limitado.

## Aspecto 2 — Configuración con la mejor clasificación

**Calificación: Sí.**

La conclusión indica que el experimento 2 generaliza mejor que el 1 (98,68 % y 132 errores frente a 98,53 % y 147 errores en test), y es el modelo que se guarda. Convendría cerrar con una frase explícita del tipo «la mejor configuración es…» que reúna todos sus hiperparámetros.

## Aspecto 3 — Almacenamiento del mejor modelo

**Calificación: Sí.**

`model2.save("JavierGarciaVillarraso_ModeloParImpar.keras")` guarda el modelo elegido y la salida confirma el guardado. No se recarga para comprobarlo, y el `.keras` no viene adjunto.

## Aspecto 4 — Estudio, posibles mejoras y criterio de selección

**Calificación: 4/10.**

Hay buenas prácticas de base: semillas y `enable_op_determinism` para reproducir los resultados, accuracy de entrenamiento y test, errores, tiempo, matrices de confusión de ambos conjuntos, curvas de entrenamiento y ejemplos visuales de clasificación.

Puntos a mejorar:
- Solo hay dos alternativas, y la segunda introduce dos cambios a la vez (Dropout y una capa Dense extra), así que no se sabe cuál produce la mejora. Faltan variantes como solo Dropout, solo la capa extra, otras tasas de Dropout o más épocas.
- La reducción del sobreajuste se justifica con curvas de entrenamiento que, en el modelo 2, se miden con Dropout activo. Evaluada sin Dropout, su accuracy de entrenamiento es incluso algo mayor (99,33 % frente a 99,30 %), y la brecha train–test solo baja de 0,77 a 0,65 puntos.
- La diferencia es de 15 imágenes con una sola semilla, y se elige por test sin usar validación.
- Las matrices de confusión no llevan las etiquetas Par/Impar.

## Retroalimentación global

Entrega correcta y reproducible, con todas las métricas básicas y el modelo guardado, pero el estudio comparativo es muy escaso. Para mejorarlo: probar más alternativas cambiando un solo factor cada vez, seleccionar con un conjunto de validación y apoyar la conclusión sobre el sobreajuste en métricas comparables (evaluadas sin Dropout).
