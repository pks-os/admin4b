import $ from 'node_modules/jquery'

/*
 * Constants
 */

const NAME = 'navProgress'
const NAMESPACE = `admin4b.${NAME}`

const ClassName = {
  ITEM: 'nav-item',
  LINK: 'nav-link',
  TAB_PROGRESS: 'nav-tabs-progress',
  COMPLETE: 'complete'
}

const Event = {
  SHOW_TAB: 'show.bs.tab'
}

/*
 * Class Definition
 */

class Nav {
  constructor(element) {
    this._element = element
  }

  bindEvents() {
    var $items = $(this._element).find(`.${ClassName.ITEM}`)
    var $links = $items.find(`.${ClassName.LINK}`)

    $links.on(Event.SHOW_TAB, function (e) {
      var $item = $(e.target).closest(`.${ClassName.ITEM}`)

      $item.prevAll().addClass(ClassName.COMPLETE)
      $item.nextAll().addBack().removeClass(ClassName.COMPLETE)
    })
  }

  static jQueryPlugin() {
    return this.each(function () {
      new Nav(this).bindEvents()
    })
  }
}

/*
 * jQuery Plugin
 */

$.fn[NAME] = Nav.jQueryPlugin
$.fn[NAME].Constructor = Nav
$.fn[NAME].noConflict = () => $.fn[NAME] = Nav.jQueryPlugin

/*
 * Auto initialize
 */

$(`.${ClassName.TAB_PROGRESS}`).navProgress()

export default Nav
