// src/routes/dashboard-admin/+page.server.ts
import { query } from '$lib/server/db';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

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

async function generateTicketPDF(ticket: Ticket): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 size
  
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  const { width, height } = page.getSize();
  const margin = 50;
  let yPosition = height - margin;

  page.drawRectangle({
    x: 0,
    y: height - 80,
    width: width,
    height: 80,
    color: rgb(0.15, 0.25, 0.35),
  });

  page.drawText('CLOSED TICKED', {
    x: margin,
    y: height - 50,
    size: 24,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  yPosition = height - 120;

  page.drawText('ID:', {
    x: margin,
    y: yPosition,
    size: 14,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });
  page.drawText(`#${ticket.id}`, {
    x: margin + 30,
    y: yPosition,
    size: 14,
    font: font,
    color: rgb(0.3, 0.3, 0.3),
  });

  yPosition -= 30;

  page.drawText('Title:', {
    x: margin,
    y: yPosition,
    size: 14,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });
  
  yPosition -= 20;
  page.drawText(ticket.title, {
    x: margin,
    y: yPosition,
    size: 12,
    font: font,
    color: rgb(0.3, 0.3, 0.3),
    maxWidth: width - (margin * 2),
  });

  yPosition -= 40;

  page.drawText('Department:', {
    x: margin,
    y: yPosition,
    size: 14,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });
  page.drawText(ticket.department, {
    x: margin + 120,
    y: yPosition,
    size: 12,
    font: font,
    color: rgb(0.3, 0.3, 0.3),
  });

  yPosition -= 30;

  page.drawText('Priority:', {
    x: margin,
    y: yPosition,
    size: 14,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });
  
  const priorityColor = ticket.priority === 'High' 
    ? rgb(0.9, 0.2, 0.2) 
    : ticket.priority === 'Medium' 
    ? rgb(0.9, 0.6, 0.1) 
    : rgb(0.2, 0.7, 0.2);
  
  page.drawText(ticket.priority, {
    x: margin + 120,
    y: yPosition,
    size: 12,
    font: fontBold,
    color: priorityColor,
  });

  yPosition -= 40;

  page.drawText('Description:', {
    x: margin,
    y: yPosition,
    size: 14,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });

  yPosition -= 25;

  const boxHeight = 200;
  page.drawRectangle({
    x: margin,
    y: yPosition - boxHeight,
    width: width - (margin * 2),
    height: boxHeight,
    borderColor: rgb(0.8, 0.8, 0.8),
    borderWidth: 1,
  });

  const maxWidth = width - (margin * 2) - 20;
  const words = ticket.description.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  words.forEach(word => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const textWidth = font.widthOfTextAtSize(testLine, 11);
    
    if (textWidth > maxWidth) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });
  if (currentLine) lines.push(currentLine);

  let descY = yPosition - 20;
  lines.slice(0, 12).forEach(line => { 
    page.drawText(line, {
      x: margin + 10,
      y: descY,
      size: 11,
      font: font,
      color: rgb(0.3, 0.3, 0.3),
    });
    descY -= 15;
  });

  const footerY = 60;
  page.drawRectangle({
    x: 0,
    y: 0,
    width: width,
    height: footerY + 20,
    color: rgb(0.95, 0.95, 0.95),
  });

  page.drawText('This is a copy of the closed ticket. For more information', {
    x: margin,
    y: footerY,
    size: 9,
    font: font,
    color: rgb(0.4, 0.4, 0.4),
  });

  page.drawText('consult the Sended platform installed on the network.', {
    x: margin,
    y: footerY - 15,
    size: 9,
    font: font,
    color: rgb(0.4, 0.4, 0.4),
  });

  const currentDate = new Date().toLocaleString('en-EN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  page.drawText(`Generated: ${currentDate}`, {
    x: width - margin - 150,
    y: footerY - 15,
    size: 8,
    font: font,
    color: rgb(0.5, 0.5, 0.5),
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

export const actions: Actions = {
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
      // Obtener los datos del ticket antes de cerrarlo
      const ticketData = await query<Ticket[]>(
        'SELECT id, priority, title, department, status, description FROM tickets WHERE id = ?',
        [ticketId]
      );

      if (!ticketData || ticketData.length === 0) {
        return fail(404, { error: 'Ticket no encontrado' });
      }

      const ticket = ticketData[0];

      // Cerrar el ticket
      await query('UPDATE tickets SET status = ? WHERE id = ?', ['Solved', ticketId]);

      // Generar el PDF
      const pdfBytes = await generateTicketPDF(ticket);

      // Retornar el PDF como base64 para descargarlo en el cliente
      return { 
        success: true, 
        message: 'Ticket cerrado exitosamente',
        pdfData: Buffer.from(pdfBytes).toString('base64'),
        ticketId: ticket.id
      };
    } catch (error) {
      console.error('Error al cerrar ticket:', error);
      return fail(500, { error: 'Error al cerrar el ticket' });
    }
  },
};