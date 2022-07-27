import app from './config/express.js';
const port = app.get('port');

app.listen(port, () => console.log(`API iniciada na porta ${port}`));