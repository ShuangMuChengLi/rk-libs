# elementUI upload一些特殊用法
## 只能上传一个文件,异步上传
```
<el-upload
    class="upload-demo"
    action="''"
    :on-remove="handleRemove"
    :headers="headers"
    :on-change="onChange"
    :file-list="fileList"
    :auto-upload="false"
    accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/pdf"
    >
    <el-button
        size="small"
        type="primary"
    >
        点击上传
    </el-button>
    <div
        slot="tip"
        class="el-upload__tip"
    >
        只能上传doc、docx、pdf、xls、xlsx、txt文件，且不超过200MB以内
    </div>
</el-upload>
handleRemove(file, fileList) {
    this.fileList = fileList;
},
onChange(file, fileList) {
    if (fileList.length > 1) {
    fileList.splice(0, 1);
    }

    this.$set(this.form, 'file', file.name);
    this.fileList = fileList;
},

async uploadFile() {
    if(_.isEmpty(this.fileList)) {
    this.$message.error('请上传文件');
    return false;
    }


    let form = new FormData();
    form.append('file', this.fileList[0].raw);
    let result = await file.upload(form);
},
```