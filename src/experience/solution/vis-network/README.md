# vis-network画拓扑图
[文档](https://visjs.github.io/vis-network/docs/network/)   
[github](https://github.com/visjs/vis-network)   
[examples](https://visjs.github.io/vis-network/examples/)   
## install
```
npm install vis-network
```
## usage
main.js
```javascript
import 'vis-network/dist/dist/vis-network.css'; // global css
```
Vue pages
```vue
<template>
  <div>
    <div id="mynetwork"/>
    <el-button
        type="primary"
        @click="enableEditMode"
    >
      enableEditMode
    </el-button>
    <el-button
        type="primary"
        @click="addEdgeMode"
    >
      addEdgeMode
    </el-button>
    <el-button
        type="primary"
        @click="exportNetwork"
    >
      exportNetwork
    </el-button>
    <common-form-dialog
        :visible.sync="dialogVisible"
        :form-info="formInfo"
        @submit="submit"
    />
  </div>
</template>

<script>
import vis from 'vis-network/dist/vis-network.esm';
import icon from './Hardware-My-Computer-3-icon.png';
import CommonFormDialog from '../../components/common-form-dialog/common-form-dialog';

let network;
export default {
  name: 'VueTest',
  components: {CommonFormDialog},
  data() {
    return {
      formInfo: [
        {
          label: 'name',
          prop: 'name',
          type: 'input',
        }
      ],
      callbackInfo: null,
      dialogVisible: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    addEdgeMode() {
      network.addEdgeMode();
    },
    enableEditMode() {
      network.enableEditMode();
    },
    init() {
      var locales = {
        cn: {
          close: '关闭',
          edit: '编辑',
          del: '删除所选',
          back: '返回',
          addNode: '添加节点',
          addEdge: '添加连线',
          editNode: '编辑节点',
          editEdge: '编辑连线',
          addDescription: '在空白区域单击放置新节点。',
          edgeDescription: '单击一个节点并将边缘拖动到另一个节点以连接它们。',
          editEdgeDescription: '单击控制点并将它们拖到一个节点以连接到该节点。',
          createEdgeError: '无法将边缘链接到集群。',
          deleteClusterError: '集群不能被删除。',
          editClusterError: '集群不可编辑。'
        }
      };
      let nodes = new vis.DataSet([
        {
          id: 1, label: 'Node 1',
          image: icon,
          shape: 'image',
        },
        {
          id: 2, label: 'Node 2',
          image: icon,
          shape: 'image',
        },
        {
          id: 3, label: 'Node 3',
          image: icon,
          shape: 'image',
        },
        {
          id: 4, label: 'Node 4',
          image: icon,
          shape: 'image',
        },
        {
          id: 5, label: 'Node 5',
          image: icon,
          shape: 'image',
        },
        {
          id: 6,
          label: 'Node 6',
          image: icon,
          shape: 'image',
        }
      ]);

      // create an array with edges
      let edges = new vis.DataSet([
        {
          from: 1, to: 3,
          arrows: {
            to: {
              enabled: true,
              type: 'arrow',
            },
          },
        },
        {
          from: 1, to: 2,
          arrows: {
            to: {
              enabled: true,
              type: 'arrow',
            },
          },
        },
        {
          from: 2, to: 4,
          arrows: {
            to: {
              enabled: true,
              type: 'arrow',
            },
          },
        },
        {
          from: 2, to: 5,
          arrows: {
            to: {
              enabled: true,
              type: 'arrow',
            },
          },
        },
        {
          from: 3, to: 6,
          arrows: {
            to: {
              enabled: true,
              type: 'arrow',
            },
          },
        },
      ]);

      // create a network
      let data = {
        nodes: nodes,
        edges: edges,
      };
      let container;

      container = document.getElementById('mynetwork');
      let options = {
        locale: 'cn',
        locales: locales,
        manipulation: {
          enabled: true,
          addNode: (data, callback) => {
            this.dialogVisible = true;
            this.callbackInfo = {
              data, callback
            };
          },
          // editNode: function (data, callback) {
          // },
          // addEdge: function (data, callback) {
          // },
          // editEdge: {
          // },
        },
      };
      network = new vis.Network(container, data, options);
      network.enableEditMode();
    },
    submit(form) {
      this.callbackInfo.data.label = form.name;
      this.callbackInfo.data.image = icon;
      this.callbackInfo.data.shape = 'image';
      this.callbackInfo.callback(this.callbackInfo.data);
      this.dialogVisible = false;
    },
    // 导出数据
    exportNetwork() {
      var nodes = this.objectToArray(network.getPositions());
      nodes.forEach((item)=>{
        item.connections = network.getConnectedNodes(item.id, 'to');
      });

      // pretty print node data
      var exportValue = JSON.stringify(nodes, undefined, 2);

      console.log(exportValue);
    },
    objectToArray(obj) {
      return Object.keys(obj).map(function (key) {
        obj[key].id = key;
        return obj[key];
      });
    }
  }
};
</script>
<style lang="less">
div.vis-network div.vis-edit-mode div.vis-label {
  width: 38px;
}

//.vis-manipulation{
//  display: none !important;
//}
//.vis-edit-mode{
//  display: none !important;
//}
//.vis-close{
//  display: none !important;
//}
</style>
<style scoped lang="less">
#mynetwork {
  width: 600px;
  height: 400px;
  border: 1px solid lightgray;
}

#mynetwork2 {
  width: 600px;
  height: 400px;
  border: 1px solid lightgray;
}
</style>

```
