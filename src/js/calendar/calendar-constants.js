const NAME = 'calendar'
const NAMESPACE = `admin4b.${NAME}`

const ClassName = {
  ACTIVE: 'active',
  TODAY: 'today',
  SUNDAY: 'sunday'
}

const DataAttribute = {
  MONTH: 'data-calendar-month'
}

const Event = {
  CLICK: `click.${NAMESPACE}`,
  KEYDOWN: `keydown.${NAMESPACE}`,
  INPUT: `input.${NAMESPACE}`,
  DATE: 'date',
  QUERY_DATE: 'query:date',
  QUERY_NEXT_MONTH: 'query:nextMonth',
  QUERY_NEXT_YEAR: 'query:nextYear',
  QUERY_PREVIOUS_MONTH: 'query:previousMonth',
  QUERY_PREVIOUS_YEAR: 'query:previousYear',
  TRIGGER_EACH_DATE: 'calendar:each',
  TRIGGER_CHANGE: 'calendar:change',
  TRIGGER_QUERY: 'calendar:query'
}

const Prop = {
  INITIALIZED: `${NAMESPACE}.initialized`,
  DATE: `${NAMESPACE}.date`,
  MONTH: `${NAMESPACE}.month`,
  QUERY: `${NAMESPACE}.query`
}

const Selector = {
  CALENDAR: '.modal-calendar',
  HEADER: '.modal-header',
  BODY: '.modal-body',
  MONTH_DROPDOWN: '.dropdown-toggle',
  MONTH_OPTIONS: '.dropdown-menu',
  MONTH_PREVIOUS: '[data-calendar-month=previous]',
  MONTH_NEXT: '[data-calendar-month=next]',
  YEAR: '.form-control',
  LINK_TODAY: '[data-calendar-link=today]',
  LINK_SELECTED_DATE: '[data-calendar-link=selected]',
  TABLE: '.table-calendar'
}

export {
  NAME,
  ClassName,
  DataAttribute,
  Event,
  Prop,
  Selector
}
