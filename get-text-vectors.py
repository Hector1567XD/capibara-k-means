# python_script.py

import sys
import json
import fasttext
import numpy as np

def load_model(model_path):
    return fasttext.load_model(model_path)

def get_vectors(descriptions, model):
    return [model.get_sentence_vector(desc).tolist() for desc in descriptions]

if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    model_path = input_data.get('modelPath', '')
    descriptions = input_data.get('texts', [])

    # Cargar el modelo una vez fuera del bucle
    model = load_model(model_path)

    output_vectors = get_vectors(descriptions, model)

    sys.stdout.write(json.dumps(output_vectors))
    sys.stdout.flush()