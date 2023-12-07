export const databaseConfig = {
  HOST: "192.168.0.123",
  USER: "postgres",
  PASSWORD: "postgres",
  DB: "rackmanagement",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
