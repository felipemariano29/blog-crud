# Blog-CRUD

Blog-CRUD é um aplicativo web simples construído com a estrutura Node.js e Express.js, projetado para servir como uma plataforma básica de blog. Permite aos usuários criar, ler, atualizar e excluir artigos, organizados por categorias. Os usuários também podem navegar pelos artigos por categoria ou visualizar os artigos mais recentes na página inicial.

## Características

- **Autenticação de usuário**: os usuários podem se inscrever, fazer login e logout com segurança usando autenticação baseada em sessão.
- **Operações CRUD**: crie, leia, atualize e exclua artigos. Os usuários podem gerenciar seus próprios artigos após autenticação.
- **Gerenciamento de categorias**: Organize os artigos em diferentes categorias para melhor navegação.
- **Roteamento dinâmico**: utiliza roteamento dinâmico para lidar com solicitações de artigos e categorias.
- **Integração de banco de dados**: Interage com um banco de dados MySQL usando Sequelize ORM para persistência de dados.
- **Mecanismo de visualização**: renderiza visualizações HTML dinâmicas usando o mecanismo de modelagem EJS.
- **Ativos estáticos**: veicula ativos estáticos, como CSS e imagens, para melhorar a experiência do usuário.
- **Middleware de autenticação de administrador**: Inclui uma função de middleware `adminAuth` para restringir o acesso a rotas somente de administrador.

## Dependências

        - express: ^4.17.1
        - dotenv: ^10.0.0
        - body-parser: ^1.19.0
        - express-session: ^1.17.2
        - sequelize: ^6.6.5
        - mysql2: ^2.3.0
        - ejs: ^3.1.6
        - sequelize-cli: ^6.2.0
