import fs from "fs";
import path from "path";

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  author: string;
  authorBio: string;
}

// Función para calcular automáticamente el tiempo de lectura
function calculateReadTime(content: string): string {
  // Limpiar el contenido markdown de elementos que no son texto legible
  const cleanContent = content
    // Remover headers markdown (# ## ###)
    .replace(/^#{1,6}\s+.*/gm, '')
    // Remover links markdown [text](url)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remover imágenes ![alt](url)
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    // Remover código inline `code`
    .replace(/`[^`]+`/g, '')
    // Remover bloques de código ```code```
    .replace(/```[\s\S]*?```/g, '')
    // Remover HTML tags si los hay
    .replace(/<[^>]*>/g, '')
    // Remover líneas vacías múltiples
    .replace(/\n\s*\n/g, '\n')
    .trim();

  // Contar palabras (dividiendo por espacios y saltos de línea)
  const words = cleanContent.split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;

  // Velocidad de lectura promedio: 200 palabras por minuto
  const wordsPerMinute = 200;
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  // Mínimo 1 minuto
  const finalMinutes = Math.max(1, minutes);

  return `${finalMinutes} min read`;
}

// Función para parsear frontmatter personalizado
function parseFrontmatter(content: string): {
  frontmatter: Record<string, string | string[] | boolean>;
  markdown: string;
} {
  const lines = content.split("\n");
  const frontmatter: Record<string, string | string[] | boolean> = {};
  let inFrontmatter = false;
  let frontmatterEndIndex = -1;

  // Buscar el delimitador de frontmatter (---)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === "---") {
      if (!inFrontmatter) {
        inFrontmatter = true;
      } else {
        frontmatterEndIndex = i;
        break;
      }
    } else if (inFrontmatter) {
      // Parsear línea de frontmatter (key: value)
      const colonIndex = line.indexOf(":");
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        let value: string | string[] | boolean = line
          .substring(colonIndex + 1)
          .trim();

        // Remover comillas si existen
        if (
          typeof value === "string" &&
          ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'")))
        ) {
          value = value.slice(1, -1);
        }

        // Parsear arrays (tags: ["tag1", "tag2"])
        if (
          typeof value === "string" &&
          value.startsWith("[") &&
          value.endsWith("]")
        ) {
          try {
            value = JSON.parse(value);
          } catch {
            // Si falla el parseo, mantener como string
          }
        }

        // Parsear booleanos
        if (value === "true") value = true;
        if (value === "false") value = false;

        frontmatter[key] = value;
      }
    }
  }

  // Extraer el contenido markdown (después del frontmatter)
  const markdown =
    frontmatterEndIndex >= 0
      ? lines
          .slice(frontmatterEndIndex + 1)
          .join("\n")
          .trim()
      : content;

  return { frontmatter, markdown };
}

// Función para obtener todos los posts del blog
export function getBlogPosts(): BlogPost[] {
  const contentDir = path.join(process.cwd(), "content", "blog");

  try {
    const files = fs.readdirSync(contentDir);
    const posts: BlogPost[] = [];

    files.forEach((file, index) => {
      if (file.endsWith(".md")) {
        const filePath = path.join(contentDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { frontmatter, markdown } = parseFrontmatter(fileContent);

        // Extraer slug del nombre del archivo (sin extensión .md)
        const slug = file.replace(".md", "");

        // Calcular tiempo de lectura automáticamente si no está especificado
        const readTime = typeof frontmatter.readTime === "string"
          ? frontmatter.readTime
          : calculateReadTime(markdown);

        posts.push({
          id: index + 1,
          slug,
          title:
            typeof frontmatter.title === "string"
              ? frontmatter.title
              : "Untitled",
          excerpt:
            typeof frontmatter.excerpt === "string" ? frontmatter.excerpt : "",
          content: markdown,
          date:
            typeof frontmatter.date === "string"
              ? frontmatter.date
              : new Date().toISOString().split("T")[0],
          readTime,
          tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
          featured:
            typeof frontmatter.featured === "boolean"
              ? frontmatter.featured
              : false,
          author:
            typeof frontmatter.author === "string"
              ? frontmatter.author
              : "Anonymous",
          authorBio:
            typeof frontmatter.authorBio === "string"
              ? frontmatter.authorBio
              : "",
        });
      }
    });

    // Ordenar por fecha (más reciente primero)
    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

// Función para obtener un post específico por slug
export function getBlogPost(slug: string): BlogPost | null {
  const posts = getBlogPosts();
  return posts.find((post) => post.slug === slug) || null;
}
