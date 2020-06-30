<template>
  <div>
    <h1>State: {{ state }}</h1>
    <h2 v-show="state === 'transferring'">
      Currently transferring funds...
    </h2>
    <p>Amount transferred: {{ amount }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      amount: 0,
      state: ''
    }
  },
  mounted () {
    this.$monetization.enable()
    this.$monetization.onStop(() => (this.state = 'stopped'))
    this.$monetization.onStart(() => (this.state = 'transferring'))
    this.$monetization.onPending(() => (this.state = 'pending'))
    this.$monetization.onProgressChange(this.updateAmount)
  },
  methods: {
    updateAmount ({ detail }) {
      this.amount += parseInt(detail.amount, 10)
    }
  }
}
</script>
