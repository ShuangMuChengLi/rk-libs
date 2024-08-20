<template>
  <el-dialog
    :title="data.fileName"
    :visible.sync="dialogVisible"
    width="1400px"
    class="text-class-detail"
    :close-on-click-modal="false"
  >
    <div class="content-block-body">
      <div
        ref="chart"
        class="chart"
      />
      <div
        class="info-wrapper"
      >
        <template 
          v-if="current"
        >
          <div
            class="tag-row"
          >
            <div class="tag">
              {{ current.name }}
            </div>
          </div>
          <div class="info-block">
            <header>原文</header>
            <div class="info-content">
              {{ current && current.origin_content }}
            </div>
            <div
              v-if="false"
              class="toolbar"
            >
              <i class="good" />
              <i class="bad" />
            </div>
          </div>
          <div class="info-block">
            <header>定义</header>
            <div class="info-content">
              {{ current && current.label_descirbe }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { textLabel } from '@/api/textLabel';
import { innerDialogMixin } from '@/utils/inner-dialog-mixin';
import * as echarts from 'echarts';
import _ from 'lodash';
export default {
  name: 'TextClassDetail',
  components: {},
  mixins: [innerDialogMixin],
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      tree: null,
      current: null,
      chart: null
    };
  },
  async mounted() {
    await this.getTree();
    this.handlerResult(this.data);
  },
  beforeDestroy() {
    this.chart.dispose();
  },
  methods: {
    async getTree() {
      this.tree = [];
      let result = await textLabel.tree();
      if(!result)return;

      this.tree = result;
    },
    handlerResult(data) {
      if(!this.tree)return;

      let {nodes, edges} = this.traversal(null, this.tree, _.clone(data.labelDetailJsonArray),  [], []);
      this.setChart(nodes, edges);
    },
    /**
     * 
     * @param parent 父节点
     * @param tree 树
     * @param targetNode 目标节点
     * @param nodes echart Nodes
     * @param edges echart edges
     */
    traversal(parent, tree, targetNode, nodes = [], edges = []) {
      let result = false;
      for(let item of tree) {
        let index = _.findIndex(targetNode, {label: item.labelName});
        if(index !== -1) {
          nodes.push({
            id: item.id,
            name: item.labelName,
            category: 1,
            origin_content: targetNode[index].origin_content,
            label_descirbe: targetNode[index].label_descirbe,
          });
          if(parent) {
            edges.push({
              source: parent.id,
              target: item.id
            });
          }
          result = true;
          targetNode.splice(index, 1);
        }
        // 递归处理子节点
        if(!_.isEmpty(item.subList)) {
          let childResult = this.traversal(item, item.subList, targetNode, nodes, edges);
          if(childResult.result) {
            result = true;
            nodes.push({
              id: item.id,
              name: item.labelName,
              category: 0,
            });
            if(parent) {
              edges.push({
                source: parent.id,
                target: item.id
              });
            }
          }
        }
      }
      return {nodes, edges, result};
    },
    /**
     * 
     * @param nodes 
     * [
     *  {
          id: node.id,
          name: node.label,
          category: 1,
        }
      ]
     * @param edges 
     * [
        {
            source: edge.sourceID,
            target: edge.targetID
          }
        ]
     */
    async setChart(nodes = [], edges = []) {
      var chartDom = this.$refs.chart;
      var myChart = echarts.init(chartDom);
      myChart.showLoading();
      myChart.hideLoading();
      myChart.setOption(
        {
          series: [
            {
              type: 'graph',
              layout: 'force',
              zoom: 7,
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    fontSize: 12
                  },
                }
              },
              // progressiveThreshold: 700,
              data: nodes,
              edges: edges,
              categories: [
                {
                  name: '目录',
                  symbolSize: 15
                },
                {
                  name: '标签',
                  symbolSize: 10,
                  label: {
                    color: '#fff'
                  },
                  emphasis: {
                    itemStyle: {
                      color: '#B03A5B'
                    }
                  }
                },
              ],
              
              roam: true,
              lineStyle: {
                width: 0.5,
                curveness: 0,
                opacity: 0.7
              }
            }
          ]
        }
      );
      let currentHighline = 0;
      await this.$nextTick();

      myChart.dispatchAction({
        type: 'highlight',
        dataIndex: currentHighline,
      });
      this.current = nodes[currentHighline];
      myChart.on('click',  (params) => {
        if(params.data.category !== 1) return;

        if(currentHighline !== null) {
          myChart.dispatchAction({
            type: 'downplay',
            dataIndex: currentHighline,
          });
        }
        myChart.dispatchAction({
          type: 'highlight',
          dataIndex: params.dataIndex,
        });
        currentHighline = params.dataIndex;
        this.current = params.data;
      });
      this.chart = myChart;
    }
  }
};
</script>
<style scoped lang="scss">
@import "./TextClassDetail";
</style>
