import $ from 'node_modules/jquery'
import { ClassName, DataAttribute, Selector } from './input-suggestion-constants'

/*
 * Class Definition
 */

class InputSuggestionItem {
  constructor(element) {
    this._element = element
  }

  text() {
    let $item = $(this._element)
    const $input = $item.closest(`.${ClassName.INPUT_SUGGESTION}`).find(Selector.INPUT)

    if ($input.is(Selector.DATA_TEXT)) {
      $item = $item.find($input.attr(DataAttribute.DATA_TEXT))
    }

    return $item.text().trim()
  }
}

export default InputSuggestionItem
