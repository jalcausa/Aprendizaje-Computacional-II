"""Compara las entregas de la Práctica 0 sobre el mismo conjunto de test.

El script reproduce la arquitectura, inicialización, normalización e
hiperparámetros empleados en cada notebook. Solo se unifica la carga de datos
para evitar que las rutas absolutas o archivos CSV ausentes alteren la prueba.
"""

from argparse import ArgumentParser
from pathlib import Path

import numpy as np
import pandas as pd


def cargar_datos(ruta):
    datos = pd.read_parquet(ruta)
    if not {"X", "Y"}.issubset(datos.columns):
        raise ValueError(f"{ruta} debe contener las columnas X e Y")

    X = datos[["X"]].to_numpy(dtype=float)
    y = datos[["Y"]].to_numpy(dtype=float)
    if not (np.isfinite(X).all() and np.isfinite(y).all()):
        raise ValueError(f"{ruta} contiene valores no finitos")
    return X, y


def sigmoid(x):
    return 1 / (1 + np.exp(-x))


def calcular_metricas(y_train, pred_train, y_test, pred_test):
    return {
        "mse_train": float(np.mean((y_train - pred_train) ** 2)),
        "mse_test": float(np.mean((y_test - pred_test) ** 2)),
    }


def evaluar_sigmoid_sin_normalizar(X, y, X_test, y_test, hidden_size, learning_rate, epochs):
    """Configuración compartida por las entregas de Juan Manuel e Isabel."""
    np.random.seed(42)
    W1 = np.random.randn(X.shape[1], hidden_size)
    b1 = np.zeros((1, hidden_size))
    W2 = np.random.randn(hidden_size, y.shape[1])
    b2 = np.zeros((1, y.shape[1]))

    for _ in range(epochs):
        hidden = sigmoid(X @ W1 + b1)
        output = hidden @ W2 + b2
        error = y - output
        d_output = error
        d_hidden = (d_output @ W2.T) * hidden * (1 - hidden)

        W2 += hidden.T @ d_output * learning_rate
        b2 += np.sum(d_output, axis=0, keepdims=True) * learning_rate
        W1 += X.T @ d_hidden * learning_rate
        b1 += np.sum(d_hidden, axis=0, keepdims=True) * learning_rate

    pred_train = sigmoid(X @ W1 + b1) @ W2 + b2
    pred_test = sigmoid(X_test @ W1 + b1) @ W2 + b2
    return calcular_metricas(y, pred_train, y_test, pred_test)


def evaluar_francisco(X, y, X_test, y_test):
    X_mean, X_std = X.mean(), X.std()
    X_norm = (X - X_mean) / X_std
    X_test_norm = (X_test - X_mean) / X_std

    np.random.seed(42)
    hidden_size = 64
    W1 = np.random.randn(1, hidden_size) * np.sqrt(2.0)
    b1 = np.zeros((1, hidden_size))
    W2 = np.random.randn(hidden_size, 1) * np.sqrt(2.0 / hidden_size)
    b2 = np.zeros((1, 1))

    for _ in range(20_000):
        hidden = np.tanh(X_norm @ W1 + b1)
        output = hidden @ W2 + b2
        d_output = (2.0 / len(X_norm)) * (output - y)
        d_hidden = (d_output @ W2.T) * (1 - hidden**2)

        W2 -= 0.03 * hidden.T @ d_output
        b2 -= 0.03 * np.sum(d_output, axis=0, keepdims=True)
        W1 -= 0.03 * X_norm.T @ d_hidden
        b1 -= 0.03 * np.sum(d_hidden, axis=0, keepdims=True)

    pred_train = np.tanh(X_norm @ W1 + b1) @ W2 + b2
    pred_test = np.tanh(X_test_norm @ W1 + b1) @ W2 + b2
    return calcular_metricas(y, pred_train, y_test, pred_test)


def evaluar_alejandro(X, y, X_test, y_test):
    X_mean = X.mean(axis=0)
    X_std = X.std(axis=0)
    X_norm = (X - X_mean) / X_std
    X_test_norm = (X_test - X_mean) / X_std

    np.random.seed(42)
    hidden_size = 10
    W1 = np.random.randn(1, hidden_size) * 0.1
    b1 = np.zeros((1, hidden_size))
    W2 = np.random.randn(hidden_size, 1) * 0.1
    b2 = np.zeros((1, 1))

    for _ in range(1_000):
        hidden = sigmoid(X_norm @ W1 + b1)
        output = hidden @ W2 + b2
        d_output = 2.0 * (output - y) / len(X_norm)
        dW2 = hidden.T @ d_output
        db2 = np.sum(d_output, axis=0, keepdims=True)
        d_hidden = (d_output @ W2.T) * hidden * (1 - hidden)
        dW1 = X_norm.T @ d_hidden
        db1 = np.sum(d_hidden, axis=0, keepdims=True)

        W1 -= 0.01 * dW1
        b1 -= 0.01 * db1
        W2 -= 0.01 * dW2
        b2 -= 0.01 * db2

    pred_train = sigmoid(X_norm @ W1 + b1) @ W2 + b2
    pred_test = sigmoid(X_test_norm @ W1 + b1) @ W2 + b2
    return calcular_metricas(y, pred_train, y_test, pred_test)


def evaluar_alberto(X, y, X_test, y_test):
    X_mean, X_std = X.mean(), X.std()
    y_mean, y_std = y.mean(), y.std()
    X_norm = (X - X_mean) / X_std
    X_test_norm = (X_test - X_mean) / X_std
    y_norm = (y - y_mean) / y_std

    np.random.seed(42)
    hidden_size = 9
    W1 = np.random.randn(1, hidden_size)
    b1 = np.zeros((1, hidden_size))
    W2 = np.random.randn(hidden_size, 1)
    b2 = np.zeros((1, 1))

    for _ in range(8_000):
        hidden = sigmoid(X_norm @ W1 + b1)
        output = hidden @ W2 + b2
        error = y_norm - output
        d_output = -2 * error / len(X_norm)
        d_hidden = (d_output @ W2.T) * hidden * (1 - hidden)

        W2 -= 0.2 * hidden.T @ d_output
        b2 -= 0.2 * np.sum(d_output, axis=0, keepdims=True)
        W1 -= 0.2 * X_norm.T @ d_hidden
        b1 -= 0.2 * np.sum(d_hidden, axis=0, keepdims=True)

    pred_train_norm = sigmoid(X_norm @ W1 + b1) @ W2 + b2
    pred_test_norm = sigmoid(X_test_norm @ W1 + b1) @ W2 + b2
    pred_train = pred_train_norm * y_std + y_mean
    pred_test = pred_test_norm * y_std + y_mean
    return calcular_metricas(y, pred_train, y_test, pred_test)


def evaluar_entrega_propia(X, y, X_test, y_test):
    hidden_size = 12
    rng = np.random.default_rng(3)
    limit_1 = np.sqrt(6 / (X.shape[1] + hidden_size))
    limit_2 = np.sqrt(6 / (hidden_size + y.shape[1]))
    W1 = rng.uniform(-limit_1, limit_1, (X.shape[1], hidden_size))
    b1 = np.zeros((1, hidden_size))
    W2 = rng.uniform(-limit_2, limit_2, (hidden_size, y.shape[1]))
    b2 = np.zeros((1, y.shape[1]))

    X_mean = X.mean(axis=0, keepdims=True)
    X_std = X.std(axis=0, keepdims=True)
    y_mean = y.mean(axis=0, keepdims=True)
    y_std = y.std(axis=0, keepdims=True)
    X_norm = (X - X_mean) / X_std
    X_test_norm = (X_test - X_mean) / X_std
    y_norm = (y - y_mean) / y_std

    parameters = [W1, b1, W2, b2]
    first_moment = [np.zeros_like(parameter) for parameter in parameters]
    second_moment = [np.zeros_like(parameter) for parameter in parameters]
    best_loss = np.inf
    best_parameters = None

    for epoch in range(1, 30_001):
        hidden = np.tanh(X_norm @ W1 + b1)
        output = hidden @ W2 + b2
        error = output - y_norm
        mse = np.mean((error * y_std) ** 2)

        if mse < best_loss:
            best_loss = mse
            best_parameters = [parameter.copy() for parameter in parameters]

        d_output = 2 * error / error.size
        dW2 = hidden.T @ d_output
        db2 = np.sum(d_output, axis=0, keepdims=True)
        d_hidden = (d_output @ W2.T) * (1 - hidden**2)
        dW1 = X_norm.T @ d_hidden
        db1 = np.sum(d_hidden, axis=0, keepdims=True)
        gradients = [dW1, db1, dW2, db2]

        for index, (parameter, gradient) in enumerate(zip(parameters, gradients)):
            first_moment[index] = 0.9 * first_moment[index] + 0.1 * gradient
            second_moment[index] = 0.999 * second_moment[index] + 0.001 * gradient**2
            m_corrected = first_moment[index] / (1 - 0.9**epoch)
            v_corrected = second_moment[index] / (1 - 0.999**epoch)
            parameter -= 0.005 * m_corrected / (np.sqrt(v_corrected) + 1e-8)

    W1, b1, W2, b2 = best_parameters
    pred_train_norm = np.tanh(X_norm @ W1 + b1) @ W2 + b2
    pred_test_norm = np.tanh(X_test_norm @ W1 + b1) @ W2 + b2
    pred_train = pred_train_norm * y_std + y_mean
    pred_test = pred_test_norm * y_std + y_mean
    return calcular_metricas(y, pred_train, y_test, pred_test)


def main():
    practica_dir = Path(__file__).resolve().parent.parent
    parser = ArgumentParser(description="Compara los modelos sobre un test común")
    parser.add_argument("--train", type=Path, default=practica_dir / "data_train.parquet")
    parser.add_argument("--test", type=Path, default=practica_dir / "data_test.parquet")
    args = parser.parse_args()

    X, y = cargar_datos(args.train)
    X_test, y_test = cargar_datos(args.test)

    evaluaciones = {
        "Juan Manuel": lambda: evaluar_sigmoid_sin_normalizar(X, y, X_test, y_test, 100, 0.001, 15_000),
        "Isabel": lambda: evaluar_sigmoid_sin_normalizar(X, y, X_test, y_test, 100, 0.001, 35_000),
        "Francisco Javier": lambda: evaluar_francisco(X, y, X_test, y_test),
        "Alejandro": lambda: evaluar_alejandro(X, y, X_test, y_test),
        "Alberto": lambda: evaluar_alberto(X, y, X_test, y_test),
        "Entrega propia": lambda: evaluar_entrega_propia(X, y, X_test, y_test),
    }

    resultados = []
    for nombre, evaluar in evaluaciones.items():
        print(f"Evaluando a {nombre}...")
        resultados.append((nombre, evaluar()))

    resultados.sort(key=lambda resultado: resultado[1]["mse_test"])
    print("\nClasificación por MSE de test")
    print(f"{'Pos.':>4}  {'Modelo':<20} {'MSE train':>15} {'MSE test':>15}")
    print("-" * 59)
    for posicion, (nombre, metricas) in enumerate(resultados, start=1):
        print(
            f"{posicion:>4}  {nombre:<20} "
            f"{metricas['mse_train']:>15.12f} {metricas['mse_test']:>15.12f}"
        )


if __name__ == "__main__":
    main()
