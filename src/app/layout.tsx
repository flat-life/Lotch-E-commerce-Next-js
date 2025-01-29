import { ReactNode } from 'react';
import MainLayout from '@/components/layout/MainLayout';

async function getSiteSettings() {
  const res = await fetch(`http://localhost:8002/api-v1/site-settings/`);
  if (!res.ok) throw new Error('Failed to fetch settings');
  return res.json();
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>TB_TG Shop</title>
        <meta name="description" content="Y.A.A" />
        <meta name="author" content="FLATLIFE" />
        <link rel="stylesheet" href="/css/linearicons.css" />
        <link rel="stylesheet" href="/css/owl.carousel.css" />
        <link rel="stylesheet" href="/css/themify-icons.css" />
        <link rel="stylesheet" href="/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/css/nice-select.css" />
        <link rel="stylesheet" href="/css/nouislider.min.css" />
        <link rel="stylesheet" href="/css/bootstrap.css" />
        <link rel="stylesheet" href="/css/main.css" />
      </head>

      <body>
        <MainLayout siteSettings={siteSettings[0]}>

          {children}

        </MainLayout>
      </body>
    </html>
  );
}
