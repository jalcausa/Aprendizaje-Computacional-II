# Evaluación de la práctica — Juan Manuel

## Aspecto 1 — Implementación del modelo

**Calificación: 4/5**

La red de una capa oculta está implementada con NumPy, con propagación hacia delante, retropropagación y salida lineal para regresión. No usa ningún framework de aprendizaje automático. Como punto mejorable, `d_output = error` no incluye la normalización del gradiente del MSE por el número de muestras, de modo que la magnitud de la actualización depende del tamaño del conjunto.

## Aspecto 2 — Parametrización y versatilidad

**Calificación: 5/5**

La clase permite configurar los tamaños de entrada, capa oculta y salida, además de la semilla. La tasa de aprendizaje y el número de épocas se pueden modificar directamente en `fit`, por lo que resulta sencillo repetir experimentos.

## Aspecto 3 — Monitorización del entrenamiento

**Calificación: 5/5**

El MSE se calcula y se almacena en `loss_history` en cada época. El método `plot_loss` representa correctamente el historial, con título, ejes, leyenda y cuadrícula.

## Aspecto 4 — Calidad sobre los datos de test

**Calificación: 5/5**

**MSE de test: `0.000563215347`**. Es el menor error de las cinco entregas evaluadas. El resultado es especialmente bueno en la región central no observada durante el entrenamiento, aunque el MSE de entrenamiento (`0.000414532478`) no sea el menor del grupo.

## Aspecto 5 — Reproducibilidad

**Calificación: 5/5**

La inicialización acepta `random_seed` y el experimento utiliza explícitamente `42`. El entrenamiento es de lote completo y no introduce nuevas operaciones aleatorias, por lo que el resultado se reproduce de forma determinista.

## Retroalimentación global

Es una solución funcional, clara y con la mejor generalización del grupo. Como mejoras, convendría normalizar correctamente el gradiente del MSE y hacer más robusta la carga de `data_train.parquet`, ya que la ruta relativa presupone un directorio de ejecución concreto.