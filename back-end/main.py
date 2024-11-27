#!/usr/bin/env python3

import os
import glob
from flask import *

STATIC_FILES_DIR= "page"

app = Flask(__name__)

def construct_index(dir_path):
    dir_list = sorted([i for i in os.listdir(dir_path) if i[0].isnumeric() and i[0] != '0'])
    index = []
    for name in dir_list:
        path = os.path.join(dir_path, name)
        if os.path.isfile(path):
            with open(path) as f:
                lines = [i for i in f.readlines() if i]
                try:
                    header = lines[0].removeprefix('#').strip()
                except:
                    continue
            index.append(
                {
                    "name": header,
                    "path": path,
                }
            )
        elif os.path.isdir(path):
            try:
                main_file_path = glob.glob(os.path.join(path, "0*"))[0]
            except:
                continue
            with open(main_file_path) as f:
                lines = [i for i in f.readlines() if i]
                header = lines[0].removeprefix('#').strip()
            index.append(
                {
                    "name": header,
                    "path": main_file_path,
                    "inner": construct_index(path),
                }
            )
        else:
            raise "What the fuck is this thing?"
    return index

@app.route("/index")
def index():
    return INDEX

@app.route("/page/<path:path>")
def page(path):
    return send_from_directory(STATIC_FILES_DIR, path)

INDEX = construct_index(STATIC_FILES_DIR)

if __name__ == "__main__":
    app.run()
