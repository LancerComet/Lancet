import Color from 'color'

type HexColorString = string

/**
 * 调亮颜色.
 *
 * @param color 颜色色值.
 * @param amount 增量, 0 - 1.
 */
const lighten = (color: string, amount: number): HexColorString => {
  return new Color(color).lighten(amount).hex()
}

/**
 * 调暗颜色.
 *
 * @param color 颜色色值.
 * @param amount 增量, 0 - 1.
 */
const darken = (color: string, amount: number): HexColorString => {
  return new Color(color).darken(amount).hex()
}

export {
  lighten,
  darken
}
