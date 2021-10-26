import dayjs from 'dayjs'

enum UserGender {
  Male = 0,
  Female = 1,
  Unknown = 2
}

class User {
  static getGenderLabel (gender: UserGender): string {
    switch (gender) {
      case UserGender.Male:
        return '男'

      case UserGender.Female:
        return '女'

      default:
        return '未知'
    }
  }

  username: string = ''
  password: string = ''
  gender: UserGender | null = null
  birthday: string = '1926-08-17T00:00:00Z'
  country: string = ''

  get isBirthdayUnknown (): boolean {
    return this.birthday === '1970-01-01T00:00:00Z'
  }

  set isBirthdayUnknown (value: boolean) {
    this.birthday = value
      ? '1970-01-01T00:00:00Z'
      : dayjs()
        .set('hour', 0)
        .set('minute', 0)
        .set('second', 0)
        .format('YYYY-MM-DDTHH:mm:ssZ')
  }
}

export {
  User,
  UserGender
}
