import express from "express";
import compression from "compression";
import helmet from "helmet";

const app = express();
const PORT = process.env.DEV_PORT || 3000;

// base middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());

// static files
app.use(
    express.static("public", {
        maxAge: "30d",
        etag: true,
        lastModified: true,
    })
);

// SPA fallback (if frontend routing is needed)
// for pure static — can be removed
import { readFileSync } from "fs";
import { existsSync } from "fs";
app.get("*", (req, res, next) => {
    const path = "public/index.html";
    if (existsSync(path)) {
        res.type("html").send(readFileSync(path, "utf8"));
    } else {
        next();
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
