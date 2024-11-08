from flask import Flask

app = Flask(__name__)

@app.route("/index")
def index():
    return {
        [
            {
                "name": "Введение",
                "path": "/page/introduction",
            },
            {
                "section_name": "Основы информатики",
                "inner": [
                    {
                        "name": "Память и процессор",
                        "path": "/page/cs-101/memory-and-cpu",
                    },
                    {
                        "name": "Процессорные инструкции",
                        "path": "/page/cs-101/cpu-instructions",
                    },
                ]
            }
        ]
    }

@app.route("/page/<path:path>")
def page(path):
    print(path)
    NAMES = {
        "introduction": "Введение",
        "cs-101/memory-and-cpu": "Память и процессор",
        "cs-101/cpu-instructions": "Процессорные инструкции",
    }
    try:
        text = f"""
# {NAMES[path]}

## Заголовок поменьше

Обычный текст. Тут может быть *прописной* и **жирный текст**, а также
(гиперссылки)[https://google.com]. Параграф с обычным текстом надо запихнуть
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
    app.run()
