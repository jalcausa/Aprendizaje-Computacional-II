/* Banco de preguntas · Lab 0 (teoría de introducción + cuaderno del modelo autorregresivo) */
window.PREGUNTAS = (window.PREGUNTAS || []).concat([].concat([

/* ---------------------------------------------------------------- teoría: contexto */
{ id: "t4-01", t: "L0", p: null, k: "teoria", s: "NLP y series temporales",
  q: "Según las diapositivas, ¿qué es el procesamiento del lenguaje natural (NLP)?",
  o: ["La aplicación de técnicas computacionales al análisis y la síntesis del lenguaje natural y del habla, combinando informática, lingüística computacional y aprendizaje automático",
      "Una técnica estadística para predecir valores futuros de una serie a partir de su histórico",
      "Un tipo de red convolucional especializada en texto",
      "El estudio de la gramática de los lenguajes de programación"],
  a: 0, e: "El NLP busca salvar la distancia entre la comunicación humana y la comprensión por parte del ordenador. «Predecir valores futuros a partir del histórico» es la definición de predicción de series temporales, no de NLP.", r: "apuntes/lab-0.html#t4-intro" },

{ id: "t4-02", t: "L0", p: null, k: "teoria", s: "NLP y series temporales",
  q: "¿Cuáles de estas son aplicaciones de la predicción de series temporales que citan las diapositivas? (Selecciona todas)",
  o: ["Meteorología y medio ambiente", "Bolsa", "Predicción de demanda (energía, comercio)", "Monitorización de pacientes y evolución de enfermedades"],
  a: [0, 1, 2, 3], e: "Las cuatro aparecen en la diapositiva de <em>time series forecasting</em>: usar datos históricos para construir un modelo que prediga valores futuros.", r: "apuntes/lab-0.html#t4-intro" },

{ id: "t4-03", t: "L0", p: null, k: "teoria", s: "Evolución de los modelos",
  q: "Ordena cronológicamente las cuatro etapas de los modelos para análisis de secuencias que presentan las diapositivas.",
  o: ["RNN → LSTM/GRU → Seq2Seq con atención → Transformer", "LSTM/GRU → RNN → Transformer → Seq2Seq con atención", "Transformer → Seq2Seq con atención → LSTM/GRU → RNN", "RNN → Seq2Seq con atención → LSTM/GRU → Transformer"],
  a: 0, e: "RNN (1980–2010), LSTM/GRU (1997–2014), Seq2Seq con atención (2014–2015) y Transformer (2017).", r: "apuntes/lab-0.html#t4-evol" },

{ id: "t4-04", t: "L0", p: null, k: "teoria", s: "Evolución de los modelos",
  q: "¿Qué limitación de las RNN básicas señalan las diapositivas?",
  o: ["No pueden procesar secuencias de longitud variable", "Los gradientes desaparecen o explotan y les cuesta aprender dependencias largas, porque todo el pasado debe comprimirse en un vector", "No tienen estado oculto", "Solo funcionan con imágenes"],
  a: 1, e: "En una RNN la información pasa por un estado oculto que se actualiza con cada elemento; con secuencias largas, el gradiente se multiplica muchas veces y se desvanece o explota.", r: "apuntes/lab-0.html#t4-evol" },

{ id: "t4-05", t: "L0", p: null, k: "teoria", s: "Evolución de los modelos",
  q: "¿Qué aportan las LSTM y GRU respecto a las RNN básicas y qué limitación conservan?",
  o: ["Aportan atención entre todas las posiciones; conservan los gradientes explosivos",
      "Aportan compuertas que regulan qué información conservar, actualizar o descartar; conservan el procesamiento secuencial, de modo que las dependencias lejanas exigen recorrer muchos pasos",
      "Eliminan la recurrencia; conservan la necesidad de etiquetas",
      "Aportan convoluciones; conservan el estado oculto único"],
  a: 1, e: "Las compuertas mejoran las dependencias a largo plazo, pero el cálculo sigue siendo paso a paso.", r: "apuntes/lab-0.html#t4-evol" },

{ id: "t4-06", t: "L0", p: null, k: "teoria", s: "Evolución de los modelos",
  q: "En un modelo Seq2Seq con atención, ¿qué cambia respecto a un Seq2Seq sin atención?",
  o: ["El codificador deja de ser recurrente", "El decodificador deja de depender exclusivamente de un único vector resumen y puede consultar en cada paso los distintos estados del codificador", "Se elimina el decodificador", "La entrada y la salida deben tener la misma longitud"],
  a: 1, e: "La atención da acceso dinámico al contexto de entrada: en cada paso de decodificación se busca la información relevante entre todos los estados del codificador.", r: "apuntes/lab-0.html#t4-evol" },

{ id: "t4-07", t: "L0", p: null, k: "teoria", s: "Evolución de los modelos",
  q: "¿Qué caracteriza a la arquitectura Transformer (2017) según las diapositivas?",
  o: ["Añade compuertas a una RNN", "Sustituye la recurrencia por bloques de atención y redes feed-forward, de modo que cada posición puede relacionarse directamente con cualquier otra", "Usa un único vector resumen de toda la secuencia", "Es un modelo autorregresivo lineal con ventana fija"],
  a: 1, e: "Sin recurrencia, las dependencias lejanas no exigen recorrer la secuencia paso a paso.", r: "apuntes/lab-0.html#t4-evol" },

/* ---------------------------------------------------------------- teoría: secuencias */
{ id: "t4-08", t: "L0", p: null, k: "teoria", s: "Datos secuenciales",
  q: "Según las diapositivas, ¿qué se exige a los datos para la mayoría de modelos de secuencias?",
  o: ["Que los elementos sean independientes entre sí", "Que la serie sea estacionaria", "Que las secuencias se muestreen de alguna distribución subyacente fija; no hace falta independencia ni estacionariedad", "Que todas las secuencias tengan la misma longitud"],
  a: 2, e: "Precisamente lo interesante son las dependencias entre elementos, así que no se pide independencia; tampoco estacionariedad.", r: "apuntes/lab-0.html#t4-datos" },

{ id: "t4-09", t: "L0", p: null, k: "teoria", s: "Datos secuenciales",
  q: "Tienes una serie diaria de 10 años y quieres entrenar un modelo autorregresivo y evaluarlo. ¿Cuál es la forma correcta de separar entrenamiento y test?",
  o: ["Barajar todos los días y tomar un 30 % al azar como test", "Usar como test el tramo final de la serie (los últimos años) y entrenar con el inicial", "Usar como test los días pares y entrenar con los impares", "Entrenar y evaluar con la serie completa"],
  a: 1, e: "Los valores consecutivos están correlacionados: si se baraja, el modelo entrena con días vecinos a los de test (fuga de información). El test debe ser el «futuro». Sí se pueden barajar las ventanas dentro del entrenamiento.", r: "apuntes/lab-0.html#t4-datos" },

{ id: "t4-10", t: "L0", p: null, k: "teoria", s: "Modelos autorregresivos",
  q: "¿Qué es un modelo autorregresivo?",
  o: ["Un modelo que hace regresión de una señal sobre los valores anteriores de la misma señal", "Un modelo no supervisado que agrupa series parecidas", "Un modelo que predice una variable a partir de otras variables distintas medidas en el mismo instante", "Un modelo generativo con dos redes que compiten"],
  a: 0, e: "«Auto» = de sí mismo: se predice $x_t$ a partir de $x_{t-1},x_{t-2},\\dots$. Las etiquetas salen de la propia serie y el entrenamiento es supervisado.", r: "apuntes/lab-0.html#t4-ar" },

{ id: "t4-11", t: "L0", p: null, k: "teoria", s: "Modelos autorregresivos",
  q: "Estimar toda la distribución $P(x_t\\mid x_{t-1},\\dots,x_1)$ de una variable continua es difícil. ¿Qué estadístico proponen estimar en su lugar las diapositivas?",
  o: ["La varianza condicionada", "La esperanza condicionada $\\mathbb E[x_t\\mid x_{t-1},\\dots,x_1]$", "La mediana de toda la serie", "El máximo histórico"],
  a: 1, e: "Una regresión (lineal o no) entrenada con MSE estima precisamente la esperanza condicionada.", r: "apuntes/lab-0.html#t4-ar" },

{ id: "t4-12", t: "L0", p: null, k: "teoria", s: "Ventana τ",
  q: "¿Qué problema resuelve fijar una longitud de ventana $\\tau$ en un modelo autorregresivo?",
  o: ["Que el número de entradas $x_{t-1},\\dots,x_1$ crece con $t$, de modo que cada ejemplo tendría un número distinto de características", "Que los datos no están normalizados", "Que el modelo sobreajusta siempre", "Que la serie tiene valores ausentes"],
  a: 0, e: "Con una ventana fija, cada ejemplo tiene exactamente $\\tau$ características: $\\mathbf x_t=[x_{t-\\tau},\\dots,x_{t-1}]$ con etiqueta $y=x_t$.", r: "apuntes/lab-0.html#t4-ventana" },

{ id: "t4-13", t: "L0", p: null, k: "calculo", s: "Ventana τ",
  q: "Una serie tiene $T=1000$ valores y se construyen ventanas de longitud $\\tau=4$ (4 valores de entrada y el siguiente como etiqueta). Si los 600 primeros ejemplos se usan para entrenar, ¿cuántos ejemplos hay en total y cuántos quedan para evaluar?",
  o: ["1000 y 400", "996 y 396", "996 y 400", "1004 y 404"],
  a: 1, e: "Hay $T-\\tau=996$ ejemplos (los 4 primeros valores no tienen ventana completa). $996-600=396$ para evaluar. Es el caso del Lab 0.", r: "apuntes/lab-0.html#t4-ventana" },

{ id: "t4-14", t: "L0", p: null, k: "calculo", s: "Ventana τ",
  q: "Con la serie $x=(3,5,4,6,8,7)$ y ventana $\\tau=3$, ¿cuál es el segundo ejemplo (características → etiqueta)?",
  o: ["$(3,5,4)\\to6$", "$(5,4,6)\\to8$", "$(4,6,8)\\to7$", "$(5,4)\\to6$"],
  a: 1, e: "Ejemplo 1: $(3,5,4)\\to6$; ejemplo 2: $(5,4,6)\\to8$; ejemplo 3: $(4,6,8)\\to7$. En total $6-3=3$ ejemplos.", r: "apuntes/lab-0.html#t4-ventana" },

{ id: "t4-15", t: "L0", p: null, k: "teoria", s: "Ventana τ",
  q: "¿Qué diferencia hay entre la longitud de ventana $\\tau$ y el horizonte de predicción $k$?",
  o: ["Son lo mismo con distinto nombre", "$\\tau$ es cuántos valores pasados recibe el modelo; $k$ es cuántos pasos hacia el futuro se predice", "$\\tau$ es el número de épocas y $k$ el tamaño de lote", "$\\tau$ es el número de capas y $k$ el número de neuronas"],
  a: 1, e: "Puedes tener $\\tau=12$ y predecir a $k=1$ (un paso) o a $k=64$ (realimentando 64 veces).", r: "apuntes/lab-0.html#t4-pred" },

{ id: "t4-16", t: "L0", p: null, k: "teoria", s: "AR lineal",
  q: "En la autorregresión lineal de primer orden de las diapositivas, ¿qué se minimiza para obtener $c$ y $\\phi_1$?",
  o: ["$\\sum_{t=2}^{T}\\big(Y_t-(c+\\phi_1Y_{t-1})\\big)^2$", "$\\sum_t|Y_t-Y_{t-1}|$", "$\\sum_t\\big(Y_{t-1}-(c+\\phi_1Y_t)\\big)$", "$-\\sum_t Y_t\\log(c+\\phi_1Y_{t-1})$"],
  a: 0, e: "Es una regresión por mínimos cuadrados de $Y_t$ sobre $Y_{t-1}$. Después se predice $\\hat Y_{t+1}=c+\\phi_1Y_t$.", r: "apuntes/lab-0.html#t4-ar-lineal" },

{ id: "t4-17", t: "L0", p: null, k: "calculo", s: "AR lineal",
  q: "Un modelo AR lineal con ventana $\\tau=12$ se implementa como <code>nn.Linear(12, 1)</code>. ¿Cuántos parámetros entrenables tiene?",
  o: ["12", "13", "24", "144"],
  a: 1, e: "12 pesos $\\phi_1,\\dots,\\phi_{12}$ y un sesgo $c$: $12\\cdot1+1=13$.", r: "apuntes/lab-0.html#t4-ar-lineal" },

{ id: "t4-18", t: "L0", p: null, k: "teoria", s: "AR lineal",
  q: "¿Cuáles de estas afirmaciones sobre los modelos autorregresivos son correctas? (Selecciona todas)",
  o: ["Su entrenamiento es supervisado: la etiqueta de cada ventana es el valor siguiente de la serie", "El modelo puede ser una regresión lineal o cualquier red que reciba la ventana y devuelva el siguiente valor", "Al ser autorregresivos no necesitan función de pérdida", "Para una serie continua se entrenan típicamente con pérdida MSE"],
  a: [0, 1, 3], e: "«Autorregresivo» describe de dónde salen las entradas (la propia serie), no el tipo de aprendizaje: sigue habiendo pérdida y etiquetas.", r: "apuntes/lab-0.html#t4-ar-lineal" },

/* ---------------------------------------------------------------- teoría: Markov */
{ id: "t4-19", t: "L0", p: null, k: "teoria", s: "Condición de Markov",
  q: "¿Cuándo se dice que una secuencia cumple una condición de Markov de orden $\\tau$?",
  o: ["Cuando es estacionaria", "Cuando se puede descartar la historia anterior a los últimos $\\tau$ pasos sin perder capacidad predictiva", "Cuando todos sus valores son independientes", "Cuando tiene exactamente $\\tau$ elementos"],
  a: 1, e: "Formalmente, $P(x_t\\mid x_{t-1},\\dots,x_1)=P(x_t\\mid x_{t-1},\\dots,x_{t-\\tau})$. Con $\\tau=1$ es un modelo de Markov de primer orden.", r: "apuntes/lab-0.html#t4-markov" },

{ id: "t4-20", t: "L0", p: null, k: "calculo", s: "Condición de Markov",
  q: "Una frase de tres palabras $w_1,w_2,w_3$ cumple la condición de Markov de primer orden. ¿Cómo se factoriza su probabilidad conjunta?",
  o: ["$P(w_1)\\,P(w_2)\\,P(w_3)$", "$P(w_1)\\,P(w_2\\mid w_1)\\,P(w_3\\mid w_2)$", "$P(w_1)\\,P(w_2\\mid w_1)\\,P(w_3\\mid w_1,w_2)$", "$P(w_3\\mid w_2)\\,P(w_2\\mid w_1)$"],
  a: 1, e: "$P(x_1,\\dots,x_T)=P(x_1)\\prod_{t=2}^TP(x_t\\mid x_{t-1})$. $P(w_1)P(w_2\\mid w_1)P(w_3\\mid w_1,w_2)$ es la regla de la cadena general, sin suponer Markov; $P(w_1)P(w_2)P(w_3)$ supondría independencia.", r: "apuntes/lab-0.html#t4-markov" },

{ id: "t4-21", t: "L0", p: null, k: "teoria", s: "Condición de Markov",
  q: "Un modelo autorregresivo con ventana $\\tau=4$ actúa como si los datos…",
  o: ["fueran independientes", "cumplieran una condición de Markov de orden 4", "cumplieran una condición de Markov de primer orden", "no tuvieran ruido"],
  a: 1, e: "Solo usa los 4 últimos valores; supone que lo anterior no aporta. En el Lab 0 se habla de «problema de Markov de orden 4».", r: "apuntes/lab-0.html#t4-markov" },

/* ---------------------------------------------------------------- teoría: predicción */
{ id: "t4-22", t: "L0", p: null, k: "teoria", s: "Predicción a k pasos",
  q: "Se conoce una serie hasta $x_{604}$ y un modelo con $\\tau=4$ ha de predecir $x_{609}$. ¿Cómo se hace en el Lab 0?",
  o: ["Directamente: $\\hat x_{609}=f(x_{605},x_{606},x_{607},x_{608})$", "Realimentando: se predice $\\hat x_{605}$, se usa como entrada para $\\hat x_{606}$, y así hasta $\\hat x_{609}$", "Es imposible predecirlo", "Se copia el valor $x_{604}$"],
  a: 1, e: "No se conocen $x_{605..608}$, así que se sustituyen por predicciones. $\\hat x_{609}=f(\\hat x_{605},\\hat x_{606},\\hat x_{607},\\hat x_{608})$ ya no usa ningún dato real: es una predicción a 5 pasos.", r: "apuntes/lab-0.html#t4-multipaso" },

{ id: "t4-23", t: "L0", p: null, k: "teoria", s: "Predicción a k pasos",
  q: "¿Por qué la predicción a muchos pasos de un modelo autorregresivo empeora tanto respecto a la predicción a un paso?",
  o: ["Porque el modelo se reentrena en cada paso", "Porque los errores se acumulan: cada predicción realimentada lleva el error de las anteriores ($\\epsilon_2=\\bar\\epsilon+c\\,\\epsilon_1$…)", "Porque la ventana se hace más pequeña", "Porque se usa una función de pérdida distinta"],
  a: 1, e: "Es el mismo fenómeno que en la previsión meteorológica: muy fiable a 24 h y cada vez peor después.", r: "apuntes/lab-0.html#t4-acumulacion" },

{ id: "t4-24", t: "L0", p: null, k: "calculo", s: "Predicción a k pasos",
  q: "Un AR lineal de primer orden tiene $c=1$ y $\\phi_1=0{,}5$. El último valor observado es $x_t=4$. Si se realimentan las predicciones, ¿cuánto valen $\\hat x_{t+1}$ y $\\hat x_{t+2}$, y a qué valor tienden las predicciones?",
  o: ["3; 2,5; tienden a 2", "3; 3; se quedan en 3", "2; 1; tienden a 0", "4,5; 3,25; tienden a 1"],
  a: 0, e: "$\\hat x_{t+1}=1+0{,}5\\cdot4=3$; $\\hat x_{t+2}=1+0{,}5\\cdot3=2{,}5$. El punto fijo cumple $x^*=c+\\phi_1x^*$, es decir $x^*=c/(1-\\phi_1)=1/0{,}5=2$.", r: "apuntes/lab-0.html#t4-ejemplo" },

{ id: "t4-25", t: "L0", p: null, k: "calculo", s: "Predicción a k pasos",
  q: "Un AR lineal de primer orden tiene $c=0$ y $\\phi_1=1{,}1$. Partiendo de $x_t=10$ y realimentando, ¿qué pasa con las predicciones?",
  o: ["Tienden a 0", "Crecen sin límite (11; 12,1; 13,31…)", "Se quedan en 10", "Oscilan entre −10 y 10"],
  a: 1, e: "Con $|\\phi_1|>1$ la recurrencia es inestable: cada paso multiplica por 1,1. Con $|\\phi_1|<1$ decaería al punto fijo $c/(1-\\phi_1)$.", r: "apuntes/lab-0.html#t4-ejemplo" },

{ id: "t4-26", t: "L0", p: null, k: "calculo", s: "Métricas",
  q: "Un modelo comete estos errores ($\\hat x_t-x_t$) en tres puntos de test: $1$, $-2$ y $3$. ¿Cuánto valen el MAE y el MSE?",
  o: ["MAE = 0,67; MSE = 4,67", "MAE = 2; MSE = 4,67", "MAE = 2; MSE = 14", "MAE = 6; MSE = 14"],
  a: 1, e: "MAE $=(1+2+3)/3=2$. MSE $=(1+4+9)/3=14/3\\approx4{,}67$. Sin valor absoluto, los errores se compensarían: $(1-2+3)/3\\approx0{,}67$ no es el MAE.", r: "apuntes/lab-0.html#t4-metricas" },

{ id: "t4-27", t: "L0", p: null, k: "teoria", s: "Métricas",
  q: "¿Qué diferencia práctica hay entre MAE y MSE como métricas de error de una predicción?",
  o: ["Ninguna, siempre ordenan igual los modelos", "El MSE eleva los errores al cuadrado, penaliza mucho los errores grandes y se expresa en unidades al cuadrado; el MAE es el error medio en las mismas unidades de la serie", "El MAE solo sirve para clasificación", "El MSE no se puede usar como pérdida"],
  a: 1, e: "Por eso en temperaturas el MAE se lee directamente en °C y el MSE en °C².", r: "apuntes/lab-0.html#t4-metricas" },

{ id: "t4-28", t: "L0", p: null, k: "calculo", s: "Métricas",
  q: "La serie $x=(10,12,11,15)$ se predice con la persistencia ($\\hat x_t=x_{t-1}$) en los tres últimos instantes. ¿Cuál es el MAE?",
  o: ["2", "7/3 ≈ 2,33", "3", "1"],
  a: 1, e: "Predicciones 10, 12, 11 frente a 12, 11, 15: errores absolutos 2, 1 y 4. MAE $=7/3\\approx2{,}33$.", r: "apuntes/lab-0.html#t4-metricas" },

{ id: "t4-29", t: "L0", p: null, k: "calculo", s: "Métricas",
  q: "Una serie es $x_t=s_t+\\varepsilon_t$, con una señal $s_t$ predecible y ruido blanco $\\varepsilon_t\\sim\\mathcal N(0;0{,}5^2)$ independiente del pasado. ¿Cuál es el menor MSE que puede conseguir cualquier modelo al predecir $x_t$?",
  o: ["0", "0,5", "0,25", "1"],
  a: 2, e: "El ruido no se puede predecir: su varianza $0{,}5^2=0{,}25$ es un suelo irreducible. En el Lab 0, con $\\sigma=0{,}2$, el suelo es 0,04.", r: "apuntes/lab-0.html#l0-ej1" },

/* ---------------------------------------------------------------- teoría: latentes */
{ id: "t4-30", t: "L0", p: null, k: "teoria", s: "AR latente",
  q: "¿Qué distingue a un modelo autorregresivo latente de un modelo autorregresivo de ventana fija?",
  o: ["Que no necesita datos de entrenamiento", "Que mantiene un estado oculto $h_t=g(h_{t-1},x_{t-1})$ que resume todo el pasado y predice con $P(x_t\\mid h_t)$, en lugar de usar solo los $\\tau$ últimos valores", "Que usa ventanas más largas", "Que solo puede predecir un paso"],
  a: 1, e: "El estado tiene tamaño fijo pero puede arrastrar información de cualquier momento del pasado. Es la idea de las RNN.", r: "apuntes/lab-0.html#t4-latente" },

{ id: "t4-31", t: "L0", p: null, k: "teoria", s: "AR latente",
  q: "¿En cuál de estas situaciones es más necesario un modelo con variables latentes?",
  o: ["Predecir la temperatura de mañana sabiendo la de los últimos 7 días", "Decidir si hay que cerrar un paréntesis en un texto con paréntesis anidados, donde el último abierto pudo estar muy atrás", "Predecir el siguiente valor de una recta con ruido", "Calcular la media de una serie"],
  a: 1, e: "Para saber si toca cerrar hay que contar los paréntesis abiertos desde el principio: una variable oculta (un contador) que ninguna ventana fija garantiza ver.", r: "apuntes/lab-0.html#t4-latente" },

{ id: "t4-32", t: "L0", p: null, k: "teoria", s: "AR latente",
  q: "¿Cuáles de estas afirmaciones sobre modelos AR de ventana fija y modelos AR latentes son correctas? (Selecciona todas)",
  o: ["En un AR de ventana fija los parámetros crecen con $\\tau$", "Un AR latente supone Markov de primer orden en el estado oculto, no en las observaciones", "Un AR de ventana fija puede ver dependencias de cualquier longitud", "Las RNN son un ejemplo de modelo autorregresivo latente"],
  a: [0, 1, 3], e: "Un AR de ventana fija no ve nada anterior a $t-\\tau$.", r: "apuntes/lab-0.html#t4-latente" },

/* ---------------------------------------------------------------- teoría: herramientas */
{ id: "t4-33", t: "L0", p: null, k: "teoria", s: "PyTorch y d2l",
  q: "¿Cuál es la estructura de datos principal de PyTorch, que se maneja de forma muy parecida a un array de NumPy?",
  o: ["El DataFrame", "El tensor (array n-dimensional)", "La lista enlazada", "El grafo de cómputo estático"],
  a: 1, e: "Las diapositivas destacan que la sintaxis de PyTorch es muy «pythónica» y que el tensor resulta natural a quien conoce NumPy.", r: "apuntes/lab-0.html#t4-herramientas" },

{ id: "t4-34", t: "L0", p: null, k: "teoria", s: "PyTorch y d2l",
  q: "En el cuaderno del Lab 0 aparece <code>@d2l.add_to_class(Data)</code> encima de <code>def get_dataloader(self, train)</code>. ¿Qué hace ese decorador?",
  o: ["Crea una subclase de Data", "Añade el método get_dataloader a la clase Data ya definida", "Ejecuta get_dataloader una sola vez", "Convierte Data en un tensor"],
  a: 1, e: "d2l lo usa para repartir la definición de una clase entre varias celdas.", r: "apuntes/lab-0.html#t4-herramientas" },

/* ================================================================ LAB 0 */
{ id: "l0-01", t: "L0", p: "L0", k: "practica", s: "Cuaderno base",
  q: "En el Lab 0 los datos sintéticos se generan con <code>x = torch.sin(0.01 * time) + torch.randn(T) * 0.2</code>, con <code>time</code> de 1 a 1000. ¿Qué afirmaciones son correctas? (Selecciona todas)",
  o: ["El ruido tiene desviación típica 0,2 y varianza 0,04", "El periodo del seno es de unos 628 pasos", "El ruido es predecible a partir de los valores anteriores", "Ningún modelo puede bajar, en media, de un MSE de 0,04 al predecir $x_t$"],
  a: [0, 1, 3], e: "Periodo $2\\pi/0{,}01\\approx628$. El ruido es blanco (independiente del pasado), así que su varianza es un suelo irreducible.", r: "apuntes/lab-0.html#l0-base" },

{ id: "l0-02", t: "L0", p: "L0", k: "codigo", s: "Cuaderno base",
  q: "En el Lab 0 ($T=1000$, $\\tau=4$), ¿qué forma tienen <code>self.features</code> y <code>self.labels</code> tras ejecutar este código?",
  c: `features = [self.x[i : self.T-self.tau+i] for i in range(self.tau)]
self.features = torch.stack(features, 1)
self.labels = self.x[self.tau:].reshape((-1, 1))`,
  o: ["(1000, 4) y (1000, 1)", "(996, 4) y (996, 1)", "(4, 996) y (996,)", "(996, 1) y (996, 4)"],
  a: 1, e: "Cada elemento de la lista tiene $T-\\tau=996$ valores; <code>stack(..., 1)</code> los pone como columnas → (996, 4). Las etiquetas son <code>x[4:]</code> como columna → (996, 1).", r: "apuntes/lab-0.html#l0-base" },

{ id: "l0-03", t: "L0", p: "L0", k: "codigo", s: "Cuaderno base",
  q: "Con el <code>get_dataloader</code> del Lab 0 y $\\tau=4$, ¿qué contiene la fila $j$ de <code>self.features</code> y cuál es su etiqueta?",
  c: `features = [self.x[i : self.T-self.tau+i] for i in range(self.tau)]
self.features = torch.stack(features, 1)
self.labels = self.x[self.tau:].reshape((-1, 1))`,
  o: ["x[j-4], …, x[j-1] → x[j]", "x[j], x[j+1], x[j+2], x[j+3] → x[j+4]", "x[j], …, x[j+4] → x[j+5]", "x[0], …, x[j] → x[j+1]"],
  a: 1, e: "La columna $i$ es la serie desplazada $i$ posiciones, así que la fila $j$ es <code>x[j..j+3]</code>; <code>labels[j] = x[j+4]</code>. En la ejecución: fila 0 = x[0..3] → x[4].", r: "apuntes/lab-0.html#l0-base" },

{ id: "l0-04", t: "L0", p: "L0", k: "practica", s: "Cuaderno base",
  q: "¿Qué modelo se usa en el cuaderno base del Lab 0 y cómo se entrena?",
  o: ["Un MLP con dos capas ocultas entrenado con Adam", "Una regresión lineal (<code>d2l.LinearRegression</code>, una capa lineal con una salida) entrenada con SGD, tasa 0,01, pérdida MSE y 10 épocas", "Una RNN con 64 unidades", "Un Transformer preentrenado"],
  a: 1, e: "Es la autorregresión lineal de orden 4: $\\hat x_t=w\\cdot[x_{t-4},\\dots,x_{t-1}]+b$.", r: "apuntes/lab-0.html#l0-base" },

{ id: "l0-05", t: "L0", p: "L0", k: "codigo", s: "Cuaderno base",
  q: "¿Para qué sirve <code>.reshape((1, -1))</code> en el bucle de predicción multipaso del Lab 0?",
  c: `for i in range(data.num_train + data.tau, data.T):
    multistep_preds[i] = model(
        multistep_preds[i - data.tau:i].reshape((1, -1)))`,
  o: ["Para normalizar la ventana", "Para convertir el vector de 4 valores en un lote de 1 ejemplo con 4 características (forma (1, 4)), que es lo que espera la capa lineal", "Para invertir el orden de la ventana", "Para quitar el gradiente"],
  a: 1, e: "Las capas de PyTorch esperan (lote, características). <code>-1</code> deja que PyTorch calcule la segunda dimensión (τ).", r: "apuntes/lab-0.html#l0-base" },

{ id: "l0-06", t: "L0", p: "L0", k: "codigo", s: "Cuaderno base",
  q: "Se quiere hacer predicción multipaso (realimentando las predicciones) desde $t=605$, pero el resultado sale idéntico a la predicción a un paso. ¿Cuál es el error?",
  c: `multistep_preds = torch.zeros(data.T)
multistep_preds[:] = data.x
for i in range(data.num_train + data.tau, data.T):
    multistep_preds[i] = model(data.x[i - data.tau:i].reshape((1, -1)))`,
  o: ["Falta <code>.detach()</code>", "La ventana se toma de <code>data.x</code> (valores reales) en lugar de <code>multistep_preds</code>, así que nunca se realimentan las predicciones", "El rango del bucle debería empezar en 0", "Hay que usar <code>reshape((-1, 1))</code>"],
  a: 1, e: "Para realimentar, la ventana debe leerse del vector que se va rellenando con predicciones: <code>multistep_preds[i - tau:i]</code>.", r: "apuntes/lab-0.html#l0-base" },

{ id: "l0-07", t: "L0", p: "L0", k: "practica", s: "Cuaderno base",
  q: "En el cuaderno base del Lab 0, ¿qué ocurre con la predicción realimentada desde $t=605$ hasta $t=1000$?",
  o: ["Sigue al seno perfectamente", "Tras unos pocos pasos se aplana hacia una constante y deja de seguir la serie", "Reproduce exactamente el ruido", "Da error porque faltan datos"],
  a: 1, e: "Los errores se acumulan y el AR lineal tiende a su punto fijo. La predicción a un paso, con entradas reales, sí sigue la serie hasta el final.", r: "apuntes/lab-0.html#l0-base" },

{ id: "l0-08", t: "L0", p: "L0", k: "codigo", s: "Cuaderno base",
  q: "En la función <code>k_step_pred(k)</code> del Lab 0, ¿qué contiene <code>preds[k - 1]</code>, siendo <code>preds = k_step_pred(64)</code>?",
  c: `def k_step_pred(k):
    features = []
    for i in range(data.tau):
        features.append(data.x[i : i+data.T-data.tau-k+1])
    # The (i+tau)-th element stores the (i+1)-step-ahead predictions
    for i in range(k):
        preds = model(torch.stack(features[i : i+data.tau], 1))
        features.append(preds.reshape(-1))
    return features[data.tau:]`,
  o: ["Las predicciones a 1 paso", "Las predicciones a $k$ pasos", "Los valores reales de la serie", "El error a $k$ pasos"],
  a: 1, e: "Se devuelven las columnas a partir de la $\\tau$-ésima; la columna $\\tau+i$ guarda las predicciones a $i+1$ pasos, así que el índice $k-1$ de la lista devuelta son las de $k$ pasos.", r: "apuntes/lab-0.html#l0-base" },

{ id: "l0-09", t: "L0", p: "L0", k: "codigo", s: "Cuaderno base",
  q: "<code>d2l.LinearRegression</code> crea <code>self.net = nn.LazyLinear(1)</code> y a continuación ejecuta <code>self.net.weight.data.normal_(0, 0.01)</code>. ¿Qué inicialización tienen realmente los pesos al entrenar?",
  o: ["Normal con media 0 y desviación 0,01, como indica el código", "La inicialización por defecto de PyTorch: una capa <em>lazy</em> no tiene pesos hasta la primera pasada, así que la llamada a <code>normal_</code> no tiene efecto", "Todos los pesos a cero", "Los pesos de un modelo preentrenado"],
  a: 1, e: "Detalle comprobado en el Lab 0: los pesos se materializan en la primera llamada con la inicialización por defecto (uniforme en $\\pm1/\\sqrt{\\tau}$, sesgo incluido).", r: "apuntes/lab-0.html#l0-base" },

/* -------------------------------------------------------------- ejercicio 1 */
{ id: "l0-10", t: "L0", p: "L0", k: "practica", s: "Ejercicio 1 · τ",
  q: "En el ejercicio 1 del Lab 0 (seno con ruido de varianza 0,04) se varía $\\tau$ entre 1 y 64. ¿Cómo se comporta el MSE de test de la regresión lineal?",
  o: ["Crece siempre con $\\tau$", "Cae rápido hasta $\\tau\\approx8$–$12$ y después se estabiliza cerca del suelo 0,04 (o empeora ligeramente)", "Es igual para todos los $\\tau$", "Es mínimo con $\\tau=1$"],
  a: 1, e: "Con MCO: 0,079 ($\\tau=1$) → 0,0467 ($\\tau=12$, mínimo) → 0,048 ($\\tau=64$).", r: "apuntes/lab-0.html#l0-ej1" },

{ id: "l0-11", t: "L0", p: "L0", k: "practica", s: "Ejercicio 1 · τ",
  q: "¿Por qué con $\\tau=1$ el MSE del Lab 0 (≈ 0,079) es casi el doble del suelo de ruido (0,04)?",
  o: ["Porque el modelo sobreajusta", "Porque la predicción casi copia el último valor observado, que lleva su propio ruido, y a eso se suma el ruido de la etiqueta", "Porque el SGD diverge", "Porque la serie no es estacionaria"],
  a: 1, e: "Copiar $x_{t-1}$ arrastra su ruido ($\\approx0{,}04$) más el ruido de $x_t$ (0,04). Con ventanas más largas, el modelo promedia y reduce la primera parte.", r: "apuntes/lab-0.html#l0-ej1" },

{ id: "l0-12", t: "L0", p: "L0", k: "practica", s: "Ejercicio 1 · τ",
  q: "En el Lab 0 se comprueba que MSE de test ≈ (MSE frente a la señal limpia $\\sin(0{,}01t)$) + 0,04. ¿Por qué?",
  o: ["Es una casualidad numérica", "Porque el ruido es independiente de la ventana: el error total se descompone en el error respecto a la parte predecible más la varianza del ruido, que es irreducible", "Porque se usa MAE en lugar de MSE", "Porque el modelo tiene sesgo cero"],
  a: 1, e: "$\\mathbb E[(\\hat x_t-x_t)^2]=\\mathbb E[(\\hat x_t-s_t)^2]+\\sigma^2$ cuando el ruido $\\varepsilon_t$ es independiente de $\\hat x_t$.", r: "apuntes/lab-0.html#l0-ej1" },

{ id: "l0-13", t: "L0", p: "L0", k: "practica", s: "Ejercicio 1 · τ",
  q: "¿Por qué en el ejercicio 1 del Lab 0 la solución por mínimos cuadrados (MCO) empeora ligeramente al pasar de $\\tau=12$ a $\\tau=64$?",
  o: ["Porque el modelo se vuelve no lineal", "Porque hay más parámetros que estimar con los mismos 600 ejemplos (más varianza) y la ventana larga no aporta información nueva", "Porque MCO no admite más de 12 entradas", "Porque el test se hace más pequeño"],
  a: 1, e: "Es el compromiso sesgo-varianza aplicado a $\\tau$: por encima del óptimo solo se añade ruido de estimación.", r: "apuntes/lab-0.html#l0-ej1" },

{ id: "l0-14", t: "L0", p: "L0", k: "practica", s: "Ejercicio 1 · τ",
  q: "En el Lab 0, el modelo entrenado con SGD (tasa 0,01, 10 épocas) obtiene un MSE unas 0,005 unidades mayor que la solución exacta por mínimos cuadrados con el mismo $\\tau$. ¿Qué indica?",
  o: ["Que el modelo lineal es inadecuado", "Que SGD no ha llegado al mínimo en 10 épocas: es un problema de optimización, no del modelo", "Que hay fuga de datos", "Que mínimos cuadrados sobreajusta"],
  a: 1, e: "Ambos usan el mismo modelo; la diferencia solo puede venir de no haber convergido.", r: "apuntes/lab-0.html#l0-herr" },

{ id: "l0-15", t: "L0", p: "L0", k: "practica", s: "Ejercicio 1 · τ",
  q: "¿Qué ventajas tiene usar en el Lab 0 una partición fija por tiempo (etiquetas $t\\le600$ para entrenar y $t=601..1000$ para evaluar) para todos los $\\tau$? (Selecciona todas)",
  o: ["Todos los modelos se comparan sobre los mismos 400 valores de test", "Se evita que el futuro entrene al modelo que lo predice", "Permite barajar la serie antes de partirla", "Las diferencias de error se deben al modelo y no a un conjunto de test distinto"],
  a: [0, 1, 3], e: "En el cuaderno base el corte se desplazaba con $\\tau$. Barajar la serie antes de partir sería un error.", r: "apuntes/lab-0.html#l0-herr" },

/* -------------------------------------------------------------- ejercicio 2 */
{ id: "l0-16", t: "L0", p: "L0", k: "practica", s: "Ejercicio 2 · horizonte",
  q: "En el ejercicio 2 del Lab 0, con $\\tau=12$, el MSE es 0,051 a un paso y 0,278 a 64 pasos. ¿Qué explica el aumento?",
  o: ["Que el modelo se reentrena peor para horizontes largos", "La acumulación de errores al realimentar 64 veces las propias predicciones", "Que la ventana es demasiado corta para 64 pasos", "Que el test es distinto para cada horizonte"],
  a: 1, e: "Los objetivos son los mismos para todos los $k$; lo único que cambia es cuántas entradas son predicciones en lugar de datos reales.", r: "apuntes/lab-0.html#l0-ej2" },

{ id: "l0-17", t: "L0", p: "L0", k: "practica", s: "Ejercicio 2 · horizonte",
  q: "En el Lab 0, el error con $\\tau=12$ apenas cambia entre $k=1$ y $k=8$ (0,051 → 0,054). ¿Por qué?",
  o: ["Porque con $k\\le8$ no se usan predicciones", "Porque con pocos pasos de realimentación la ventana aún contiene sobre todo datos reales, y además el seno cambia muy despacio", "Porque el modelo ignora la ventana", "Porque el ruido desaparece"],
  a: 1, e: "Con $k=8$ y $\\tau=12$, la primera predicción usa 12 valores reales y el resto mezcla reales y predichos; los errores aún no se han acumulado mucho.", r: "apuntes/lab-0.html#l0-ej2" },

{ id: "l0-18", t: "L0", p: "L0", k: "practica", s: "Ejercicio 2 · horizonte",
  q: "En el Lab 0, a 64 pasos el modelo con $\\tau=64$ tiene más error (0,44) que el de $\\tau=12$ (0,28). ¿Qué conclusión es correcta?",
  o: ["Una ventana más larga siempre mejora el largo plazo", "Una ventana más larga no arregla la predicción a largo plazo y puede empeorarla: con más pesos es más fácil que la recurrencia sea ligeramente inestable", "$\\tau=64$ sobreajusta a un paso", "El resultado se debe a usar MAE"],
  a: 1, e: "Con $\\tau=64$ el radio espectral mediano es 1,007 (> 1): las predicciones realimentadas tienden a derivar.", r: "apuntes/lab-0.html#l0-ej2" },

{ id: "l0-19", t: "L0", p: "L0", k: "practica", s: "Ejercicio 2 · horizonte",
  q: "En la predicción libre del Lab 0 (desde $t=601$ sin ver ningún dato real), un AR lineal cuyos pesos suman algo menos de 1 (radio espectral $\\rho<1$)…",
  o: ["reproduce el seno indefinidamente", "decae hacia una constante, el punto fijo $b/(1-\\sum w_i)$", "explota hacia infinito", "devuelve siempre el último valor real"],
  a: 1, e: "Es el caso de $\\tau=4$ ($\\rho\\approx0{,}992$). Con $\\rho>1$ derivaría o explotaría ($\\tau=64$).", r: "apuntes/lab-0.html#l0-ej2" },

/* -------------------------------------------------------------- ejercicio 3 */
{ id: "l0-20", t: "L0", p: "L0", k: "codigo", s: "Temperaturas",
  q: "Se va a entrenar un AR sobre la serie de temperaturas con el 70 % inicial como entrenamiento. ¿Qué problema tiene este código?",
  c: `mu, sd = x_raw.mean(), x_raw.std()      # x_raw: serie completa (train + test)
x = (x_raw - mu) / sd
NTR = int(0.7 * len(x))
X_train, y_train = crear_ventanas(x, tau, torch.arange(tau, NTR))`,
  o: ["Ninguno, es la forma correcta", "La media y la desviación se calculan con toda la serie, incluido el test: se filtra información del futuro. Deben calcularse solo con <code>x_raw[:NTR]</code>", "Hay que estandarizar después de crear las ventanas", "La estandarización no se puede deshacer"],
  a: 1, e: "Es una fuga de datos sutil. En el Lab 0: <code>mu_t, sd_t = xt_raw[:NTR_T].mean(), xt_raw[:NTR_T].std()</code>.", r: "apuntes/lab-0.html#l0-ej3" },

{ id: "l0-21", t: "L0", p: "L0", k: "practica", s: "Temperaturas",
  q: "¿Por qué en el Lab 0 se comparan los modelos con la persistencia ($\\hat x_t=x_{t-1}$), la climatología (media de entrenamiento) y la estacional ($\\hat x_t=x_{t-365}$)?",
  o: ["Porque son los modelos que pide el enunciado", "Porque un error solo tiene sentido comparado con una referencia ingenua: si un modelo no mejora la persistencia, no aporta nada", "Porque sirven para entrenar el AR", "Porque son más precisas que cualquier red"],
  a: 1, e: "Un MAE de 1,8 °C no dice nada por sí solo; frente a los 2,0 °C de la persistencia sí. En IBM, el AR no mejora la persistencia.", r: "apuntes/lab-0.html#l0-ej3" },

{ id: "l0-22", t: "L0", p: "L0", k: "practica", s: "Temperaturas",
  q: "En el Lab 0, con temperaturas mínimas diarias, el mejor AR lineal a un día tiene MAE ≈ 1,79 °C y la persistencia 2,01 °C. ¿Qué valor de $\\tau$ resultó óptimo y a qué se debe la mejora?",
  o: ["$\\tau=1$; copia el día anterior", "$\\tau\\approx14$–$21$ días; combina varios días, lo que suaviza el ruido diario y hace que la predicción tienda a volver hacia la media", "$\\tau=365$; captura la estacionalidad", "$\\tau=90$; usa todo el trimestre"],
  a: 1, e: "Mejor $\\tau=21$ (con 14 casi igual): −11 % de MAE y −22 % de MSE respecto a la persistencia. Con $\\tau=365$ el error a un día es peor (1,98 °C).", r: "apuntes/lab-0.html#l0-ej3" },

{ id: "l0-23", t: "L0", p: "L0", k: "practica", s: "Temperaturas",
  q: "En el Lab 0, el AR con $\\tau=365$ es peor a un día que el de $\\tau=21$, pero su predicción libre de 1988–1990 reproduce el ciclo estacional (MAE 2,26 °C frente a 3,21 °C). ¿Qué enseña este resultado?",
  o: ["Que siempre conviene la ventana más larga", "Que para captar dependencias largas (el ciclo anual) un AR de ventana fija necesita una ventana enorme, lo que motiva los modelos con estado latente", "Que la estacionalidad no existe en estos datos", "Que el AR con $\\tau=21$ sobreajusta"],
  a: 1, e: "La predicción libre con $\\tau=21$ se aplana en la media; con $\\tau=365$ «recuerda» el año anterior a costa de 365 parámetros.", r: "apuntes/lab-0.html#l0-ej3" },

{ id: "l0-24", t: "L0", p: "L0", k: "practica", s: "Temperaturas",
  q: "En el Lab 0, al entrenar con SGD (tasa $\\eta=0{,}01$, lotes de 16) un AR de temperaturas con $\\tau=365$, el MAE se dispara a 6,7 °C mientras que mínimos cuadrados da 1,98 °C. ¿Cuál es la causa?",
  o: ["El modelo con 365 entradas sobreajusta", "La curvatura de la pérdida crece con $\\tau$ (entradas estandarizadas y muy correlacionadas) y con $\\eta=0{,}01$ se supera el límite de estabilidad $\\eta\\lambda_{\\max}<2$: SGD diverge", "Faltan datos para 365 entradas", "La estandarización está mal hecha"],
  a: 1, e: "Remedios: bajar la tasa de aprendizaje, entrenar más o usar la solución cerrada. Con $\\tau=90$–$180$ no diverge, pero no converge en 10 épocas.", r: "apuntes/lab-0.html#l0-ej3" },

{ id: "l0-25", t: "L0", p: "L0", k: "practica", s: "Temperaturas",
  q: "En el Lab 0, el AR de temperaturas con $\\tau=21$ tiene un MAE de 1,80 °C a 1 día y de 3,07 °C a 60 días. ¿Cómo queda a 60 días frente a las referencias (estacional 2,98 °C; climatología 3,25 °C)?",
  o: ["Mejor que ambas", "Peor que la estacional y apenas mejor que la climatología", "Peor que ambas", "Igual a la persistencia a 1 día"],
  a: 1, e: "A horizontes largos la predicción realimentada se aplana en la media y la información del año anterior (estacional) vale más.", r: "apuntes/lab-0.html#l0-ej3" },

{ id: "l0-26", t: "L0", p: "L0", k: "practica", s: "IBM",
  q: "En el complemento del Lab 0 con el precio de cierre de IBM (2010–2017), el AR lineal con $\\tau=5$ obtiene pesos ≈ [0,02; 0,02; −0,05; 0,02; 1,00] (de $x_{t-5}$ a $x_{t-1}$). ¿Qué significa?",
  o: ["El modelo ha aprendido una media de 5 días", "El modelo ha redescubierto la persistencia: predice prácticamente el precio de ayer, como en un paseo aleatorio", "El modelo da más importancia al día más antiguo", "El modelo está mal entrenado"],
  a: 1, e: "Su MAE a un día (1,17 USD) coincide con el de la persistencia. Las rentabilidades diarias tampoco son predecibles (mismo MSE que predecir 0).", r: "apuntes/lab-0.html#l0-ibm" },

{ id: "l0-27", t: "L0", p: "L0", k: "practica", s: "IBM",
  q: "¿Cuál es la diferencia de fondo entre la serie de temperaturas y la de IBM que explican los resultados del Lab 0? (Selecciona todas)",
  o: ["La temperatura tiene inercia y estacionalidad que el pasado explica en parte; un AR la aprovecha", "El precio de IBM se comporta casi como un paseo aleatorio: el mejor predictor sencillo es el último valor", "En IBM el AR mejora mucho la persistencia", "En IBM el error a $k$ días crece aproximadamente como $\\sqrt k$"],
  a: [0, 1, 3], e: "En IBM: 1,11 USD a 1 día, 2,69 USD a 5 días y 5,83 USD a 20 días, casi igual que la persistencia.", r: "apuntes/lab-0.html#l0-ibm" },

/* -------------------------------------------------------------- código extra */
{ id: "l0-28", t: "L0", p: "L0", k: "codigo", s: "Código",
  q: "Esta función del Lab 0 debe predecir $x_t$ para cada objetivo usando solo datos hasta $t-k$ y realimentando $k$ veces. ¿Qué devuelve con <code>k=1</code>?",
  c: `def predecir_k_pasos(modelo, x, tau, objetivos, k):
    ventana = x[(objetivos - k)[:, None] + torch.arange(-tau + 1, 1)]   # x[t-k-tau+1 .. t-k]
    for _ in range(k):
        ventana = torch.cat([ventana, modelo(ventana[:, -tau:])], 1)
    return ventana[:, -1]`,
  o: ["El valor real $x_t$", "La predicción a un paso normal, con la ventana real $x_{t-\\tau},\\dots,x_{t-1}$", "La predicción de $x_{t+1}$", "Un error, porque <code>k</code> debe ser mayor que 1"],
  a: 1, e: "Con $k=1$ la ventana es <code>x[t-τ .. t-1]</code> y se hace una sola predicción.", r: "apuntes/lab-0.html#l0-herr" },

{ id: "l0-29", t: "L0", p: "L0", k: "codigo", s: "Código",
  q: "¿Para qué sirve la columna de unos en esta implementación de la autorregresión por mínimos cuadrados del Lab 0?",
  c: `A = torch.cat([X, torch.ones(len(X), 1)], 1).double()
solucion = torch.linalg.lstsq(A, y.double()).solution
self.weight, self.bias = solucion[:-1].T.float(), solucion[-1].float()`,
  o: ["Para normalizar las entradas", "Para estimar el sesgo (término independiente $c$): su coeficiente es el último elemento de la solución", "Para evitar divisiones por cero", "Para añadir regularización"],
  a: 1, e: "$\\hat x_t=X w+c\\cdot1$: añadir una columna constante convierte el sesgo en un peso más.", r: "apuntes/lab-0.html#l0-herr" },

{ id: "l0-30", t: "L0", p: "L0", k: "codigo", s: "Código",
  q: "¿Qué error tiene este código para entrenar un AR sobre una serie temporal?",
  c: `perm = torch.randperm(len(x))          # x: serie completa
x = x[perm]
X_train, y_train = crear_ventanas(x, tau, torch.arange(tau, 600))
X_test,  y_test  = crear_ventanas(x, tau, torch.arange(600, 1000))`,
  o: ["Ninguno: barajar siempre mejora la generalización", "Baraja la serie antes de crear las ventanas: destruye el orden temporal, así que las ventanas ya no contienen los valores anteriores de cada objetivo y el modelo no puede aprender nada", "Debería barajar solo el test", "Falta convertir a float"],
  a: 1, e: "Lo que se puede barajar son las ventanas ya construidas dentro del entrenamiento (como hace el DataLoader), nunca la serie.", r: "apuntes/lab-0.html#t4-datos" }

]).map(function (q, i) {
  /* reparte la respuesta correcta entre A–D (las preguntas se escriben con la correcta donde convenga) */
  if (Array.isArray(q.a)) return q;
  const n = q.o.length, shift = (i % n - q.a + n) % n;
  const o = q.o.map(function (_, j) { return q.o[(j - shift + n) % n]; });
  return Object.assign({}, q, { o: o, a: i % n });
}));
