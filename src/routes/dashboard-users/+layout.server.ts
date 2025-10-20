import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies }) => {
    const session = cookies.get('session');

    if (!session) {
        // Not authenticated
        throw redirect(303, '/');
    }

    try {
        const parsed = JSON.parse(session);

        // Only allow users with role 'user' (departments) or 'admin' if desired
        if (!parsed || (!parsed.role || (parsed.role !== 'user' && parsed.role !== 'admin'))) {
            throw redirect(303, '/');
        }

        return {
            session: parsed
        };
    } catch (e) {
        // Malformed cookie -> clear and redirect
        cookies.delete('session', { path: '/' });
        throw redirect(303, '/');
    }
};
