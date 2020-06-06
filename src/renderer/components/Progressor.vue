<template>
  <Row class="progressRows">
      <Col span="12">
          <Button 
          v-on:click="moveProgressPosition('backwards')"
          v-if="progressPosition > 0"
          >Back</Button>
          <div v-else>&nbsp;</div>
      </Col>
      <Col span="12" >
          <Button 
          type="primary"
          v-on:click="moveProgressPosition('forwards')" 
          v-if="progressPosition < 4"
          style="float:right;"
          >Next</Button>
          
          <Button 
          v-else
          type="primary"
          style="float:right;"
          v-on:click="createTiles"
          :disabled='outputIsNotSet || inputIsNotSet'>Generate Tiles!</Button>

      </Col>
  </Row>
</template>

<script>
    import { spawn } from 'child_process'

    export default {
      name: 'ProgressIndicator',
      computed: {
        progressPosition () {
          return this.$store.state.progressPosition
        },
        inputIsNotSet () {
          return this.$store.state.inputFilePath === ''
        },
        outputIsNotSet () {
          if (this.$store.state.writeToDirectory) {
            if (this.$store.state.outputDirectory === '') return true
            return false
          }
          return this.$store.state.outputFilename === '' || this.$store.state.outputDirectory === ''
        }
      },
      methods: {
        moveProgressPosition (direction) {
          let newIndex = direction === 'forwards' ? this.progressPosition + 1 : this.progressPosition - 1
          this.$store.commit('setProgressPosition', newIndex)
        },
        createTiles () {
          const that = this
          this.$store.commit('setGenerationStarted', true)

          var ls = spawn(`tippecanoe`, this.$store.getters.cmdParams)
          let pastMaxZoom = false

          ls.stderr.on('data', (data) => {
            const d = `${data}`
            if (pastMaxZoom && d.length > 1) that.$store.commit('setProgressPerc', parseInt(d.split('%')[0].trim()))
            if (d.indexOf('Choosing a') > -1) pastMaxZoom = true
          })

          ls.on('close', (code) => {
            if (code === 0) that.$store.commit('setProgressPerc', 100)
            if (code !== 0) that.$store.commit('setErrored', true)
          })
        }
      }
    }
</script>

<style>
.progressRows {
  margin-top: 40px;
}
</style>
