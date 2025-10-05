const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Validate required environment variables
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ Error: GEMINI_API_KEY environment variable is required");
  console.error("Please create a .env file in the server directory with:");
  console.error("GEMINI_API_KEY=your_api_key_here");
  process.exit(1);
}

// Initialize Google AI
let ai;
try {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
} catch (error) {
  console.error("❌ Error initializing Google AI:", error.message);
  process.exit(1);
}

// Load prompts from prompts.md
const promptsPath = path.join(__dirname, "..", "prompts.md");
let promptsContent;
try {
  if (!fs.existsSync(promptsPath)) {
    throw new Error(`Prompts file not found at ${promptsPath}`);
  }
  promptsContent = fs.readFileSync(promptsPath, "utf-8");
} catch (error) {
  console.error("❌ Error loading prompts file:", error.message);
  process.exit(1);
}

// Parse prompts from markdown
const parsePrompts = (content) => {
  const prompts = {};
  const sections = content.split(/^## /m).filter((s) => s.trim());

  sections.forEach((section) => {
    const lines = section.split("\n");
    const key = lines[0].trim();
    const prompt = lines.slice(1).join("\n").trim();

    if (key && prompt) {
      prompts[key] = prompt;
    }
  });

  return prompts;
};

const stylePrompts = parsePrompts(promptsContent);

// Middleware
app.use(cors());
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "upload-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only JPEG and PNG images are allowed"));
    }
  },
});

// Serve uploaded files statically
app.use("/uploads", express.static(uploadsDir));

// Routes

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Upload endpoint
app.post("/api/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    res.json({
      success: true,
      fileId: req.file.filename,
      filePath: `/uploads/${req.file.filename}`,
      message: "File uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate headshot endpoint
app.post("/api/generate", async (req, res) => {
  try {
    const { fileId, style } = req.body;

    if (!fileId || !style) {
      return res.status(400).json({ error: "Missing fileId or style" });
    }

    // Get the style prompt
    const prompt = stylePrompts[style];
    if (!prompt) {
      return res.status(400).json({ error: "Invalid style" });
    }

    // Read the uploaded image
    const imagePath = path.join(uploadsDir, fileId);
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: "Image not found" });
    }

    const imageData = fs.readFileSync(imagePath);
    const base64Image = imageData.toString("base64");

    // Determine MIME type
    const ext = path.extname(fileId).toLowerCase();
    const mimeType = ext === ".png" ? "image/png" : "image/jpeg";

    // Create the prompt for Gemini
    const geminiPrompt = [
      { text: prompt },
      {
        inlineData: {
          mimeType: mimeType,
          data: base64Image,
        },
      },
    ];

    console.log(`Generating ${style} headshot for ${fileId}...`);

    // Call Gemini API
    let response;
    try {
      response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image-preview",
        contents: geminiPrompt,
      });
    } catch (apiError) {
      console.error("Gemini API Error:", apiError);
      throw apiError;
    }

    console.log("Gemini prompt sent successfully");

    // Extract and save the generated image
    let generatedImagePath = null;

    if (
      !response.candidates ||
      !response.candidates[0] ||
      !response.candidates[0].content
    ) {
      throw new Error("Invalid response from Gemini API");
    }

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const generatedImageData = part.inlineData.data;
        const buffer = Buffer.from(generatedImageData, "base64");

        // Save generated image
        const generatedFileName = `generated-${Date.now()}-${style}.png`;
        generatedImagePath = path.join(uploadsDir, generatedFileName);

        try {
          fs.writeFileSync(generatedImagePath, buffer);
          console.log(`Generated image saved: ${generatedFileName}`);

          res.json({
            success: true,
            originalPath: `/uploads/${fileId}`,
            generatedPath: `/uploads/${generatedFileName}`,
            style: style,
          });
          return;
        } catch (writeError) {
          console.error("Error saving generated image:", writeError);
          throw new Error("Failed to save generated image");
        }
      }
    }

    // If no image was generated
    res.status(500).json({ error: "No image generated by AI" });
  } catch (error) {
    console.error("Generation error:", error);

    // Handle quota exceeded errors
    if (error.status === 429) {
      return res.status(429).json({
        error:
          "API quota exceeded. Please try again later or upgrade your API plan.",
        details:
          "The free tier limit has been reached. Please wait a minute and try again.",
      });
    }

    // Handle other API errors
    res.status(500).json({
      error: error.message || "Failed to generate headshot",
      details:
        "An error occurred while processing your image. Please try again.",
    });
  }
});

// Download endpoint
app.get("/api/download/:imageId", (req, res) => {
  try {
    const imagePath = path.join(uploadsDir, req.params.imageId);

    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.download(imagePath);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }
  res.status(500).json({ error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
