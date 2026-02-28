export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Walas Klimatyzacja',
    description: 'Profesjonalny serwis klimatyzacji w Łodzi',
    url: 'https://walasklima.vercel.app',
    telephone: '+48604099876',
    email: 'klimatyzacja.mwalas@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ul. Beskidzka 170a',
      addressLocality: 'Łódź',
      postalCode: '91-610',
      addressRegion: 'Łódzkie',
      addressCountry: 'PL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '51.811566',
      longitude: '19.467823',
    },
    priceRange: 'od 150 zł',
    openingHours: 'Mo-Sa 08:00-18:00',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '51.811566',
        longitude: '19.467823',
      },
      geoRadius: '50000',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
