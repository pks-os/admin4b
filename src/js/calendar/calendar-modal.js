import $ from 'node_modules/jquery'
import keyboard from 'src/js/util/keyboard'
import { ClassName, DataAttribute, Event, Prop, Selector } from './calendar-constants'

class CalendarModal {
  constructor(element) {
    this._element = element
  }

  isInitialized() {
    return $(this._element).prop(Prop.INITIALIZED)
  }

  render() {
    const $modalCalendar = $(this._element)
    const $modalHeader = $modalCalendar.find(Selector.HEADER)
    const $modalBody = $modalCalendar.find(Selector.BODY)
    const $dropdownMonths = $modalHeader.find(Selector.MONTH_DROPDOWN)
    const $months = $modalHeader.find(Selector.MONTH_OPTIONS)
    const $previousMonth = $modalHeader.find(Selector.MONTH_PREVIOUS)
    const $nextMonth = $modalHeader.find(Selector.MONTH_NEXT)
    const $year = $modalHeader.find(Selector.YEAR)
    const $goToToday = $modalBody.find(Selector.LINK_TODAY)
    const $goToSelected = $modalBody.find(Selector.LINK_SELECTED_DATE)

    $modalCalendar.prop(Prop.INITIALIZED, true)

    $modalCalendar.on(Event.TRIGGER_EACH_DATE, (e, date) => {
      const selectedDate = $modalCalendar.calendar(Event.DATE)
      const today = new Date()

      today.setHours(0, 0, 0, 0)

      $(e.relatedTarget)
        .toggleClass(ClassName.ACTIVE, !!selectedDate && date.getTime() === selectedDate.getTime())
        .toggleClass(ClassName.TODAY, date.getTime() === today.getTime())
        .toggleClass(ClassName.SUNDAY, date.getDay() === 0)
    })

    $modalCalendar.on(Event.TRIGGER_QUERY, (e, date) => {
      const month = date.getMonth()
      const $month = $($months.find('a').get(month))

      $dropdownMonths.prop(Prop.MONTH, date.getMonth()).text($month.text())
      $year.val(date.getFullYear())
    })

    $months.find('a').on(Event.CLICK, (e) => {
      const year = Number($year.val())
      const month = Number($(e.target).attr(DataAttribute.MONTH))

      $modalCalendar.calendar(Event.QUERY_DATE, new Date(year, month, 1))

      e.preventDefault()
    })

    $nextMonth.on(Event.CLICK, () => {
      $modalCalendar.calendar(Event.QUERY_NEXT_MONTH)
    })

    $previousMonth.on(Event.CLICK, () => {
      $modalCalendar.calendar(Event.QUERY_PREVIOUS_MONTH)
    })

    $goToToday.on(Event.CLICK, () => {
      $modalCalendar.calendar(Event.QUERY_DATE, new Date())
    })

    $goToToday.on(Event.CLICK, () => {
      $modalCalendar.calendar(Event.QUERY_DATE, new Date())
    })

    $goToSelected.on(Event.CLICK, () => {
      const date = $modalCalendar.calendar(Event.DATE)
      $modalCalendar.calendar(Event.QUERY_DATE, date)
    })

    $year
      .on(Event.KEYDOWN, (e) => {
        const key = keyboard(e)

        if (key.isNavigation || key.isCommand || key.isSpecial || key.isFunction) {
          return
        }

        if (!key.isNumber && !key.isCtrlHeld) {
          e.preventDefault()
        }

        // maxlength not working for input[type=number] in Chrome or Firefox
        if (key.isNumber && $year.val().length >= 4) {
          e.preventDefault()
        }
      })
      .on(Event.INPUT, () => {
        const val = $year.val()

        if (/^\d{4}$/.test(val)) {
          const year = Number(val)
          const month = Number($dropdownMonths.prop(Prop.MONTH))

          $modalCalendar.calendar(Event.QUERY_DATE, new Date(year, month, 1))
        }
      })
  }
}

export default CalendarModal
