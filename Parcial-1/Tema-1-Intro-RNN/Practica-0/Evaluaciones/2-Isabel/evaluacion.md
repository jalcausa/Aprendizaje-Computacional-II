# Evaluación de la práctica — Isabel

## Aspecto 1 — Implementación del modelo

**Calificación: 3/5**

La red implementa con NumPy una capa oculta sigmoide, salida lineal y retropropagación, sin frameworks especializados. Sin embargo, el notebook no se puede ejecutar tal como fue entregado: carga `/data_train.csv`, que no está incluido, en vez del Parquet proporcionado. Además, el gradiente usado equivale a una suma de errores y no está normalizado como el MSE que se monitoriza.

## Aspecto 2 — Parametrización y versatilidad

**Calificación: 5/5**

Se pueden ajustar los tamaños de las capas y la semilla al construir el modelo, y la tasa de aprendizaje y las épocas desde `fit`. Los principales hiperparámetros quedan expuestos y son fáciles de cambiar.

## Aspecto 3 — Monitorización del entrenamiento

**Calificación: 5/5**

El MSE se registra en `history_error` en todas las épocas, se informa periódicamente por pantalla y finalmente se representa en una gráfica. También se muestra el ajuste frente a los datos reales.

## Aspecto 4 — Calidad sobre los datos de test

**Calificación: 3/5**

**MSE de test: `0.002994349418`**, tercer resultado entre las cinco entregas. El MSE de entrenamiento llega a `0.000178317238`, pero ampliar el entrenamiento a 35 000 épocas empeora la interpolación central frente a otros modelos, lo que indica cierto sobreajuste.

## Aspecto 5 — Reproducibilidad

**Calificación: 5/5**

Se fija la semilla `42` tanto antes de construir el modelo como dentro de su inicialización. Al utilizar entrenamiento de lote completo, las ejecuciones producen los mismos pesos y predicciones.

## Retroalimentación global

La estructura del modelo y la monitorización son correctas, pero la entrega debería ser ejecutable sin depender de un CSV externo no incluido. Sería recomendable leer directamente el Parquet proporcionado y controlar el sobreajuste mediante validación, menos épocas o regularización.