# Evaluación de la práctica — Iván

## Aspecto 1 — Algoritmos de aprendizaje estudiados

**Respuesta: SGD, SGD con momento, Adagrad, RMSprop y Adam.**

El barrido de optimizadores compara cinco variantes (cuatro familias de algoritmos, si se agrupan los dos SGD), con tasas de aprendizaje indicadas explícitamente.

## Aspecto 2 — Configuraciones distintas estudiadas

**Respuesta: 26 combinaciones distintas de hiperparámetros, en 32 entrenamientos del estudio.**

Hay siete barridos: 5 tamaños de capa, 4 activaciones, 5 optimizadores, 5 tamaños de lote, 5 límites de épocas, 4 pérdidas y 4 tasas de aprendizaje. Algunas entradas repiten la configuración de referencia; el modelo final la vuelve a entrenar. Es un estudio amplio, aunque no es una búsqueda de todas las combinaciones posibles.

## Aspecto 3 — Exactitud de cada configuración

**Calificación: Sí.**

La función `entrenar` evalúa accuracy en entrenamiento y test para cada ejecución, y las tablas y gráficas comparan esos valores. El modelo final informa de 0,986233 en entrenamiento y 0,9767 en test.

## Aspecto 4 — Número de errores

**Calificación: Sí.**

Se informan errores de ambos conjuntos en cada tabla; el modelo final tiene 826 en entrenamiento y 233 en test. Los obtiene redondeando `(1 - accuracy) × N`, en lugar de contar directamente las discrepancias de las predicciones ya calculadas; sería más exacto usar estas últimas.

## Aspecto 5 — Matriz de confusión de entrenamiento

**Calificación: Sí.**

Se construye con `tf.math.confusion_matrix` en cada entrenamiento, se conserva en los resultados y se dibuja para los casos seleccionados de cada barrido y para el modelo final.

## Aspecto 6 — Matriz de confusión de test

**Calificación: Sí.**

Se calcula del mismo modo en test y se muestran matrices del mejor y peor caso de cada barrido, además del modelo final.

## Aspecto 7 — Tiempo de entrenamiento

**Calificación: Sí.**

Se mide la duración de `fit` para cada prueba y se visualiza en tablas y barras; la prueba final informa de unos 20,22 s. Con parada temprana, los tiempos también dependen del número efectivo de épocas, como reconoce el análisis.

## Aspecto 8 — Visualización gráfica y numérica

**Calificación: 5/5.**

Combina tablas con accuracy, errores, F1 y tiempo; comparativas gráficas de los barridos, curvas de aprendizaje y matrices de confusión de entrenamiento y test. La presentación permite contrastar precisión y coste de forma clara.

## Aspecto 9 — Configuración de mejor rendimiento

**Calificación: Sí.**

Explicita la elección de 128 neuronas, ReLU, Adam a 0,001, lote 32, 5 épocas y entropía cruzada dispersa. La describe como mejor equilibrio entre accuracy, generalización y coste, no como máximo absoluto de test.

## Aspecto 10 — Almacenamiento del mejor modelo

**Calificación: Sí.**

Guarda `final["modelo"]` en `mejor_modelo.keras` tras entrenar y evaluar la configuración elegida; la salida de la celda confirma el guardado. El artefacto `.keras` no está adjunto en la carpeta revisada.

## Aspecto 11 — Estudio, justificación y criterio de selección

**Calificación: 8/10.**

Destacan la variedad de parámetros, el uso de semilla, validación y parada temprana, y la justificación explícita de compromisos entre tiempo y precisión. Es razonable preferir una solución más sencilla ante diferencias pequeñas, pero esa preferencia debería fijarse antes del análisis y contrastarse en varias semillas. Se utilizan repetidamente los resultados de test para escoger valores en cada barrido; lo adecuado sería decidir con validación y consultar test una sola vez al final. Además, el recuento de errores debería derivarse de las predicciones y no de accuracy redondeada.

## Retroalimentación global

Estudio exhaustivo y bien visualizado; se aprecian tanto la precisión como el coste computacional. La mejora principal es proteger el conjunto de test durante la búsqueda de hiperparámetros y comprobar con repeticiones si las diferencias pequeñas son estables.
