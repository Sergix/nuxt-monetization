export default async function (context, inject) {
  const $monetization = {}

  const options = <%= JSON.stringify(options, null, 2) %>

  const global = options.global === undefined || options.global === true ? true : false

  if (global) {
    context.app.head.meta.push({
      name: "monetization",
      content: options.paymentPointer,
    })
  }

  if (!process.client) return

  const monetizationEnabled = document.monetization ? true : false

  const getMonetizationTag = () => document.querySelector('meta[name="monetization"]')

  const addMonetizationTag = () => {
    const meta = document.createElement('meta')
    meta.name = "monetization"
    meta.content = options.paymentPointer
    document.getElementsByTagName('head')[0].appendChild(meta)

    // return the node in the DOM
    return getMonetizationTag()
  }

  // object modifiers

  $monetization.enable = () =>
    !getMonetizationTag() ? addMonetizationTag() : false

  $monetization.disable = () =>
    getMonetizationTag() ? getMonetizationTag().remove() : false

  $monetization.getObject = () =>
    monetizationEnabled ? document.monetization : false

  // state

  $monetization.isEnabled = () => monetizationEnabled

  $monetization.isStarted = () =>
    monetizationEnabled ? document.monetization.state === "started" : false

  $monetization.isPending = () =>
    monetizationEnabled ? document.monetization.state === "pending" : false

  $monetization.isStopped = () =>
    monetizationEnabled ? document.monetization.state === "stopped" : false

  $monetization.getState = () =>
    monetizationEnabled ? document.monetization.state : false

  // event handlers

  $monetization.onStart = (handler) =>
    monetizationEnabled
      ? document.monetization.addEventListener("monetizationstart", handler)
      : false

  $monetization.onPending = (handler) =>
    monetizationEnabled
      ? document.monetization.addEventListener("monetizationpending", handler)
      : false

  $monetization.onStop = (handler) =>
    monetizationEnabled
      ? document.monetization.addEventListener("monetizationstop", handler)
      : false

  $monetization.onProgressChange = (handler) =>
    monetizationEnabled
      ? document.monetization.addEventListener("monetizationprogress", handler)
      : false

  inject('monetization', $monetization)
}
