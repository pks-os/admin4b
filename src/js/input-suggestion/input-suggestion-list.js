import $ from 'node_modules/jquery'
import keyboard from 'src/js/util/keyboard'
import { ClassName, DataAttribute, Event, Selector } from './input-suggestion-constants'
import InputSuggestionItem from './input-suggestion-item'

/*
 * Class Definition
 */

class InputSuggestionList {
  constructor(element) {
    this.$input = $(element)
    this.$suggestion = this.$input.closest(`.${ClassName.INPUT_SUGGESTION}`)
    this.$suggestionList = this.$suggestion.find(`.${ClassName.INPUT_SUGGESTION_LIST}`)
    this.$loadingList = this.$suggestionList.find(`.${ClassName.LIST_GROUP_LOADING}`)
    this.$emptyList = this.$suggestionList.find(`.${ClassName.LIST_GROUP_EMPTY}`)
    this.$itemList = this.$suggestionList.find(`.${ClassName.LIST_GROUP_ITEMS}`)
  }

  _changeSelectedItem(selectedItem) {
    this.$input.val(new InputSuggestionItem(selectedItem).text())
    this.$input.trigger(Event.SUGGESTION_CHANGE, selectedItem)
  }

  _hide() {
    if (!this.$suggestion.is(`.${ClassName.OPEN}`)) return

    this.$suggestion.removeClass(ClassName.OPEN)
    this.$input.trigger(Event.SUGGESTION_HIDE)
  }

  _show() {
    if (this.$suggestion.is(`.${ClassName.OPEN}`)) return

    this.$itemList.children().removeClass(ClassName.ACTIVE)
    this.$suggestion.addClass(ClassName.OPEN)
    this.$input.trigger(Event.SUGGESTION_SHOW)
  }

  bindItemEvents() {
    const $items = this.$itemList.children()

    $items.on(Event.CLICK, (e) => {
      this.$suggestion.removeClass(ClassName.OPEN)
      this._changeSelectedItem(e.currentTarget)
    })

    this.$input.on(Event.KEYPRESS, (e) => {
      const key = keyboard(e)

      if (key.isEnter) {
        const $ativeItem = $items.filter(`.${ClassName.ACTIVE}`)

        if ($ativeItem.length) {
          this._changeSelectedItem($ativeItem.filter(`.${ClassName.ACTIVE}`))
        }
      }
    })
  }

  bindInputEvents() {
    this.$suggestion.onFocusOut(() => this._hide())

    this.$input
      .on(Event.INPUT, () => this._show())
      .on(Event.KEYUP, (e) => {
        if (keyboard(e).isEscape) {
          this._hide()
        }
      })
      .on(Event.KEYDOWN, (e) => {
        const key = keyboard(e)

        if (key.isArrowUp || key.isArrowDown) {
          e.preventDefault()

          if (!this.$suggestion.is(`.${ClassName.OPEN}`)) {
            this._show()
            return
          }

          const $currentItem = this.$itemList.children(`.${ClassName.ACTIVE}`)

          if (key.isArrowDown) {
            if ($currentItem.is(Selector.LAST_CHILD)) {
              return
            }

            if ($currentItem.length) {
              $currentItem.removeClass(ClassName.ACTIVE)
              $currentItem.next().addClass(ClassName.ACTIVE)
            } else {
              this.$itemList.children().eq(0).addClass(ClassName.ACTIVE)
            }
          }

          if (key.isArrowUp) {
            if ($currentItem.is(Selector.FIRST_CHILD)) {
              return
            }

            $currentItem.removeClass(ClassName.ACTIVE)
            $currentItem.prev().addClass(ClassName.ACTIVE)
          }
        }
      })
      .on(Event.SUGGESTION_CHANGE, () => this._hide())
  }

  refresh() {
    this.bindItemEvents()

    if (this.$itemList.children().length) {
      this.$itemList.show()
    } else {
      this.$emptyList.show()
    }

    this.$loadingList.hide()
  }
}

export default InputSuggestionList
