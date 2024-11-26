### Arquitetura do Projeto

- Frontend: React.js com Vite para inicialização rápida.
- Backend: Node.js com Express.
- Banco de Dados: SQLite (armazenamento local simples e eficiente).
- Design: Responsivo, usando CSS/SCSS ou frameworks como Tailwind CSS.
- Controle de versão: Git e GitHub para colaboração.
- Ferramentas adicionais: Figma para design, Postman para testes de API.

### Estrutura do Repositório
```prompt
comercio/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   ├── database.sqlite
│   └── package.json
├── README.md
├── .gitignore
└── .env
```

### Desenvolvimento do Backend

Objetivo: Criar a API para gerenciar produtos, serviços e contatos.

#### Inicializar o Projeto

Criar o projeto do backend:

```
mkdir backend
cd backend
npm init -y
npm install express sqlite3 cors dotenv
npm install --save-dev nodemon
```

Adicionar scripts no package.json:

```json
Copiar código
"scripts": {
  "start": "node src/app.js",
  "dev": "nodemon src/app.js"
}
```

Passo 2: Configurar o Servidor
Criar o arquivo principal src/app.js:

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});
```

### Configurar Banco de Dados
Criar o arquivo src/database.js:

```javascript
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) console.error(err.message);
    console.log('Conectado ao banco de dados SQLite.');
});

module.exports = db;
```

Criar tabelas:

```javascript
const db = require('./database');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            description TEXT,
            price REAL,
            imageUrl TEXT
        )
    `);
});
```

### Criar Rotas
Criar rota para listar produtos:

```javascript
const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/products', (req, res) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

module.exports = router;
```

Integrar rotas no app.js:

```javascript
const productRoutes = require('./routes/products');
app.use('/api', productRoutes);
```

### Desenvolvimento do Frontend
Objetivo: Criar a interface do usuário e consumir a API.

#### Inicializar o Projeto
Criar o projeto React:

```prompt
mkdir frontend
cd frontend
npm create vite@latest .
npm install
npm install axios react-router-dom
```

Estruturar o diretório src:
```prompt
src/
├── components/
│   ├── ProductCard.jsx
├── pages/
│   ├── Home.jsx
│   ├── Contact.jsx
├── App.jsx
└── main.jsx
```

#### Criar Componentes
ProductCard.jsx:

```javascript
import React from 'react';

const ProductCard = ({ product }) => (
    <div className="product-card">
        <img src={product.imageUrl} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>{product.price}</p>
    </div>
);

export default ProductCard;
```

Home.jsx:

```javascript
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Produtos</h1>
            <div className="product-list">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Home;
```

Criar navegação no App.jsx:

```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
    </Router>
);

export default App;
```

#### Design Responsivo e Estilização
Objetivo: Garantir que o site funcione em diversos dispositivos e seja bem estilizado

Configurar Tailwind CSS:

```prompt
npm install -D tailwindcss
npx tailwindcss init
```

Adicionar classes responsivas ao CSS dos componentes.


### Testes e Finalização
Objetivo: Testar o sistema e corrigir bugs.

#### Testar o Backend

- Testar endpoints com Postman.
- Garantir que o banco de dados está persistindo corretamente.

#### Testar o Frontend

- Verificar responsividade em diferentes dispositivos.
- Garantir que as requisições à API estão funcionando.


### Deploy
Objetivo: Hospedar o projeto.

- Frontend: Deploy no Vercel.
- Backend: Deploy no Render ou Railway.
- Banco de Dados: Usar arquivo SQLite no backend.
