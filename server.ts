import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("talentmatch.db");

// Initialize database with schema based on the provided image
db.exec(`
  CREATE TABLE IF NOT EXISTS areas_trabajo (
    id TEXT PRIMARY KEY,
    nombre TEXT NOT NULL,
    slug TEXT
  );

  CREATE TABLE IF NOT EXISTS empresas (
    id TEXT PRIMARY KEY,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    url_web TEXT,
    foto_url TEXT
  );

  CREATE TABLE IF NOT EXISTS vacantes (
    id TEXT PRIMARY KEY,
    empresa_id TEXT,
    area_trabajo_id TEXT,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    requisitos TEXT, -- JSON string of requirements
    nivel_educativo TEXT,
    tipo_vacante TEXT,
    salario TEXT,
    ubicacion TEXT,
    FOREIGN KEY (empresa_id) REFERENCES empresas(id),
    FOREIGN KEY (area_trabajo_id) REFERENCES areas_trabajo(id)
  );

  CREATE TABLE IF NOT EXISTS personas (
    id TEXT PRIMARY KEY,
    nombre TEXT NOT NULL,
    apellidos TEXT NOT NULL,
    foto_url TEXT,
    sobre_mi TEXT,
    habilidades TEXT -- JSON string of skills
  );

  CREATE TABLE IF NOT EXISTS postulaciones (
    id TEXT PRIMARY KEY,
    aspirante_id TEXT,
    vacante_id TEXT,
    estado TEXT DEFAULT 'pendiente',
    match_score REAL,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vacante_id) REFERENCES vacantes(id)
  );
`);

// Seed some data if empty
const areasCount = db.prepare("SELECT count(*) as count FROM areas_trabajo").get() as { count: number };
if (areasCount.count === 0) {
  const insertArea = db.prepare("INSERT INTO areas_trabajo (id, nombre, slug) VALUES (?, ?, ?)");
  insertArea.run("1", "Tecnología", "tecnologia");
  insertArea.run("2", "Diseño", "diseno");
  insertArea.run("3", "Marketing", "marketing");

  const insertEmpresa = db.prepare("INSERT INTO empresas (id, nombre, descripcion, foto_url) VALUES (?, ?, ?, ?)");
  insertEmpresa.run("e1", "TechNova", "Innovación en software y IA", "https://picsum.photos/seed/technova/400/300");
  insertEmpresa.run("e2", "CreativeFlow", "Agencia de diseño digital de vanguardia", "https://picsum.photos/seed/creative/400/300");
  insertEmpresa.run("e3", "GlobalMarket", "Líderes en marketing digital", "https://picsum.photos/seed/market/400/300");

  const insertVacante = db.prepare("INSERT INTO vacantes (id, empresa_id, area_trabajo_id, titulo, descripcion, requisitos, nivel_educativo, tipo_vacante, salario, ubicacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
  insertVacante.run("v1", "e1", "1", "Fullstack Developer", "Buscamos experto en React y Node.js para proyectos escalables.", JSON.stringify(["React", "Node.js", "TypeScript", "SQL"]), "Grado", "Remoto", "$3000 - $5000", "Madrid, España");
  insertVacante.run("v2", "e1", "1", "AI Engineer", "Especialista en modelos LLM y procesamiento de lenguaje natural.", JSON.stringify(["Python", "PyTorch", "NLP", "Machine Learning"]), "Maestría", "Híbrido", "$4000 - $7000", "Remoto");
  insertVacante.run("v3", "e2", "2", "UX/UI Designer", "Diseño de interfaces modernas y centradas en el usuario.", JSON.stringify(["Figma", "Adobe XD", "User Research", "Prototyping"]), "Grado", "Presencial", "$2500 - $4000", "Barcelona, España");
  insertVacante.run("v4", "e3", "3", "Growth Hacker", "Estratega de crecimiento digital con enfoque en datos.", JSON.stringify(["SEO", "SEM", "Analytics", "Copywriting"]), "Grado", "Remoto", "$3000 - $4500", "Remoto");
  insertVacante.run("v5", "e1", "1", "Backend Developer", "Especialista en arquitecturas de microservicios.", JSON.stringify(["Node.js", "Docker", "Kubernetes", "Go"]), "Grado", "Remoto", "$3500 - $5500", "Valencia, España");
}

// Helper to call Python matching script
function getMatchScore(userSkills: string[], jobRequirements: string[]): Promise<any> {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python3", ["match.py"]);
    let dataString = "";

    pythonProcess.stdout.on("data", (data) => {
      dataString += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Python Error: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        reject("Python process failed");
      } else {
        try {
          resolve(JSON.parse(dataString));
        } catch (e) {
          reject("Failed to parse Python output");
        }
      }
    });

    pythonProcess.stdin.write(JSON.stringify({ user_skills: userSkills, job_requirements: jobRequirements }));
    pythonProcess.stdin.end();
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/vacantes", (req, res) => {
    const vacantes = db.prepare(`
      SELECT v.*, e.nombre as empresa_nombre, e.foto_url as empresa_logo, a.nombre as area_nombre
      FROM vacantes v
      JOIN empresas e ON v.empresa_id = e.id
      JOIN areas_trabajo a ON v.area_trabajo_id = a.id
    `).all();
    
    // Parse requirements JSON
    const parsedVacantes = vacantes.map((v: any) => ({
      ...v,
      requisitos: JSON.parse(v.requisitos || "[]")
    }));
    
    res.json(parsedVacantes);
  });

  app.post("/api/postular", async (req, res) => {
    const { vacante_id, aspirante_id, user_skills } = req.body;
    
    // Get job requirements
    const job = db.prepare("SELECT requisitos FROM vacantes WHERE id = ?").get(vacante_id) as any;
    const jobRequirements = JSON.parse(job.requisitos || "[]");
    
    // Call Python for match score
    let matchResult = { score: 0 };
    try {
      matchResult = await getMatchScore(user_skills || [], jobRequirements);
    } catch (err) {
      console.error("Match score calculation failed", err);
    }

    const id = Math.random().toString(36).substr(2, 9);
    try {
      db.prepare("INSERT INTO postulaciones (id, aspirante_id, vacante_id, match_score) VALUES (?, ?, ?, ?)").run(id, aspirante_id, vacante_id, matchResult.score);
      res.json({ success: true, id, match: matchResult });
    } catch (error) {
      res.status(500).json({ error: "Error al postular" });
    }
  });

  app.get("/api/postulaciones", (req, res) => {
    const postulaciones = db.prepare(`
      SELECT p.*, v.titulo, e.nombre as empresa_nombre
      FROM postulaciones p
      JOIN vacantes v ON p.vacante_id = v.id
      JOIN empresas e ON v.empresa_id = e.id
      ORDER BY p.creado_en DESC
    `).all();
    res.json(postulaciones);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
