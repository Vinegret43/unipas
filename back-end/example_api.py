from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/index")
def index():
    return [
        {
            "name": "Введение",
            "path": "page/introduction",
        },
        {
            "name": "Основы информатики",
            "path": "page/cs-101/cs-101",
            "inner": [
                {
                    "name": "Память и процессор",
                    "path": "page/cs-101/memory-and-cpu",
                },
                {
                    "name": "Процессорные инструкции",
                    "path": "page/cs-101/cpu-instructions",
                },
            ]
        }
    ]

@app.route("/page/<path:path>")
def page(path):
    NAMES = {
        "introduction": "Введение",
        "cs-101/memory-and-cpu": "Память и процессор",
        "cs-101/cpu-instructions": "Процессорные инструкции",
        "cs-101/cs-101": "Основы информатики",
    }
    try:
        text = f"""
# {NAMES[path]}

## Заголовок поменьше

Обычный текст. Тут может быть *прописной* и **жирный текст**, а также
[гиперссылки](https://google.com). Параграф с обычным текстом надо запихнуть
в какую-нибудь библиотеку, которая рендерит Markdown

```pascal
А вот блоки с кодом никуда передавать не надо, их обработку мы потом сделаем сами
с использованием редактора кода
```
"""
    except:
        return "Нет такой страницы", 404
    return text


if __name__ == "__main__":
    app.run(host="0.0.0.0")
