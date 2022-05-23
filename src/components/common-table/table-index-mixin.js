export const tableIndexMixin = {
  props: {
    pageInfo: {
      type: Object,
      default: null
    }
  },
  methods:{
    indexMethod(index){
      if(!this.pageInfo) return index + 1;

      return (this.pageInfo.pageId - 1) * this.pageInfo.pageSize + index + 1;
    }
  }
};
