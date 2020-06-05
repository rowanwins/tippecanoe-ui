<template>
    <Row>
        <h1>Tippecanoe UI</h1>
        <Steps :current="progressPosition" direction="vertical">
            <Step
            title="Input"
            content="Set the input and it's projection"
            ></Step>
            <Step
            title="Tileset"
            content="Set information about the tileset"
            ></Step>
            <Step
            title="Attributes"
            content="Decide which attributes to keep"
            ></Step>
            <Step
            title="Tile limits"
            content="Set limits on the zoom, number of features and tilesize"
            ></Step>
            <Step
            title="Generate"
            content="Create the tiles"
            ></Step>
        </Steps>
        <p class='tv'>Tippecanoe v{{tippecanoeVersion}} installed</p>
        <p style="color:white;font-weight: bold;" v-if="upgradeAvailable === -1">v{{latestTippecanoeVersion}} available</p>
    </Row>
</template>

<script>
    import compareVersions from 'compare-versions'
    import axios from 'axios'
    var spawn = require('child_process').spawn

    export default {
      name: 'Sidebar',
      data () {
        return {
          tippecanoeVersion: '',
          latestTippecanoeVersion: ''
        }
      },
      computed: {
        progressPosition () {
          return this.$store.state.progressPosition
        },
        upgradeAvailable () {
          if (this.latestTippecanoeVersion === '' || this.tippecanoeVersion === '') return false
          return compareVersions(this.tippecanoeVersion, this.latestTippecanoeVersion)
        }
      },
      mounted () {
        const that = this
        var ls = spawn('tippecanoe', ['--version'])
        ls.stderr.on('data', (data) => {
          const d = `${data}`
          that.tippecanoeVersion = d.split('v')[1].trim()
        })
        axios.get('https://formulae.brew.sh/api/formula/tippecanoe.json')
          .then(function (r) {
            that.latestTippecanoeVersion = r.data.versions.stable
          })
      }
    }
</script>

<style>
.tv{
    margin-top: 100px;
    color: white;
}
.ivu-steps-vertical .ivu-steps-main .ivu-steps-content, .ivu-steps-item.ivu-steps-status-wait .ivu-steps-title,  .ivu-steps-item.ivu-steps-status-finish .ivu-steps-title {
    opacity: 0.7;
    color: white;
}
.ivu-steps-item.ivu-steps-status-process .ivu-steps-title {
    opacity: 1;
    color: white;
}

.ivu-steps .ivu-steps-head, .ivu-steps .ivu-steps-title, .ivu-steps-item.ivu-steps-status-wait .ivu-steps-head-inner {
    background: transparent;
}

.ivu-steps .ivu-steps-head-inner {
    border-color: white;
    color: white;
}
.ivu-steps-item.ivu-steps-status-wait .ivu-steps-head-inner span, .ivu-steps-item.ivu-steps-status-wait .ivu-steps-head-inner>.ivu-steps-icon {
    color: white;
}

.ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner span, .ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner>.ivu-steps-icon {
    color: #68c6d1;
}

.ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner, .ivu-steps-item.ivu-steps-status-finish .ivu-steps-tail>i:after {
    background-color: #68c6d1;
    border-color: #68c6d1; 
}
.ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner {
    border-color: transparent; 
}
</style>