import { Helmet } from "react-helmet-async";

const SITE_URL = "https://qr-craft-studio.vercel.app";
const SITE_NAME = "QR Studio";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  type?: string;
  noindex?: boolean;
  structuredData?: object | object[];
  keywords?: string;
}

const SEOHead = ({
  title,
  description,
  path = "/",
  type = "website",
  noindex = false,
  structuredData,
  keywords,
}: SEOHeadProps) => {
  const url = `${SITE_URL}${path}`;
  const fullTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1"} />
      <link rel="canonical" href={url} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={DEFAULT_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />
      <meta name="twitter:image:alt" content={fullTitle} />

      {/* Structured Data */}
      {structuredData && (
        Array.isArray(structuredData) 
          ? structuredData.map((data, i) => (
              <script key={i} type="application/ld+json">{JSON.stringify(data)}</script>
            ))
          : <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  );
};

export default SEOHead;
