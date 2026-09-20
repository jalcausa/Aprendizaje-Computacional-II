# Evaluación de la práctica — Francisco Javier

## Aspecto 1 — Implementación del modelo

**Calificación: 5/5**

La implementación es matemáticamente completa y usa solo NumPy para la red: capa oculta con `tanh`, salida lineal, MSE y retropropagación con el factor `2 / n_samples`. Los signos de las actualizaciones y la derivada de `tanh` son coherentes con descenso de gradiente.

## Aspecto 2 — Parametrización y versatilidad

**Calificación: 5/5**

El constructor permite cambiar dimensiones, número de neuronas y semilla; `fit` expone tasa de aprendizaje, épocas y nivel de detalle. La separación de `forward`, `predict` y `fit` facilita reutilizar y probar el modelo.

## Aspecto 3 — Monitorización del entrenamiento

**Calificación: 5/5**

El MSE se guarda en `loss_history` en cada época, se muestra periódicamente y se representa gráficamente. La segunda gráfica compara de forma ordenada la predicción con los datos de entrenamiento.

## Aspecto 4 — Calidad sobre los datos de test

**Calificación: 2/5**

**MSE de test: `0.008794937909`**, cuarto resultado de las cinco entregas. El MSE de entrenamiento también queda relativamente alto (`0.003119771329`), por lo que el problema principal parece ser un ajuste insuficiente más que sobreajuste.

## Aspecto 5 — Reproducibilidad

**Calificación: 5/5**

El parámetro `random_state` tiene un valor fijo (`42`) y controla la inicialización. El entrenamiento no contiene muestreo ni otras fuentes de aleatoriedad, así que el resultado es determinista.

## Retroalimentación global

El código del modelo es limpio y correcto, pero la configuración elegida no alcanza un ajuste competitivo. Conviene revisar la tasa de aprendizaje y la inicialización, normalizar también el objetivo o probar una arquitectura más pequeña y estable; además, la ruta relativa de los datos depende del directorio desde el que se abra el notebook.