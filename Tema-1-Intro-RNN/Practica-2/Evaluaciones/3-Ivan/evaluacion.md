# Evaluación de la práctica — Iván

## Aspecto 1 — Configuraciones distintas estudiadas

**Calificación: Sí (10 configuraciones distintas).**

La tabla final recoge 10 configuraciones:
- salida softmax o sigmoide, con y sin Dropout;
- una capa extra de 64 neuronas, con Dropout solo al final o en todas las capas;
- 256-128 con Dropout 0,4 (20 épocas);
- Leaky ReLU (30 épocas);
- red en «embudo» 512-256-64 (20 épocas).

El ejemplo inicial repite la configuración «SoftMax» y no se incluye en la tabla.

## Aspecto 2 — Configuración con la mejor clasificación

**Calificación: Sí.**

Se identifica la «Softmax estilo embudo»: capas 512-256-64 ReLU con Dropout 0,4/0,25/0,2 y salida softmax de 2 neuronas, con Adam, 20 épocas y lote 32 por defecto. Logra un 99,05 % en test con 95 errores. Además, se señala la variante «todos los Dropout» como alternativa más eficiente.

## Aspecto 3 — Almacenamiento del mejor modelo

**Calificación: Sí.**

`mejor_modelo.save('mejor_modelo_par_impar.keras')` guarda precisamente la variable del modelo en embudo. El notebook no conserva los contadores de ejecución y esa celda no produce salida, por lo que no se puede confirmar que se ejecutara. Tampoco se recarga el fichero para verificarlo, y el `.keras` no viene adjunto.

## Aspecto 4 — Estudio, posibles mejoras y criterio de selección

**Calificación: 6/10.**

Es un estudio amplio. La función de evaluación es reutilizable y compatible con sigmoide y softmax, se calculan matrices y errores en ambos conjuntos, y hay una tabla final ordenada y un gráfico de accuracy frente a tiempo. Se reconoce el compromiso entre el modelo en embudo y una alternativa más barata.

Puntos a mejorar:
- **Variabilidad:** el ejemplo inicial, con la misma configuración que «SoftMax», obtiene 109 errores en test, frente a 136 en el experimento. Muchas de las diferencias entre configuraciones (de 10 a 30 errores) quedan dentro de ese ruido. La semilla se fija solo una vez al principio, así que cada resultado depende del orden de ejecución.
- **Comparaciones confundidas:** los modelos 256-128 (20 épocas), Leaky ReLU (30 épocas, y solo en la primera capa) y embudo (20 épocas) se comparan con modelos de 10 épocas, por lo que la mejora no se puede atribuir solo a la arquitectura.
- **Afirmaciones no respaldadas:** se dice que la sigmoide «ha tardado menos», pero los datos muestran lo contrario (63,10 s frente a 58,44 s). El argumento del «fondo blanco» para Leaky ReLU es incorrecto: en MNIST el fondo es negro (valor 0 tras normalizar).
- **Criterio:** se selecciona por accuracy de test sin un conjunto de validación. El modelo en embudo comete 14 errores menos que «todos los Dropout», pero tarda unas 4,2 veces más (293,9 s frente a 70,7 s). Este compromiso se menciona, pero no se incorpora al criterio.

## Retroalimentación global

Trabajo extenso y con buena presentación de resultados, con el mejor modelo correctamente guardado. Para mejorar la validez de las conclusiones: fijar la semilla en cada experimento (o repetir con varias), mantener constantes las épocas al comparar arquitecturas, seleccionar con validación y revisar las explicaciones que no concuerdan con los datos (tiempos de sigmoide/softmax, fondo de MNIST).
