import $ from 'node_modules/jquery'
import TypeValidation from './file-manager-type'
import MaxsizeValidation from './file-manager-maxsize'

/*
 * Constants
 */

const NAME = 'fileManager'
const NAMESPACE = `admin4b.${NAME}`

const DataAttribute = {
  DATA_TOGGLE: '[data-toggle="file-manager"]'
}

const Event = {
  CLICK: `click.${NAMESPACE}`,
  INPUT_CHANGE: `change.${NAMESPACE}`,
  FILE_CHANGE: 'file:change'
}

/*
 * Class Definition
 */

class FileManager {
  constructor(element) {
    this._element = element
  }

  validate(file) {
    const maxsize = $(this._element).attr('data-maxsize')
    const type = $(this._element).attr('data-type')

    file.errors = []

    if (!new MaxsizeValidation(file).isValid(maxsize)) {
      file.errors.push('maxsize')
    }

    if (!new TypeValidation(file).isValid(type)) {
      file.errors.push('type')
    }
  }

  read(file, callback) {
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = (e) => {
      file.dataURL = e.target.result
      callback()
    }
  }

  static jQueryPlugin() {
    const fileManager = new FileManager(this)

    return this.each(function () {
      const $element = $(this)
      const $input = $('<input/>').attr('type', 'file')

      $input.on(Event.INPUT_CHANGE, () => {
        const file = $input.get(0).files[0]

        if (file) {
          fileManager.validate(file)

          fileManager.read(file, () => {
            $element.trigger(Event.FILE_CHANGE, file)
          })
        }
      })

      $element.on(Event.CLICK, () => $input.trigger('click'))
    })
  }
}

/*
 * jQuery Plugin
 */

$.fn[NAME] = FileManager.jQueryPlugin
$.fn[NAME].Constructor = FileManager
$.fn[NAME].noConflict = () => $.fn[NAME] = FileManager.jQueryPlugin

/*
 * Auto initialize
 */

$(DataAttribute.DATA_TOGGLE).fileManager()

export default FileManager
