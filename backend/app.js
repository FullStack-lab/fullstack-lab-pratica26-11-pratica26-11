const express = require("express");
const app = express();
const cors = require("cors");
// Importações de rotas
const productRoutes = require("./routes/productRoutes");

// Middlewares de configuração
app.use(cors());
app.use(express.json());

// Rotas do serviço
app.use("/", productRoutes);

app.listen(3031, () => {
    console.log(`Servidor rodando na porta: http://localhost:3031`);
});