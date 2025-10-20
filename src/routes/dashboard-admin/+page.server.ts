// src/routes/dashboard-admin/+page.server.ts
import { query } from '$lib/server/db';
import type { PageServerLoad } from './$types';

interface Department {
  id: number;
  name: string;
  activeTickets: number;
}

interface Ticket {
   id: number;
   priority: string;
   title: string;
   department: string;
   status: string;
}

export const load: PageServerLoad = async () => {
  try {
    // Query para obtener departamentos con el conteo de tickets
    const departments = await query<Department[]>(`
      SELECT 
        d.id,
        d.name,
        COUNT(t.id) as activeTickets
      FROM department d
      LEFT JOIN tickets t ON d.name = t.department AND t.status = 'pending'
      GROUP BY d.id, d.name
      ORDER BY activeTickets DESC, d.name ASC   
    `);

    const tickets = await query<Ticket[]>(`
      SELECT 
        id,
        priority,
        title,
        department,
        status
      FROM tickets
        ORDER BY FIELD(priority, 'High', 'Medium', 'Low'), id DESC

    `);

    return {
      departments, tickets
    };

    
  } catch (error) {
    console.error('Error al cargar departamentos:', error);
    return {
      departments: [],
      tickets: []
    };
  }

  

};