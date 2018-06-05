import $ from 'node_modules/jquery'

/*
 * Constants
 */

const NAME = 'chat'
const NAMESPACE = `admin4b.${NAME}`

const ClassName = {
  APP_CONTENT: 'app-content',
  CHAT: 'chat',
  CHAT_MESSAGES: 'chat-messages',
  CHAT_ON: 'chat-on',
}

const Event = {
  RESIZE: `resize.${NAMESPACE}`
}

/*
 * Class Definition
 */

class Chat {
  constructor(element) {
    this._element = element
  }

  fillContent() {
    let usedHeight = 0

    $(`.${ClassName.APP_CONTENT}`).children().each((index, element) => {
      if ($(element).is(`.${ClassName.CHAT}`)) return
      usedHeight += $(element).outerHeight(true) // true = include margins
    })

    $(this._element).height($(`.${ClassName.APP_CONTENT}`).height() - usedHeight)
    $(this._element).addClass(ClassName.CHAT_ON)
    $(this._element).find(`.${ClassName.CHAT_MESSAGES}`).scrollToBottom()
  }

  static jQueryPlugin() {
    return this.each(function () {
      const chat = new Chat(this)
      $(window).on(Event.RESIZE, () => chat.fillContent()).trigger(Event.RESIZE)
    })
  }
}

/*
 * jQuery Plugin
 */

$.fn[NAME] = Chat.jQueryPlugin
$.fn[NAME].Constructor = Chat
$.fn[NAME].noConflict = () => $.fn[NAME] = Chat.jQueryPlugin

/*
 * Auto initialize
 */

$(`.${ClassName.CHAT}`).chat()

export default Chat
