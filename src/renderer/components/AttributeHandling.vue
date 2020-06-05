<template>
    <div>
    <h3>Attribute Information</h3>
      <Row>
        <Col span="12">
          <RadioGroup v-model="attributeHandlingType" vertical>
            <Radio label="retainAll">Retain all</Radio>
            <Radio label="removeAll">Remove all</Radio>
            <Radio label="retainByList">Retain by list</Radio>
            <Radio label="excludeByList">Exclude by list</Radio>
          </RadioGroup>
        </Col>
        <Col span="12" v-if="attributeHandlingType === 'retainByList' || attributeHandlingType === 'excludeByList'">
          <Input v-model="value" @on-enter="addAttribute" placeholder="Add a attribute" style="width: 300px" />
          <br/><br/>
          <Tag closable @on-close="removeAttribute" v-for="item in attributesToHandle" :key="item">{{item}}</Tag>
        </Col>
      </Row>
    </div>
</template>

<script>
  export default {
    name: 'AttributeHandling',
    data () {
      return {
        value: ''
      }
    },
    computed: {
      attributeHandlingType: {
        get () {
          return this.$store.state.attributeHandlingType
        },
        set (value) {
          this.$store.commit('setFormVal', {key: 'attributeHandlingType', value: value})
        }
      },
      attributesToHandle: {
        get () {
          return this.$store.state.attributesToHandle
        }
      }
    },
    methods: {
      addAttribute () {
        this.$store.commit('addAttribute', this.value)
        this.value = ''
      },
      removeAttribute (val) {
        this.$store.commit('removeAttribute', val)
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
</style>
