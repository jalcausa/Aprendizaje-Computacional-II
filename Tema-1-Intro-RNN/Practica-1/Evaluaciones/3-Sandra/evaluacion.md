# Evaluación de la práctica — Sandra

## Aspecto 1 — Algoritmos de aprendizaje estudiados

**Respuesta: Adam, SGD y RMSprop.**

Además de contrastar estos tres optimizadores, se prueba Adam con una tasa de aprendizaje de 0,05.

## Aspecto 2 — Configuraciones distintas estudiadas

**Respuesta: 12 configuraciones experimentales distintas (13 si se cuenta el ejemplo inicial sin validación).**

Se entrenan variantes de épocas (5/10), lote (16/32/1024), tasa de aprendizaje, activación (ReLU/sigmoid/tanh) y neuronas (16/128/512). El experimento de lote 1024 contiene dos pruebas y el de activación otras dos; la numeración de encabezados repite «Experimento 6», pero las configuraciones sí son distintas.

## Aspecto 3 — Exactitud de cada configuración

**Calificación: Sí.**

Cada prueba llama a `model.evaluate` para entrenamiento y test y guarda sus salidas en el notebook; falta consolidarlas en una única tabla de comparación.

## Aspecto 4 — Número de errores

**Calificación: Sí.**

La función `numeroErroresMatrizConfusion` cuenta las discrepancias en test y se llama para todas las pruebas; no se calcula el recuento de errores de entrenamiento.

## Aspecto 5 — Matriz de confusión de entrenamiento

**Calificación: No.**

La función de matrices solo predice sobre `x_test` y compara con `y_test`. Aunque se evalúe la accuracy de entrenamiento, no se genera su matriz de confusión.

## Aspecto 6 — Matriz de confusión de test

**Calificación: Sí.**

Se calcula y representa con un mapa de calor para cada configuración experimental.

## Aspecto 7 — Tiempo de entrenamiento

**Calificación: Sí.**

Cada experimento mide el intervalo alrededor de `fit` e imprime los segundos transcurridos; por ejemplo, 38,42 s en la prueba base y 21,73 s con lote 1024 y 20 épocas.

## Aspecto 8 — Visualización gráfica y numérica

**Calificación: 3/5.**

Las curvas de accuracy y pérdida, las matrices de test y los tiempos y errores impresos permiten examinar cada prueba. Falta una tabla o gráfica comparativa conjunta y las matrices de entrenamiento requeridas; la numeración duplicada dificulta seguir los resultados.

## Aspecto 9 — Configuración de mejor rendimiento

**Calificación: Sí.**

Las conclusiones distinguen una opción «más equilibrada» (Adam, 128 neuronas, ReLU, lote 32 y 5 épocas) y otra «más eficiente» (lote 1024 y 20 épocas). No identifican con claridad el mejor resultado por accuracy de test: la prueba Adam de 10 épocas da 250 errores, frente a 317 en la base y 300 con lote 1024/20.

## Aspecto 10 — Almacenamiento del mejor modelo

**Calificación: No.**

No aparece ninguna llamada a `model.save` o equivalente. Además se reutiliza la variable `model`, por lo que al final contiene el último modelo entrenado, no necesariamente uno de los recomendados.

## Aspecto 11 — Estudio, justificación y criterio de selección

**Calificación: 5/10.**

Hay variedad de experimentos y explicaciones plausibles sobre tamaño de lote, convergencia y sobreajuste, pero algunas conclusiones no concuerdan con las cifras: 1024/20 no iguala en errores a la base (300 frente a 317, sí la supera ligeramente) y el modelo de 10 épocas mejora a ambos con 250. Tampoco se define por anticipado qué peso tienen tiempo y accuracy para escoger el «mejor», se consulta test para comparar variantes y faltan métricas de entrenamiento detalladas y un guardado verificable.

## Retroalimentación global

Buen abanico de pruebas y visualizaciones individuales. Conviene reunir los resultados en una tabla, incorporar matrices de entrenamiento, precisar el criterio de selección mediante validación y guardar explícitamente el modelo elegido; en particular, revisar la recomendación final frente a los 250 errores de la prueba de 10 épocas.
