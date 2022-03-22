<template>
  <div class="wrapper">
    <h1>尝试抚摸鳄鱼</h1>
    <svg
      id="svg"
      width="100%"
      height="100%"
    >
      <pattern
        id="pattern"
        patternUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="10"
        height="10"
        viewBox="0 0 10 10"
      >
        <path
          d="M-5,0,10,15M0-5,15,10"
          stroke="white"
          stroke-width="5"
        />
      </pattern>
    </svg>
  </div>
</template>

<script>
import mascot from './mascot.svg';

export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created: function () {
  },
  mounted: function () {
    var s = Snap('#svg');
    let clearId = [];
    function clearTimer() {
      for (var i = 0; i < clearId.length; i++) {
        clearTimeout(clearId[i]);
      }
      clearId = [];
    }
    Snap.load(mascot, function (f) {
      let head = f.selectAll('#upper-head');
      let jaw = f.selectAll('#upper-jaw');
      let symbol = f.select('#symbol');

      var pivots = [
        [44, 147],
        [92, 126]
      ];
      function close() {
        clearTimer();

        head.animate({
          transform: 'r' + [8, pivots[0]]
        }, 500, mina.backin);

        jaw.animate({
          transform: 'r' + [37, pivots[1]]
        }, 500, mina.backin);
        clearId.push( setTimeout(function() {
          symbol.animate({
            transform: 't' + (-70) + ',' + (40) + 'r' + (40)
          }, 100);
        }, 400));
      }

      function open() {
        clearTimer();

        head.animate({
          transform: 'r' + [0, pivots[0]]
        }, 700, mina.elastic);

        jaw.animate({
          transform: 'r' + [0, pivots[1]]
        }, 700, mina.elastic);
        symbol.animate({
          transform: 't' + (0) + ',' + (0) + 'r' + (0)
        }, 500, mina.elastic);
      }

      let g = f.select('g');
      s.append(g);
      s.select('#body').hover(open,
        function() {
          clearId.push(setTimeout(close, 200));
        }
      );

    });
  },
  methods: {}
};
</script>

<style lang="less" scoped="scoped">
.wrapper {
  width: 500px;
  height: 500px;
}
</style>
