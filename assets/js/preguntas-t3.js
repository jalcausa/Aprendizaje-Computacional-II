/* Banco de preguntas · Tema 3 (teoría GAN + práctica 5) */
window.PREGUNTAS = (window.PREGUNTAS || []).concat([

{ id: "t3-01", t: "T3", p: null, k: "teoria", s: "Introducción GAN",
  q: "¿Quién introdujo las GAN y en qué año?",
  o: ["LeCun, 1998", "Goodfellow et al., 2014", "Krizhevsky, 2012", "He et al., 2015"],
  a: 1, e: "Goodfellow et al. (2014), «Generative Adversarial Nets».", r: "apuntes/tema-3.html#t3-intro" },

{ id: "t3-02", t: "T3", p: null, k: "teoria", s: "Introducción GAN",
  q: "¿Qué afirmaciones sobre las GAN son correctas según las diapositivas? (Selecciona todas)",
  o: ["Constan de dos redes que compiten: generador y discriminador", "No requieren datos etiquetados (aprendizaje no supervisado)", "Requieren muchos recursos y un ajuste cuidadoso para evitar inestabilidades", "Su entrenamiento siempre converge de forma monótona"],
  a: [0, 1, 2], e: "El entrenamiento es inestable y las pérdidas no son monótonas.", r: "apuntes/tema-3.html#t3-intro" },

{ id: "t3-03", t: "T3", p: null, k: "teoria", s: "Arquitectura",
  q: "¿Qué recibe como entrada el generador?",
  o: ["Imágenes reales", "Un vector de ruido aleatorio z", "Las etiquetas de clase", "La salida del discriminador"],
  a: 1, e: "G transforma ruido (p. ej. z ~ N(0, I) de 100 dimensiones) en una muestra. En una cGAN también recibiría la etiqueta.", r: "apuntes/tema-3.html#t3-arq" },

{ id: "t3-04", t: "T3", p: null, k: "teoria", s: "Arquitectura",
  q: "El discriminador de una GAN es…",
  o: ["un clasificador binario que estima la probabilidad de que una muestra sea real", "un generador de ruido", "un modelo de regresión que predice píxeles", "un clasificador de 10 clases"],
  a: 0, e: "Salida sigmoide: P(real). Su objetivo es minimizar la entropía cruzada binaria.", r: "apuntes/tema-3.html#t3-arq" },

{ id: "t3-05", t: "T3", p: null, k: "teoria", s: "Pérdidas",
  q: "En la pérdida del discriminador, ¿qué etiquetas se asignan?",
  o: ["1 a las falsas y 0 a las reales", "1 a las reales y 0 a las generadas", "La clase del dígito", "0,5 a todas"],
  a: 1, e: "$L_D=-\\frac1n\\sum[\\log D(x_i)+\\log(1-D(G(z_i)))]$: reales con etiqueta 1, falsas con 0.", r: "apuntes/tema-3.html#t3-loss" },

{ id: "t3-06", t: "T3", p: null, k: "teoria", s: "Pérdidas",
  q: "¿Cuál es la función de valor del juego minimax de una GAN?",
  o: ["$\\min_G\\max_D\\;\\mathbb E_x[\\log D(x)]+\\mathbb E_z[\\log(1-D(G(z)))]$", "$\\max_G\\max_D\\;\\mathbb E_x[D(x)]$", "$\\min_G\\min_D\\;\\|x-G(z)\\|^2$", "$\\max_G\\;\\mathbb E_z[\\log G(z)]$"],
  a: 0, e: "D maximiza V (clasificar bien) y G la minimiza (engañar a D).", r: "apuntes/tema-3.html#t3-loss" },

{ id: "t3-07", t: "T3", p: null, k: "teoria", s: "Equilibrio",
  q: "En el equilibrio teórico de una GAN, el discriminador…",
  o: ["acierta siempre", "devuelve 0,5 para cualquier muestra: no puede distinguir reales de generadas", "devuelve 0 para todas las muestras", "deja de existir"],
  a: 1, e: "Si $p_g=p_{data}$, $D^*(x)=p_{data}/(p_{data}+p_g)=1/2$.", r: "apuntes/tema-3.html#t3-eq" },

{ id: "t3-08", t: "T3", p: null, k: "calculo", s: "Equilibrio",
  q: "Si el discriminador devuelve siempre 0,5, ¿cuánto vale la pérdida BCE del generador (−log D(G(z)))?",
  o: ["0", "0,5", "ln 2 ≈ 0,693", "1"],
  a: 2, e: "−ln 0,5 = ln 2 ≈ 0,693. Es la línea de referencia de las gráficas de la P5 (también para la pérdida de D, promediada entre reales y falsas).", r: "apuntes/tema-3.html#t3-eq" },

{ id: "t3-09", t: "T3", p: null, k: "teoria", s: "Pérdidas",
  q: "¿Por qué en la práctica el generador minimiza $-\\log D(G(z))$ en lugar de $\\log(1-D(G(z)))$?",
  o: ["Porque es más rápido de calcular", "Porque al principio D rechaza con seguridad las muestras ($D(G(z))\\approx0$) y $\\log(1-D(G(z)))$ se satura dando gradientes casi nulos; la versión no saturante da gradientes fuertes", "Porque así D aprende más", "Porque la otra no es derivable"],
  a: 1, e: "En código: <code>criterion(D(fake), label_real)</code>, es decir, BCE con etiqueta 1 para las muestras generadas.", r: "apuntes/tema-3.html#t3-nonsat" },

{ id: "t3-10", t: "T3", p: null, k: "codigo", s: "Entrenamiento",
  q: "¿Qué pasa si en el paso del discriminador se omite <code>.detach()</code>?",
  c: `fake = generator(noise)
loss_disc_fake = criterion(discriminator(fake), label_fake)   # sin .detach()
loss_disc = (loss_disc_real + loss_disc_fake) / 2
optimizer_disc.zero_grad(); loss_disc.backward(); optimizer_disc.step()`,
  o: ["Nada, es equivalente", "El gradiente de la pérdida de D también se propaga hasta G y se acumula en sus .grad (empujándolo a ser detectable), además de gastar cómputo", "D deja de aprender", "Da error porque fake no tiene gradiente"],
  a: 1, e: "<code>detach()</code> corta el grafo: en el paso de D solo deben calcularse gradientes para D.", r: "apuntes/tema-3.html#t3-train" },

{ id: "t3-11", t: "T3", p: null, k: "codigo", s: "Entrenamiento",
  q: "¿Qué error tiene este paso del generador?",
  c: `output = discriminator(fake)
loss_gen = criterion(output, label_fake)
optimizer_gen.zero_grad(); loss_gen.backward(); optimizer_gen.step()`,
  o: ["Ninguno", "Usa label_fake: entrena a G para que D detecte sus muestras como falsas; debe usar label_real", "Falta un detach()", "Debería optimizar el discriminador"],
  a: 1, e: "G quiere que D diga «real»: <code>criterion(output, label_real)</code>.", r: "apuntes/tema-3.html#t3-train" },

{ id: "t3-12", t: "T3", p: null, k: "codigo", s: "Entrenamiento",
  q: "¿Qué pasaría con esta línea en el paso del <strong>generador</strong>?",
  c: `output = discriminator(fake.detach())
loss_gen = criterion(output, label_real)
loss_gen.backward()`,
  o: ["Funcionaría igual", "El generador no recibiría gradiente (el grafo hacia G está cortado) y nunca aprendería", "El discriminador dejaría de aprender", "Duplicaría la tasa de aprendizaje"],
  a: 1, e: "En el paso de G el gradiente debe atravesar D para llegar a los pesos de G: sin detach.", r: "apuntes/tema-3.html#t3-train" },

{ id: "t3-13", t: "T3", p: null, k: "teoria", s: "Problemas",
  q: "¿Qué es el <strong>colapso de modos</strong> (mode collapse)?",
  o: ["Que el discriminador deja de aprender", "Que el generador produce poca variedad, concentrándose en unas pocas salidas que engañan al discriminador", "Que la pérdida se hace NaN", "Que el generador copia exactamente los datos"],
  a: 1, e: "En la P5, el 40,8 % de los dígitos generados eran «1».", r: "apuntes/tema-3.html#t3-problemas" },

{ id: "t3-14", t: "T3", p: null, k: "teoria", s: "Problemas",
  q: "¿Por qué las pérdidas de una GAN no bajan de forma monótona como en una red supervisada?",
  o: ["Por un error de implementación", "Porque la pérdida de cada red depende de la otra, que también cambia: es un juego minimax, no una minimización con objetivo fijo", "Porque se usa Adam", "Porque no hay datos reales"],
  a: 1, e: "Si D mejora, la pérdida de G sube aunque G también mejore. Por eso hace falta una métrica externa.", r: "apuntes/tema-3.html#t3-problemas" },

{ id: "t3-15", t: "T3", p: null, k: "teoria", s: "Métricas",
  q: "Sobre el <strong>Inception Score</strong>, ¿qué es correcto?",
  o: ["Compara estadísticas de imágenes reales y generadas; menor es mejor", "Mide calidad y diversidad de las imágenes generadas usando un clasificador preentrenado (Inception); mayor es mejor", "Requiere etiquetas de las imágenes generadas", "Mide el tiempo de inferencia"],
  a: 1, e: "Cada imagen debe tener una clase clara y el conjunto, muchas clases distintas. Su máximo es el número de clases.", r: "apuntes/tema-3.html#t3-metricas" },

{ id: "t3-16", t: "T3", p: null, k: "teoria", s: "Métricas",
  q: "Sobre la <strong>Fréchet Inception Distance (FID)</strong>, ¿qué es correcto?",
  o: ["Valores mayores indican mejor calidad", "Compara la media y covarianza de las características (Inception) de imágenes reales y generadas; valores menores indican mayor parecido", "Solo usa las imágenes generadas", "Es el número de clases detectadas"],
  a: 1, e: "$\\text{FID}=\\|\\mu_r-\\mu_g\\|^2+\\operatorname{Tr}(\\Sigma_r+\\Sigma_g-2(\\Sigma_r\\Sigma_g)^{1/2})$.", r: "apuntes/tema-3.html#t3-metricas" },

{ id: "t3-17", t: "T3", p: null, k: "teoria", s: "Métricas",
  q: "¿Para qué sirven el <em>Mode Score</em> y la detección de colapso de modos?",
  o: ["Para medir la velocidad del generador", "Para cuantificar la diversidad y detectar modos (clases) ausentes en los datos generados", "Para elegir la tasa de aprendizaje", "Para calcular el FID"],
  a: 1, e: "Comparan qué se genera con lo que existe en los datos reales.", r: "apuntes/tema-3.html#t3-metricas" },

{ id: "t3-18", t: "T3", p: null, k: "teoria", s: "Variantes",
  q: "¿Qué variante permite generar un dígito concreto («genera un 7») añadiendo la etiqueta como condición?",
  o: ["DCGAN", "Conditional GAN (cGAN)", "CycleGAN", "Vanilla GAN"],
  a: 1, e: "Las cGAN añaden variables de condición (etiquetas) para controlar la generación.", r: "apuntes/tema-3.html#t3-variantes" },

{ id: "t3-19", t: "T3", p: null, k: "teoria", s: "Variantes",
  q: "Traducir fotos de caballos a cebras <strong>sin pares de imágenes emparejadas</strong> es la especialidad de…",
  o: ["StyleGAN", "CycleGAN", "DCGAN", "cGAN"],
  a: 1, e: "CycleGAN: traducción imagen a imagen sin datos emparejados.", r: "apuntes/tema-3.html#t3-variantes" },

{ id: "t3-20", t: "T3", p: null, k: "teoria", s: "Variantes",
  q: "Relaciona: ¿qué variante usa redes <strong>convolucionales</strong> para generar imágenes realistas, y cuál destaca por síntesis de alta calidad y controlable?",
  o: ["DCGAN · StyleGAN", "StyleGAN · DCGAN", "CycleGAN · cGAN", "Vanilla · CycleGAN"],
  a: 0, e: "DCGAN = Deep Convolutional GAN. StyleGAN = alta calidad y control del estilo.", r: "apuntes/tema-3.html#t3-variantes" },

{ id: "t3-21", t: "T3", p: null, k: "teoria", s: "Equilibrio",
  q: "Para un generador fijo, ¿cuál es el discriminador óptimo?",
  o: ["$D^*(x)=p_{data}(x)$", "$D^*(x)=\\dfrac{p_{data}(x)}{p_{data}(x)+p_g(x)}$", "$D^*(x)=0{,}5$ siempre", "$D^*(x)=p_g(x)$"],
  a: 1, e: "Vale 0,5 solo cuando $p_g=p_{data}$.", r: "apuntes/tema-3.html#t3-eq" },

/* ----------------------------------------------------------------- P5 */
{ id: "p5-01", t: "T3", p: "P5", k: "practica", s: "Práctica 5",
  q: "¿Qué pedía la Práctica 5 sobre la plantilla SimpleGAN? (Selecciona todas)",
  o: ["Visualizar en una gráfica la evolución de los errores del discriminador y del generador", "Calcular las métricas del modelo (IS, FID)", "Convertir la GAN en una DCGAN", "Clasificar MNIST con transfer learning"],
  a: [0, 1], e: "Solo esas dos tareas; la arquitectura de la plantilla se conserva.", r: "apuntes/tema-3.html#p5" },

{ id: "p5-02", t: "T3", p: "P5", k: "codigo", s: "Práctica 5",
  q: "¿A qué rango lleva los píxeles esta transformación y por qué?",
  c: `transforms.Compose([transforms.ToTensor(), transforms.Normalize((0.5,), (0.5,))])`,
  o: ["[0, 1], porque es lo que espera el discriminador", "[−1, 1], para coincidir con la salida tanh del generador", "[0, 255]", "Media 0 y desviación 1 exactas"],
  a: 1, e: "ToTensor da [0,1]; (x − 0,5)/0,5 da [−1,1]. Para dibujar se deshace con (img + 1)/2.", r: "apuntes/tema-3.html#p5-datos" },

{ id: "p5-03", t: "T3", p: "P5", k: "calculo", s: "Práctica 5",
  q: "Generador: Linear(100, 256) → ReLU → Linear(256, 512) → ReLU → Linear(512, 784) → Tanh. ¿Cuántos parámetros tiene?",
  o: ["533 505", "559 632", "402 192", "558 848"],
  a: 1, e: "25 856 + 131 584 + 402 192 = 559 632. El discriminador tiene 533 505.", r: "apuntes/tema-3.html#p5-modelos" },

{ id: "p5-04", t: "T3", p: "P5", k: "practica", s: "Práctica 5",
  q: "¿Por qué el discriminador usa LeakyReLU(0,2) en lugar de ReLU?",
  o: ["Porque es más rápida", "Para dejar pasar algo de gradiente con entradas negativas, evitar neuronas muertas y que llegue más señal de gradiente al generador", "Porque ReLU no funciona con sigmoide", "Para acotar la salida"],
  a: 1, e: "Es una práctica habitual en GAN; la plantilla ya la incluye.", r: "apuntes/tema-3.html#p5-modelos" },

{ id: "p5-05", t: "T3", p: "P5", k: "practica", s: "Práctica 5",
  q: "Durante las 50 épocas la pérdida del discriminador estuvo siempre entre 0,04 y 0,39 (por debajo de ln 2) y la del generador entre 2,7 y 7,5. ¿Interpretación?",
  o: ["La GAN alcanzó el equilibrio", "El discriminador dominó todo el entrenamiento: separaba bien reales y generadas; no se alcanzó el equilibrio", "El generador dominó", "Las pérdidas están mal calculadas"],
  a: 1, e: "En la última época, D(x) ≈ 0,85 y D(G(z)) ≈ 0,16, lejos de 0,5.", r: "apuntes/tema-3.html#p5-graficas" },

{ id: "p5-06", t: "T3", p: "P5", k: "practica", s: "Práctica 5",
  q: "La época 5 tuvo la pérdida del generador más baja (2,66) y la mayor D(G(z)) (0,24), pero un FID-MNIST pésimo (1 572). ¿Qué enseña?",
  o: ["Que el FID está mal calculado", "Que las pérdidas de una GAN no miden la calidad: el generador había colapsado en una mancha que engañaba a un discriminador aún débil", "Que esa es la mejor época", "Que hay que parar el entrenamiento en la época 5"],
  a: 1, e: "Hace falta una métrica externa (FID) e inspección visual para seguir el progreso.", r: "apuntes/tema-3.html#p5-graficas" },

{ id: "p5-07", t: "T3", p: "P5", k: "practica", s: "Práctica 5",
  q: "Según la CNN evaluadora, el 40,8 % de las muestras generadas son «1» y solo un 2,0 % «0» y un 2,2 % «8». ¿Diagnóstico?",
  o: ["Distribución correcta", "Colapso de modos parcial: el «1» es un trazo simple, un atajo barato para engañar al discriminador", "El evaluador está mal entrenado", "Sobreajuste del discriminador"],
  a: 1, e: "En los datos reales cada dígito ronda el 10 %. La entropía normalizada de clases baja a 0,82 (real: 0,999).", r: "apuntes/tema-3.html#p5-metricas" },

{ id: "p5-08", t: "T3", p: "P5", k: "practica", s: "Práctica 5",
  q: "¿Por qué la P5 añade métricas basadas en una CNN propia de MNIST además del IS y FID de Inception?",
  o: ["Porque torchmetrics no funciona", "Porque Inception se entrenó con fotos en color de ImageNet: un dígito gris reescalado queda fuera de su dominio; una CNN de dígitos da métricas con referencia real interpretable", "Porque es más rápido", "Porque el enunciado lo prohibía"],
  a: 1, e: "FID-MNIST generado 655,5 frente a 3,2 de referencia real; IS del clasificador 4,07 frente a 9,60.", r: "apuntes/tema-3.html#p5-evaluador" },

{ id: "p5-09", t: "T3", p: "P5", k: "practica", s: "Práctica 5",
  q: "¿Por qué el FID-MNIST de cada época se calcula siempre con el <strong>mismo ruido fijo</strong> de 5 000 muestras?",
  o: ["Para ahorrar memoria", "Para que las diferencias entre épocas se deban al generador y no a la muestra aleatoria", "Porque el generador solo acepta ese ruido", "Para entrenar con él"],
  a: 1, e: "Se controla una fuente de variabilidad para comparar épocas de forma justa.", r: "apuntes/tema-3.html#p5-bucle" },

{ id: "p5-10", t: "T3", p: "P5", k: "codigo", s: "Práctica 5",
  q: "¿Por qué hace falta esta conversión antes de pasar imágenes a <code>InceptionScore(normalize=False)</code> y <code>FrechetInceptionDistance</code>?",
  c: `images = ((images + 1) / 2 * 255).round().clamp(0, 255).to(torch.uint8)
images = images.reshape(-1, 1, 28, 28).repeat(1, 3, 1, 1)`,
  o: ["Para aumentar la resolución a 299", "Las métricas esperan imágenes de 3 canales en uint8 [0, 255]; la salida del generador está en [−1, 1] con 1 canal", "Para entrenar Inception", "Para aplicar data augmentation"],
  a: 1, e: "Se deshace la normalización, se pasa a uint8 y se replica el canal gris.", r: "apuntes/tema-3.html#p5-metricas" },

{ id: "p5-11", t: "T3", p: "P5", k: "practica", s: "Práctica 5",
  q: "¿Qué mejoras propone la P5 para esta GAN? (Selecciona todas)",
  o: ["Usar una arquitectura convolucional (DCGAN)", "Adam con β₁ = 0,5 y label smoothing (reales = 0,9) o Dropout en D para equilibrar el juego", "Guardar el generador con mejor FID-MNIST en lugar del último", "Eliminar el discriminador"],
  a: [0, 1, 2], e: "También cGAN, minibatch discrimination o WGAN-GP contra el colapso de modos.", r: "apuntes/tema-3.html#p5-metricas" },

{ id: "p5-12", t: "T3", p: "P5", k: "practica", s: "Práctica 5",
  q: "¿Cuál es el valor máximo posible del IS calculado con el clasificador de MNIST?",
  o: ["1", "10", "100", "No tiene máximo"],
  a: 1, e: "El IS está acotado por el número de clases del clasificador. Test real: 9,60; generado: 4,07.", r: "apuntes/tema-3.html#t3-metricas" },

{ id: "p5-13", t: "T3", p: "P5", k: "codigo", s: "Práctica 5",
  q: "¿Qué falta en este bucle para que el discriminador se entrene correctamente?",
  c: `for real, _ in dataloader:
    ...
    loss_disc = (loss_disc_real + loss_disc_fake) / 2
    loss_disc.backward()
    optimizer_disc.step()`,
  o: ["<code>optimizer_disc.zero_grad()</code> antes del backward: si no, los gradientes se acumulan entre iteraciones", "<code>torch.no_grad()</code>", "<code>loss_disc.item()</code>", "Nada"],
  a: 0, e: "En PyTorch los gradientes se suman en <code>.grad</code> hasta que se ponen a cero.", r: "apuntes/tema-3.html#t3-train" },

{ id: "p5-14", t: "T3", p: "P5", k: "practica", s: "Práctica 5",
  q: "Entre las épocas 15 y 50, la pérdida de D sube (0,12 → 0,26) y la de G baja (4,8 → 3,2), mientras D(G(z)) pasa de 0,07 a 0,16. ¿Qué indica?",
  o: ["Que el entrenamiento diverge", "Que el generador va recortando poco a poco la ventaja del discriminador, aunque sigue lejos del equilibrio", "Que el discriminador mejora", "Que hay sobreajuste del generador"],
  a: 1, e: "El FID-MNIST también mejora (mínimo 597 en la época 48), así que con más épocas probablemente seguiría mejorando.", r: "apuntes/tema-3.html#p5-graficas" },

{ id: "p5-15", t: "T3", p: "P5", k: "practica", s: "Práctica 5",
  q: "El FID de Inception de la P5 vale 183,0. ¿Cómo debe interpretarse?",
  o: ["Excelente, cerca de 0", "Solo de forma relativa: sirve para comparar con otras GAN evaluadas igual (mismo N = 5 000); no se calculó la referencia real frente a real", "Que el 18,3 % de las imágenes son buenas", "Que hay 183 clases"],
  a: 1, e: "El FID depende del tamaño de muestra y del dominio del extractor.", r: "apuntes/tema-3.html#p5-metricas" }

]);
