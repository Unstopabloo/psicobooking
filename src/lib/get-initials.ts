export const getInitials = (name: string | undefined) => {
  if (!name) {
    return 'AA'
  }

  const nameSplitted = name.split(' ')
  const firstName = nameSplitted[0]
  const lastName = nameSplitted[1]

  if (!firstName || !lastName) {
    return ''
  }

  if (firstName && !lastName) {
    return firstName.charAt(0)
  }

  if (!firstName && lastName) {
    return lastName.charAt(0)
  }

  return firstName.charAt(0) + lastName.charAt(0)
}