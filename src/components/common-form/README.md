# 可配置表单common-form
## preview
[预览](./index.html#/components/common-form)
## download
[组件下载](./components/common-form.zip)
## dependence
Vue.js、ElementUI

## Attributes
| 参数 |	说明 |类型 |是否必填	| 可选值 | 默认值 |
| ---- | ---- |---- | ----   |----  |  --- |
| v-model | 表单值 | Object | true | -  |  - |
| formInfo | 表单配置项 | Array | true | -  |  - |
| labelWidth | label宽度 | String | false | -  |  80px |
| size | 表单尺寸 | String | false | medium、small、mini  |  mini |
| rules | element表单验证配置 | Object | false | -  |  null |
| doubleColumn | 是否双列显示| Boolean | false | -  |  false |
### formInfo参数
| 参数 |	说明 |类型 |是否必填	| 可选值 | 默认值 |
| ---- | ---- |---- | ----   |----  |  --- |
| prop | 字段名 | String/Array | true | -  |  - |
| label | 字段标题 | String | true | -  |  - |
| type | 字段类型 | String | true | input、checkbox、textarea、select  |  - |
| options | 下拉框的选项列表 | Array | false | -  |  - |
| optionsFn | 下拉框的选项列表获取函数 | Function | false | -  |  - |
## Methods
| 方法名 |	说明 | 参数 | return |
| ---- | ---- | ---- | ---- | 
| validate | 验证表单 | - | Boolean | 
## usage
```
<template>
  <div class="demo">
    <common-form
      ref="form"
      v-model="form"
      :form-info="formInfoConfig"
      :double-column="doubleColumn"
      label-width="130px"
    />
    <footer>
      <el-button
        type="primary"
        @click="submit"
      >
        提交
      </el-button>
    </footer>
  </div>
</template>

<script>
import CommonForm from './common-form';
export default {
  name: 'CommonFormDemo',
  components: {CommonForm},
  data(){
  	return {
		  form: {},
		  formInfoConfig: [
			  {
				  label: '角色组名称',
				  type: 'input',
				  prop: 'groupName',
          defaultValue: '角色组名称',
				  rules: [
					  {
						  required: true,
						  message: '请填写角色组名称!'
					  },
				  ]
			  },
			  {
				  label: '角色组权限',
				  type: 'checkbox',
				  prop: 'right',
				  defaultValue: ['1'],
          options:[
            {
	            value: '1',
              label: '新增'
            },
            {
	            value: '2',
              label: '编辑'
            },
          ],
				  rules: [
					  {
						  required: true,
						  message: '请填写角色组权限!'
					  },
				  ]
			  },
			  {
				  label: '备注',
				  type: 'textarea',
				  prop: 'groupDesc',
				  rules: [
					  {
						  max: 128,
						  message: '字数不能超过128个!'
					  }
				  ]
			  },
			  {
				  label: '角色组类型',
				  type: 'select',
				  prop: 'groupType',
				  options:[
					  {
						  value: '1',
						  label: '管理员'
					  },
					  {
						  value: '2',
						  label: '民警'
					  },
				  ],
				  rules: [
					  {
						  required: true,
						  message: '请填写角色组类型!'
					  },
				  ]
			  },
      ],
		  doubleColumn: true
    };
  },
  methods:{
	  async submit(){
	  	let validateResult = await this.$refs.form.validate();
	  	if(!validateResult)return;
	  	
	  	this.$message.success('提交表单');
    }
  }
};
</script>

<style scoped lang="less">
  .demo{
    width: 800px;
    padding: 20px;
    margin: 20px;
    border: 1px solid #333;
  }
  footer{
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>
```
