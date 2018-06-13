import $ from 'node_modules/jquery'

/*
 * Constants
 */

const NAME = 'typing'
const NAMESPACE = `admin4b.${NAME}`
const TARGET = 'input'
const DELAY = 700

Event = {
  INPUT: `input.${NAMESPACE}`,
  TRIGGER_INPUT: 'input:delay'
}

/*
 * Class Definition
 */

class TypingEvent {
  constructor(element) {
    this._element = element
    this._timeout = null
  }

  watchAndTrigger() {
    clearTimeout(this._timeout)
    this._timeout = setTimeout(() => {
      $(this._element).trigger(Event.TRIGGER_INPUT)
    }, DELAY)
  }

  static jQueryPlugin() {
    return this.each(function () {
      const typingEvent = new TypingEvent(this)
      $(this).on(Event.INPUT, () => typingEvent.watchAndTrigger())
    })
  }
}

/*
 * jQuery Plugin
 */

$.fn[NAME] = TypingEvent.jQueryPlugin
$.fn[NAME].Constructor = TypingEvent
$.fn[NAME].noConflict = () => $.fn[NAME] = TypingEvent.jQueryPlugin

/*
 * Auto initialize
 */

$(TARGET).typing()

export default TypingEvent
