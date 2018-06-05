import $ from 'node_modules/jquery'

/*
 * Constants
 */

const NAME = 'scrollToBottom'
const NAMESPACE = `admin4b.${NAME}`

/*
 * Class Definition
 */

class ScrollEvent {
  constructor(element) {
    this._element = element
  }

  scrollToBottom() {
    const scrollHeight = $(this._element).prop('scrollHeight')
    $(this._element).scrollTop(scrollHeight)
  }

  static jQueryPlugin() {
    return this.each(function () {
      new ScrollEvent(this).scrollToBottom()
    })
  }
}

/*
 * jQuery Plugin
 */

$.fn[NAME] = ScrollEvent.jQueryPlugin
$.fn[NAME].Constructor = ScrollEvent
$.fn[NAME].noConflict = () => $.fn[NAME] = ScrollEvent.jQueryPlugin

export default ScrollEvent
