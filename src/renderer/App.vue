<template>
  <Row id="app">
    <Col span="6" id="sidebar">
      <Row>
        <Col span="19" offset="3">
          <sidebar/>
        </Col>
      </Row>
    </Col>
    <Col span="15" offset="2" id="mainArea">
      <router-view></router-view>
      <progressor />
    </Col>
  </Row>
</template>

<script>
  import Progressor from './components/Progressor.vue'
  import Sidebar from './components/Sidebar.vue'

  export default {
    name: 'tippecanoe-ui',
    components: {
      Sidebar,
      Progressor
    }
  }
</script>

<style lang="less">
  @import url('https://fonts.googleapis.com/css?family=Crimson+Text');

 #app {
    height: 100vh;
   #sidebar {
      height: 100vh;
      padding-top: 50px;
      background-color: #45a8b4;
   }
   #mainArea {
      padding-top: 120px;
      height: 100vh;
   }
 }

 h1 {
  font-family: 'Crimson Text', serif;
  color: white;
  letter-spacing: 0.14rem;
  margin-bottom: 40px;
 }
 h3 {
  margin-bottom: 20px;
 }
 .ivu-form .ivu-form-item-label {
  padding-right: 20px;
 }
 .ivu-tooltip-inner-with-width {
  text-align: left;
  word-break: normal;
 }
</style>
