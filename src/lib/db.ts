import { Pool } from 'pg'
import { env } from '../config/env'



export const pool = new Pool({
    connectionString: env.databaseUrl,
});



/// temporary
pool.query("SELECT NOW()")
    .then(() => console.log("DB CONNECTED ✅"))
    .catch((err) => console.error("DB ERROR ❌", err));