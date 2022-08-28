<template>
  <div
    v-loading="uploadLoading"
    class="cropper-content"
  >
    <div class="cropper-box">
      <div class="cropper">
        <div class="cropper-title">
          图片处理
        </div>
        <vue-cropper
          ref="cropperInstance"
          :img="option.img"
          :output-size="option.outputSize"
          :output-type="option.outputType"
          :info="option.info"
          :can-scale="option.canScale"
          :auto-crop="option.autoCrop"
          :auto-crop-width="option.autoCropWidth"
          :auto-crop-height="option.autoCropHeight"
          :fixed="option.fixed"
          :fixed-number="option.fixedNumber"
          :full="option.full"
          :fixed-box="option.fixedBox"
          :can-move="option.canMove"
          :can-move-box="option.canMoveBox"
          :original="option.original"
          :center-box="option.centerBox"
          :height="option.height"
          :info-true="option.infoTrue"
          :max-img-size="option.maxImgSize"
          :enlarge="option.enlarge"
          :mode="option.mode"
          @realTime="realTime"
          @imgLoad="imgLoad"
        />
      </div>
      <!--底部操作工具按钮-->
      <div class="footer-btn">
        <div class="scope-btn">
          <input
            id="uploads"
            ref="uploadsFile"
            type="file"
            accept="image/png, image/jpeg, image/gif, image/jpg"
            @change="selectImg($event)"
          >
          <el-button
            size="mini"
            type="danger"
            plain
            icon="el-icon-zoom-in"
            @click="changeScale(1)"
          >
            放大
          </el-button>
          <el-button
            size="mini"
            type="danger"
            plain
            icon="el-icon-zoom-out"
            @click="changeScale(-1)"
          >
            缩小
          </el-button>
          <el-button
            size="mini"
            type="danger"
            plain
            @click="rotateLeft"
          >
            ↺ 左旋转
          </el-button>
          <el-button
            size="mini"
            type="danger"
            plain
            @click="rotateRight"
          >
            ↻ 右旋转
          </el-button>
          <el-button
            size="mini"
            type="success"
            :loading="uploadLoading"
            @click="uploadImg('blob')"
          >
            上传图片
          </el-button>
        </div>
      </div>
    </div>
    <!--预览效果图-->
    <div class="show-preview">
      <div class="show-preview-title">
        预览
      </div>
      <div
        :style="previews.div"
        class="preview"
      >
        <img
          v-show="previews.url"
          :src="previews.url"
          :style="previews.img"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper';
export default {
  name: 'CropperImage',
  components: {
    VueCropper,
  },
  props: {
    imgUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      previews: {},
      option: {
        img: '', // 裁剪图片的地址
        outputSize: 1, // 裁剪生成图片的质量(可选0.1 - 1)
        outputType: 'jpeg', // 裁剪生成图片的格式（jpeg || png || webp）
        info: true, // 图片大小信息
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 280, // 默认生成截图框宽度
        autoCropHeight: 160, // 默认生成截图框高度
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [7, 4], // 截图框的宽高比例
        full: true, // false按原比例裁切图片，不失真
        fixedBox: true, // 固定截图框大小，不允许改变
        canMove: false, // 上传图片是否可以移动
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        height: true, // 是否按照设备的dpr 输出等比例图片
        infoTrue: false, // true为展示真实输出图片宽高，false展示看到的截图框宽高
        maxImgSize: 3000, // 限制图片最大宽度和高度
        enlarge: 1, // 图片根据截图框输出比例倍数
        mode: '280px 160px', // 图片默认渲染方式
      },
      chooseImageType: 'jpeg',
      uploadLoading: false,
    };
  },
  watch: {
    imgUrl: {
      handler: function (v) {
        this.option.img = v;
        if (!v) {
          this.$refs['uploadsFile'] && (this.$refs['uploadsFile'].value = '');
        }
      },
      immediate: true,
    },
  },
  methods: {
    // 初始化函数
    imgLoad() {
      this.uploadLoading = false; // 页面loading 必须在此处进行初始化 否则会出现 闪动， 因为imgLoad方法会在 vue-cropper组件初始化之后执行
    },
    // 图片缩放
    changeScale(num) {
      num = num || 1;
      this.$refs['cropperInstance'].changeScale(num);
    },
    // 向左旋转
    rotateLeft() {
      this.$refs['cropperInstance'].rotateLeft();
    },
    // 向右旋转
    rotateRight() {
      this.$refs['cropperInstance'].rotateRight();
    },
    // 实时预览函数
    realTime(data) {
      this.previews = data;
    },
    // 选择图片
    selectImg(e) {
      if (!e.target.files.length) return;
      if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
        this.$message({
          message: '图片类型要求：jpeg、jpg、png',
          type: 'error',
        });
        return false;
      }
      let file = e.target.files[0];
      let strArr = file.name.split('.');
      this.chooseImageType = strArr[strArr.length - 1];
      // 转化为blob
      let reader = new FileReader();
      reader.onload = (e) => {
        let data;
        if (typeof e.target.result === 'object') {
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        this.option.img = data;
      };
      // 转化为base64
      reader.readAsDataURL(file);
    },
    // 上传图片
    uploadImg(type) {
      if (type !== 'blob') return;
      // 获取截图的blob数据
      this.$refs['cropperInstance'].getCropBlob(async (data) => {
        let formData = new FormData();
        formData.append('file_data', data, `image.${this.chooseImageType}`);
        // 调用axios上传
        this.uploadLoading = true;
        // let res = await this.$API.fileUpload(formData, {
        //   'Content-Type': 'multipart/form-data',
        // });

        // 前端写死开始
        let res = {
          code: 200,
          data: {
            url: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
          }
        };
        // 前端写死结束

        if (res.code === 200) {
          this.$message({
            message: '上传成功！',
            type: 'success',
          });
          this.$emit('uploadImgSuccess', res.data.url);
        } else {
          this.$message({
            message: '文件服务异常，请联系管理员！',
            type: 'error',
          });
        }
        this.uploadLoading = false;
      });
    },
  },
}; 
</script>
<style scoped lang="less">
  @import "./Cropeper.less";
</style>