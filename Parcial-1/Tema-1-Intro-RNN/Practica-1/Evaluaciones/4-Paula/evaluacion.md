# Evaluación de la práctica — Paula

## Aspecto 1 — Algoritmos de aprendizaje estudiados

**Respuesta: Adam y SGD.**

La prueba 2 cambia Adam por SGD manteniendo 10 épocas y lote 32, lo que permite comparar ambos optimizadores bajo las mismas condiciones.

## Aspecto 2 — Configuraciones distintas estudiadas

**Respuesta: 5 configuraciones distintas.**

Se incluye el ejemplo original (Adam, 5 épocas, lote por defecto 32) y cuatro pruebas: Adam/10 épocas/lote 32, SGD/10/32, Adam/10/256 y Adam/12/64. Solo las cuatro últimas figuran en la tabla final.

## Aspecto 3 — Exactitud de cada configuración

**Calificación: Sí.**

Se llama a `evaluate` sobre entrenamiento y test para cada prueba y se resumen ambas accuracies; la cuarta logra un 97,67 % en test.

## Aspecto 4 — Número de errores

**Calificación: Sí.**

Para las cuatro pruebas se cuentan discrepancias en entrenamiento y test. La seleccionada presenta 185 errores de entrenamiento y 233 de test.

## Aspecto 5 — Matriz de confusión de entrenamiento

**Calificación: Sí.**

Se obtiene con `confusion_matrix(y_train, y_pred_train...)` y se representa para cada una de las cuatro pruebas.

## Aspecto 6 — Matriz de confusión de test

**Calificación: Sí.**

Se calcula y representa junto a la matriz de entrenamiento para cada prueba.

## Aspecto 7 — Tiempo de entrenamiento

**Calificación: Sí.**

Se cronometra `fit` y se resumen los tiempos: 79,24 s, 74,83 s, 18,84 s y 56,62 s para las pruebas 1 a 4, respectivamente. No hay cronómetro explícito para el ejemplo original.

## Aspecto 8 — Visualización gráfica y numérica

**Calificación: 4/5.**

Incluye matrices de ambos conjuntos por prueba y tabla comparativa con accuracy, errores, pérdida y tiempo, además de gráficos de comparación. Sería útil incorporar el ejemplo original a la tabla y mostrar curvas de entrenamiento/validación para sustentar la discusión de sobreajuste.

## Aspecto 9 — Configuración de mejor rendimiento

**Calificación: Sí.**

Selecciona la prueba 4: Adam, 12 épocas y lote 64, con 97,67 % de accuracy y 233 errores de test, el máximo de accuracy entre las cuatro pruebas de la tabla.

## Aspecto 10 — Almacenamiento del mejor modelo

**Calificación: Sí.**

La celda de guardado usa `model4.save('mejor_modelo_mnist.keras')`, es decir, el modelo identificado como ganador. El archivo resultante no está incluido en la carpeta de la entrega revisada.

## Aspecto 11 — Estudio, justificación y criterio de selección

**Calificación: 6/10.**

Se comparan cambios controlados y se razonan diferencias de coste, precisión y pérdida. La elección de la prueba 4 concuerda con el máximo observado de test, pero su ventaja sobre la prueba 3 es de solo 6 aciertos de 10 000 (233 frente a 239) a cambio de 56,62 s frente a 18,84 s. Además, el salto entre accuracy de entrenamiento (99,69 %) y test (97,67 %) no sustenta afirmar sin reservas que «no existe sobreajuste». Falta validación separada para seleccionar hiperparámetros sin usar test y justificar con más rigor el compromiso precisión/tiempo.

## Retroalimentación global

Entrega completa en métricas y guardado, con comparación clara entre cuatro pruebas. Revisaría la afirmación sobre ausencia de sobreajuste y definiría de antemano si se prioriza accuracy o eficiencia: la mejora marginal de la prueba 4 cuesta aproximadamente tres veces el tiempo de la prueba 3.
