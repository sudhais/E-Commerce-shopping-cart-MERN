

let data = [
  { id: '1', name: 'Item 1', qty:2 },
  { id: '2', name: 'Item 2', qty:3 },
  { id: '3', name: 'Item 3' , qty:4}
];

const idExists = (array, id) => (
   array.some(item => item.id === id)
)

const data1 = data.map((item) => 
  item.id === '2'
    ? { ...item, qty:6 }
    : item
);

// Example usage:
console.log(idExists(data, '1')); // true
console.log(data1); // false





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

