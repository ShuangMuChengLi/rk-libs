<template>
  <div>
    <div>
      <person-label
        labels="刑|盗,刑|抢,刑|毒"
      />
    </div>
    <div>
      <person-label
        labels="刑|盗,刑|抢,刑|毒"
        :limit="2"
      />
    </div>
    <div>
      <person-label
        labels="刑|盗,刑|抢,刑|毒"
        :is-row="true"
      />
    </div>
  </div>
</template>

<script>
import PersonLabel from './person-label';
export default {
  name: 'PersonLabelDemo',
  components: {PersonLabel}
};
</script>

<style scoped>

</style>
