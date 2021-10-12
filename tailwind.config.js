const colors = require('./node_modules/tailwindcss/colors')

module.exports = {
	plugins: [
	require("./node_modules/@tailwindcss/forms")({
		strategy: 'class',
	})
	],
	mode: 'jit',
	purge: [
	'./src/**/*.vue',
	'./src/**/*.js',
	'./index.html'
	],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		colors: {
			primary: ({ opacityVariable, opacityValue }) => {
				if (opacityValue !== undefined) {
					return `rgba(var(--color-primary), ${opacityValue})`
				}
				if (opacityVariable !== undefined) {
					return `rgba(var(--color-primary), var(${opacityVariable}, 1))`
				}
				return `rgb(var(--color-primary))`
			},
			secondary: ({ opacityVariable, opacityValue }) => {
				if (opacityValue !== undefined) {
					return `rgba(var(--color-secondary), ${opacityValue})`
				}
				if (opacityVariable !== undefined) {
					return `rgba(var(--color-secondary), var(${opacityVariable}, 1))`
				}
				return `rgb(var(--color-secondary))`
			},
			transparent: 'transparent',
			black: colors.black,
			white: colors.white,
			gray: colors.blueGray,
			red: colors.red,
			blue: colors.lightBlue,
			yellow: colors.yellow,
			orange: colors.orange,
			green: colors.green,
			teal: colors.teal,
			cyan: colors.cyan,
			indigo: colors.indigo,
			purple: colors.violet,
			fuchsia: colors.fuchsia,
			pink: colors.pink
		},
		opacity: {
			'0': '0',
			'05': '.05',
			'10': '.1',
			'13': '.13',
			'20': '.2',
			'25': '.25',
			'30': '.3',
			'40': '.4',
			'50': '.5',
			'60': '.6',
			'65': '.65',
			'70': '.7',
			'75': '.75',
			'80': '.8',
			'90': '.9',
			'93': '.93',
			'100': '1'
		},
		scale: {
			'0': '0',
			'25': '.25',
			'50': '.5',
			'70': '.7',
			'75': '.75',
			'80': '.8',
			'90': '.9',
			'95': '.95',
			'100': '1',
			'105': '1.05',
			'110': '1.1',
			'120': '1.2',
			'125': '1.25',
			'150': '1.5',
			'200': '2',
			'250': '2.5',
		},
		fontSize: {
			'3xs': '8px',
			'2xs': '11px',
			'xs': '12px',
			'sm': '13px',
			'base': '14px',
			'lg': '16px',
			'xl': '18px',
			'2xl': '21px',
			'3xl': '26px',
			'4xl': '32px',
			'5xl': '42px',
			'6xl': '56px',
			'7xl': '60px',
		},
		fontWeight: {
			hairline: 100,
			thin: 200,
			light: 300,
			normal: 400,
			medium: 500,
			semibold: 600,
			bold: 700,
			black: 800
		},
		borderWidth: {
			DEFAULT: '1px',
			'0': '0',
			'2': '2px',
			'3': '3px',
			'4': '4px',
			'6': '6px',
			'8': '8px',
		},
		borderRadius: {
			'none': '0',
			'sm': '3px',
			DEFAULT: '0.25rem',
			'md': '0.375rem',
			'lg': '0.5rem',
			'full': '9999px'
		},
		extend: {
			boxShadow: {
				xs: '0 1px 1px 0 rgba(0, 0, 0, 0.04)',
				'inner': 'inset 0 1px 1px 0 rgba(0,0,0,0.02)',
				'inner-white': 'inset 0 1px 0 rgba(255,255,255,.2)'
			},
			colors: {
				red: {
					950: '#501F1F'
				},
				blue: {
					950: '#192E3B'
				},
				yellow: {
					950: '#583A20'
				},
				orange: {
					950: '#583022'
				},
				green: {
					950: '#214D32'
				},
				teal: {
					950: '#19423F'
				},
				cyan: {
					950: '#1A4353'
				},
				purple: {
					950: '#271146'
				},
				fuchsia: {
					950: '#551B58'
				},
				pink: {
					950: '#5B263A'
				},
				gray: {
					950: '#0A0E17'
				}
			}
		},
		zIndex: {
			'0': 0,
			'10': 10,
			'20': 20,
			'30': 30,
			'40': 40,
			'50': 50,
			'75': 75,
			'100': 100,
			'auto': 'auto'
		},
		container: {
			screens: {
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1180px"
			}
		},
	},
	variants: {
		extend: {
			animation: ['group-hover', 'focus'],
			display: ['group-hover'],
			scale: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
			margin: ['first','last'],
			padding: ['first', 'last'],
			backgroundOpacity: ['dark'],
			backgroundColor: ['active'],
			borderWidth: ['dark', 'first', 'last', 'active'],
			borderRadius: ['first', 'last', 'hover', 'focus'],
			borderColor: ['checked'],
			boxShadow: ['active'],
			inset: ['active', 'group-hover'],
			opacity: ['dark', 'visited', 'disabled'],
			pointerEvents: ['disabled'],
			textColor: ['visited']
		}
	}
}