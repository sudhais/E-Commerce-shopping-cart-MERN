const data = {
  id: "1234",
  reviews: [
    {
      name:"what",
      rating:4,
      user:new ObjectId('66699a12f48ae1eae220713a'),
      comment:"sdfhsdf"
    },
    {
      name:"what",
      rating:4,
      user:new ObjectId('66699a12f48ae1eae2207137'),
      comment:"sdfhsdf"
    },
  ]
}

const result = data.reviews.length !== 0 ? data.reviews.some((r) => r.user.toString() === '66699a12f48ae1eae2207137') : false
console.log(result);