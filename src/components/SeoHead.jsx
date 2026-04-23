import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://almelectricidad.com';
const OG_IMAGE = `${BASE_URL}/og-image.png`;

export default function SeoHead({ title, description, canonical, schema, ogImage, noindex }) {
  const image = ogImage || OG_IMAGE;

  return (
    <Helmet>
      {/* Básicos */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex" />}
      {canonical && <link rel="canonical" href={`${BASE_URL}${canonical}`} />}

      {/* Open Graph — WhatsApp, LinkedIn, Facebook */}
      <meta property="og:type"        content="website" />
      <meta property="og:site_name"   content="ALMelectricidad" />
      <meta property="og:locale"      content="es_ES" />
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={image} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt"    content="ALMelectricidad — Instalaciones Eléctricas Profesionales" />
      {canonical && <meta property="og:url" content={`${BASE_URL}${canonical}`} />}

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />

      {/* Schema.org — acepta objeto único o array de schemas */}
      {schema && (Array.isArray(schema) ? schema : [schema]).map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </Helmet>
  );
}
