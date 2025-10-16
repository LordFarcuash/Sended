import { json } from '@sveltejs/kit';
import { ADMIN_USERNAME, ADMIN_PASS } from '$env/static/private';

export async function POST({ request }) {
	const { username, password } = await request.json();

	if (username === ADMIN_USERNAME && password === ADMIN_PASS) {
		// Podrías devolver un token, cookie o estado de sesión
		return json({ success: true });
	}

	return json({ success: false, message: 'Invalid credentials' }, { status: 401 });
}
