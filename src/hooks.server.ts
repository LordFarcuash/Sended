// src/hooks.server.ts
import { setupDatabase } from '$lib/server/setup';
import type { Handle } from '@sveltejs/kit';

let dbInitialized = false;
let initializationPromise: Promise<void> | null = null;

export const handle: Handle = async ({ event, resolve }) => {
  // Inicializar DB solo una vez al arrancar el servidor
  if (!dbInitialized && !initializationPromise) {
    initializationPromise = (async () => {
      try {
        await setupDatabase();
        dbInitialized = true;
      } catch (error) {
        console.error('⚠️  No se pudo inicializar la base de datos.');
        console.error('   Verifica tus credenciales en el archivo .env\n');
        // No lanzamos el error para que la app pueda arrancar
        // pero las rutas que necesiten DB fallarán con errores claros
      } finally {
        initializationPromise = null;
      }
    })();
  }

  // Esperar a que termine la inicialización si está en proceso
  if (initializationPromise) {
    await initializationPromise;
  }

  // Continuar con el request normal
  const response = await resolve(event);
  return response;
};