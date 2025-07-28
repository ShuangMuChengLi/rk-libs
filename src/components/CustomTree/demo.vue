<template>
  <Transition
    name="animate__animated animate__fadeInLeft"
    enter-active-class="animate__fadeInLeft"
    leave-active-class="animate__fadeOutLeft"
  >
    <div
      v-if="isShrink"
      class="shrink-show"
      @click="shrink"
    >
      <i class="el-icon-d-arrow-right" />
    </div>
    <BoxForBoard3D 
      v-if="!isShrink"
      class="h100 board-3-d-left animate__animated animate__fadeInLeft"
    >
      <div
        class="shrink"
        @click="shrink"
      >
        <i class="el-icon-d-arrow-left" />
      </div>
      <BoxTitle title="工程目录树" />
      <div class="box-body">
        <div class="filter">
          <el-input
            v-model="keyword"
            prefix-icon="el-icon-search"
            clearable
            placeholder="请输入工程名称关键字"
            @input="handleQuery"
          />
        </div>
        <div
          v-if="false"
          class="tab-row"
        >
          <div class="tabs">
            <div class="tab active">
              在建工程
            </div>
            <div class="tab">
              关注工程
            </div>
          </div>
        </div>
        <div class="tree-wrapper">
          <custom-tree
            ref="treeRef"
            :data="treeObj.data"
            :props="treeObj.props"
            node-key="code"
            :default-expanded-keys="defaultExpandedKeys"
            :expand-on-click-node="false"
            :filter-node-method="filterMethod"
          >
            <template #default="{data, level}">
              <div
             
                class="custom-tree-node"
              >
                <div class="tree-row-left">
                  <i
                    :class="{
                      project: data.status !== 'construction',
                      'ai-project': data.status === 'construction',
                      folder: data.status === undefined,
                    }"
                  />
                  <span
                    class="node-label one-text-overflow"
                    :title="data.name"
                    @click="locateProject(data)"
                  >{{ data.name }}</span>
                  <div
                    v-if="false"
                    class="ai"
                  >
                    AI
                  </div>
                </div>
                <div
                  v-if="data.status === undefined"
                  class="tree-row-right"
                >
                  <i class="offline" />
                  <span>{{ data.historyCount }}</span>

                  <i class="online" />
                  <span>{{ data.constructionCount }}</span>
                &nbsp; &nbsp;
                  <span>
                    <svg-icon icon-class="icon-yellow-hat" />
                    {{ data.safetyOnline }} / {{ data.safetyTotal }}
                  </span>
                  <i
                    :style="{ visibility: data.status || level === 1 ? 'hidden' : 'visible' }"
                    class="more"
                    @click="viewDetail(data, level)"
                  />
                </div>
              </div>
            </template>
          </custom-tree>
        </div>
      </div>
    </BoxForBoard3D>
  </Transition>
</template>

<script>
// import { data } from 'jquery';
import BoxTitle from '../../dashboard/child/box-title/BoxTitle.vue';
import BoxForBoard3D from '../BoxForBoard3D/BoxForBoard3D.vue';
import { treeData } from './treeData';
import { board3DApi } from '@/api/board3D';
import { getEssProjectBaseInfo } from '@/api/engineerOperation/index.js';
import _ from 'lodash';
import CustomTree from './CustomTree/CustomTree.vue';

export default {
  name: 'Board3DLeft',
  components: {
    BoxTitle,
    BoxForBoard3D,
    CustomTree,
  },
  data() {
    return {
      keyword: null,
      isShrink: false,
      treeObj: {
        data: treeData,
        props: {
          children: 'childList',
          label: 'name'
        },
      },
      defaultExpandedKeys: []
    };
  },
  mounted() {
    this.getProjectTree();
  },
  methods: {
    viewDetail(data, level) {
      let type;
      if (level === 2) type = 'street';
      if (level === 3) type = 'community';
      this.$emit('viewDetail', {...data, type});
    },
    shrink() {
      this.isShrink = !this.isShrink;
    },
    getProjectTree() {
      board3DApi.getProjectsTree().then(res => {
        this.treeObj.data = _.cloneDeep(res);
        this.bus.$emit('dashboard-dept-change', _.get(this.treeObj.data, 0));
        this.defaultExpandedKeys = [this.treeObj.data[0]?.code];
      });
    },
    handleQuery(val) {
      this.$refs['treeRef'].filter(val);
    },
    // 在地图上定位项目
    async locateProject(item) {
      // 获取项目详情
      let { longitude, latitude } = item;
      if (!longitude) return this.$message.error('未获取到经纬度');
      this.bus.$emit('map-location', { longitude, latitude});
      const projectInfo = await getEssProjectBaseInfo(item.code);
      this.bus.$emit('map-location-open-dialog', 'GridLabelDlg', { data: projectInfo.data, lat: latitude, lng: longitude});
    },
    filterMethod(val, data) {
      if (!val) return true;
      
      return data.name.indexOf(val) !== -1;
    }
  },
};
</script>

<style scoped lang="scss">
@import './Board3DLeft.scss';
</style>
