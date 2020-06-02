# nuxt-monetization

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> Web monetization module for Nuxt.

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `nuxt-monetization` dependency to your project

```bash
yarn add nuxt-monetization # or npm install nuxt-monetization
```

2. Add `nuxt-monetization` to the `modules` section of `nuxt.config.js`

```js
{
  modules: [
    ['nuxt-monetization', {
      paymentPointer: "your payment pointer", // required
      global: true // add monetization to every page; default: true
    }]
  ]
}
```

## Usage

For `nuxt-monetization` to work properly, you must [specify your payment pointer](https://paymentpointers.org/) (`paymentPointer`) in the Nuxt module options as shown above.

The module injects a `$monetization` property in the Nuxt context, accessible via any `async` function or instance/component method.

### Methods

#### `$monetization.enable()`

Enables web monetization for the current page if not already enabled.

*Returns: HTMLElement | false*

#### `$monetization.disable()`

Disables web monetization for the current page if not already disabled.

*Returns: undefined | false*

#### `$monetization.getObject()`

Gets the document's monetization DOM object if monetization is enabled.

*Returns: HTMLElement | false*

#### `$monetization.isEnabled()`

Checks if the browser has monetization capability within the document.

*Returns: true | false*

#### `$monetization.isStarted()`

Checks if the browser is currently sending payments.

*Returns: true | false*

#### `$monetization.isPending()`

Checks if the browser is currently preparing to send payments.

*Returns: true | false*

#### `$monetization.isStopped()`

Checks if the browser is currently not sending payments.

*Returns: true | false*

#### `$monetization.getState()`

Gets the current state of the browser's monetization event if monetization is enabled.

*Returns: ("started" || "stopped" || "pending") | false*

### Event Attachments

> The specification for the `event` objects returned for each handler are specified on the [Web Monetization JavaScript API page](https://webmonetization.org/docs/api).

#### `$monetization.onStart(function handler(event))`

Attaches a listener for the `started` state on the monetization object using the specified handler.

*Returns: undefined | false*

#### `$monetization.onPending(function handler(event))`

Attaches a listener for the `pending` state on the monetization object using the specified handler.

*Returns: undefined | false*

#### `$monetization.onStop(function handler(event))`

Attaches a listener for the `stopped` state on the monetization object using the specified handler.

*Returns: undefined | false*

#### `$monetization.onProgressChange(function handler(event))`

Attaches a listener for when the current amount of progress in sending funds changes on the monetization object using the specified handler.

*Returns: undefined | false*

### Example

```vue
<template>
  <div>
    <h1>State: {{ $monetization.getState() }}</h1>
    <h2 v-show="$monetization.isStarted()">Currently transferring funds...</h2>
    <p>Amount transferred: {{ amount }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: 0
    }
  },
  mounted() {
    this.$monetization.enable()
    this.$monetization.onProgressChange(this.updateAmount)
  },
  methods: {
    updateAmount({ detail }) {
      this.amount += parseInt(detail.amount)
    }
  }
}
</script>
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `yarn dev` or `npm run dev` (`example/`)

## License

[MIT License](./LICENSE)

Copyright (c) sergix <hello@sergix.dev>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-monetization/latest.svg
[npm-version-href]: https://npmjs.com/package/nuxt-monetization

[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-monetization.svg
[npm-downloads-href]: https://npmjs.com/package/nuxt-monetization

[github-actions-ci-src]: https://github.com//workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com//actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/.svg
[codecov-href]: https://codecov.io/gh/

[license-src]: https://img.shields.io/npm/l/nuxt-monetization.svg
[license-href]: https://npmjs.com/package/nuxt-monetization
