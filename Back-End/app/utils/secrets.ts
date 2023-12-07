export const JWT_SECRET = "ThisIsMySecret"
import {Logger} from "@nestjs/common"
if (!JWT_SECRET) {
  Logger.log("No JWT secret string. Set JWT_SECRET environment variable.")
  process.exit(1)
}
