import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const session = cookies.get('session');
	
	if (!session) {
		throw redirect(302, '/');
	}

	try {
		const sessionData = JSON.parse(session);
		
		if (sessionData.role !== 'admin') {
			throw redirect(302, '/');
		}

		return {
			user: sessionData
		};
	} catch {
		throw redirect(302, '/');
	}
};