<script>
import _ from 'lodash';
export default {
  name: 'RouterMenu',
  props: {
    data: {
      type: Array,
      default: null,
    },
    mode: {
      type: String,
      default: 'horizontal',
      validator: function (value) {
        return ['horizontal', 'vertical'].includes(value);
      },
    },
  },
  render: function (h) {
    function recursion(list) {
      return _.orderBy(list || [], 'sort', 'asc')
        .filter((i) => !i.isHidden)
        .map((item) => {
          if (item.type === 0) {
            return h(
              'el-submenu',
              {
                key: item.id,
                props: {
                  index: item.path,
                },
              },
              [
                h(
                  'template',
                  {
                    slot: 'title',
                  },
                  item?.meta?.title
                ),
                ...recursion(item.children),
              ]
            );
          } else {
            return h(
              'el-menu-item',
              {
                key: item.id,
                props: {
                  index: item.path,
                },
              },
              item?.meta?.title
            );
          }
        });
    }
    return h(
      'el-menu',
      {
        props: {
          router: true,
          mode: this.mode,
          'unique-opened': true,
          'default-active': this.$route.path,
        },
      },
      recursion(this.data)
    );
  },
};
</script>
