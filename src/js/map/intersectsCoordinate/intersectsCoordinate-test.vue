<template>
  <div>判断点位在地图几何范围内</div>
</template>

<script>
import { intersectsCoordinate } from '@/js/map/intersectsCoordinate/intersectsCoordinate';
import {intersectsCoordinateFromCircle} from './intersectsCoordinate';

export default {
  name: 'IntersectsCoordinateTest',
  mounted () {
    let list = [[
      [116.314582, 39.979764],
      [116.456011, 39.979764],
      [116.464635, 39.854919],
      [116.311132, 39.868654],
      [116.314582, 39.979764]
    ]];
    let point = [116.341028, 39.947468];
    let result = intersectsCoordinate(list, point);
    console.log(result);
    let result2 = intersectsCoordinateFromCircle([116.403622, 39.9239], 1, [116.408293, 39.9239] ); // true
    console.log(result2);
  }
};
</script>

<style scoped>

</style>
