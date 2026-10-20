# Evaluación de la práctica 3 — Lucía

## Aspecto 1 — Configuraciones distintas estudiadas

**Número de configuraciones: 7.**

Se entrenan siete CNN para clasificar par/impar (salida sigmoide), todas con Adam salvo la 6, 5 épocas, lote 128 y `validation_split=0,2`:
- Exp 1: Conv 32@3×3 → MaxPool → Dense 64 (referencia).
- Exp 2: dos bloques Conv 32/64 + MaxPool + Dropout 0,25, Dense 128 y Dropout 0,5.
- Exp 3: tres `Conv2D` 32/64/128 con BatchNorm (sin sesgo) y Dense 64.
- Exp 4: tipo LeNet-5 (Conv 5×5, `tanh`, AveragePooling).
- Exp 5: Exp 2 con *stride* 2 y *padding* `same`.
- Exp 6: Exp 2 con SGD y momentum 0,9 en lugar de Adam.
- Exp 7: versión ligera (16/32 filtros, Dense 32, Dropout 0,1/0,2).

No se incluye el MLP de las prácticas anteriores como referencia y cada experimento se entrena una sola vez.

## Aspecto 2 — Configuración con la mejor clasificación

**Calificación: Sí.**

Se señala el Exp 2 (profundidad y Dropout) como mejor configuración: 99,40 % de accuracy en test, 60 errores y pérdida de 0,0196, frente a 106–133 errores en el resto. La arquitectura completa está en el índice y en el código, pero la conclusión solo cita el nombre y las métricas. Convendría una frase que reúna todos sus hiperparámetros (Adam, lote 128, 5 épocas).

## Aspecto 3 — Visualización gráfica y numérica

**Calificación: 3/5.**

Tras cada experimento se muestran tiempo, accuracy y pérdida de train y test, errores, dos matrices de confusión (train y test) con las etiquetas Par/Impar y curvas de accuracy y pérdida de entrenamiento/validación. Cada experimento lleva además un comentario escrito.

Puntos débiles:
- No hay ninguna tabla ni gráfico que reúna los 7 experimentos, y el enunciado pide visualizar los resultados comparativos. Hay que ir buscando los números sección a sección.
- No se muestran los parámetros de cada red (no hay `summary()` ni `count_params`).
- Las curvas tienen ejes de época con valores fraccionarios (0,5; 1,5…). En el Exp 3, la pérdida de validación de 2,4 en la primera época aplasta el resto de la curva.

## Aspecto 4 — Almacenamiento del mejor modelo

**Calificación: Yes.**

`model_2.save('mejor_modelo_practica3_mnist.keras')` guarda precisamente el modelo declarado ganador. La celda no imprime nada, aunque el contador de ejecución es consecutivo, así que se ejecutó. Tampoco se recarga el fichero para verificarlo, y el `.keras` no viene adjunto.

## Aspecto 5 — Estudio, posibles mejoras y criterio de selección

**Calificación: 5/10.**

El planteamiento es razonable. Hay un índice que explica qué se estudia en cada experimento y se cubren varios factores (profundidad, Dropout, BatchNorm, LeNet, *stride*/*padding*, optimizador, tamaño de red). Además, hay curvas con validación y un análisis escrito por experimento. La elección del Exp 2 es sólida: la ventaja es grande (60 frente a 106–133 errores) y también es el mejor en sus propias curvas de validación (99,19 %, pérdida 0,0256), aunque el criterio declarado sea el test.

Puntos a mejorar:
- **Criterio:** se selecciona por accuracy y pérdida de test teniendo una partición de validación del 20 %. Habría que elegir con validación y reservar el test para la evaluación final.
- **Factores no aislados:**
  - Del Exp 1 al 2 cambian a la vez la segunda convolución, tres Dropout y Dense 64→128.
  - El Exp 3 añade BatchNorm y dos convoluciones.
  - El Exp 5 cambia *stride* y *padding* juntos y aplica el *stride* 2 además del MaxPooling, de modo que los mapas llegan a 2×2 antes de la capa densa.
  - El Exp 7 cambia filtros, neuronas y Dropout.

  No se puede atribuir cada efecto a un elemento concreto.
- **Sin línea base ni parámetros:** el cuaderno dice partir de la conclusión de la práctica anterior, pero ese modelo no se evalúa. No se mide qué aporta la convolución ni cuánto «ligero» es el Exp 7.
- **Reproducibilidad y ruido:** 5 épocas, una única ejecución, sin parada temprana y sin semilla (no hay `set_random_seed`). Diferencias de pocas imágenes (115, 116 y 121 errores en los Exp 7, 4 y 6) se interpretan como efectos reales, por ejemplo «LeNet parece menos precisa».
- **Afirmaciones no respaldadas por las salidas:**
  - En el Exp 1 los errores no están «equilibrados» entre falsos positivos y negativos: la matriz de test tiene 38 par→impar frente a 92 impar→par.
  - En el Exp 6, `decay=1e-6` no se aplica (la propia salida avisa de que Keras ya no lo admite), y además sería decaimiento de la tasa de aprendizaje, no de pesos.
  - Que SGD «tarda más» se apoya en 19,36 s frente a 15–18 s, dentro del ruido de medida.
  - En el Exp 7 la accuracy de entrenamiento (98,81 %) es prácticamente igual a la de test (98,85 %), lo que apunta a infraajuste y no a que la red ligera «prevenga el sobreajuste».

## Retroalimentación global

Cuaderno ordenado, con un índice claro, análisis escrito de cada experimento, métricas de train y test, matrices etiquetadas y el mejor modelo guardado. Para mejorarlo: añadir una tabla y gráficos que comparen todos los experimentos (con parámetros y tiempo), seleccionar con validación, cambiar un solo factor en cada comparación e incluir un MLP como referencia. También convendría fijar semillas, entrenar con parada temprana y revisar las afirmaciones que no concuerdan con las salidas (equilibrio de errores, `decay` de SGD, tiempos).
