import { json } from '@sveltejs/kit';
import { ADMIN_USERNAME, ADMIN_PASS } from '$env/static/private';


export async function POST({ request, cookies }) {
	const { username, password } = await request.json();

	if (username === ADMIN_USERNAME && password === ADMIN_PASS) {
		// Crear una cookie de sesión segura
		cookies.set('session', JSON.stringify({ 
			username, 
			role: 'admin' 
		}), {
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 // 24 horas
		});

		return json({ success: true, role: 'admin' });
	}

	// Aquí podrías añadir lógica para otros usuarios en el futuro
	// Por ahora, cualquier otro usuario sería 'user'
	return json({ success: false, message: 'Invalid credentials' }, { status: 401 });
}