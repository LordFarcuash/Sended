import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { ADMIN_USERNAME, ADMIN_PASS } from '$env/static/private';
import { query } from '$lib/server/db';
import bcrypt from 'bcryptjs';

export async function POST({ request, cookies }: RequestEvent) {
	const { username, password } = await request.json();

	if (!username || !password) {
		return json({ success: false, message: 'Missing credentials' }, { status: 400 });
	}

	// Admin check (env-based)
	if (username === ADMIN_USERNAME && password === ADMIN_PASS) {
		cookies.set(
			'session',
			JSON.stringify({ username, role: 'admin' }),
			{
				path: '/',
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 // 24 horas
			}
		);

		return json({ success: true, role: 'admin' });
	}

	// Lookup department user by username
	try {
		const rows = await query<any[]>(
			'SELECT id, name, username, password FROM department WHERE username = ? LIMIT 1',
			[username]
		);

		if (!rows || (rows as any[]).length === 0) {
			return json({ success: false, message: 'Invalid credentials' }, { status: 401 });
		}

		const user = (rows as any[])[0];

		if (!user.password) {
			// No password set for this department account
			return json({ success: false, message: 'Invalid credentials' }, { status: 401 });
		}

		const match = await bcrypt.compare(password, user.password);

		if (!match) {
			return json({ success: false, message: 'Invalid credentials' }, { status: 401 });
		}

		// Success: create session cookie for department user
		cookies.set(
			'session',
			JSON.stringify({ username: user.username, role: 'user', department: user.name }),
			{
				path: '/',
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 // 24 horas
			}
		);

		return json({ success: true, role: 'user' });
	} catch (error) {
		console.error('Error during login:', error);
		return json({ success: false, message: 'Server error' }, { status: 500 });
	}
}