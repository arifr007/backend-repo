import express from 'express'
import userRoutes from '../routes/userRoutes'
import ApiError from '../entities/apiError'
import { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())

app.use('/api/users', userRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});