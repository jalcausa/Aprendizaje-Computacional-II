# Evaluación de la práctica — Alejandro

## Aspecto 1 — Implementación del modelo

**Calificación: 5/5**

La MLP se implementa desde cero con NumPy y contiene propagación hacia delante, salida lineal, MSE y retropropagación completa. El gradiente incluye correctamente el factor `2 / n_samples` y las actualizaciones siguen descenso de gradiente.

## Aspecto 2 — Parametrización y versatilidad

**Calificación: 5/5**

Los tamaños de las capas, la tasa de aprendizaje, las épocas y la semilla son parámetros del constructor. Esto concentra la configuración del experimento y permite cambiar los hiperparámetros sin modificar la lógica interna.

## Aspecto 3 — Monitorización del entrenamiento

**Calificación: 5/5**

El error se reinicia y almacena en `loss_history` en cada entrenamiento. `plot_error` genera la gráfica solicitada con etiquetas, título y cuadrícula.

## Aspecto 4 — Calidad sobre los datos de test

**Calificación: 1/5**

**MSE de test: `0.112086765979`**, el mayor error de las cinco entregas. El MSE de entrenamiento (`0.025001205002`) muestra que el modelo apenas ha aprendido la función; en el centro predice aproximadamente `-0.1103` cuando el objetivo está cerca de `0.8673`. La combinación de 10 neuronas y solo 1000 épocas produce subajuste.

## Aspecto 5 — Reproducibilidad

**Calificación: 5/5**

La semilla se parametriza y se fija en `42` al crear el modelo. Como el ajuste es de lote completo y no hay aleatoriedad posterior, el comportamiento es reproducible.

## Retroalimentación global

La implementación está bien planteada, pero la configuración de entrenamiento no consigue un modelo útil. La prioridad sería entrenar durante más épocas y ajustar la tasa de aprendizaje; también merece la pena comparar `tanh` con sigmoide y comprobar numéricamente el MSE antes de dar por finalizado el experimento.