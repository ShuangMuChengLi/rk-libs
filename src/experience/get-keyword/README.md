# 语义识别、关键词提取
## 需求
从一整段文字提取出关键字
## download
[方案代码下载](./experience/get-keyword.zip)
## dependence
python环境、jieba、flask库
## 步骤
1. 通过flask库搭建http服务。
2. 通过jieba库将文字按词性拆分。
3. 过滤出名词词性。

## 代码
```
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
```
