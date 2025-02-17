import { algoliasearch } from 'algoliasearch';

const client = algoliasearch('ECFBYJQFUW', 'c278b572aaa0d558a05e32ab049dd8d2');

// Fetch and index objects in Algolia
const processRecords = async () => {
  const datasetRequest = await fetch('https://fakestoreapi.com/products');
  const products = await datasetRequest.json();
  return await client.saveObjects({ indexName: 'id', objects: products });
};

processRecords()
  .then(() => console.log('Successfully indexed objects!'))
  .catch((err) => console.error(err));
