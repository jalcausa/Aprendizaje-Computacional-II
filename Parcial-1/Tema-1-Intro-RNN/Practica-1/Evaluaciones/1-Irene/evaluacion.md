# Evaluación de la práctica — Irene

## Aspecto 1 — Algoritmos de aprendizaje estudiados

**Respuesta: Adam, SGD y RMSprop.**

Se comparan los tres optimizadores sobre MNIST; Adam también se utiliza en los cambios de arquitectura, épocas y tamaño de lote.

## Aspecto 2 — Configuraciones distintas estudiadas

**Respuesta: 9 configuraciones distintas (10 entrenamientos comparados).**

La tabla reúne el modelo original y nueve experimentos: 64/256 neuronas, 10/20 épocas, SGD/RMSprop y lotes de 32/64/128. «Batch 32» reproduce los hiperparámetros del original, por lo que no añade una configuración distinta, aunque se entrene de nuevo.

## Aspecto 3 — Exactitud de cada configuración

**Calificación: Sí.**

Se evalúan accuracy de entrenamiento y test para todas las filas de la tabla comparativa; el modelo escogido con 20 épocas alcanza un 97,79 % en test.

## Aspecto 4 — Número de errores

**Calificación: Sí.**

Se cuentan las predicciones incorrectas tanto en entrenamiento como en test para cada experimento; la configuración de 20 épocas registra 105 y 221 errores, respectivamente.

## Aspecto 5 — Matriz de confusión de entrenamiento

**Calificación: Sí.**

Se calcula `confusion_matrix(y_train, ...)` para el modelo original y los experimentales y se representan sus resultados.

## Aspecto 6 — Matriz de confusión de test

**Calificación: Sí.**

También se calculan las matrices con `y_test` y las predicciones de cada modelo.

## Aspecto 7 — Tiempo de entrenamiento

**Calificación: Sí.**

Se cronometra cada ajuste con `time.time()` y se incorpora el tiempo a la comparación; el entrenamiento seleccionado tarda 151,17 s, frente a 37,73 s del original.

## Aspecto 8 — Visualización gráfica y numérica

**Calificación: 4/5.**

Hay tabla numérica con accuracy, errores y tiempo, gráficos comparativos y matrices de confusión. Los ejes permiten apreciar las tendencias, aunque una presentación más compacta de matrices y una comparación explícita del coste frente a la mejora ayudarían a interpretar tantos experimentos.

## Aspecto 9 — Configuración de mejor rendimiento

**Calificación: Sí.**

Identifica Adam, 128 neuronas, 20 épocas y lote por defecto (32) como la configuración de mayor accuracy de test observada (97,79 %, 221 errores).

## Aspecto 10 — Almacenamiento del mejor modelo

**Calificación: Sí.**

Guarda precisamente `model4` en `mejor_modelo_mnist.keras` y después lo vuelve a cargar y evaluar. El archivo `.keras` no forma parte de la entrega examinada; la calificación se refiere a la operación de guardado ejecutada en el notebook.

## Aspecto 11 — Estudio, justificación y criterio de selección

**Calificación: 7/10.**

Las comparaciones aíslan cambios de neuronas, épocas, optimizador y lote, y las conclusiones suelen corresponder a la tabla. Sin embargo, se selecciona el máximo directamente en test sin un conjunto de validación independiente: esto puede sesgar la estimación final. La ganancia respecto al original es de 22 aciertos en 10 000 imágenes, a cambio de aproximadamente cuatro veces más tiempo; convendría justificar si compensa ese coste y vigilar la diferencia entre entrenamiento y test.

## Retroalimentación global

Trabajo amplio y bien documentado, con todas las métricas solicitadas y verificación de carga del modelo. Para reforzarlo, seleccionar hiperparámetros mediante validación y reservar test solo para la evaluación final; explicitar además el compromiso entre precisión y tiempo.
