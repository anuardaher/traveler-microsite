export default (country) => {
  const citys = {
    br: [
      { value: 'BSB', text: 'Brasilia' },
      { value: 'GYN', text: 'Goiânia' },
      { value: 'CGH', text: 'São Paulo' },
      { value: 'VIX', text: 'Vitória' },
      { value: 'GIG', text: 'Rio de Janeiro' },
    ],
    it: [
      { value: 'FCO', text: 'Rome' },
      { value: 'BGY', text: 'Bergamo' },
      { value: 'NAP', text: 'Napoli' },
      { value: 'PMO', text: 'Palermo' },
      { value: 'MXP', text: 'Milan' },
    ],
    pt: [
      { value: 'OPO', text: 'Porto' },
      { value: 'LIS', text: 'Lisbon' },
      { value: 'FAO', text: 'Faro' },
    ],
    es: [
      { value: 'MAD', text: 'Madrid' },
      { value: 'BCN', text: 'Barcelona' },
      { value: 'AGP', text: 'Málaga' },
      { value: 'PMI', text: 'Mallorca' },
    ],
  }
  return citys[country] || []
}
