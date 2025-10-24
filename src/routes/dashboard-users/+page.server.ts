// src/routes/dashboard-admin/+page.server.ts
import { query } from '$lib/server/db';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import bcrypt from 'bcryptjs';

interface Department {
  id: number;
  name: string;
  activeTickets: number;
  username?: string;
  password?: string;
}

interface Ticket {
   id: number;
   priority: string;
   title: string;
   department: string;
   status: string;
   description: string;
}

export const load: PageServerLoad = async ({ parent }) => {
  try {

    const departments = await query<Department[]>(`
          SELECT 
            d.id,
            d.name,
            COUNT(t.id) as activeTickets,
            d.username,
            d.password
          FROM department d
          LEFT JOIN tickets t ON d.name = t.department AND t.status = 'pending'
          GROUP BY d.id, d.name
          ORDER BY activeTickets DESC, d.name ASC   
        `);
    const parentData = await parent();
    const session = parentData?.session as { role?: string; department?: string } | undefined;
    const department = session?.department;

    let tickets: Ticket[] = [];

    if (!department || session?.role === 'admin') {
      tickets = await query<Ticket[]>(`
        SELECT 
          id,
          priority,
          title,
          department,
          status,
          description
        FROM tickets
        ORDER BY FIELD(status, 'Pending', 'Solved'), FIELD(priority, 'High', 'Medium', 'Low'), id DESC
      `);
    } else {
      tickets = await query<Ticket[]>(
        `SELECT id, priority, title, department, status, description FROM tickets WHERE department = ? ORDER BY FIELD(status, 'Pending', 'Solved'), FIELD(priority, 'High', 'Medium', 'Low'), id DESC`,
        [department]
      );
    }

    return {
      tickets, 
      departments,
      currentDepartment: department || 'All Departments'
    };
  } catch (error) {
    console.error('Error al cargar datos:', error);
    return {
      departments: [],
      tickets: [],
      currentDepartment: 'All Departments'
    };
  }
};


export const actions: Actions = {

  createDepartment: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    // Validaciones

    if (!name || name.trim().length === 0) {
      return fail(400, { error: 'El nombre del departamento es requerido' });
    }

    let hashedPassword = null;
    if (password && password.trim().length > 0) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password.trim(), saltRounds);
    }

    try {
      await query(
        'INSERT INTO department (name, username, password) VALUES (?, ?, ?)',
        [name.trim(), username || null, hashedPassword || null]
      );

      return { success: true, message: 'Departamento creado exitosamente' };
    } catch (error) {
      console.error('Error al crear departamento:', error);
      return fail(500, { error: 'Error al crear el departamento' });
    }
  },

  deleteDepartment: async ({ request }) => {
    const formData = await request.formData();
    const departmentId = formData.get('departmentId') as string;
    if (!departmentId) {
      return fail(400, { error: 'ID de departamento inválido' });
    }
    try {
      await query('DELETE FROM department WHERE id = ?', [departmentId]);
      return { success: true, message: 'Departamento eliminado exitosamente' }
    } catch (error) {
      console.error('Error al eliminar departamento:', error);
      return fail(500, { error: 'Error al eliminar el departamento' });
    }
  },

  // Tickets CRUD //

  createTicket: async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const department = formData.get('department') as string;
    const description = formData.get('description') as string;
    const priority = formData.get('priority') as string;

    // Validaciones

    if (!title || title.trim().length === 0) {
      return fail(400, { error: 'El título del ticket es requerido' });
    }
    if (!department || department.trim().length === 0) {
      return fail(400, { error: 'El departamento es requerido' });
    }
    if (!priority || priority.trim().length === 0) {
      return fail(400, { error: 'La prioridad es requerida' });
    }
    if (!description || description.trim().length === 0) {  
      return fail(400, { error: 'La descripción es requerida' });
    }
    try {
      await query(
        'INSERT INTO tickets (title, department, description, priority, status) VALUES (?, ?, ?, ?, ?)',
        [title.trim(), department.trim(), description.trim(), priority.trim(), 'Pending']
      );

      return { success: true, message: 'Ticket creado exitosamente' };
    } catch (error) {
      console.error('Error al crear ticket:', error);
      return fail(500, { error: 'Error al crear el ticket' });
    }
  },

  closeTicket: async ({ request }) => {
    const formData = await request.formData();
    const ticketId = formData.get('TicketId') as string;
    if (!ticketId) {
      return fail(400, { error: 'ID de ticket inválido' });
    }
    try {
      await query('UPDATE tickets SET status = ? WHERE id = ?', ['Solved', ticketId]);
      return { success: true, message: 'Ticket cerrado exitosamente' }
    } catch (error) {
      console.error('Error al cerrar ticket:', error);
      return fail(500, { error: 'Error al cerrar el ticket' });
    }
  },
};