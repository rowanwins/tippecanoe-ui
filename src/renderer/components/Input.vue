<template>
  <Form :label-width="80">
    <h3>Input Information</h3>
    <FormItem label="Input">
      <Upload
        :before-upload="handleUpload"
         action="">
        <Button icon="ios-document-outline" style="margin-right: 10px;">Select the file to process</Button> {{inputFilePath}}
      </Upload>
    </FormItem>
    <FormItem label="Projection">
      <RadioGroup v-model="projection">
        <Radio label="4326">4326</Radio>
        <Radio label="3857">3857</Radio>
      </RadioGroup>
    </FormItem>
  </Form>
</template>

<script>
  export default {
    name: 'Input',
    computed: {
      inputFilePath: {
        get () {
          return this.$store.state.inputFilePath
        }
      },
      projection: {
        get () {
          return this.$store.state.projection
        },
        set (value) {
          this.$store.commit('setFormVal', {key: 'projection', value: value})
        }
      }
    },
    methods: {
      handleUpload (file) {
        this.$store.commit('setFormVal', {key: 'inputFilePath', value: file.path})
        return false
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
</style>
