import path from 'path'
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs'

const router: Router = Router();
if (process.env.NODE_ENV !== 'testing') router.use('/docs', swaggerUi.serve);
if (process.env.NODE_ENV !== 'testing') router.get('/docs', swaggerUi.setup(YAML.load(path.resolve('src/api/docs/swagger.yaml'))))

const DocsRouter: Router = router;
export default DocsRouter;