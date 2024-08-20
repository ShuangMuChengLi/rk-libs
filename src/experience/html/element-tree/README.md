# elementUI TREE相关操作
## 删除节点
```
async delNode(node, data) {
    let msg = await this.$confirm('确定删除？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    }).then(() => {
    return true;
    }).catch(() => {
    return false;    
    });
    if(!msg)return;

    let result = await repositoryIndex.del({
    'id': data.id,
    });
    if(!result)return;

    if(this.currentTreeNode && data.id === this.currentTreeNode.id) {
    this.currentTreeNode = null;
    }
    const parent = node.parent;
    const children = parent.data.subList;
    const index = children.findIndex(d => d.id === data.id);
    children.splice(index, 1);
    this.$message.success('删除成功');
},
```