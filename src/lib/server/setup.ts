// src/lib/server/setup.ts
import mysql from 'mysql2/promise';
import {
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATABASE_PORT
} from '$env/static/private';

interface DbConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export async function setupDatabase() {
  const config: DbConfig = {
    host: DATABASE_HOST,
    port: Number(DATABASE_PORT) || 3306,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME
  };

  // Conexión sin especificar la base de datos para poder crearla
  const connection = await mysql.createConnection({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password
  });

  try {
    console.log('🔧 Iniciando configuración de base de datos...');

    // 1. Crear la base de datos si no existe
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\``);
    console.log(`✓ Base de datos '${config.database}' verificada/creada`);

    // 2. Usar la base de datos
    await connection.query(`USE \`${config.database}\``);

    // 3. Crear tabla department
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`department\` (
        \`id\` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        \`name\` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_uca1400_ai_ci',
        \`username\` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_uca1400_ai_ci',
        \`password\` VARCHAR(200) NOT NULL COLLATE 'utf8mb4_uca1400_ai_ci',
        PRIMARY KEY (\`id\`) USING BTREE,
        INDEX \`name\` (\`name\`) USING BTREE
      )
      COLLATE='utf8mb4_uca1400_ai_ci'
      ENGINE=InnoDB
      AUTO_INCREMENT=1
    `);
    console.log('✓ Tabla department verificada/creada');

    // 4. Crear tabla tickets
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`tickets\` (
        \`id\` INT(11) NOT NULL AUTO_INCREMENT,
        \`title\` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_uca1400_ai_ci',
        \`department\` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_uca1400_ai_ci',
        \`description\` VARCHAR(9999) NOT NULL COLLATE 'utf8mb4_uca1400_ai_ci',
        \`priority\` VARCHAR(10) NOT NULL COLLATE 'utf8mb4_uca1400_ai_ci',
        \`status\` VARCHAR(20) NOT NULL DEFAULT 'Pending' COLLATE 'utf8mb4_uca1400_ai_ci',
        PRIMARY KEY (\`id\`) USING BTREE,
        INDEX \`FK_Departments\` (\`department\`) USING BTREE,
        CONSTRAINT \`FK_Departments\` FOREIGN KEY (\`department\`) REFERENCES \`department\` (\`name\`) ON UPDATE NO ACTION ON DELETE CASCADE
      )
      COLLATE='utf8mb4_uca1400_ai_ci'
      ENGINE=InnoDB
      AUTO_INCREMENT=1
    `);
    console.log('✓ Tabla tickets verificada/creada');

    console.log('🎉 Base de datos configurada correctamente\n');
  } catch (error) {
    console.error('❌ Error configurando la base de datos:', error);
    if (error instanceof Error) {
      console.error('Detalles:', error.message);
    }
    throw error;
  } finally {
    await connection.end();
  }
}