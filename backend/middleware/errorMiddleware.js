const notFound = (req,res,next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const errorHandler = (err,req,res,next) => {
  const statusCode = res.statusCode === 200? 500 : res.statusCode
  res.status(statusCode)

  const responseBody = {
    message : err.message,
    stack : process.env.NODE_ENV === 'production' ? null : err.stack,
  }
  console.log("Error: " , responseBody );
  res.json(responseBody)
}

export { notFound,errorHandler }