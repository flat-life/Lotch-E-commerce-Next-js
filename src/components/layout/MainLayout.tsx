'use client';

import { useState } from 'react';
import ClientLayout from '@/components/layout/ClientLayout';

export default function MainLayout({ siteSettings, children }: {
	siteSettings: any;
	children: React.ReactNode
}) {
	const [language, setLanguage] = useState('en');

	return (
		<ClientLayout
			siteSettings={siteSettings}
			language={language}
			setLanguage={setLanguage}
		>
			{children}
		</ClientLayout>
	);
}
