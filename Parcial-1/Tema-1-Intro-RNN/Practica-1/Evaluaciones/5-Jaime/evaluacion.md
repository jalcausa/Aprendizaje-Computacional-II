# Evaluación de la práctica — Jaime

## Aspecto 1 — Algoritmos de aprendizaje estudiados

**Respuesta: Adam y SGD.**

El ensayo con SGD se contrasta con Adam para la arquitectura de 64 neuronas; el resto de ensayos usa Adam.

## Aspecto 2 — Configuraciones distintas estudiadas

**Respuesta: 7 configuraciones distintas.**

Además del ejemplo inicial con 128 neuronas, se ejecutan seis pruebas: 256 neuronas/5 épocas, 64/5 con Adam, 64/5 con SGD, 64/7, 64/3 y 64/3 con 20 % de validación. El tamaño de lote permanece fijo en 32.

## Aspecto 3 — Exactitud de cada configuración

**Calificación: Sí.**

La función `entrenar_evaluar` calcula accuracy de test para cada prueba y la tabla final reúne las seis cifras; el ejemplo inicial también se evalúa. No se almacena accuracy de entrenamiento en esa tabla, lo que limita la comparación de generalización.

## Aspecto 4 — Número de errores

**Calificación: Sí.**

Se cuentan las predicciones incorrectas de test para cada configuración; por ejemplo, 241 con 256 neuronas y 393 con la configuración elegida. No se resume el número de errores de entrenamiento.

## Aspecto 5 — Matriz de confusión de entrenamiento

**Calificación: Sí.**

Fuera de la función general se predice sobre `x_train` y se dibuja la matriz de entrenamiento para cada uno de los seis experimentos.

## Aspecto 6 — Matriz de confusión de test

**Calificación: Sí.**

Se representan matrices de test para los seis experimentos y también para el modelo inicial.

## Aspecto 7 — Tiempo de entrenamiento

**Calificación: Sí.**

Se cronometra `fit` en cada prueba; la tabla informa de 15,68 s para el modelo guardado y 43,66 s para el ensayo de 256 neuronas. El modelo inicial no se cronometró de la misma forma.

## Aspecto 8 — Visualización gráfica y numérica

**Calificación: 3/5.**

La tabla resume test, errores y tiempo, y los mapas de calor facilitan analizar confusiones. Faltan gráficos comparativos de accuracy/tiempo o curvas de aprendizaje y una tabla con métricas de entrenamiento para detectar sobreajuste de manera sistemática.

## Aspecto 9 — Configuración de mejor rendimiento

**Calificación: Sí.**

Se explicita la elegida: Adam, 64 neuronas, 3 épocas, lote 32 y `validation_split=0.2`, con 96,07 % de accuracy de test. Se presenta como equilibrio entre coste y rendimiento, no como máxima accuracy: de los seis experimentos, es el de menor accuracy de test entre los que usan Adam.

## Aspecto 10 — Almacenamiento del mejor modelo

**Calificación: Sí.**

Guarda `modelo_64neu_3ep_val` en `mejor_modelo_mnist.keras` y la salida de la celda confirma el guardado. Es el modelo declarado como seleccionado, aunque no el de mayor accuracy; el archivo `.keras` no viene adjunto.

## Aspecto 11 — Estudio, justificación y criterio de selección

**Calificación: 5/10.**

La búsqueda incremental y la prioridad de velocidad son razonables, pero el compromiso no está cuantificado: el modelo seleccionado tarda 15,68 s y falla 393 veces, frente a 15,17 s y 316 errores del mismo modelo sin partición de validación. Incluso frente al de 64 neuronas/5 épocas (23,59 s, 276 errores), la pérdida de accuracy es apreciable. Reservar el 20 % para validación, sin usar sus métricas para elegir o aplicar parada temprana, no garantiza por sí solo mejor generalización. La elección se apoya en test y convendría seleccionar con validación, definir un umbral explícito de tiempo/errores y reevaluar tras entrenar con los datos apropiados.

## Retroalimentación global

Las métricas de test, las matrices en ambos conjuntos y el guardado están presentes. La principal mejora es revisar la selección: la opción guardada no demuestra un compromiso superior con los números presentados; convendría usar realmente la validación para decidir, añadir métricas de entrenamiento comparables y justificar el coste de cada acierto perdido.
