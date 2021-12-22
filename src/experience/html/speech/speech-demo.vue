<template>
  <div>
    <el-input
      v-model="text"
      style="width: 300px"
    />
    <el-button
      style="margin-left: 10px;"
      type="primary"
      @click="speak"
    >
      Speak
    </el-button>
    <el-button
      style="margin-left: 10px;"
      @click="stop"
    >
      Stop!
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'SpeechDemo',
  data(){
    return {
      speechSynthesisCase: null,
      msg: null,
      text: '跟我走吧，天亮就出发'
    };
  },
  mounted() {
    this.speechSynthesisCase = window.speechSynthesis;
  },
  methods:{
    speak(){
      this.msg = new SpeechSynthesisUtterance();
      this.msg.text = this.text;
      this.msg.lang = 'zh-CN';
      this.speechSynthesisCase.speak(this.msg);
    },
    stop(){
      this.speechSynthesisCase.cancel(this.msg);
    }
  }
};
</script>
