# python_script.py

import sys
import json
import fasttext
import numpy as np
from sklearn.decomposition import PCA

def load_model(model_path):
    return fasttext.load_model(model_path)

def get_vectors(descriptions, model):
    return [model.get_sentence_vector(desc).tolist() for desc in descriptions]

def reduce_dimensionality(vectors, n_components=10):
    pca = PCA(n_components=n_components)
    reduced_vectors = pca.fit_transform(vectors)
    return reduced_vectors.tolist()

if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    model_path = input_data.get('modelPath', '')
    descriptions = input_data.get('texts', [])
    n_components = input_data.get('nComponents', 10)  # Valor por defecto: 10

    # Cargar el modelo una vez fuera del bucle
    model = load_model(model_path)

    # Obtener vectores originales
    original_vectors = get_vectors(descriptions, model)

    # Reducir dimensionalidad
    reduced_vectors = reduce_dimensionality(original_vectors, n_components)

    sys.stdout.write(json.dumps(reduced_vectors))
    sys.stdout.flush()
