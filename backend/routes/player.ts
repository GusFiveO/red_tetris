import { Router } from 'express'
import { AuthenticatedRequest } from '../custom'
import { validateAccessTokenMiddleware } from '../middleware/authMiddleware'

export const playerRouter = Router()

playerRouter.use("/", validateAccessTokenMiddleware)

playerRouter.get("/me", (req: AuthenticatedRequest, res) => {
	const player = req.user
	res.status(200).json({data: player})
})