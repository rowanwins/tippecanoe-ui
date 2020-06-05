<template>
  <Form :label-width="100">
    <h3>Tile Limits</h3>
    <FormItem label="Zoom range">
      <Row>
        <Col span="8">
          <Slider
          v-model="zoomRange" 
          range 
          :max="22"
          :disabled="guessMaxZoom"
          ></Slider>
        </Col>
        <Col span="14" offset="2">
          <Row>
            <Checkbox v-model="guessMaxZoom">Guess reasonable maxZoom    <Tooltip content="Guess what is probably a reasonable maxzoom based on the spacing of features" max-width="200" ><Icon type="ios-information-circle-outline" size="16"/></Tooltip></Checkbox>
        </Row>
        <Row>
          <Checkbox v-model="extendMaxZoom">Extend maxZoom if dropping features</Checkbox>
        </Row>
        </Col>
      </Row>
    </FormItem>
    <Divider />
    <FormItem label="Tile size limit">
      <Row>
        <Col span="8">
          <Slider
          v-model="tileSizeLimit"
          :max="2000"
          :tip-format="sizeFormat"
          :disabled="disableTileSizeLimit"
          ></Slider>
        </Col>
        <Col span="14" offset="2">
          <Row>
            <Checkbox v-model="dropDensest" :disabled="disableTileSizeLimit">Drop densest as needed</Checkbox>
          </Row>
          <Row>
            <Checkbox v-model="disableTileSizeLimit">Disable tile size limit</Checkbox>
          </Row>
        </Col>
      </Row>
    </FormItem>
    <Divider />
    <FormItem label="Feature limit">
      <Row>
        <Col span="8">
          <Slider
          v-model="featureLimit"
          :max="500000"
          :tip-format="featureFormat"
          :disabled="disableFeatureLimit"
          ></Slider>
        </Col>
        <Col span="14" offset="2">
          <Checkbox v-model="disableFeatureLimit">Disable feature limit</Checkbox>
        </Col>

      </Row>
    </FormItem>

  </Form>
</template>

<script>
  export default {
    name: 'OutputFile',
    computed: {
      guessMaxZoom: {
        get () {
          return this.$store.state.guessMaxZoom
        },
        set (value) {
          this.$store.commit('setFormVal', {key: 'guessMaxZoom', value: value})
        }
      },
      zoomRange: {
        get () {
          return this.$store.state.zoomRange
        },
        set (value) {
          this.$store.commit('setFormVal', {key: 'zoomRange', value: value})
        }
      },
      extendMaxZoom: {
        get () {
          return this.$store.state.extendMaxZoom
        },
        set (value) {
          this.$store.commit('setFormVal', {key: 'extendMaxZoom', value: value})
        }
      },
      tileSizeLimit: {
        get () {
          return this.$store.state.tileSizeLimit
        },
        set (value) {
          this.$store.commit('setFormVal', {key: 'tileSizeLimit', value: value})
        }
      },
      dropDensest: {
        get () {
          return this.$store.state.dropDensest
        },
        set (value) {
          this.$store.commit('setFormVal', {key: 'dropDensest', value: value})
        }
      },
      disableTileSizeLimit: {
        get () {
          return this.$store.state.disableTileSizeLimit
        },
        set (value) {
          this.$store.commit('setFormVal', {key: 'disableTileSizeLimit', value: value})
        }
      },
      featureLimit: {
        get () {
          return this.$store.state.featureLimit
        },
        set (value) {
          this.$store.commit('setFormVal', {key: 'featureLimit', value: value})
        }
      },
      disableFeatureLimit: {
        get () {
          return this.$store.state.disableFeatureLimit
        },
        set (value) {
          this.$store.commit('setFormVal', {key: 'disableFeatureLimit', value: value})
        }
      }
    },
    methods: {
      sizeFormat (val) {
        return `${val}kb`
      },
      featureFormat (val) {
        return `${val} features`
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
</style>
