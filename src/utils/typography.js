import Typography from 'typography'
import {
  MOBILE_MEDIA_QUERY,
  TABLET_MEDIA_QUERY,
} from 'typography-breakpoint-constants'
import gray from 'gray-percentage'

const typography = new Typography({
  title: 'Sutro',
  baseFontSize: '16px',
  baseLineHeight: 1.78 * 1.1,
  headerFontFamily: [
    '-apple-system',
    'Roboto',
    'Helvetica Neue',
    'Droid Sans',
    'ヒラギノ角ゴ ProN W3',
    'Hiragino Kaku Gothic ProN',
    'Meiryo',
    'メイリオ',
    'Osaka',
    'MS PGothic',
    'arial',
    'sans-serif',
  ],
  bodyFontFamily: [
    '-apple-system',
    'Roboto',
    'Helvetica Neue',
    'Droid Sans',
    'ヒラギノ角ゴ ProN W3',
    'Hiragino Kaku Gothic ProN',
    'Meiryo',
    'メイリオ',
    'Osaka',
    'MS PGothic',
    'arial',
    'sans-serif',
  ],
  bodyColor: 'hsla(0,0%,0%,0.9)',
  headerWeight: 700,
  bodyWeight: 400,
  boldWeight: 700,
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    a: {
      color: '#2358ce',
      textDecoration: 'none',
    },
    'a:hover,a:active': {
      textDecoration: 'underline',
    },
    blockquote: {
      ...scale(1 / 5),
      color: gray(41),
      fontStyle: 'italic',
      paddingLeft: rhythm(13 / 16),
      marginLeft: 0,
      borderLeft: `${rhythm(3 / 16)} solid ${gray(80)}`,
    },
    'blockquote > :last-child': {
      marginBottom: 0,
    },
    'blockquote cite': {
      ...adjustFontSizeTo(options.baseFontSize),
      color: options.bodyColor,
      fontWeight: options.bodyWeight,
    },
    'blockquote cite:before': {
      content: '"— "',
    },
    ul: {
      listStyle: 'disc',
    },
    'ul,ol': {
      marginLeft: 0,
    },
    [MOBILE_MEDIA_QUERY]: {
      'ul,ol': {
        marginLeft: rhythm(1),
      },
      blockquote: {
        marginLeft: rhythm(-3 / 4),
        marginRight: 0,
        paddingLeft: rhythm(9 / 16),
      },
    },
    [TABLET_MEDIA_QUERY]: {
      h1: {
        ...scale(5 / 5),
      },
    },
    'h1,h2,h3,h4,h5,h6': {
      marginTop: rhythm(1),
      marginBottom: rhythm(3 / 4),
    },
    h1: {
      ...scale(6 / 5),
    },
    h6: {
      fontStyle: 'italic',
    },
  }),
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
