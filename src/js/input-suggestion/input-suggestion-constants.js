const NAME = 'suggestion'
const NAMESPACE = `admin4b.${NAME}`

const ClassName = {
  ACTIVE: 'active',
  INPUT_SUGGESTION: 'input-suggestion',
  INPUT_SUGGESTION_LIST: 'input-suggestion-list',
  LIST_GROUP: 'list-group',
  LIST_GROUP_ITEMS: 'list-group.items',
  LIST_GROUP_EMPTY: 'list-group.empty',
  LIST_GROUP_LOADING: 'list-group.loading',
  OPEN: 'open'
}

const DataAttribute = {
  DATA_TEXT: 'data-text'
}

const Event = {
  CLICK: `click.${NAMESPACE}`,
  INPUT: `input.${NAMESPACE}`,
  INPUT_DELAY: 'input:delay',
  KEYDOWN: `keydown.${NAMESPACE}`,
  KEYPRESS: `keypress.${NAMESPACE}`,
  KEYUP: `keyup.${NAMESPACE}`,
  REFRESH: 'refresh',
  SUGGESTION_CHANGE: 'suggestion:change',
  SUGGESTION_SHOW: 'suggestion:show',
  SUGGESTION_HIDE: 'suggestion:hide',
  SUGGESTION_SEARCH: 'suggestion:search'
}

const Prop = {
  INITIALIZED: `${NAMESPACE}.initialized`,
  PREVIOUS_ITEM: `${NAMESPACE}.previousItem`,
}

const Selector = {
  INPUT: 'input',
  DATA_TOGGLE: '[data-toggle="suggestion"]',
  DATA_ASYNC: '[data-async]',
  DATA_TEXT: `[${DataAttribute.DATA_TEXT}]`,
  FIRST_CHILD: ':first-child',
  LAST_CHILD: ':last-child'
}

export {
  NAME,
  ClassName,
  DataAttribute,
  Event,
  Prop,
  Selector
}
