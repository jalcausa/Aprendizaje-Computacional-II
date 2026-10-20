# Evaluación de la práctica 3 — Alejandro

## Aspecto 1 — Configuraciones distintas estudiadas

**Número de configuraciones: 8 (7 arquitecturas distintas).**

Todas con Adam, lote 64 y la semilla 42 fijada antes de cada modelo:
- C1: MLP (Flatten → Dense 128).
- C2: Conv 32 sin pooling.
- C3: Conv 32 + MaxPool.
- C4: dos bloques Conv 32/64 + MaxPool.
- C5: C4 con Dropout 0,25/0,4.
- C6: BatchNorm + Dropout.
- C7: estilo VGG, con dos convoluciones por bloque, y 5 épocas.
- C8: la misma arquitectura que C7, pero con 10 épocas.

C7 y C8 solo difieren en las épocas. El conjunto forma una escalera de menos a más complejidad que incluye la referencia MLP.

## Aspecto 2 — Configuración con la mejor clasificación

**Calificación: Sí.**

Se identifica `C8_CNN_Optima_VGG_E10`: [Conv 32 `same` → Conv 32 → MaxPool → Dropout 0,25] → [Conv 64 `same` → Conv 64 → MaxPool → Dropout 0,25] → Dense 128 → Dropout 0,4 → Dense 10. Tiene 271 210 parámetros y se entrena 10 épocas con Adam y lote 64. Logra un 99,33 % en test (67 errores) y un 99,70 % en train (183 errores). La arquitectura y las métricas se resumen tanto en la sección de justificación como en la de guardado.

## Aspecto 3 — Visualización gráfica y numérica

**Calificación: 4/5.**

Se incluye:
- Una tabla con parámetros, épocas, tiempo, accuracy y errores de cada configuración.
- Un gráfico de barras de accuracy de train frente a test (con las épocas de cada modelo).
- Un gráfico de errores frente a tiempo con los parámetros en las etiquetas.
- La tasa de error por dígito del mejor modelo.
- Sus matrices de confusión de train y test, y el informe de clasificación tras recargarlo.

Puntos débiles:
- No hay curvas de aprendizaje: el historial de `fit` se descarta (`verbose=0`) y no existe partición de validación, así que no se ve la evolución por época ni el sobreajuste.
- Solo se muestran matrices del mejor modelo.
- En el primer gráfico la leyenda tapa las barras de C8.
- El texto afirma que no hay «desequilibrios sistemáticos sobre ninguna de las 10 clases», pero su propio gráfico muestra al 7 (1,46 %) y al 4 (1,32 %) con una tasa de error cuatro o cinco veces mayor que la del 0 y la del 2 (0,31 % y 0,29 %), sin analizar las confusiones.

## Aspecto 4 — Almacenamiento del mejor modelo

**Calificación: Yes.**

`mejor_modelo.save('mejor_modelo_cnn_mnist.keras')` guarda la variable que el bucle de entrenamiento actualiza con la mejor configuración, que resulta ser C8. Se imprime el tamaño (3,16 MB), se recarga con `load_model` y se comprueba que el resultado es idéntico (99,33 % y 67 errores). Además se imprime el informe de clasificación por dígito. El `.keras` no viene adjunto.

## Aspecto 5 — Estudio, posibles mejoras y criterio de selección

**Calificación: 5/10.**

El diseño es una escalera razonable que parte de un MLP: se añaden una convolución, el pooling, la profundidad, Dropout, BatchNorm y bloques VGG, con parámetros y tiempo registrados. Las cifras del texto son correctas (257→67 errores, −73,93 %; 2,77 M→225 k parámetros, −91 %; 122→83 errores con Dropout).

Puntos a mejorar:
- **Sin validación:** no hay conjunto de validación ni para vigilar el entrenamiento ni para elegir. La selección es `acc_te > mejor_acc_test`, es decir, directamente por test. El 99,33 % es una estimación optimista, porque el test ya se ha usado para decidir. Habría que reservar una partición de validación (y quizá usar parada temprana).
- **El ganador tiene el doble de épocas:** C8 es C7 entrenada 10 épocas en lugar de 5 (78→67 errores), mientras que el resto usa 5. La comparación no es de igual presupuesto. Que 10 épocas den «convergencia óptima del gradiente» no se demuestra: sin historial ni validación no se puede saber si converge, si sobreajusta o si más épocas ayudarían a las demás.
- **Compromiso mal valorado:** se habla de «compromiso perfecto» con «eficiencia de cómputo», pero C8 es la más cara (212 s). C5 logra 83 errores en 39,7 s con 225 k parámetros. Ese equilibrio entre error y coste no se discute y es el que justifica elegir una u otra.
- **BatchNorm sin analizar:** C6 (139 errores, 102 s) es peor que C4 y C5, y su resultado no se comenta, pese a que BN figura entre los objetivos. Además, C6 cambia a la vez el *padding* (`same`) y añade BN en la capa densa, por lo que no aísla el factor. Algo parecido pasa en «pooling frente a sin pooling» (C2 con C3 y C4), que mezcla pooling y profundidad.
- **Ruido:** una sola semilla; las diferencias entre C7, C5 y C8 (78, 83 y 67 errores) están cerca del margen de variación y no se matizan.
- **Alcance:** faltan factores como tamaño de kernel, *stride*, *padding*, optimizador o tasa de aprendizaje.

## Retroalimentación global

Entrega correcta, con una progresión clara desde el MLP, tabla y gráficos comparativos, y el mejor modelo guardado y verificado tras recargarlo. El punto más débil es metodológico: no existe validación, el ganador se elige con el test y entrena el doble de épocas que el resto. Para mejorarlo: añadir una partición de validación con parada temprana y seleccionar con ella, igualar las épocas al comparar, guardar el historial para mostrar curvas de aprendizaje, discutir el compromiso entre errores y tiempo, y analizar el resultado de BatchNorm y las confusiones concretas (4 y 7).
