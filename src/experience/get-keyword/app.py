#encoding=utf-8
from flask import Flask, escape, request
import jieba.posseg as pseg, json

app = Flask(__name__)

@app.route('/cut-word')
def hello():
    keyword = request.args.get("keyword", "")

    words = pseg.cut(keyword)
    list = []
    for w in words:
        print(w.word, w.flag)
        flag = w.flag
        if flag.find('n') == 0 :
            list.append(w.word)

    data = {
        'result' : ",".join(list)
    }
    print(data.get('result'))
    json_str = json.dumps(data, ensure_ascii=False)
    return json_str
