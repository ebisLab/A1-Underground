import React from 'react'
import Landing from '../src/components/Landing'
import Layout from '../src/components/Layout'

export default function Index(props) {
  return (
      <Layout>
        Hello World!
        <Landing products={products}/>
        
      </Layout>
  )
};

Index.getInitialProps = async () =>{
  //isomorphic unfetch
  // const res = await fetch(`${clientConfig.siteUrl}/getProducts`);
  // const productsData = await res.json();

  const res = await client.query({query:PRODUCTS_QUERY});
  return {
      products:res.data.products.edges
  }
}

export default Index;