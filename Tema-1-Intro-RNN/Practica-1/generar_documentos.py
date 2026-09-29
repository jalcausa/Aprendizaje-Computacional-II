from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Inches, Pt

BASE_DIR = Path(__file__).resolve().parent

RESULTS = [
    ("Adam-e10-b128", "Adam", 10, 128, "99,285 %", 429, "97,760 %", 224, "3,33 s", "1,525 pp"),
    ("RMSprop-e10-b128", "RMSprop", 10, 128, "99,110 %", 534, "97,620 %", 238, "3,62 s", "1,490 pp"),
    ("Adam-e10-b32", "Adam", 10, 32, "99,408 %", 355, "97,610 %", 239, "8,49 s", "1,798 pp"),
    ("RMSprop-e10-b32", "RMSprop", 10, 32, "99,287 %", 428, "97,560 %", 244, "11,03 s", "1,727 pp"),
    ("Adam-e5-b128", "Adam", 5, 128, "98,357 %", 986, "97,520 %", 248, "1,86 s", "0,837 pp"),
    ("Adam-e5-b32", "Adam", 5, 32, "98,848 %", 691, "97,510 %", 249, "4,42 s", "1,338 pp"),
    ("RMSprop-e5-b32", "RMSprop", 5, 32, "98,573 %", 856, "97,510 %", 249, "5,04 s", "1,063 pp"),
    ("RMSprop-e5-b128", "RMSprop", 5, 128, "98,233 %", 1060, "97,410 %", 259, "3,11 s", "0,823 pp"),
    ("SGD-e10-b32", "SGD", 10, 32, "95,653 %", 2608, "95,160 %", 484, "8,32 s", "0,493 pp"),
    ("SGD-e5-b32", "SGD", 5, 32, "93,817 %", 3710, "93,780 %", 622, "4,76 s", "0,037 pp"),
    ("SGD-e10-b128", "SGD", 10, 128, "92,170 %", 4698, "92,630 %", 737, "3,49 s", "−0,460 pp"),
    ("SGD-e5-b128", "SGD", 5, 128, "90,558 %", 5665, "91,070 %", 893, "1,97 s", "−0,512 pp"),
]

QUESTIONS = [
    ("¿Cuál es el objetivo principal del experimento?", ["Cambiar simultáneamente arquitectura y datos", "Estudiar hiperparámetros manteniendo fija la arquitectura", "Comparar MNIST con CIFAR-10", "Reducir MNIST a dos clases"], 1, "Mantener fija la arquitectura permite atribuir las diferencias al entrenamiento."),
    ("¿Qué forma tiene cada imagen de MNIST antes de aplanarla?", ["10 × 10", "32 × 32", "28 × 28", "784 × 1 × 3"], 2, "Cada imagen contiene 28 × 28 píxeles en escala de grises."),
    ("¿Por qué se dividen los píxeles por 255?", ["Para convertir las etiquetas a binario", "Para escalar las entradas al intervalo [0,1]", "Para reducir el número de clases", "Para aplicar softmax"], 1, "Los píxeles originales son enteros entre 0 y 255."),
    ("¿Qué hace la capa Flatten?", ["Aprende filtros", "Convierte 28 × 28 en un vector de 784 valores", "Reduce las clases", "Normaliza los pesos"], 1, "Flatten cambia la forma, pero no aprende parámetros."),
    ("¿Cuántas neuronas tiene la capa oculta?", ["10", "28", "128", "784"], 2, "La arquitectura original usa una Dense de 128 neuronas ReLU."),
    ("¿Por qué hay 10 neuronas de salida?", ["Hay 10 épocas", "Hay 10 optimizadores", "MNIST tiene 10 clases", "El lote contiene 10 ejemplos"], 2, "Cada salida representa la probabilidad de un dígito de 0 a 9."),
    ("¿Qué propiedad tiene la salida softmax?", ["Siempre contiene enteros", "Sus valores suman 1", "Elimina el gradiente", "Produce valores sin límite"], 1, "Softmax transforma los logits en una distribución de probabilidad."),
    ("¿Qué pérdida se utiliza?", ["MSE", "Sparse categorical crossentropy", "MAE", "Hinge binaria"], 1, "Es la pérdida adecuada para clases excluyentes con etiquetas enteras."),
    ("¿Cuántas configuraciones contiene el diseño 3 × 2 × 2?", ["7", "10", "12", "16"], 2, "Se multiplican 3 optimizadores, 2 valores de épocas y 2 lotes."),
    ("¿Qué se mantiene igual para que la comparación sea justa?", ["Solo el tiempo", "Arquitectura, datos y semilla", "El optimizador", "El número de actualizaciones"], 1, "Las condiciones comunes aíslan el efecto de los hiperparámetros."),
    ("¿Qué representa una época?", ["Un ejemplo", "Una pasada completa por el conjunto de entrenamiento", "Una neurona", "Una clase"], 1, "En una época el modelo procesa una vez todo el conjunto."),
    ("Con 60 000 ejemplos, ¿aproximadamente cuántos lotes hay por época con batch size 128?", ["128", "469", "1 875", "60 000"], 1, "ceil(60 000 / 128) = 469."),
    ("¿Qué lote realiza más actualizaciones por época?", ["128", "32", "Ambos igual", "Depende del número de clases"], 1, "Con lote 32 hay aproximadamente cuatro veces más lotes que con 128."),
    ("¿Qué optimizadores adaptan el paso por parámetro en este estudio?", ["Solo SGD", "Adam y RMSprop", "Los tres de forma idéntica", "Ninguno"], 1, "RMSprop usa segundos momentos y Adam combina primeros y segundos momentos."),
    ("¿Qué mide accuracy?", ["El tiempo medio", "La proporción de predicciones correctas", "El número de parámetros", "La pérdida por lote"], 1, "Accuracy = aciertos / número total de ejemplos."),
    ("¿Cómo se obtiene el número de errores?", ["N − aciertos", "Accuracy × épocas", "Suma de la diagonal", "Número de clases − 1"], 0, "También coincide con la suma de las celdas fuera de la diagonal de la matriz de confusión."),
    ("En una matriz de confusión Cᵢⱼ, ¿qué representa la diagonal?", ["Los tiempos", "Los aciertos", "Los errores únicamente", "Los pesos"], 1, "En la diagonal coinciden clase real y predicha."),
    ("¿Qué indica normalmente una brecha train−test positiva y grande?", ["Posible sobreajuste", "Ausencia de aprendizaje", "Menos parámetros", "Datos idénticos"], 0, "El modelo rinde mucho mejor en los datos vistos que en los no vistos."),
    ("¿Cuál fue la mejor configuración observada?", ["SGD-e5-b128", "Adam-e10-b128", "RMSprop-e5-b32", "Adam-e5-b32"], 1, "Adam con 10 épocas y lote 128 obtuvo la mayor accuracy de test."),
    ("¿Qué accuracy de test obtuvo el ganador?", ["91,07 %", "95,16 %", "97,76 %", "99,41 %"], 2, "La exactitud fue 0,9776, equivalente a 97,76 %."),
    ("¿Cuántos errores de test cometió el ganador?", ["224", "239", "429", "893"], 0, "Acertó 9 776 de los 10 000 ejemplos y falló 224."),
    ("¿Qué configuración obtuvo mayor accuracy de entrenamiento?", ["Adam-e10-b32", "Adam-e10-b128", "RMSprop-e10-b128", "SGD-e10-b32"], 0, "Adam-e10-b32 llegó al 99,408 %, pero no fue la mejor en test."),
    ("¿Qué demuestra que Adam-e10-b32 tenga mejor train pero peor test que el ganador?", ["Que el test debe eliminarse", "Que ajustar más train no garantiza mejor generalización", "Que softmax falla", "Que batch 32 siempre es incorrecto"], 1, "La calidad relevante es el comportamiento sobre ejemplos no vistos."),
    ("¿Por qué SGD quedó por detrás en el presupuesto probado?", ["No calcula gradientes", "Con valores por defecto convergió más lentamente", "No admite lotes", "Solo funciona con regresión"], 1, "Más épocas, momentum o una tasa ajustada podrían cambiar el resultado."),
    ("¿Cuál fue la confusión más frecuente del mejor modelo?", ["4→9", "0→1", "5→0", "7→6"], 0, "Hubo 14 imágenes de 4 clasificadas como 9."),
    ("¿Por qué se reinicia la semilla antes de cada modelo?", ["Para cambiar MNIST", "Para partir de condiciones comparables y reproducibles", "Para aumentar las clases", "Para evitar softmax"], 1, "La misma semilla controla inicialización y orden aleatorio."),
    ("¿Por qué el tiempo medido no incluye predict?", ["Para medir específicamente el coste de entrenamiento", "Porque predict no funciona", "Para mejorar accuracy", "Para reducir el número de clases"], 0, "El enunciado pide tiempo de entrenamiento, no tiempo total del análisis."),
    ("¿Qué limitación tiene elegir la mejor configuración usando test?", ["Ninguna", "Puede producir una estimación optimista", "Impide guardar el modelo", "Reduce las imágenes"], 1, "La selección debería hacerse con validación y reservar test para una evaluación final."),
    ("¿En qué formato se guarda el mejor modelo?", ["CSV", "NPZ", "Keras (.keras)", "JPEG"], 2, "El formato .keras conserva arquitectura, pesos y estado de compilación."),
    ("¿Qué conclusión es científicamente válida?", ["Adam siempre es el mejor optimizador", "Adam-e10-b128 fue mejor dentro del espacio, arquitectura y semilla probados", "Batch 128 siempre gana", "Diez épocas nunca sobreajustan"], 1, "No debe generalizarse más allá de las condiciones realmente experimentadas."),
]


def configure(document, title, subtitle=None):
    section = document.sections[0]
    section.top_margin = Inches(0.7)
    section.bottom_margin = Inches(0.7)
    section.left_margin = Inches(0.8)
    section.right_margin = Inches(0.8)
    styles = document.styles
    styles["Normal"].font.name = "Aptos"
    styles["Normal"].font.size = Pt(10.5)
    heading = document.add_heading(title, 0)
    heading.alignment = WD_ALIGN_PARAGRAPH.CENTER
    if subtitle:
        paragraph = document.add_paragraph(subtitle)
        paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
    document.add_paragraph()


def add_bullets(document, items):
    for item in items:
        document.add_paragraph(item, style="List Bullet")


def add_numbered(document, items):
    for item in items:
        document.add_paragraph(item, style="List Number")


def create_guide():
    document = Document()
    configure(document, "Guía de estudio — Práctica 1", "Estudio de hiperparámetros de entrenamiento con TensorFlow y MNIST")

    document.add_heading("1. Qué se pide y qué se ha hecho", level=1)
    document.add_paragraph("La práctica estudia cómo cambian el rendimiento y el coste de una red neuronal cuando se modifican el optimizador, el número de épocas y el tamaño de lote. La arquitectura permanece fija para que las diferencias observadas puedan atribuirse al entrenamiento.")
    add_bullets(document, [
        "Diseño factorial completo: 3 optimizadores × 2 valores de épocas × 2 tamaños de lote = 12 configuraciones.",
        "Métricas para train y test: accuracy, número de errores y matriz de confusión.",
        "Medida adicional: tiempo empleado exclusivamente por model.fit.",
        "Salida final: mejor_modelo_mnist.keras, resultados_configuraciones.csv y matrices_confusion.npz.",
    ])

    document.add_heading("2. Datos y preprocesamiento", level=1)
    document.add_paragraph("MNIST contiene 60 000 imágenes de entrenamiento y 10 000 de test. Cada imagen tiene 28 × 28 píxeles en escala de grises y una etiqueta entera de 0 a 9.")
    document.add_paragraph("Los píxeles se convierten a float32 y se normalizan mediante x' = x / 255. Así pasan de [0,255] a [0,1]. La normalización mejora el condicionamiento numérico, hace los gradientes más manejables y facilita una convergencia estable.")

    document.add_heading("3. Arquitectura neuronal", level=1)
    add_numbered(document, [
        "Input(28, 28): recibe una imagen.",
        "Flatten: reorganiza 28 × 28 en 784 características; no aprende parámetros.",
        "Dense(128, ReLU): aprende representaciones no lineales. Tiene 784×128 + 128 = 100 480 parámetros.",
        "Dense(10, softmax): produce una probabilidad por dígito. Tiene 128×10 + 10 = 1 290 parámetros.",
    ])
    document.add_paragraph("Total: 101 770 parámetros entrenables. Softmax garantiza salidas no negativas cuya suma es 1; la clase predicha es el índice con probabilidad máxima.")

    document.add_heading("4. Función de pérdida", level=1)
    document.add_paragraph("Se utiliza sparse categorical crossentropy porque hay diez clases mutuamente excluyentes y las etiquetas son enteros, no vectores one-hot. Para un ejemplo cuya clase correcta es y, la pérdida es −log(p_y). Penaliza con fuerza asignar poca probabilidad a la clase verdadera.")

    document.add_heading("5. Hiperparámetros estudiados", level=1)
    document.add_heading("5.1 Optimizador", level=2)
    add_bullets(document, [
        "SGD: actualiza θ ← θ − η∇L. Es simple, pero con los valores por defecto necesita más iteraciones para converger.",
        "RMSprop: mantiene una media móvil del cuadrado de los gradientes y adapta el paso de cada parámetro.",
        "Adam: combina una media móvil del gradiente (momento de primer orden) y otra del gradiente al cuadrado (segundo orden), con corrección de sesgo.",
    ])
    document.add_heading("5.2 Épocas", level=2)
    document.add_paragraph("Una época es una pasada completa por los 60 000 ejemplos. Más épocas permiten seguir reduciendo la pérdida, pero aumentan tiempo y riesgo de sobreajuste. Se comparan 5 y 10.")
    document.add_heading("5.3 Tamaño de lote", level=2)
    document.add_paragraph("El batch size es el número de ejemplos usado para una actualización. Con lote 32 hay 1 875 actualizaciones por época; con lote 128 hay 469. El lote pequeño produce gradientes más ruidosos y muchas más actualizaciones; el grande suele aprovechar mejor el cálculo y tarda menos.")

    document.add_heading("6. Métricas", level=1)
    add_bullets(document, [
        "Accuracy = aciertos / N.",
        "Errores = N − aciertos = suma de las celdas fuera de la diagonal de la matriz de confusión.",
        "Matriz de confusión Cᵢⱼ: número de ejemplos cuya clase real es i y cuya predicción es j.",
        "Brecha de generalización = accuracy_train − accuracy_test. Una brecha positiva grande puede indicar sobreajuste.",
        "Tiempo de entrenamiento: duración de fit; no incluye predicción ni cálculo de métricas.",
    ])

    document.add_heading("7. Protocolo experimental y reproducibilidad", level=1)
    add_numbered(document, [
        "Cargar y validar MNIST.",
        "Normalizar todas las imágenes del mismo modo.",
        "Restablecer la semilla 42 antes de construir cada modelo.",
        "Usar la misma arquitectura e inicialización para todas las configuraciones.",
        "Entrenar, medir el tiempo y predecir train y test.",
        "Calcular métricas y guardar historiales y matrices.",
        "Ordenar por accuracy de test, luego por errores y finalmente por tiempo.",
        "Guardar y volver a cargar el ganador para comprobar que reproduce su accuracy.",
    ])
    document.add_paragraph("La ejecución determinista reduce variaciones, aunque el tiempo sigue dependiendo del equipo y de la carga del sistema.")

    document.add_heading("8. Resultados completos", level=1)
    table = document.add_table(rows=1, cols=10)
    table.style = "Table Grid"
    headers = ["Configuración", "Opt.", "Ép.", "Lote", "Acc. train", "Err. train", "Acc. test", "Err. test", "Tiempo", "Brecha"]
    for cell, text in zip(table.rows[0].cells, headers):
        cell.text = text
    for result in RESULTS:
        cells = table.add_row().cells
        for cell, value in zip(cells, result):
            cell.text = str(value)

    document.add_heading("9. Interpretación razonada", level=1)
    add_bullets(document, [
        "Adam-e10-b128 gana con 97,760 % en test y 224 errores. Su accuracy de entrenamiento es 99,285 % y su brecha es 1,525 puntos porcentuales.",
        "Adam y RMSprop convergen mucho más rápido que SGD con los valores por defecto. SGD no es intrínsecamente peor: el experimento no ajusta su learning rate ni momentum y limita el entrenamiento a 10 épocas.",
        "Diez épocas mejoran todas las configuraciones. En Adam y RMSprop, train mejora más que test, lo que señala el inicio de sobreajuste.",
        "Adam-e10-b32 logra el mejor train (99,408 %), pero peor test que Adam-e10-b128. Un mejor ajuste de los datos vistos no garantiza mejor generalización.",
        "Adam-e10-b128 tarda 3,33 s frente a 8,49 s de Adam-e10-b32. El lote 128 necesita aproximadamente cuatro veces menos actualizaciones por época.",
        "Las pequeñas brechas negativas de SGD con lote 128 no significan que test sea más fácil en general; son fluctuaciones posibles por composición de datos y subajuste.",
    ])

    document.add_heading("10. Lectura de la matriz de confusión", level=1)
    document.add_paragraph("En el mejor modelo, las confusiones más frecuentes son 4→9 (14), 3→5 (11), 6→5 (9), 2→8 (9), 1→8 (9), 9→8 (8), 7→2 (8) y 2→7 (8). Son pares plausibles porque una escritura ambigua puede compartir bucles, curvas y trazos. La matriz no solo dice cuánto falla el modelo, sino en qué clases falla.")

    document.add_heading("11. Selección y guardado del modelo", level=1)
    document.add_paragraph("El ganador se guarda como mejor_modelo_mnist.keras. El formato .keras conserva arquitectura, pesos y configuración de compilación. Tras guardarlo se vuelve a cargar y se comprueba que mantiene 97,760 % de accuracy. Solo deben cargarse modelos de confianza; un archivo de modelo externo debe tratarse como entrada no confiable.")

    document.add_heading("12. Limitaciones y mejoras", level=1)
    add_bullets(document, [
        "Se usa test para elegir el ganador porque lo pide el ejercicio; metodológicamente es mejor elegir con validación y evaluar test una sola vez.",
        "Solo se ejecuta una semilla. Para comparar con mayor robustez conviene repetir varias semillas e informar media y desviación típica.",
        "Las conclusiones se restringen a la arquitectura y al espacio de búsqueda probados.",
        "Podrían estudiarse learning rate, momentum, regularización, early stopping y arquitecturas convolucionales.",
    ])

    document.add_heading("13. Resumen para memorizar", level=1)
    add_bullets(document, [
        "MNIST: 60 000 train, 10 000 test, imágenes 28×28, 10 clases.",
        "Preprocesamiento: float32 y división por 255.",
        "Red: Flatten → Dense(128, ReLU) → Dense(10, softmax).",
        "Pérdida: sparse categorical crossentropy.",
        "Diseño: SGD/RMSprop/Adam × 5/10 épocas × lotes 32/128 = 12 pruebas.",
        "Ganador: Adam, 10 épocas, lote 128; 97,76 % test; 224 errores; 3,33 s.",
        "Idea central: más ajuste en train no implica necesariamente mejor generalización.",
    ])

    document.save(BASE_DIR / "Guia_estudio_Practica_1.docx")


def create_questions():
    document = Document()
    configure(document, "Preguntas tipo test — Práctica 1", "MNIST, TensorFlow e hiperparámetros de entrenamiento")
    document.add_paragraph("Seleccione una única respuesta en cada pregunta. Las soluciones razonadas se encuentran en el documento Respuestas_tipo_test_Practica_1.docx.")
    for number, (question, options, _, _) in enumerate(QUESTIONS, start=1):
        document.add_heading(f"{number}. {question}", level=2)
        for letter, option in zip("ABCD", options):
            document.add_paragraph(f"{letter}) {option}")
    document.save(BASE_DIR / "Preguntas_tipo_test_Practica_1.docx")


def create_answers():
    document = Document()
    configure(document, "Respuestas tipo test — Práctica 1", "Soluciones razonadas")
    for number, (question, options, answer, explanation) in enumerate(QUESTIONS, start=1):
        letter = "ABCD"[answer]
        document.add_heading(f"{number}. {letter}) {options[answer]}", level=2)
        document.add_paragraph(f"{question} {explanation}")
    document.save(BASE_DIR / "Respuestas_tipo_test_Practica_1.docx")


if __name__ == "__main__":
    create_guide()
    create_questions()
    create_answers()
    print("Documentos creados correctamente.")
