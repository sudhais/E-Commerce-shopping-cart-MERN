

let data = { id: '1', name: 'Item 1', qty:2 }
const data1 = { id: '2', name: 'Item 2', qty:2 }

data = {...data,id:2}

console.log(data);







function filter() {

  const keyword1 = 'check'
  const rating1 = null
  const minPrice1 = undefined
  const maxPrice1 = 1000

  const keyword = keyword1 ? {
    name: {
      $regex: keyword1,
      $options: "i",
    },
  } : {};

  const rating = rating1 ? {
  rating : {
    $gte : Number(rating1)
  },
  } : {}

  const minPrice = minPrice1 ? {
  price : {
    $gte : Number(minPrice1)
  },
  } : {}

  const maxPrice = maxPrice1 ? {
  price : {
    $lte : Number(maxPrice1)
  },
  } : {}

  const price = (minPrice1 || maxPrice1) ? {
    price: {
      ...(minPrice1 && { $gte: Number(minPrice1) }),
      ...(maxPrice1 && { $lte: Number(maxPrice1) }),
    },
  } : {};

  const filters = {
  ...keyword,
  ...rating,
  ...price
  }

}

