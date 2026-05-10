// Portfolio — fuente única de imágenes y categorías.
// Para recategorizar una imagen, edita su entry abajo.
// Categorías permitidas:
//   'Fotovoltaica' | 'Industrial' | 'Cuadros' | 'Residencial' | 'Mantenimiento'

export const PORTFOLIO_CATEGORIES = [
  'Fotovoltaica',
  'Industrial',
  'Cuadros',
  'Residencial',
  'Mantenimiento',
];

// Imágenes destacadas — aparecen en el carousel de la HomePage.
// Estas tienen título + descripción visibles. El resto se muestra solo
// en /proyectos como galería filtrable.
export const FEATURED = [
  {
    file: 'bbf912ac-5634-4e6f-ad8d-b83fdf356274.webp',
    title: 'Revisión de armario exterior',
    category: 'Mantenimiento',
    desc: 'Medición y diagnóstico en armario de distribución exterior. Trabajo certificado.',
  },
  {
    file: 'f015c7ac-f508-4a30-bde0-3dfdb7713f23.webp',
    title: 'Fotovoltaica residencial',
    category: 'Fotovoltaica',
    desc: 'Paneles de alta eficiencia en cubierta inclinada. Legalización incluida.',
  },
  {
    file: '8217e1cb-136f-4b3c-88ca-fb7cda38d8aa.webp',
    title: 'Cuadros en nave industrial',
    category: 'Industrial',
    desc: 'Cuadros de mando y protecciones en nave. Certificado REBT.',
  },
  {
    file: 'e6948f9c-0f62-4771-bf42-8c308b96c351.webp',
    title: 'Autoconsumo unifamiliar',
    category: 'Fotovoltaica',
    desc: 'Sistema fotovoltaico en tejado. Ahorro desde el primer mes.',
  },
  {
    file: '2d9c7fe9-ebf3-43e6-ae41-41f8e990bf8c.webp',
    title: 'Cuadro de distribución',
    category: 'Cuadros',
    desc: 'Cuadro eléctrico con protecciones de última generación instalado en exterior.',
  },
  {
    file: '0c1c3c06-f1d5-4f04-91a8-1381e29dd650.webp',
    title: 'Solar en cubierta plana',
    category: 'Fotovoltaica',
    desc: 'Instalación fotovoltaica para autoconsumo en cubierta de edificio comercial.',
  },
];

// Mapa file → categoría para todas las imágenes (incluidas las featured).
// La categoría por defecto se asigna por módulo si no está en este mapa.
// Edita aquí para recategorizar manualmente.
const CATEGORY_OVERRIDES = {
  'bbf912ac-5634-4e6f-ad8d-b83fdf356274.webp': 'Mantenimiento',
  'f015c7ac-f508-4a30-bde0-3dfdb7713f23.webp': 'Fotovoltaica',
  '8217e1cb-136f-4b3c-88ca-fb7cda38d8aa.webp': 'Industrial',
  'e6948f9c-0f62-4771-bf42-8c308b96c351.webp': 'Fotovoltaica',
  '2d9c7fe9-ebf3-43e6-ae41-41f8e990bf8c.webp': 'Cuadros',
  '0c1c3c06-f1d5-4f04-91a8-1381e29dd650.webp': 'Fotovoltaica',
};

// Lista completa de archivos disponibles en /public/images/portfolio/
const ALL_FILES = [
  '0279e337-7741-4df3-9a96-b4c9ce509b6e.webp',
  '033bf65c-71aa-4c20-bdbe-ecd8b081c3c9.webp',
  '07cea9c8-e0be-4511-995a-0b5e6d68185d.webp',
  '09f34c1b-b1ed-4908-a773-241ccb1a45a2.webp',
  '0c1c3c06-f1d5-4f04-91a8-1381e29dd650.webp',
  '1602e3a4-4c93-43c2-8a96-e73be571c477.webp',
  '2d9c7fe9-ebf3-43e6-ae41-41f8e990bf8c.webp',
  '2ed7b91e-22ff-4d4a-8003-a160d574fc01.webp',
  '2f3de869-3ac3-4cc7-b957-97450f9384c9.webp',
  '3723be01-4806-4063-bd6f-3aa15fe2bedc.webp',
  '39d3c613-20a3-4f21-8b28-1d3d7be8b678.webp',
  '3cc53ea7-819a-4836-bc3e-d0f54f2e3fd7.webp',
  '3d607bf1-5437-4c5f-8752-53a0977fb5f4.webp',
  '3e110a11-4235-4d36-bc83-c53c538dcf89.webp',
  '407b4ddd-a9aa-42b4-8ced-e72e50b828ae.webp',
  '4ab395fc-306b-49f2-b757-409c54f64ad8.webp',
  '50cfd711-4c99-4440-93af-db9cce11af95.webp',
  '524fa236-a813-4957-8daa-683d7fd7ea01.webp',
  '5c5f4e5e-ee9a-437a-9b4e-25a342b29d55.webp',
  '5d69509a-9c57-4b08-8223-b7dc2a980194.webp',
  '6494be73-7934-486b-bf98-37bed5b4ce92.webp',
  '685fcf32-c501-4b69-8649-380b9630371a.webp',
  '69adf53e-ceae-45ed-88a0-8ced7a2bb8f7.webp',
  '69f9be60-dd51-45ce-9fc3-3e3be2668995.webp',
  '6a0e33c5-1ab3-434d-8ad4-f959bd982f51.webp',
  '7448d2b8-3704-4555-8421-ccaf0be40817.webp',
  '74ab40b2-918e-4793-8520-4c45ce44b65b.webp',
  '7ef23bdc-5aa7-4fcd-abbb-ca1c9bc891b1.webp',
  '8217e1cb-136f-4b3c-88ca-fb7cda38d8aa.webp',
  '8bdff42d-f1cd-4e6e-aeff-554965fb5c0f.webp',
  '8f6878c8-9c79-46a1-9f36-be87c1f0f8b9.webp',
  '91eade2c-21ef-482e-b34b-62229a342957.webp',
  '926a9428-6861-4de2-91d9-b3932929560f.webp',
  '9ad8caf2-e957-4e5d-b206-330dc821d3e9.webp',
  'a22a7691-4c20-43c6-bfa0-0b1c1e02924e.webp',
  'a2ab0819-bc0f-4d6e-bcb9-24ea2bd6e0a6.webp',
  'b572951c-3356-47ae-9b0d-e1a9f57b0c8b.webp',
  'b871f2bb-e4d7-4a42-903e-65a807e39964.webp',
  'b8eee358-1616-4add-9124-58b35f85d0b5.webp',
  'bbf912ac-5634-4e6f-ad8d-b83fdf356274.webp',
  'd615cb46-d323-4ffa-888c-a931463a6116.webp',
  'db9bc9a3-a772-4123-8556-729ae6d7676a.webp',
  'de6f9578-082c-4104-b71a-aec42f9a3778.webp',
  'e322f706-124e-401e-9b8c-34e0184d27e1.webp',
  'e6948f9c-0f62-4771-bf42-8c308b96c351.webp',
  'ed4be069-613d-4e87-96c2-7cf4795e8789.webp',
  'f015c7ac-f508-4a30-bde0-3dfdb7713f23.webp',
  'f1721ec8-97cb-4ea0-b323-04851be58c8a.webp',
  'fc27efb4-9468-4a1c-930d-64ff773b4404.webp',
  'proyecto-52.webp',
  'proyecto-53.webp',
  'proyecto-54.webp',
  'proyecto-55.webp',
  'proyecto-56.webp',
  'proyecto-57.webp',
  'proyecto-58.webp',
  'proyecto-59.webp',
  'proyecto-60.webp',
  'proyecto-61.webp',
  'proyecto-62.webp',
  'proyecto-63.webp',
  'proyecto-64.webp',
  'proyecto-65.webp',
  'proyecto-66.webp',
  'proyecto-67.webp',
  'proyecto-68.webp',
  'proyecto-69.webp',
  'proyecto-70.webp',
  'proyecto-71.webp',
  'proyecto-72.webp',
  'proyecto-73.webp',
  'proyecto-74.webp',
  'proyecto-75.webp',
  'proyecto-76.webp',
  'proyecto-77.webp',
  'proyecto-78.webp',
  'proyecto-79.webp',
  'proyecto-80.webp',
  'proyecto-81.webp',
  'proyecto-82.webp',
  'proyecto-83.webp',
  'proyecto-84.webp',
  'proyecto-87.webp',
  'proyecto-88.webp',
  'proyecto-89.webp',
  'proyecto-91.webp',
  'proyecto-92.webp',
  'proyecto-94.webp',
  'proyecto-95.webp',
  'proyecto-96.webp',
  'proyecto-99.webp',
  'proyecto-106.webp',
];

// Lista completa con categorías asignadas
export const ALL_PROJECTS = ALL_FILES.map((file, i) => ({
  id: i,
  file,
  src: `/images/portfolio/${file}`,
  category: CATEGORY_OVERRIDES[file] || PORTFOLIO_CATEGORIES[i % PORTFOLIO_CATEGORIES.length],
}));

// Featured con src completo para componentes
export const FEATURED_PROJECTS = FEATURED.map((p) => ({
  ...p,
  src: `/images/portfolio/${p.file}`,
}));
