import express from "express";

export const startHttpServer = (port: number): void => {
	const app = express();
    app.listen(3000);
    
    app.get("/health", (_req, res) => {
        res.status(200).send("success.");
    });

    app.listen(port, () => {
        console.log(`HTTP sever listening on port ${port}`);
    })
};
