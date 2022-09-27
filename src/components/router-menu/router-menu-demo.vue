<template>
  <router-menu
    :data="data"
  />
</template>

<script>
import RouterMenu from './router-menu.vue';
export default {
  name: 'RouterMenuDemo',
  components: {
    RouterMenu
  },
  data() {
    return {
      data:[
        {
          id:'1',
          path:'/order',
          meta:{
            title:'订单1'
          },
          type:0, //0 目录 
          children:[
            {
              id:'2',
              path:'/demo/router-menu-demo',
              meta:{
                title:'动态路由目录'
              },
              type:0, //0 目录 
              children:[
                {
                  id:'3',
                  path:'/components/SelectTree/SelectMoreDemo',
                  meta:{
                    title:'下拉选择树'
                  },
                  
                }
              ]
            }
          ]
        },
        {
          id:'4',
          path:'/order',
          isHidden: true,
          meta:{
            title:'订单2'
          },
          
        },
        {
          id:'5',
          path:'/order',
          meta:{
            title:'订单3'
          },
        }
      ]
    };
  },
  methods: {

  }
};
</script>
