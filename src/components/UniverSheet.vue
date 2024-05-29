<template>
  <div ref="container" class="univer-container"></div>
</template>

<script>
import "@univerjs/design/lib/index.css";
import "@univerjs/ui/lib/index.css";
import "@univerjs/sheets-ui/lib/index.css";
import "@univerjs/sheets-formula/lib/index.css";

import { Univer, UniverInstanceType } from "@univerjs/core";
import { defaultTheme } from "@univerjs/design";
import { UniverDocsPlugin } from "@univerjs/docs";
import { UniverDocsUIPlugin } from "@univerjs/docs-ui";
import { UniverFormulaEnginePlugin } from "@univerjs/engine-formula";
import { UniverRenderEnginePlugin } from "@univerjs/engine-render";
import { UniverSheetsPlugin } from "@univerjs/sheets";
import { UniverSheetsFormulaPlugin } from "@univerjs/sheets-formula";
import { UniverSheetsUIPlugin } from "@univerjs/sheets-ui";
import { UniverUIPlugin } from "@univerjs/ui";

export default {
  name: 'UniverSheet',
  props: {
    // workbook data
    data: {
      value: Object,
      default: () => ({}),
    },
  },
  watch: {
    // watch data change, and re-create univer instance
    data: {
      handler (val) {
        this.destroyUniver();
        this.init(val);
      },
      immediate: true,
    },
  },
  data () {
    return {
      // univer instance
      univer: null,
      // workbook instance
      workbook: null,
    };
  },
  mounted () {
    this.init(this.data);
  },
  methods: {
    /**
     * Initialize univer instance and workbook instance
     * @param data {IWorkbookData} document see https://univer.work/api/core/interfaces/IWorkbookData.html
     */
     init (data = {}) {
      const univer = new Univer({
        theme: defaultTheme,
      });
      this.univer = univer;

      // core plugins
      univer.registerPlugin(UniverRenderEnginePlugin);
      univer.registerPlugin(UniverFormulaEnginePlugin);
      univer.registerPlugin(UniverUIPlugin, {
        container: this.$refs.container,
      });

      // doc plugins
      univer.registerPlugin(UniverDocsPlugin, {
        hasScroll: false,
      });
      univer.registerPlugin(UniverDocsUIPlugin);

      // sheet plugins
      univer.registerPlugin(UniverSheetsPlugin);
      univer.registerPlugin(UniverSheetsUIPlugin);
      univer.registerPlugin(UniverSheetsFormulaPlugin);

      // create workbook instance
      this.workbook = univer.createUnit(UniverInstanceType.UNIVER_SHEET, data);
    },
    /**
     * Destroy univer instance and workbook instance
     */
    destroyUniver () {
      this.univer?.dispose();
      this.univer = null;
      this.workbook = null;
    },
    /**
     * Get workbook data
     */
    getData () {
      if (!this.workbook) {
        throw new Error('Workbook is not initialized');
      }
      return this.workbook.save();
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.univer-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* Also hide the menubar */
:global(.univer-menubar) {
  display: none;
}
</style>
