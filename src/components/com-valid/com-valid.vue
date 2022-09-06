<!--
  输入框校验组件
  引用: el-form
  参数: val       [input绑定的值]
        tyep      [校验类型 0-自定义 1-IP地址 2-电话号码 3-身份证号]
        list      [当校验类型为自定义时，限制输入列表,每添加一个字符串代表限制相应的输入]
                  [参数: symbol-特殊字符 letter-字母 number-数字 chinese-中文]
        vaild     [校验是否通过,校验通过返回true,不通过无返回]
        mark      [字段名,同时也是提示词,如:请输入正确的mark,mark不能为空]
-->
<template>
  <div class="com-valid-box">
    <el-form 
      ref="ruleForm"
      class="form"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      label-position="right"
      :validate-on-rule-change="false"
    >
      <el-form-item
        :label="mark"
        prop="val"
      >
        <el-input
          v-model="ruleForm.val"
          :placeholder="longMark"
          @input="btKeyUp"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ComValid',
  components: {
  },
  props: {
    val: {
      type: String,
      default: ''
    },
    tyep: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default: () => {
        return ['symbol'];
      }
    },
    mark: {
      type: String,
      default: '参数'
    }
  },
  data() {
    return {
      flag: 1,
      longMark: '',
      ruleForm: {
        val: ''
      },
      rules: {}
    };
  },
  computed: {
  },
  watch: {
    val: {
      handler: function(val) {
        this.ruleForm.val = val; 
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init(){
      this.$refs.ruleForm.clearValidate();
      if(this.tyep === 0) {
        this.$set(this, 'rules', {val:[{ required: true, validator: this.checkNormal, trigger: 'blur' }]});
      }
      if(this.tyep === 1) {
        this.$set(this, 'rules', {val:[{ required: true, validator: this.checkIp, trigger: 'blur' }]});
        if(this.mark === '') this.mark = 'IP地址';
      }
      if(this.tyep === 2) {
        this.$set(this, 'rules', {val:[{ required: true, validator: this.checkPhone, trigger: 'blur' }]});
        if(this.mark === '') this.mark = '联系电话';
      }
      if(this.tyep === 3) {
        this.$set(this, 'rules', {val:[{ required: true, validator: this.checkIdCard, trigger: 'blur' }]});
        if(this.mark === '') this.mark = '身份证号';
      }
      this.$set(this, 'longMark', '请输入' + this.mark);
    },
    btKeyUp() {
      if(this.tyep === 0) {
        for(let item of this.list) {
          if(item === 'symbol') this.ruleForm.val = this.ruleForm.val.replace(/[`~!@#$%^&*()_\-+=<>?:"{}.|,\/;‘\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '');
          if(item === 'letter') this.ruleForm.val = this.ruleForm.val.replace(/[qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM]/g, '');
          if(item === 'number') this.ruleForm.val = this.ruleForm.val.replace(/[0123456789]/g, '');
          if(item === 'chinese') this.ruleForm.val = this.ruleForm.val.replace(/[^\x00-\xff]/g, '');
        }
      }
      if(this.tyep === 1) {
        this.ruleForm.val = this.ruleForm.val.replace(/[`~!@#$%^&*()_\-+=qwertyuiopasdfghjklzxcvbnm<>?:"{}|,\/;‘\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '');
        this.ruleForm.val = this.ruleForm.val.replace(/[^\x00-\xff]/g, '');
      }
      if(this.tyep === 2) {
        this.ruleForm.val = this.ruleForm.val.replace(/[`~!@#$%^&*()_\-+=qwertyuiopasdfghjklzxcv.bnm<>?:"{}|,\/;‘\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '');
        this.ruleForm.val = this.ruleForm.val.replace(/[^\x00-\xff]/g, '');
      }
      if(this.tyep === 3) {
        this.ruleForm.val = this.ruleForm.val.replace(/[`~!@#$%^&*()_\-+=qwertyuiopasdfghjklzxcvbn.m<>?:"{}|,\/;‘\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '');
        this.ruleForm.val = this.ruleForm.val.replace(/[^\x00-\xff]/g, '');
      }
    },
    checkNormal(rule, value, callback) {
      if (!value) {
        return callback(new Error('请输入' + this.mark));
      }
      else {
        this.$emit('vaild', true);
        callback();
      }
    },
    checkIp(rule, value, callback) {
      if (!value) {
        
        return callback(new Error('请输入' + this.mark));
      }
      setTimeout(() => {
        if (/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/i.test(value) === false) {
          
          callback(new Error('请输入正确的' + this.mark));
        } else {
          this.$emit('vaild', true);
          callback();
        }
      }, 1000);
    },
    checkPhone(rule, value, callback) {
      if (!value) {
        
        return callback(new Error('请输入' + this.mark));
      }
      setTimeout(() => {
        if (/^(13[0-9]|14[0-9]|15[0-9]|16[6]|18[0-9]|19[6,9]|17[0-9])\d{8}$/i.test(value) === false) {
          
          callback(new Error('请输入正确的' + this.mark));
        } else {
          this.$emit('vaild', true);
          callback();
        }
      }, 1000);  
    },
    checkIdCard(rule, value, callback) {
      if (!value) {
        
        return callback(new Error('请输入' + this.mark));
      }
      setTimeout(() => {
        if(value.length !== 18) {
          
          return callback(new Error('请输入正确的' + this.mark));
        }
        if (value.length === 18) {
          // 1 "验证通过!", 0 //校验不通过 // value为身份证号码
          let format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
          //号码规则校验
          if (!format.test(value)) {
            
            return callback(new Error('请输入正确的' + this.mark));
          }
          //区位码校验
          //出生年月日校验  前正则限制起始年份为1900;
          let year = value.substr(6, 4), //身份证年
            month = value.substr(10, 2), //身份证月
            date = value.substr(12, 2), //身份证日
            sexNum = value.split(14, 3), //性别
            time = Date.parse(month + '-' + date + '-' + year), //身份证日期时间戳date
            now_time = Date.parse(new Date()), //当前时间戳
            dates = (new Date(year, month, 0)).getDate(); //身份证当月天数
          if (time > now_time || date > dates) {
            return callback(new Error('请输入正确的' + this.mark));
          }
          //校验码判断
          let c = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //系数
          let b = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'); //校验码对照表
          let value_array = value.split('');
          let sum = 0;
          for (let k = 0; k < 17; k++) {
            sum += parseInt(value_array[k]) * parseInt(c[k]);
          }
          if (value_array[17].toUpperCase() !== b[sum % 11].toUpperCase()) {
            return callback(new Error('请输入正确的' + this.mark));
          }
        }
        this.$emit('vaild', true);
        callback();
      }, 1000);
    }
  }
};
</script>

<style scoped lang="less">
</style>