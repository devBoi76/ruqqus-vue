import { createApp } from 'vue'
import { store } from './store'
import router from './router'

import App from './App.vue'
import axios from "axios"
import interceptors from './helpers/interceptors.js'
import * as LazyLoad from '@vant/lazyload'
//import vuescroll from '../node_modules/vuescroll/dist/vuescroll-native'
import VueTippy from '../node_modules/vue-tippy'

// import VueTailwind from '../node_modules/vue-tailwind'
// import {
//   TInput,
//   TTextarea,
//   TSelect,
//   TRadio,
//   TCheckbox,
//   TButton,
//   TInputGroup,
//   TRichSelect,
//   TDatepicker,
//   TCheckboxGroup,
//   TTag,
//   TToggle,
//   TAlert,
//   TCard,
//   TModal,
//   TDialog,
//   TTable,
//   TPagination,
//   TDropdown,
// } from '../node_modules/vue-tailwind/dist/components'

// Import CSS files
import "./assets/fontawesome/css/all.css";
import "../node_modules/tailwindcss/tailwind.css"
import "./assets/style/styles.css"
//import "vuescroll/dist/vuescroll.css";

const app = createApp(App)

app.config.devtools = true

app.config.globalProperties.$store = store
app.config.globalProperties.$http = axios

app.use(store)
app.use(router)

// Use our Interceptors
interceptors()

// Vue Filters
// credit https://forum.vuejs.org/t/truncate-filter-with-html/50023
// Vue.filter('truncate', function (value, limit) {
//   if (value.length > limit) {
//     value = value.substring(0, (limit - 3)) + '...';
//   }

//   return value
// })

// Vue Lazy Load Images
// app.use(LazyLoad, {
//   lazyComponent: true
// });
app.use(LazyLoad)

// Vuescroll
// Vue.use(vuescroll, {
//   ops: {
//     bar: {
//       background: 'rgba(0, 0, 0, 0.3)'
//     }
//   },
//   name: 'vue-scroll' // customize component name, default -> vueScroll
// });

// Vue-Tippy (tippy.js)
app.use(
  VueTippy,
  // optional
  {
    directive: 'tippy', // => v-tippy
    component: 'tippy', // => <tippy/>
    componentSingleton: 'tippy-singleton', // => <tippy-singleton/>
    arrow: true,
    animation: 'scale',
    duration: 75,
    placement: 'bottom',
    flipDuration: 0,
    popperOptions: {
      modifiers: {
        preventOverflow: {
          enabled: false
        }
      }
    }
  }
)

// // Vue Tailwind config
// const settings = {
//   't-input': {
//     component: TInput,
//     props: {
//       fixedClasses: 'block w-full px-3 py-1.5 transition duration-100 ease-in-out border rounded-sm focus:ring-2 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
//       classes: 'text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-700 dark:border-opacity-70 focus:bg-white dark:focus:bg-white focus:border-primary focus:ring-primary dark:focus:border-primary dark:focus:ring-primary',
//       variants: {
//         purple500: 'text-gray-900 placeholder-gray-400 bg-gray-50 border-gray-200 focus:bg-white focus:border-purple-500 focus:ring-purple-500',
//         light: 'text-gray-900 placeholder-gray-400 bg-gray-50 border-gray-200 focus:bg-white focus:border-primary focus:ring-primary',
//         white: 'text-gray-900 placeholder-gray-400 bg-white border-gray-200 focus:bg-white focus:border-primary focus:ring-primary',
//         danger: 'text-red-900 placeholder-red-400 bg-red-50 border-red-200 focus:bg-white focus:border-red-500 focus:ring-red-500',
//         success: 'text-green-900 placeholder-green-400 bg-green-50 border-green-200 focus:bg-white focus:border-green-500 focus:ring-green-500',
//         warning: 'text-yellow-900 placeholder-yellow-400 bg-red-50 border-yellow-200 focus:bg-white focus:border-yellow-500 focus:ring-yellow-500',
//         black: 'text-gray-200 placeholder-gray-300 bg-gray-800 border-gray-900 focus:bg-white focus:border-primary focus:ring-white'
//       }
//     }
//   },
//   't-textarea': {
//     component: TTextarea,
//     props: {
//       fixedClasses: 'block w-full px-3 py-1.5 transition duration-100 ease-in-out border rounded-sm focus:ring-2 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
//       classes: 'text-gray-900 placeholder-gray-400 bg-gray-50 border-gray-200 focus:bg-white focus:border-primary focus:ring-primary',
//       variants: {
//         purple500: 'text-gray-900 placeholder-gray-400 bg-gray-50 border-gray-200 focus:bg-white focus:border-purple-500 focus:ring-purple-500',
//         danger: 'border-red-200 bg-red-50 placeholder-red-200 text-red-900 focus:bg-white focus:border-red-500 focus:ring-red-500',
//         success: 'border-green-200 bg-green-50 placeholder-gray-400 text-green-900 focus:bg-white focus:border-green-500 focus:ring-green-500'
//       }
//     }
//   },
//   't-select': {
//     component: TSelect,
//     props: {
//       fixedClasses: 'block w-full pl-3 pr-8 py-1 h-8 transition duration-100 ease-in-out border rounded-sm focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
//       classes: 'text-gray-900 placeholder-gray-400 bg-white border-gray-200 focus:border-purple-500 ',
//       variants: {
//         white: 'border-gray-200 bg-white placeholder-gray-500 text-gray-900',
//         light: 'border-gray-200 bg-gray-50 placeholder-gray-500 text-gray-900',
//         danger: 'border-red-300 bg-red-50 placeholder-red-200 text-red-900',
//         success: 'border-green-300 bg-green-50 placeholder-gray-400 text-green-900'
//       }
//     }
//   },
//   't-radio': {
//     component: TRadio,
//     props: {
//       fixedClasses: 'transition duration-100 ease-in-out shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0  disabled:opacity-50 disabled:cursor-not-allowed',
//       classes: 'text-purple-500 border-gray-300 ',
//       variants: {
//         error: 'text-red-500 border-red-300 focus:border-red-500 focus:ring-red-500',
//         success: 'text-green-500 border-gray-300 focus:border-green-500 focus:ring-green-500',
//         warning: 'text-yellow-500 border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500'
//       }
//     }
//   },
//   't-checkbox': {
//     component: TCheckbox,
//     props: {
//       fixedClasses: 'transition duration-100 ease-in-out rounded-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed',
//       classes: 'text-purple-500 border-gray-300',
//       variants: {
//         error: 'text-red-500 border-red-300',
//         red500: 'text-red-500 border-gray-300',
//         green500: 'text-green-500 border-gray-300',
//         success: 'text-green-500 border-green-300',
//         gray900: 'text-green-900 border-gray-300'
//       }
//     }
//   },
//   't-button': {
//     component: TButton,
//     props: {
//       fixedClasses: 'block px-4 py-1.5 h-8 rounded-sm transition text-sm leading-4 font-bold duration-100 ease-in-out focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
//       classes: 'text-white bg-purple-500 border border-transparent hover:bg-purple-600',
//       variants: {
//         primary: 'text-white bg-primary border border-black border-opacity-10 hover:bg-opacity-70 hover:border-transparent shadow-inner-white',
//         secondary: 'text-white bg-secondary border border-black border-opacity-10 hover:bg-opacity-70 hover:border-transparent shadow-inner-white',
//         error: 'text-white bg-red-500 border border-red-600 hover:bg-red-600 shadow-inner-white',
//         success: 'text-white bg-green-500 border border-transparent hover:bg-green-600 shadow-inner-white',
//         white: 'text-gray-700 bg-white border border-transparent hover:bg-gray-100 shadow-inner-white',
//         gray100: 'text-gray-600 bg-gray-100 border border-gray-200 hover:bg-gray-200 shadow-inner-white',
//         gray200: 'text-gray-600 bg-gray-200 border border-gray-300 hover:bg-gray-300 shadow-inner-white',
//         gray300: 'text-gray-600 bg-gray-300 border border-gray-400 hover:bg-gray-400 shadow-inner-white',
//         gray400: 'text-white bg-gray-400 border border-gray-500 hover:bg-gray-500 shadow-inner-white',
//         gray500: 'text-white bg-gray-500 border border-gray-600 hover:bg-gray-600 shadow-inner-white',
//         gray600: 'text-white bg-gray-600 border border-gray-700 hover:bg-gray-700 shadow-inner-white',
//         outlineWhite: 'text-white bg-transparent border-2 md:border border-white hover:bg-white hover:text-gray-900',
//         outlinePrimary: 'text-primary bg-transparent border-2 md:border border-primary hover:bg-primary hover:text-white',
//         outlineGray200: 'text-gray-700 bg-transparent border-2 md:border hover:bg-gray-100',
//         outlinePurple500: 'text-purple-500 bg-transparent border-2 sm:border border-purple-500 hover:bg-purple-500 hover:text-white',
//         purple500: 'text-white bg-purple-500 border border-purple-600 hover:bg-purple-600 shadow-inner-white',
//         outlineRed500: 'text-red-500 bg-transparent border-2 md:border border-red-600 hover:bg-red-500 hover:text-white',
//         red500: 'text-white bg-red-500 border border-red-600 hover:bg-red-600 shadow-inner-white',
//         green500: 'text-white bg-green-500 border border-green-600 hover:bg-green-600 shadow-inner-white',
//         black: 'text-white bg-black border border-white border-opacity-05 hover:bg-gray-900 hover:border-transparent shadow-inner-white',
//         black30: 'text-white bg-black border border-transparent bg-opacity-30 hover:bg-opacity-50 shadow-inner-white',
//         link: 'text-purple-500 hover:text-purple-600',
//         linkWhite: 'text-white',
//         linkGray400: 'text-gray-400 hover:text-gray-500',
//         linkGray500: 'text-gray-500 hover:text-gray-600',
//         linkGray600: 'text-gray-600 hover:text-gray-700'
//       }
//     }
//   },
//   't-input-group': {
//     component: TInputGroup,
//     props: {
//       fixedClasses: {
//         wrapper: '',
//         label: 'block text-sm font-medium text-gray-900 mb-1',
//         body: '',
//         feedback: 'text-sm text-sm',
//         description: 'text-gray-400 text-sm'
//       },
//       classes: {
//         wrapper: '',
//         label: '',
//         body: '',
//         feedback: 'text-gray-400 dark:text-gray-200',
//         description: 'text-gray-400 dark:text-gray-200'
//       },
//       variants: {
//         danger: {
//           label: 'text-red-500',
//           feedback: 'text-red-500'
//         },
//         success: {
//           label: 'text-green-500',
//           feedback: 'text-green-500'
//         }
//       }
//     }
//   },
//   't-rich-select': {
//     component: TRichSelect,
//     props: {
//       fixedClasses: {
//         wrapper: 'relative',
//         buttonWrapper: 'inline-block relative w-full',
//         selectButton: 'w-full flex text-left justify-between items-center px-4 py-2 leading-4 text-gray-900 transition duration-100 ease-in-out border rounded-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-inner',
//         selectButtonLabel: 'block truncate',
//         selectButtonPlaceholder: 'block truncate',
//         selectButtonIcon: 'fill-current flex-shrink-0 ml-1 h-3 w-3',
//         selectButtonClearButton: 'rounded-sm flex flex-shrink-0 items-center justify-center absolute right-0 top-0 m-2 w-4 h-4 transition duration-100 ease-in-out',
//         selectButtonClearIcon: 'fill-current h-3 w-3',
//         dropdown: 'absolute w-full z-10 -mt-1 border-b border-l border-r rounded-b-sm shadow-sm z-10',
//         dropdownFeedback: '',
//         loadingMoreResults: '',
//         optionsList: 'overflow-auto',
//         searchWrapper: 'inline-block w-full',
//         searchBox: 'inline-block w-full',
//         optgroup: '',
//         option: 'cursor-pointer',
//         disabledOption: 'opacity-50 cursor-not-allowed',
//         highlightedOption: 'cursor-pointer',
//         selectedOption: 'cursor-pointer',
//         selectedHighlightedOption: 'cursor-pointer',
//         optionContent: '',
//         optionLabel: 'truncate block',
//         selectedIcon: 'fill-current h-4 w-4',
//         enterClass: '',
//         enterActiveClass: '',
//         enterToClass: '',
//         leaveClass: '',
//         leaveActiveClass: '',
//         leaveToClass: ''
//       },
//       classes: {
//         wrapper: '',
//         buttonWrapper: '',
//         selectButton: 'bg-white border-gray-300',
//         selectButtonLabel: '',
//         selectButtonPlaceholder: 'text-gray-400',
//         selectButtonIcon: 'text-gray-600',
//         selectButtonClearButton: 'hover:bg-purple-100 text-gray-600',
//         selectButtonClearIcon: '',
//         dropdown: 'bg-white border-gray-300',
//         dropdownFeedback: 'pb-2 px-3 text-gray-400 text-sm',
//         loadingMoreResults: 'pb-2 px-3 text-gray-400 text-sm',
//         optionsList: '',
//         searchWrapper: 'p-2 placeholder-gray-400',
//         searchBox: 'px-3 py-2 bg-gray-50 text-sm rounded-sm border focus:outline-none focus:shadow-outline border-gray-300',
//         optgroup: 'text-gray-400 uppercase text-xs py-1 px-2 font-semibold',
//         option: '',
//         disabledOption: '',
//         highlightedOption: 'bg-gray-100',
//         selectedOption: 'bg-gray-100 bg-purple-500 text-white',
//         selectedHighlightedOption: 'bg-gray-100 bg-purple-600 text-white',
//         optionContent: 'flex justify-between items-center px-3 py-2',
//         optionLabel: '',
//         selectedIcon: '',
//         enterClass: '',
//         enterActiveClass: 'opacity-0 transition ease-out duration-100',
//         enterToClass: 'opacity-100',
//         leaveClass: 'transition ease-in opacity-100',
//         leaveActiveClass: '',
//         leaveToClass: 'opacity-0 duration-75'
//       },
//       variants: {}
//     }
//   },
//   't-datepicker': {
//     component: TDatepicker,
//     props: {
//       fixedClasses: {
//         navigator: 'flex',
//         navigatorViewButton: 'flex items-center',
//         navigatorViewButtonIcon: 'flex-shrink-0 h-5 w-5',
//         navigatorViewButtonBackIcon: 'flex-shrink-0 h-5 w-5',
//         navigatorLabel: 'flex items-center py-1',
//         navigatorPrevButtonIcon: 'w-5 h-5 inline-flex',
//         navigatorNextButtonIcon: 'w-5 h-5 inline-flex',
//         inputWrapper: 'relative',
//         viewGroup: 'inline-flex flex-wrap',
//         view: 'w-64',
//         calendarDaysWrapper: 'grid grid-cols-7',
//         calendarHeaderWrapper: 'grid grid-cols-7',
//         monthWrapper: 'grid grid-cols-4',
//         yearWrapper: 'grid grid-cols-4',
//         input: 'block w-full px-3 py-2 transition duration-100 ease-in-out border rounded-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
//         clearButton: 'flex flex-shrink-0 items-center justify-center absolute right-0 top-0 m-2 w-5 h-5',
//         clearButtonIcon: 'fill-current h-3 w-3'
//       },
//       classes: {
//         wrapper: 'flex flex-col',
//         dropdownWrapper: 'relative z-10',
//         dropdown: 'origin-top-left absolute rounded-sm shadow bg-white overflow-hidden mt-1',
//         enterClass: '',
//         enterActiveClass: 'transition ease-out duration-100 transform opacity-0 scale-95',
//         enterToClass: 'transform opacity-100 scale-100',
//         leaveClass: 'transition ease-in transform opacity-100 scale-100',
//         leaveActiveClass: '',
//         leaveToClass: 'transform opacity-0 scale-95 duration-75',
//         inlineWrapper: '',
//         inlineViews: 'rounded-sm bg-white border mt-1 inline-flex',
//         inputWrapper: '',
//         input: 'text-gray-900 placeholder-gray-400 border-gray-300',
//         clearButton: 'hover:bg-gray-100 rounded-sm transition duration-100 ease-in-out text-gray-600',
//         clearButtonIcon: '',
//         viewGroup: '',
//         view: '',
//         navigator: 'pt-2 px-3',
//         navigatorViewButton: 'transition ease-in-out duration-100 inline-flex cursor-pointer rounded-full px-2 py-1 -ml-1 hover:bg-gray-100',
//         navigatorViewButtonIcon: 'fill-current text-gray-400',
//         navigatorViewButtonBackIcon: 'fill-current text-gray-400',
//         navigatorViewButtonMonth: 'text-gray-700 font-semibold',
//         navigatorViewButtonYear: 'text-gray-500 ml-1',
//         navigatorViewButtonYearRange: 'text-gray-500 ml-1',
//         navigatorLabel: 'py-1',
//         navigatorLabelMonth: 'text-gray-700 font-semibold',
//         navigatorLabelYear: 'text-gray-500 ml-1',
//         navigatorPrevButton: 'transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-100 rounded-full p-1 ml-2 ml-auto disabled:opacity-50 disabled:cursor-not-allowed',
//         navigatorNextButton: 'transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-100 rounded-full p-1 -mr-1 disabled:opacity-50 disabled:cursor-not-allowed',
//         navigatorPrevButtonIcon: 'text-gray-400',
//         navigatorNextButtonIcon: 'text-gray-400',
//         calendarWrapper: 'px-3 pt-2',
//         calendarHeaderWrapper: '',
//         calendarHeaderWeekDay: 'uppercase text-xs text-gray-500 w-8 h-8 flex items-center justify-center',
//         calendarDaysWrapper: '',
//         calendarDaysDayWrapper: 'w-full h-8 flex flex-shrink-0 items-center',
//         otherMonthDay: 'text-sm rounded-full w-8 h-8 mx-auto hover:bg-purple-100 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed',
//         emptyDay: '',
//         inRangeFirstDay: 'text-sm bg-purple-500 text-white w-full h-8 rounded-l-full',
//         inRangeLastDay: 'text-sm bg-purple-500 text-white w-full h-8 rounded-r-full',
//         inRangeDay: 'text-sm bg-purple-200 w-full h-8 disabled:opacity-50 disabled:cursor-not-allowed',
//         selectedDay: 'text-sm rounded-full w-8 h-8 mx-auto bg-purple-500 text-white disabled:opacity-50 disabled:cursor-not-allowed',
//         activeDay: 'text-sm rounded-full bg-purple-100 w-8 h-8 mx-auto disabled:opacity-50 disabled:cursor-not-allowed',
//         highlightedDay: 'text-sm rounded-full bg-purple-200 w-8 h-8 mx-auto disabled:opacity-50 disabled:cursor-not-allowed',
//         day: 'text-sm rounded-full w-8 h-8 mx-auto hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed',
//         today: 'text-sm rounded-full w-8 h-8 mx-auto hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed border border-purple-500',
//         monthWrapper: 'px-3 pt-2',
//         selectedMonth: 'text-sm rounded-sm w-full h-12 mx-auto bg-purple-500 text-white',
//         activeMonth: 'text-sm rounded-sm w-full h-12 mx-auto bg-purple-100',
//         month: 'text-sm rounded-sm w-full h-12 mx-auto hover:bg-purple-100',
//         yearWrapper: 'px-3 pt-2',
//         year: 'text-sm rounded-sm w-full h-12 mx-auto hover:bg-purple-100',
//         selectedYear: 'text-sm rounded-sm w-full h-12 mx-auto bg-purple-500 text-white',
//         activeYear: 'text-sm rounded-sm w-full h-12 mx-auto bg-purple-100'
//       },
//       variants: {
//         danger: {
//           input: 'border-red-300 bg-red-50 placeholder-red-200 text-red-900',
//           clearButton: 'hover:bg-red-200 text-red-500'
//         }
//       }
//     }
//   },
//   't-checkbox-group': {
//     component: TCheckboxGroup,
//     props: {
//       classes: {
//         groupWrapper: 'flex flex-col space-y-1',
//         label: 'ml-2 text-gray-700 text-sm',
//         input: 'transition duration-100 ease-in-out rounded focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0  disabled:opacity-50 disabled:cursor-not-allowed text-purple-500 border-gray-300'
//       },
//       variants: {
//         danger: {
//           groupWrapper: 'flex flex-col space-y-1',
//           label: 'ml-2 text-red-500 text-sm',
//           input: 'transition duration-100 ease-in-out rounded focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0  disabled:opacity-50 disabled:cursor-not-allowed text-red-500 border-red-500'
//         },
//         buttons: {
//           groupWrapper: 'flex',
//           label: '',
//           labelChecked: '',
//           wrapper: 'mx-1 bg-white border border-gray-300 flex items-center px-4 py-2 rounded shadow-sm cursor-pointer focus:shadow-outline text-sm text-gray-700 hover:text-gray-500 leading-5 uppercase',
//           wrapperChecked: 'mx-1 bg-gray-100 border border-gray-300 flex items-center px-4 py-2 rounded shadow-inner cursor-pointer focus:shadow-outline text-sm text-gray-700 hover:text-gray-500 leading-5 uppercase',
//           inputWrapper: '',
//           inputWrapperChecked: '',
//           input: 'absolute invisible'
//         }
//       }
//     }
//   },
//   't-tag': {
//     component: TTag,
//     props: {
//       fixedClasses: '',
//       classes: '',
//       variants: {
//         title: 'text-2xl leading-8 font-extrabold text-gray-900 tracking-tight',
//         subtitle: 'text-lg leading-6 font-medium text-gray-900',
//         error: 'text-red-500',
//         badge: 'inline-flex items-center px-3 rounded-sm text-xs font-medium leading-4 bg-gray-100 text-gray-800',
//         avatar: 'inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500 overflow-hidden leading-none text-center'
//       }
//     }
//   },
//   't-toggle': {
//     component: TToggle,
//     props: {
//       fixedClasses: {
//         wrapper: 'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200',
//         wrapperChecked: 'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200  border-2 border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50',
//         wrapperDisabled: 'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 opacity-50 cursor-not-allowed',
//         wrapperCheckedDisabled: 'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 opacity-50 cursor-not-allowed border-2 border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50',
//         button: 'inline-block absolute transform translate-x-0 transition ease-in-out duration-200',
//         buttonChecked: 'inline-block absolute transform translate-x-full transition ease-in-out duration-200',
//         checkedPlaceholder: 'inline-block',
//         uncheckedPlaceholder: 'inline-block'
//       },
//       classes: {
//         wrapper: 'bg-gray-200 rounded-full border-2 border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50',
//         wrapperChecked: 'bg-purple-500 rounded-full',
//         wrapperDisabled: 'bg-gray-200 rounded-full border-2 border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50',
//         wrapperCheckedDisabled: 'bg-purple-500',
//         button: 'h-4 w-4 rounded-full bg-white shadow flex items-center justify-center text-gray-400 text-xs',
//         buttonChecked: 'h-4 w-4 rounded-full bg-white shadow flex items-center justify-center text-purple-500 text-xs',
//         checkedPlaceholder: 'rounded-full w-4 h-4 flex items-center justify-center text-gray-400 text-xs',
//         uncheckedPlaceholder: 'rounded-full w-4 h-4 flex items-center justify-center text-gray-400 text-xs'
//       },
//       variants: {
//         danger: {
//           wrapperChecked: 'bg-red-500 rounded-full',
//           wrapperCheckedDisabled: 'bg-red-500 rounded-full'
//         },
//         success: {
//           wrapperChecked: 'bg-green-500 rounded-full',
//           wrapperCheckedDisabled: 'bg-green-500 rounded-full'
//         },
//         box: {
//           wrapper: 'bg-gray-100 rounded-sm border-2 border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50',
//           wrapperChecked: 'bg-purple-500 rounded-sm',
//           wrapperCheckedDisabled: 'bg-purple-500 rounded-sm',
//           button: 'w-4 h-4 rounded-sm bg-white shadow flex items-center justify-center text-gray-400 text-xs',
//           buttonChecked: 'w-4 h-4 rounded-sm  bg-white shadow flex items-center justify-center text-purple-500 text-xs',
//           checkedPlaceholder: 'rounded-sm h-5 w-5 flex items-center justify-center text-gray-400 text-xs',
//           uncheckedPlaceholder: 'rounded-sm h-5 w-5 flex items-center justify-center text-gray-400 text-xs'
//         }
//       }
//     }
//   },
//   't-alert': {
//     component: TAlert,
//     props: {
//       fixedClasses: {
//         wrapper: 'relative flex items-center p-4 border-l-4  rounded-sm',
//         body: 'flex-grow',
//         close: 'absolute relative flex items-center justify-center ml-4 flex-shrink-0 h-5 w-5 transition duration-100 ease-in-out rounded-sm  focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50',
//         closeIcon: 'fill-current h-4 w-4'
//       },
//       classes: {
//         wrapper: 'bg-purple-50 border-purple-500',
//         body: 'text-purple-700',
//         close: 'text-purple-500 hover:bg-purple-200'
//       },
//       variants: {
//         danger: {
//           wrapper: 'bg-red-50 border-red-500',
//           body: 'text-red-700',
//           close: 'text-red-500 hover:bg-red-200'
//         },
//         success: {
//           wrapper: 'bg-green-50 border-green-500',
//           body: 'text-green-700',
//           close: 'text-green-500 hover:bg-green-200'
//         }
//       }
//     }
//   },
//   't-card': {
//     component: TCard,
//     props: {
//       fixedClasses: {
//         wrapper: 'border rounded-sm ',
//         body: 'p-3',
//         header: 'border-b p-3 rounded-t-sm',
//         footer: 'border-t p-3 rounded-b-sm'
//       },
//       classes: {
//         wrapper: 'bg-white border-gray-100',
//         body: '',
//         header: 'border-gray-100',
//         footer: 'border-gray-100'
//       },
//       variants: {
//         danger: {
//           wrapper: 'bg-red-50 text-red-700 border-red-200',
//           header: 'border-red-200 text-red-700',
//           footer: 'border-red-200 text-red-700'
//         }
//       }
//     }
//   },
//   't-modal': {
//     component: TModal,
//     props: {
//       fixedClasses: {
//         overlay: 'z-100 overflow-auto scrolling-touch left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-opacity-90',
//         wrapper: 'relative mx-auto z-50 px-3 py-12',
//         modal: 'overflow-visible relative rounded-sm',
//         body: '',
//         header: 'rounded-t-sm',
//         footer: 'p-4 rounded-b-sm',
//         close: 'flex items-center justify-center rounded-full absolute right-0 top-0 -m-3 h-8 w-8 transition duration-100 ease-in-out focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50'
//       },
//       classes: {
//         overlay: 'bg-black',
//         wrapper: 'max-w-lg',
//         modal: 'bg-white shadow',
//         body: 'p-4',
//         header: 'flex items-center justify-between px-4 py-3 bg-white border-b',
//         footer: 'bg-gray-100',
//         close: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
//         closeIcon: 'fill-current h-4 w-4',
//         overlayEnterClass: '',
//         overlayEnterActiveClass: 'opacity-0 transition ease-out duration-100',
//         overlayEnterToClass: 'opacity-100',
//         overlayLeaveClass: 'transition ease-in opacity-100',
//         overlayLeaveActiveClass: '',
//         overlayLeaveToClass: 'opacity-0 duration-75',
//         enterClass: '',
//         enterActiveClass: '',
//         enterToClass: '',
//         leaveClass: '',
//         leaveActiveClass: '',
//         leaveToClass: ''
//       },
//       variants: {
//         danger: {
//           overlay: 'bg-red-100',
//           header: 'border-red-50 text-red-700',
//           close: 'bg-red-50 text-red-700 hover:bg-red-200 border-red-100 border',
//           modal: 'bg-white border border-red-100 shadow-lg',
//           footer: 'bg-red-50'
//         }
//       }
//     }
//   },
//   't-dialog': {
//     component: TDialog,
//     props: {
//       fixedClasses: {
//         overlay: 'overflow-auto scrolling-touch left-0 top-0 bottom-0 right-0 w-full h-full fixed z-40 bg-opacity-50',
//         wrapper: 'relative mx-auto',
//         modal: 'overflow-visible relative ',
//         close: 'flex items-center justify-center  rounded-full absolute right-0 top-0 -m-3 h-8 w-8 transition duration-100 ease-in-out focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50',
//         dialog: 'overflow-visible relative',
//         iconWrapper: 'flex flex-shrink-0 h-12 items-center justify-center rounded-full w-12 mx-auto',
//         icon: 'h-5 w-5',
//         okButton: 'block px-4 py-2 text-white transition duration-100 ease-in-out border border-transparent rounded-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed w-full max-w-xs',
//         buttons: 'p-3 flex space-x-4 justify-center bg-gray-100 rounded-b-sm'
//       },
//       classes: {
//         close: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
//         closeIcon: 'fill-current h-4 w-4',
//         overlay: 'bg-black',
//         wrapper: 'z-50 max-w-lg px-3 py-12',
//         dialog: 'bg-white shadow rounded-sm text-left',
//         body: 'p-3 space-y-3',
//         buttons: 'bg-gray-100',
//         iconWrapper: 'bg-gray-100',
//         icon: 'text-gray-500',
//         content: 'w-full flex justify-center flex-col',
//         titleWrapper: '',
//         title: 'text-lg font-semibold text-center',
//         textWrapper: 'text-left w-full',
//         text: '',
//         cancelButton: 'block px-4 py-2 transition duration-100 ease-in-out bg-white border border-gray-300 rounded-sm hover:bg-gray-100 focus:border-gray-100 focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed w-full max-w-xs',
//         okButton: 'bg-purple-500 hover:bg-purple-600',
//         inputWrapper: 'mt-3 flex items-center space-x-3',
//         input: 'block w-full px-3 py-2 text-gray-900 placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed w-full',
//         select: 'block w-full px-3 py-2 text-gray-900 placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50  disabled:opacity-50 disabled:cursor-not-allowed w-full',
//         radioWrapper: 'flex items-center space-x-2',
//         radio: 'text-purple-500 transition duration-100 ease-in-out border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0  disabled:opacity-50 disabled:cursor-not-allowed',
//         radioText: '',
//         checkboxWrapper: 'flex items-center space-x-2',
//         checkbox: 'text-purple-500 transition duration-100 ease-in-out border-gray-300 rounded-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0  disabled:opacity-50 disabled:cursor-not-allowed',
//         checkboxText: '',
//         errorMessage: 'text-red-500 block text-sm',
//         busyWrapper: 'absolute bg-opacity-50 bg-white flex h-full items-center justify-center left-0 top-0 w-full',
//         busyIcon: 'animate-spin w-5 h-5 fill-current text-gray-500',
//         overlayEnterClass: '',
//         overlayEnterActiveClass: 'opacity-0 transition ease-out duration-100',
//         overlayEnterToClass: 'opacity-100',
//         overlayLeaveClass: 'transition ease-in opacity-100',
//         overlayLeaveActiveClass: '',
//         overlayLeaveToClass: 'opacity-0 duration-75',
//         enterClass: '',
//         enterActiveClass: '',
//         enterToClass: '',
//         leaveClass: '',
//         leaveActiveClass: '',
//         leaveToClass: ''
//       },
//       variants: {
//         danger: {
//           overlay: 'bg-red-100',
//           okButton: 'bg-red-500 hover:bg-red-600',
//           iconWrapper: 'bg-red-50',
//           buttons: 'bg-red-50',
//           icon: 'text-red-500'
//         },
//         horizontal: {
//           body: 'p-3 flex space-x-3',
//           title: 'text-lg font-semibold'
//         }
//       }
//     }
//   },
//   't-table': {
//     component: TTable,
//     props: {
//       classes: {
//         table: 'min-w-full divide-y divide-gray-100 shadow-sm border-gray-200 border',
//         thead: '',
//         theadTr: '',
//         theadTh: 'px-3 py-2 font-semibold text-left bg-gray-100 border-b',
//         tbody: 'bg-white divide-y divide-gray-100',
//         tr: '',
//         td: 'px-3 py-2 whitespace-no-wrap',
//         tfoot: '',
//         tfootTr: '',
//         tfootTd: ''
//       },
//       variants: {
//         thin: {
//           td: 'p-1 whitespace-no-wrap text-sm',
//           theadTh: 'p-1 font-semibold text-left bg-gray-100 border-b text-sm'
//         }
//       }
//     }
//   },
//   't-pagination': {
//     component: TPagination,
//     props: {
//       classes: {
//         wrapper: 'table border-collapse text-center bg-white mb-0',
//         element: 'w-8 h-8 border border-gray-200 table-cell hover:border-purple-100',
//         activeElement: 'w-8 h-8 border border-gray-200 border-purple-500 table-cell hover:border-purple-600',
//         disabledElement: 'w-8 h-8 border border-gray-200 table-cell',
//         ellipsisElement: 'w-8 h-8 border border-gray-200 hidden md:table-cell',
//         activeButton: 'bg-purple-500 w-full h-full text-white hover:bg-purple-600 transition duration-100 ease-in-out focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50',
//         disabledButton: 'opacity-25 w-full h-full cursor-not-allowed transition duration-100 ease-in-out',
//         button: 'hover:bg-purple-100 w-full h-full transition duration-100 ease-in-out focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50',
//         ellipsis: ''
//       },
//       variants: {
//         rounded: {
//           wrapper: 'bg-white mx-auto text-center flex space-x-2',
//           element: 'w-8 h-8 rounded-full',
//           activeElement: 'w-8 h-8 rounded-full',
//           disabledElement: 'w-8 h-8 rounded-full',
//           ellipsisElement: 'w-8 h-8 rounded-full hidden md:inline',
//           activeButton: 'border border-purple-500 bg-purple-500 w-full h-full rounded-full text-white hover:bg-purple-600 transition duration-100 ease-in-out focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50',
//           disabledButton: 'border border-gray-200  opacity-25 w-full h-full rounded-full cursor-not-allowed transition duration-100 ease-in-out',
//           button: 'border border-gray-200 hover:bg-purple-100 hover:border-purple-100 rounded-full w-full h-full transition duration-100 ease-in-out focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50',
//           ellipsis: ''
//         }
//       }
//     }
//   },
//   't-dropdown': {
//     component: TDropdown,
//     props: {
//       fixedClasses: {
//         button: 'flex items-center text-white px-4 py-2 transition duration-100 ease-in-out border border-transparent rounded-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
//         wrapper: 'inline-flex flex-col',
//         dropdownWrapper: 'relative z-50',
//         dropdown: 'absolute rounded-sm shadow-lg border dark:border-gray-800 mt-1 overflow-hidden',
//         enterClass: '',
//         enterActiveClass: 'transition ease-out duration-100 transform opacity-0 scale-95',
//         enterToClass: 'transform opacity-100 scale-100',
//         leaveClass: 'transition ease-in transform opacity-100 scale-100',
//         leaveActiveClass: '',
//         leaveToClass: 'transform opacity-0 scale-95 duration-75'
//       },
//       classes: {
//         button: 'bg-purple-500 hover:bg-purple-600',
//         dropdown: 'w-56 origin-top-left left-0 bg-white py-2'
//       },
//       variants: {
//         danger: {
//           button: 'bg-red-500 hover:bg-red-600',
//           dropdown: 'bg-red-50'
//         }
//       }
//     }
//   }
// }

//Vue.use(VueTailwind, settings)

// Vue.config.productionTip = false

 // actually mount to DOM
app.mount('#app')
