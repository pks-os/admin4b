import $ from 'node_modules/jquery'

/*
 * Constants
 */

const NAME = 'sidebar'
const NAMESPACE = `admin4b.${NAME}`

const Event = {
  CLICK: `click.${NAMESPACE}`,
  HIDE: 'hide',
  SHOW: 'show'
}

const ClassName = {
  SHOW: 'show'
}

const Selector = {
  DATA_TOGGLE: '[data-toggle="sidebar"]',
  DATA_DISMISS: '[data-dismiss="sidebar"]',
  SIDEBAR: '.app-sidebar'
}

/*
 * Class Definition
 */

class Sidebar {
  constructor(element) {
    this._element = element
  }

  show() {
    $(this._element).addClass(ClassName.SHOW)
  }

  hide() {
    $(this._element).removeClass(ClassName.SHOW)
  }

  static jQueryPlugin(event) {
    return this.each(function () {
      const sidebar = new Sidebar(this)

      switch (event) {
        case Event.SHOW:
          sidebar.show()
          return
        case Event.HIDE:
          sidebar.hide()
          return
      }
    })
  }
}

/*
 * jQuery Plugin
 */

$.fn[NAME] = Sidebar.jQueryPlugin
$.fn[NAME].Constructor = Sidebar
$.fn[NAME].noConflict = () => $.fn[NAME] = Sidebar.jQueryPlugin

/*
 * Auto initialize
 */

$(document)
  .on(Event.CLICK, Selector.DATA_TOGGLE, () => {
    Sidebar.jQueryPlugin.call($(Selector.SIDEBAR), Event.SHOW)
  })
  .on(Event.CLICK, Selector.DATA_DISMISS, () => {
    Sidebar.jQueryPlugin.call($(Selector.SIDEBAR), Event.HIDE)
  })

export default Sidebar
