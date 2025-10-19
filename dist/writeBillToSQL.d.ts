import type { BillType } from "./sqlTypes.js";
import { type Pool } from 'pg';
export declare function writeBillToSQL(pool: Pool, congress: number, type: BillType, number: number): Promise<void>;
//# sourceMappingURL=writeBillToSQL.d.ts.map