from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__)

# Clé API OpenAI

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/reformuler', methods=['POST'])
def reformuler_texte():
    data = request.json
    user_input = data['text']

    # Appel à l'API OpenAI pour reformuler la phrase avec l'endpoint chat
    response = openai.ChatCompletion.create(
        model="gpt-4o",  # Utilisation du modèle GPT-3.5 Turbo
        messages=[
            {"role": "system", "content": "Reformule la phrase pour qu'elle ne contienne pas d'insultes, donne moi 03 proposition des phrases courtes."},
            {"role": "user", "content": user_input}
        ],
        max_tokens=50,
        temperature=0.5
    )

    # Récupération de la réponse
    reformulated_text = response['choices'][0]['message']['content'].strip()

    return jsonify({'reformulated_text': reformulated_text})

if __name__ == '__main__':
    app.run(debug=True)
