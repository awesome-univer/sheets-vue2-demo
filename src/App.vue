<template>
  <div id="app">
    <div>
      <button @click="getData" title="print current workbook data to console">Get Data</button>
    </div>
    <UniverSheet id="sheet" ref="univerRef" :data="data" />
  </div>
</template>

<script>
import UniverSheet from './components/UniverSheet.vue'
import { DEFAULT_WORKBOOK_DATA } from './assets/default-workbook-data'

export default {
  name: 'App',
  components: {
    UniverSheet
  },
  data () {
    return {
      data: DEFAULT_WORKBOOK_DATA
    }
  },
  methods: {
    getData () {
      const result = this.$refs.univerRef?.getData();
      console.log(JSON.stringify(result, null, 2));
    }
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

#sheet {
  /** The height of the Union uses the height of the parent container */
  flex: 1;
}
</style>
