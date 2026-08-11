/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './*.html',
    './*.js',
    './data/**/*.json'
  ],
  theme: {
    extend: {
      colors: {
        'tertiary-container':'#a9b1ca',
        'on-surface-variant':'#44474e',
        'surface-variant':'#dee3eb',
        'inverse-surface':'#2e3133',
        'surface-container-high':'#e1e2e5',
        'surface-container-highest':'#d8dadc',
        'surface-container-low':'#eef5f8',
        'surface-container-lowest':'#ffffff',
        'surface-bright':'#f7f9fb',
        'surface':'#f7f9fb',
        'on-secondary':'#ffffff',
        'on-tertiary':'#ffffff',
        'on-primary-fixed':'#001e2c',
        'primary':'#00668a',
        'primary-container':'#38bdf8',
        'primary-fixed-dim':'#7bd0ff',
        'secondary-container':'#f0dbff',
        'background':'#f7f9fb',
        'on-background':'#001e2c',
        'on-surface':'#001e2c',
        'tertiary':'#006b4a',
        'tertiary-fixed-dim':'#4edea3',
        'outline':'#72777f',
        'outline-variant':'#c2c7cf',
        'on-primary-container':'#001e2c'
      },
      borderRadius: { DEFAULT:'0.5rem', lg:'0.5rem', xl:'0.75rem', full:'9999px' },
      spacing: {
        'container-max-width':'1280px',
        'container-max':'1280px',
        'margin-desktop':'80px',
        'margin-mobile':'20px',
        'margin':'32px',
        'stack-sm':'8px',
        'stack-md':'16px',
        'stack-lg':'48px',
        'gutter':'24px',
        'xs':'4px',
        'sm':'8px',
        'md':'16px',
        'lg':'24px',
        'xl':'48px'
      },
      maxWidth: { 'container-max-width':'1280px', 'container-max':'1280px' },
      fontFamily: {
        'body-sm':['Plus Jakarta Sans','sans-serif'],
        'body-md':['Plus Jakarta Sans','sans-serif'],
        'body-lg':['Plus Jakarta Sans','sans-serif'],
        'label-bold':['Plus Jakarta Sans','sans-serif'],
        'label-md':['Plus Jakarta Sans','sans-serif'],
        'label-sm':['Plus Jakarta Sans','sans-serif'],
        'headline-lg-mobile':['Plus Jakarta Sans','sans-serif'],
        'headline-md':['Plus Jakarta Sans','sans-serif'],
        'headline-xl':['Plus Jakarta Sans','sans-serif'],
        'headline-lg':['Plus Jakarta Sans','sans-serif']
      },
      fontSize: {
        'body-sm':['14px',{lineHeight:'1.5',fontWeight:'400'}],
        'body-md':['16px',{lineHeight:'1.6',fontWeight:'400'}],
        'body-lg':['18px',{lineHeight:'1.6',fontWeight:'400'}],
        'label-bold':['12px',{lineHeight:'1.0',letterSpacing:'0.05em',fontWeight:'700'}],
        'label-md':['14px',{lineHeight:'1.0',letterSpacing:'0.05em',fontWeight:'600'}],
        'label-sm':['12px',{lineHeight:'1.0',fontWeight:'600'}],
        'headline-lg-mobile':['28px',{lineHeight:'1.2',fontWeight:'700'}],
        'headline-md':['24px',{lineHeight:'1.2',fontWeight:'700'}],
        'headline-lg':['40px',{lineHeight:'1.1',fontWeight:'800'}],
        'headline-xl':['56px',{lineHeight:'1.05',fontWeight:'800'}]
      },
      boxShadow: { 'primary-container/10':'0 10px 28px rgba(56,189,248,.10)' }
    }
  },
  plugins: []
};
