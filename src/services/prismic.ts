import * as prismic from '@prismicio/client';

export const getPrismicClient = () => {
  const client = prismic.createClient(process.env.PRISMIC_ENDPOINT ?? '');

  return client;
}
