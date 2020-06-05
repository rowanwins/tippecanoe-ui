import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    progressPosition: 0,
    generationStarted: false,
    progressPerc: 0,
    errored: false,
    inputFilePath: '',
    projection: '4326',
    tilesetName: 'file.json',
    tilesetDescription: 'file.mbtiles',
    tilesetAttribution: '',
    attributeHandlingType: 'retainAll',
    attributesToHandle: [],
    guessMaxZoom: true,
    zoomRange: [0, 14],
    extendMaxZoom: true,
    tileSizeLimit: 500,
    dropDensest: false,
    disableTileSizeLimit: false,
    featureLimit: 200000,
    disableFeatureLimit: false,
    outputFilename: '',
    outputDirectory: '',
    writeToDirectory: false
  },
  mutations: {
    addAttribute (state, attr) {
      state.attributesToHandle.push(attr)
    },
    removeAttribute (state, attr) {
      const i = state.attributesToHandle.indexOf(attr)
      state.attributesToHandle.splice(i, 1)
    },
    setProgressPosition (state, newPosition) {
      if (newPosition < 0) newPosition = 0
      state.progressPosition = newPosition
      if (newPosition === 0) router.push({ name: 'input' })
      if (newPosition === 1) router.push({ name: 'tilesetInformation' })
      if (newPosition === 2) router.push({ name: 'attributeHandling' })
      if (newPosition === 3) router.push({ name: 'tileLimits' })
      if (newPosition === 4) router.push({ name: 'output' })
    },
    setGenerationStarted (state, bool) {
      state.generationStarted = bool
    },
    setErrored (state, bool) {
      state.errored = bool
    },
    setProgressPerc (state, int) {
      state.progressPerc = int
    },
    setFormVal (state, change) {
      state[change.key] = change.value
    }
  },
  getters: {
    outNameAndDir: state => {
      return `${state.outputDirectory}/${state.outputFilename}`
    },
    cmdParams: (state, getters) => {
      const params = []

      if (state.writeToDirectory) {
        params.push(`--output-to-directory=${state.outputDirectory}`)
      } else {
        params.push(`--output=${getters.outNameAndDir}`)
      }

      if (state.projection !== '4326') {
        params.push(`--projection=EPSG:${state.projection}`)
      }
      if (state.tilesetName !== 'file.json') {
        params.push(`--name="${state.tilesetName}"`)
      }
      if (state.tilesetDescription !== 'file.mbtiles') {
        params.push(`--description="${state.tilesetDescription}"`)
      }
      if (state.tilesetAttribution !== '') {
        params.push(`--attribution="${state.tilesetAttribution}"`)
      }

      if (state.attributeHandlingType === 'removeAll') {
        params.push(`--exclude-all`)
      } else if (state.attributeHandlingType === 'retainByList') {
        state.attributesToHandle.map(a => {
          params.push(`--include=${a}`)
        })
      } else if (state.attributeHandlingType === 'excludeByList') {
        state.attributesToHandle.map(a => {
          params.push(`--exclude=${a}`)
        })
      }

      if (state.guessMaxZoom) {
        params.push(`--maximum-zoom=g`)
      } else {
        params.push(`--maximum-zoom=${state.zoomRange[1]}`)
      }
      if (state.zoomRange[0] !== 0) {
        params.push(`--minimum-zoom=${state.zoomRange[0]}`)
      }
      if (state.extendMaxZoom) {
        params.push(`--extend-zooms-if-still-dropping`)
      }

      if (state.disableTileSizeLimit) {
        params.push(`--no-tile-size-limit`)
      } else {
        if (state.tileSizeLimit !== 500) {
          params.push(`--maximum-tile-bytes=${state.tileSizeLimit}`)
        }
        if (state.dropDensest) {
          params.push(`--drop-densest-as-needed`)
        }
      }

      if (state.disableFeatureLimit) {
        params.push(`--no-feature-limit`)
      } else {
        if (state.featureLimit !== 200000) {
          params.push(`--maximum-tile-features=${state.featureLimit}`)
        }
      }

      params.push(`${state.inputFilePath}`)

      return params
    },
    cmdAsString: (state, getters) => {
      return `tippecanoe ${getters.cmdParams.join(' ')}`
    }

  }
})
