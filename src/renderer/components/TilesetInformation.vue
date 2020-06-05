<template>
  <Form :label-width="80">
    <h3>Tileset Information</h3>
    <FormItem label="Name">
      <Input v-model="tilesetName"></Input>
    </FormItem>
    <FormItem label="Description">
        <Input v-model="tilesetDescription" type="textarea"/>
    </FormItem>
    <FormItem label="Attribution">
        <Input v-model="tilesetAttribution" type="textarea"/>
    </FormItem>
  </Form>
</template>

<script>
  export default {
    name: 'TilesetInformation',
    computed: {
      tilesetName: {
        get () {
          return this.$store.state.tilesetName
        },
        set (value) {
          this.$store.commit('setFormVal', {key: 'tilesetName', value: value})
        }
      },
      tilesetDescription: {
        get () {
          return this.$store.state.tilesetDescription
        },
        set (value) {
          this.$store.commit('setFormVal', {key: 'tilesetDescription', value: value})
        }
      },
      tilesetAttribution: {
        get () {
          return this.$store.state.tilesetAttribution
        },
        set (value) {
          this.$store.commit('setFormVal', {key: 'tilesetAttribution', value: value})
        }
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
</style>
