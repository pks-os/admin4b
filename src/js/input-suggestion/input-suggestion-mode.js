import $ from 'node_modules/jquery'
import { NAME, ClassName, DataAttribute, Event, Prop } from './input-suggestion-constants'
import InputSuggestionItem from './input-suggestion-item'

/*
 * Class Definition
 */

class InputSuggestionMode {
  constructor(element) {
    this.$input = $(element)
    this.$suggestion = this.$input.closest(`.${ClassName.INPUT_SUGGESTION}`)
    this.$suggestionList = this.$suggestion.find(`.${ClassName.INPUT_SUGGESTION_LIST}`)
    this.$loadingList = this.$suggestionList.find(`.${ClassName.LIST_GROUP_LOADING}`)
    this.$emptyList = this.$suggestionList.find(`.${ClassName.LIST_GROUP_EMPTY}`)
    this.$itemList = this.$suggestionList.find(`.${ClassName.LIST_GROUP_ITEMS}`)
  }

  configureAsyncMode() {
    this.$loadingList.hide()
    this.$emptyList.hide()
    this.$itemList.hide()

    this.$input
      .on(Event.INPUT, () => {
        this.$loadingList.show()
        this.$emptyList.hide()
        this.$itemList.hide()
      })
      .on(`${Event.INPUT_DELAY} ${Event.SUGGESTION_SHOW}`, () => {
        this.$input.trigger(Event.SUGGESTION_SEARCH)
      })
  }

  configureStaticMode() {
    this.$emptyList.hide()

    const $items = this.$itemList.children()
    let detachedItems = []

    this.$input.on(`${Event.INPUT} ${Event.SUGGESTION_SHOW}`, () => {
      $items.removeClass(ClassName.ACTIVE)

      detachedItems.forEach(($item) => {
        var $prev = $item.prop(Prop.PREVIOUS_ITEM)

        if ($prev.length) {
          $item.insertAfter($prev)
        } else {
          this.$itemList.prepend($item)
        }
      })

      detachedItems = []

      $items.each((i, item) => {
        const $item = $(item)
        const itemText = new InputSuggestionItem($item).text()

        if (!itemText.contains(this.$input.val())) {
          detachedItems.push($item)
          $item.prop(Prop.PREVIOUS_ITEM, $item.prev())
        }
      })

      detachedItems.forEach(($item) => $item.detach())

      if (this.$itemList.children().length) {
        this.$emptyList.hide()
        this.$itemList.show()
      } else {
        this.$itemList.hide()
        this.$emptyList.show()
      }
    })
  }
}

export default InputSuggestionMode
