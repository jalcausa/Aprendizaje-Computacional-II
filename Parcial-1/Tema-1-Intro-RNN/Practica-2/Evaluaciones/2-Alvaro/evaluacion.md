# Evaluación de la práctica — Álvaro

## Aspecto 1 — Configuraciones distintas estudiadas

**Calificación: Sí (6 configuraciones distintas).**

Hay cinco arquitecturas entrenadas con los mismos hiperparámetros (Adam, 5 épocas, lote 32): base Dense 128, base + Dropout 0,3, + Dense 64, Dense 64 + Dropout 0,3 tras cada capa, y una red pequeña de 32 neuronas. A ellas se suma una sexta configuración: la arquitectura ganadora entrenada 10 épocas.

## Aspecto 2 — Configuración con la mejor clasificación

**Calificación: Sí.**

La conclusión explicita la Exp6: Dense 128 → Dropout 0,3 → Dense 64 → Dropout 0,3 → sigmoide, con Adam, 10 épocas y lote 32. Obtiene un 98,67 % de accuracy en test, 133 errores y una pérdida de 0,0456. También ofrece la Exp4 (la misma arquitectura con 5 épocas) como alternativa si se da más peso al tiempo.

## Aspecto 3 — Almacenamiento del mejor modelo

**Calificación: Sí.**

`mejor = max(resultados, key=lambda r: r['test_acc'])` selecciona la Exp6, que se guarda en `mejor_modelo_par_impar.keras` junto con un CSV de resultados; la salida lo confirma. La recarga aparece solo como comentario y no se ejecuta, y el `.keras` no viene adjunto.

## Aspecto 4 — Estudio, posibles mejoras y criterio de selección

**Calificación: 8/10.**

Es un diseño experimental muy cuidado. Cada experimento cambia una sola variable y tiene una hipótesis previa, la semilla se fija antes de cada entrenamiento y se informa del número de parámetros. Hay curvas de entrenamiento/validación y matrices de entrenamiento y test para todas las configuraciones, y la tabla incluye la diferencia train–test como indicador de sobreajuste. Los argumentos se apoyan en las cifras, incluida la mejora conjunta de accuracy y pérdida de test con 10 épocas, y el coste en tiempo se discute de forma explícita.

Puntos a mejorar:
- La selección se hace con test aunque existe `validation_split=0.1`. Es mejor elegir con validación y reservar el test para el final.
- La Exp4 supera a la base por solo 7 imágenes (157 frente a 164) con una única semilla, así que llamarla un ganador que no lo es «por los pelos» resulta demasiado categórico. Repetir con varias semillas daría robustez a la conclusión.
- La ampliación a 10 épocas solo se prueba con la arquitectura ganadora. La mejora de 157 a 133 errores puede deberse a las épocas y no a la arquitectura; habría que entrenar también la base 10 épocas para que la comparación sea justa.
- Se menciona una «primera versión de este experimento» que no aparece en el notebook.

## Retroalimentación global

La mejor entrega del grupo en metodología: comparaciones controladas, hipótesis explícitas, métricas completas y una conclusión coherente con los datos y con el coste. Para mejorarla, seleccionar mediante validación, comprobar con varias semillas si las diferencias pequeñas son estables y aplicar el cambio de épocas también a la línea base.
