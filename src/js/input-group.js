import $ from 'node_modules/jquery'

/*
 * Constants
 */

const NAME = 'asInput'
const NAMESPACE = `admin4b.${NAME}`

const ClassName = {
  INPUT_GROUP: 'as-input',
  FOCUS: 'focus',
  DISABLED: 'disabled',
  READONLY: 'readonly'
}

const Event = {
  CLICK: `click.${NAMESPACE}`,
  BLUR: `blur.${NAMESPACE}`,
  FOCUS: `focus.${NAMESPACE}`,
}

/*
 * Class Definition
 */

class InputGroup {
  constructor(element) {
    this._element = element
  }

  updateState() {
    const $input = $(this._element).find('input')

    $(this._element).toggleClass(ClassName.DISABLED, $input.is('[disabled]'))
    $(this._element).toggleClass(ClassName.READONLY, $input.is('[readonly]'))
  }

  focus() {
    $(this._element).addClass(ClassName.FOCUS)
  }

  blur() {
    $(this._element).removeClass(ClassName.FOCUS)
  }

  static jQueryPlugin() {
    return this.each(function () {
      const inputGroup = new InputGroup(this)
      const $input = $(this).find('input')

      $(this).on(Event.CLICK, () => $input.focus())

      $input
        .on(Event.FOCUS, () => inputGroup.focus())
        .on(Event.BLUR, () => inputGroup.blur())
        .observe(() => inputGroup.updateState())

      inputGroup.updateState()
    })
  }
}

/*
 * jQuery Plugin
 */

$.fn[NAME] = InputGroup.jQueryPlugin
$.fn[NAME].Constructor = InputGroup
$.fn[NAME].noConflict = () => $.fn[NAME] = InputGroup.jQueryPlugin

/*
 * Auto initialize
 */

$(`.${ClassName.INPUT_GROUP}`).asInput()

export default InputGroup
