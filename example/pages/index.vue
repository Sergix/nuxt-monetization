<template>
  <div>
    <h1>State: {{ $monetization.getState() }}</h1>
    <h2 v-show="$monetization.isStarted()">
      Currently transferring funds...
    </h2>
    <p>Amount transferred: {{ amount }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      amount: 0
    }
  },
  mounted () {
    this.$monetization.enable()
    this.$monetization.onProgressChange(this.updateAmount)
  },
  methods: {
    updateAmount ({ detail }) {
      this.amount += parseInt(detail.amount)
    }
  }
}
</script>
