export default function dateFiler(value, format = 'date') {
    const options = {}

    if (format.includes('date')) {
        options.day = '2-digit'
        options.month = 'long'
        options.year = 'numeric'
    }
    if (format.includes('time')) {
        options.hour = '2-digit'
        options.minute = '2-digit'
        options.second = '2-digit'
    }

    let newDate = new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
    return newDate.replace(',', '')
}