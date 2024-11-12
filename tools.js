import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const root_path = () => __dirname;
// 后期优化为环境变量
export const jwt_secret = "uS/hzycm/pZWbB32s4mSaWredtFeVjaT"