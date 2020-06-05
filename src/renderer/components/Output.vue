<template>
    <div>
        <h3>Output Tiles</h3>
        <Form :label-width="100">
            <FormItem label="Output directory">
              <Button v-on:click="getOutputDir">Select output directory</Button> {{outputDirectory}}
              <br/>
              <Checkbox v-model="writeToDirectory">Write tiles to the specified directory instead of to an mbtiles file</Checkbox>
            </FormItem>
            <FormItem label="Output filename">
                <Input v-model="outputFilename" :disabled="writeToDirectory"placeholder="something.mbtiles" style="width: 300px" />
            </FormItem>
        </Form>

        <code class="tippecanoeCmd">{{cmdAsString}}</code>

        <Progress :percent="progressPerc" :stroke-width="20" :status="status" text-inside v-if="generationStarted"/>

    </div>
</template>

<script>
  export default {
    name: 'Generate',
    computed: {
      cmdAsString: {
        get () {
          return this.$store.getters.cmdAsString
        }
      },
      generationStarted: {
        get () {
          return this.$store.state.generationStarted
        }
      },
      progressPerc: {
        get () {
          return this.$store.state.progressPerc
        }
      },
      status: {
        get () {
          if (this.errored === true) return 'wrong'
          if (this.progressPerc === 0) return 'normal'
          if (this.progressPerc < 100) return 'active'
          if (this.progressPerc === 100) return 'success'
        }
      },
      outNameAndDir: {
        get () {
          return this.$store.getters.outNameAndDir
        }
      },
      outputFilename: {
        get () {
          return this.$store.state.outputFilename
        },
        set (value) {
          this.$store.commit('setFormVal', {key: 'outputFilename', value: value})
        }
      },
      writeToDirectory: {
        get () {
          return this.$store.state.writeToDirectory
        },
        set (value) {
          this.$store.commit('setFormVal', {key: 'writeToDirectory', value: value})
        }
      },
      outputDirectory: {
        get () {
          return this.$store.state.outputDirectory
        }
      }
    },
    methods: {
      getOutputDir () {
        const d = this.$electron.remote.dialog.showOpenDialog({properties: ['createDirectory', 'openDirectory']})
        if (d !== undefined) this.$store.commit('setFormVal', {key: 'outputDirectory', value: d[0]})
      }
    }
}
</script>
<style>
.tippecanoeCmd {
  background: #f3f3f3;
  padding: 20px;
  border-radius: 4px;
  margin: 40px 0px;
  display: block;
}
</style>
