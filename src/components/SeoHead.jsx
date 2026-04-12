import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://almelectricidad.com';

export default function SeoHead({ title, description, canonical, schema }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={`${BASE_URL}${canonical}`} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {canonical && <meta property="og:url" content={`${BASE_URL}${canonical}`} />}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}
