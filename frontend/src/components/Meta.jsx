import React from 'react'
import {Helmet} from 'react-helmet-async'

export default function Meta({
  title,
  description='We sell the best products for cheap',
  keywords='electronics, buy electronics, cheap electroincs'}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}
