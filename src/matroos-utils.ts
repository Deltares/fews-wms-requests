export function matroosTimeToISOString(time: String) {  
  if (time === '') {
    return time
  } else {
    const timestring = time.concat('0000000000')
    const years = timestring.slice(0, 4)
    const months = timestring.slice(4, 6)
    const days = timestring.slice(6, 8)
    const hours = timestring.slice(8, 10)
    const minutes = timestring.slice(10, 12)
    const seconds = timestring.slice(12, 14)
    return `${years}-${months}-${days}T${hours}:${minutes}:${seconds}Z`
  }
}




