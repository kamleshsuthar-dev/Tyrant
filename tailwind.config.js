import tailwindcssAnimate from 'tailwindcss-animate';
/** @type {import('tailwindcss').Config} */


export default {
	mode:"jit" ,
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	safelist: [
		'border-accent', 'focus-visible:border-accent',
		'border-destructive', 'focus-visible:border-destructive',
	  ],
	theme: {
  	extend: {
		keyframes: {
			"slide-up": {
			  "0%": {
				transform: "translateY(100%)",
				opacity: "0",
			  },
			  "100%": {
				transform: "translateY(0)",
				opacity: "1",
			  },
			},
		  },
		animation: {
			"slide-up": "slide-up 0.3s ease-out",
		  },
		colors: {
			border: "hsl(var(--border))",
			input: "hsl(var(--input))",
			ring: "hsl(var(--ring))",
			background: "hsl(var(--background))",
			foreground: "hsl(var(--foreground))",
			primary: {
			  DEFAULT: "hsl(var(--primary))",
			  foreground: "hsl(var(--primary-foreground))",
			},
			secondary: {
			  DEFAULT: "hsl(var(--secondary))",
			  foreground: "hsl(var(--secondary-foreground))",
			},
			accent: {
			  DEFAULT: "hsl(var(--accent))",
			  foreground: "hsl(var(--accent-foreground))",
			},
			destructive: {
			  DEFAULT: "hsl(var(--destructive))",
			  foreground: "hsl(var(--destructive-foreground))",
			},
			muted: {
			  DEFAULT: "hsl(var(--muted))",
			  foreground: "hsl(var(--muted-foreground))",
			},
			popover: {
			  DEFAULT: "hsl(var(--popover))",
			  foreground: "hsl(var(--popover-foreground))",
			},
			card: {
			  DEFAULT: "hsl(var(--card))",
			  foreground: "hsl(var(--card-foreground))",
			},
			chart: {
				'1': 'hsl(var(--chart-1))',
				'2': 'hsl(var(--chart-2))',
				'3': 'hsl(var(--chart-3))',
				'4': 'hsl(var(--chart-4))',
				'5': 'hsl(var(--chart-5))'
			}
		  },
		borderRadius: {
			lg: "var(--radius)",
			md: "calc(var(--radius) - 2px)",
			sm: "calc(var(--radius) - 4px)",
		  },
  		fontFamily: {
  			'comfortaa': [
  				'Comfortaa',
  				'san-serif'
  			],
			'automata':[
				'AUTOMATA',
				'san-serif'
			]
  		},
  	}
  },
  plugins: [tailwindcssAnimate],
}