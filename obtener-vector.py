import fasttext

# Función para cargar el modelo y obtener el vector de un texto
def get_vector_from_text(text, model_path):
    # Cargar el modelo
    model = fasttext.load_model(model_path)

    # Obtener el vector del texto proporcionado
    vector = model.get_sentence_vector(text)

    return vector

# Ejemplo de uso
texto_ejemplo = 'Esto es un ejemplo de texto'
modelo_path = './cc.es.300.bin'

vector_resultante = get_vector_from_text(texto_ejemplo, modelo_path)
print('Vector del texto:', vector_resultante)
